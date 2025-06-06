'use client';

import { Product } from '@/types/ProductTypes';
import { useCallback, useEffect, useRef, useState } from 'react';
import ShowSearchResults from './ShowSearchResults';
import ProductModal from '../product/ProductModal';
import SearchBar from './SearchBar';
import debounce from 'lodash.debounce';
import { getKassalappProducts } from '@/api/KassalappApi';
import { getProcessingInfo } from '@/api/ProductEvaluator';
import { useRouter, useSearchParams } from 'next/navigation';
import { useProductsContext } from '@/context/ProductsContext';

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
          const limitedProducts = products.slice(0, 15); // TODO: paginate results
          setSearchResults(limitedProducts);
          limitedProducts.forEach(async (product) => {
            try {
              const productWithEvaluation = await getProcessingInfo(product);

              setSearchResults((prevProducts: Product[]) => {
                const updated = prevProducts.map((p: Product) =>
                  p.id === productWithEvaluation.id ? productWithEvaluation : p,
                );
              
                // Sort by processedClass (lowest to highest), undefined goes to the end
                return updated.sort((a, b) => {
                  const aClass = a.processedClass ?? Infinity;
                  const bClass = b.processedClass ?? Infinity;
                  return aClass - bClass;
                });
              });
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
        {showResults && (
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
