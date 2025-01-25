'use client';

import { getProcessingInfo } from '@/api/ProductEvaluator';
import { Product } from '@/types/ProductTypes';
import { useCallback, useEffect, useRef, useState } from 'react';
import ShowSearchResults from './ShowSearchResults';
import ProductModal from '../ProductModal';
import SearchBar from './SearchBar';

interface SearchProps {
  debouncedFetchResults: (product: string) => void;
  products: Product[];
  setShowAllResults: (show: boolean) => void;
}

export default function Search({
  debouncedFetchResults,
  products,
  setShowAllResults,
}: SearchProps) {
  const [query, setQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productsUnderEval, setProductsUnderEval] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchFormRef = useRef<HTMLFormElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleShowAllResults = () => {
    setSelectedProduct(null);
    setShowResults(false);
    setShowAllResults(false);
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
          <ProductModal
            product={selectedProduct}
            isEvaluating={productsUnderEval.includes(selectedProduct.id)}
            isModalOpen={isModalOpen}
            toggleModal={toggleModal}
          />
        )}
      </div>
    </>
  );
}
