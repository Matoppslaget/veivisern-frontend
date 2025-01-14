'use client';

import { fetchResults } from '@/api/KassalappApi';
import { fetchProductEvaluation } from '@/api/ProductEvaluator';
import { EvaluatedProduct, KassalappProduct } from '@/types/ProductTypes';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useRef, useState } from 'react';
import ShowSearchResults from './ShowSearchResults';
import ProductCard from '../ProductCard';
import SearchBar from './SearchBar';
import Image from 'next/image';

export default function Search() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<KassalappProduct[]>([]);
  const [selectedProduct, setSelectedProduct] =
    useState<KassalappProduct | null>(null);
  const [productsUnderEval, setProductsUnderEval] = useState<number[]>([]);
  const [evalResults, setEvalResults] = useState<EvaluatedProduct[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showAllResults, setShowAllResults] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchFormRef = useRef<HTMLFormElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const debouncedFetchResults = useCallback(
    debounce(async (product: string) => {
      try {
        if (product.length >= 3) {
          const results = await fetchResults(product);
          setProducts(results.slice(0, 15));
          const evalResults = await Promise.all(
            results.map((product) => fetchProductEvaluation(product)),
          );
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }, 400),
    [],
  );

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleShowAllResults = () => {
    setSelectedProduct(null);
    setShowResults(false);
    setShowAllResults(true);
    console.log('Show all results');
  };

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setQuery(value);
      debouncedFetchResults(value);
      if (value.length > 0) {
        setShowResults(true);
      } else {
        setShowResults(false);
      }
    },
    [debouncedFetchResults],
  );

  const handleProductClick = (product: KassalappProduct) => {
    if (!evalResults.some((p) => p.kassalappId === product.id)) {
      setProductsUnderEval([...productsUnderEval, product.id]);
      fetchProductEvaluation(product).then((res: EvaluatedProduct) => {
        setProductsUnderEval(
          productsUnderEval.filter((id) => id !== product.id),
        );
        setEvalResults((prevEvalResults) => [...prevEvalResults, res]);
      });
    }
    setShowResults(false);
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchFormRef.current &&
      !searchFormRef.current.contains(event.target as Node) &&
      resultsRef.current &&
      !resultsRef.current.contains(event.target as Node)
    ) {
      setShowResults(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const renderSearchResults = () => {
    if (showResults && query.length > 0) {
      return (
        <ShowSearchResults
          products={products}
          handleProductClick={handleProductClick}
          handleShowAllResults={handleShowAllResults}
          ref={resultsRef}
        />
      );
    }
    return null;
  };

  return (
    <>
      <div className="flex flex-col items-center relative px-4 sm:px-4 max-w-[600px] mx-auto w-auto">
        <SearchBar
          query={query}
          setQuery={setQuery}
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
        {renderSearchResults()}
        {selectedProduct && (
          <ProductCard
            product={selectedProduct}
            isEvaluating={productsUnderEval.includes(selectedProduct.id)}
            evaluatedProduct={evalResults.find(
              (product) => product.kassalappId === selectedProduct?.id,
            )}
            isModalOpen={isModalOpen}
            toggleModal={toggleModal}
          />
        )}
      </div>

      {showAllResults && (
        <div className="p-2 w-full mt-4 grid grid-cols-2 gap-4 border-2 border-red-500">
          {products.map((product, index) => (
            <article
              key={index}
              className="border-2 flex-col items-center space-y-6 rounded-md border-gray-300 border-opacity-70 hover:cursor-pointer hover:bg-green-700 hover:bg-opacity-20"
              onClick={() => handleProductClick(product)}
            >
              <section className="mx-auto mt-1 w-36 h-36 flex items-center justify-center rounded-lg ">
                <Image
                  className="h-full w-full object-contain "
                  sizes="(max-width: 768px) 100vw, 33vw"
                  src={product.image ? product.image : ''}
                  alt={product.name || 'Product image'}
                  width={24}
                  height={24}
                />
              </section>
              <section className="my-auto pl-2 sm:pl-8 font-normal sm:font-semibold rounded-md">
                {product.name}
              </section>
              <section className="my-auto pl-2 sm:pl-8 font-normal sm:font-semibold rounded-md">
                {
                  evalResults.find((p) => p.kassalappId === product.id)
                    ?.processedClass
                }
              </section>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
