'use client';

import { fetchResults } from '@/api/KassalappApi';
import { fetchProductEvaluation } from '@/api/ProductEvaluator';
import { EvaluatedProduct, KassalappProduct } from '@/types/ProductTypes';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useRef, useState } from 'react';
import ShowSearchResults from './ShowSearchResults';
import ProductCard from '../ProductCard';
import SearchBar from './SearchBar';
import { Button } from '@headlessui/react';

export default function Search() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<KassalappProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<
    KassalappProduct | undefined
  >(undefined);
  const [productsUnderEvaluation, setProductsUnderEvaluation] = useState<
    number[]
  >([]);
  const [evaluationResults, setEvaluationResults] = useState<
    EvaluatedProduct[]
  >([]);
  const [showResults, setShowResults] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchDivRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const debouncedFetchResults = useCallback(
    debounce(async (product: string) => {
      try {
        if (product.length >= 3) {
          const results = await fetchResults(product);
          setProducts(results.slice(0, 2));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }, 400),
    [],
  );

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
    if (!evaluationResults.some((p) => p.kassalappId === product.id)) {
      setProductsUnderEvaluation([...productsUnderEvaluation, product.id]);
      fetchProductEvaluation(product).then((res: EvaluatedProduct) => {
        setProductsUnderEvaluation(
          productsUnderEvaluation.filter((id) => id !== product.id),
        );
        setEvaluationResults((prevEvaluationResults) => [
          ...prevEvaluationResults,
          res,
        ]);
      });
    }
    setShowResults(false);
    setSelectedProduct(product);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchDivRef.current &&
      !searchDivRef.current.contains(event.target as Node) &&
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
        // TODO: Add button below all search results
        <ShowSearchResults
          products={products}
          handleClick={handleProductClick}
          ref={resultsRef}
        />
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center">
      <SearchBar
        query={query}
        setQuery={setQuery}
        searchInputRef={searchInputRef}
        searchDivRef={searchDivRef}
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
          isEvaluating={productsUnderEvaluation.includes(selectedProduct.id)}
          evaluatedProduct={evaluationResults.find(
            (product) => product.kassalappId === selectedProduct?.id,
          )}
        />
      )}
    </div>
  );
}
