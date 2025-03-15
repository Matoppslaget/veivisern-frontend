'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import ShowSearchResults from './ShowSearchResults';
import ProductModal from '../../components/product/ProductModal';
import SearchBar from './SearchBar';
import debounce from 'lodash.debounce';
import { getKassalappProducts } from '@/src/data-access-layer/api/KassalappApi';
import { getProcessingInfo } from '@/src/data-access-layer/api/ProductEvaluator';
import { useRouter, useSearchParams } from 'next/navigation';
import { useProductsContext } from '@/src/data-access-layer/ProductsContext';
import { Product } from '@/src/types/ProductTypes';

export default function Search(): JSX.Element {
  const router = useRouter();
  const { setProducts, searchResults, setSearchResults } = useProductsContext();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchFormRef = useRef<HTMLFormElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const showAllResultsButtonRef = useRef<HTMLButtonElement>(null);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const debouncedFetchResults = useCallback(
    debounce(async (queryString: string) => {
      try {
        if (queryString.length >= 3) {
          const products = await getKassalappProducts(queryString);
          const limitedProducts = products.slice(0, 15);
          setSearchResults(limitedProducts);
          limitedProducts.forEach(async (product) => {
            try {
              const productWithEvaluation = await getProcessingInfo(product);

              setSearchResults((prevProducts: Product[]) =>
                prevProducts.map((p: Product) =>
                  p.id === productWithEvaluation.id ? productWithEvaluation : p,
                ),
              );
            } catch (error) {
              console.error(
                `Error fetching processing info for product ${product.id}:`,
                error,
              );
            }
          });
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }, 300), // Adjust debounce time as needed
    [getKassalappProducts, getProcessingInfo, setProducts],
  );

  const handleShowAllResults = async () => {
    setSelectedProduct(null);
    setShowResults(false);
    setProducts(searchResults);
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setQuery(value);
      debouncedFetchResults(value);
      setShowResults(value.length > 0);
      const main = document.querySelector('main');
      if (main) {
        main.style.overflow = value.length > 0 ? 'hidden' : '';
      }
    },
    [debouncedFetchResults],
  );

  const handleProductClick = (product: Product) => {
    setShowResults(false);
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchFormRef.current &&
      !searchFormRef.current.contains(event.target as Node) &&
      resultsRef.current &&
      !resultsRef.current.contains(event.target as Node) &&
      showAllResultsButtonRef.current &&
      !showAllResultsButtonRef.current.contains(event.target as Node)
    ) {
      setShowResults(false);
    }
  };

  const handleClearSearchQuery = () => {
    setSearchResults([]);
    setQuery('');
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="flex flex-col items-center relative px-2 sm:px-4 max-w-[40rem] mx-auto w-auto">
        <SearchBar
          query={query}
          handleClear={handleClearSearchQuery}
          handleShowResults={handleShowAllResults}
          searchInputRef={searchInputRef}
          searchFormRef={searchFormRef}
          onInputChange={handleInputChange}
          onFocus={() => {
            if (query.length > 0) {
              setShowResults(true);
            } else {
              setShowResults(false);
            }
          }}
        />
        {showResults && query.length > 0 && (
          <ShowSearchResults
            query={query}
            products={searchResults}
            handleProductClick={handleProductClick}
            handleShowAllResults={handleShowAllResults}
            resultsTableRef={resultsRef}
            showResults={showResults}
            showResultsButtonRef={showAllResultsButtonRef}
          />
        )}
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            isModalOpen={isModalOpen}
            toggleModal={toggleModal}
          />
        )}
      </div>
    </>
  );
}
