'use client';

import { useCallback, useState } from 'react';
import Title from '@/components/layout/Title';
import Search from '@/components/search/Search';
import { EvaluatedProduct, KassalappProduct } from '@/types/ProductTypes';
import Header from '@/components/layout/Header';
import { fetchProductEvaluation } from '@/api/ProductEvaluator';
import { fetchResults } from '@/api/KassalappApi';
import debounce from 'lodash.debounce';
import ProductResults from '@/components/ProductResults';

export default function Home() {
  //const padding = typeof screen !== 'undefined' ? screen.width * 0.05 : 0;
  const [showWelcome, setShowWelcome] = useState(true);
  const [products, setProducts] = useState<KassalappProduct[]>([]);
  const [productsUnderEval, setProductsUnderEval] = useState<number[]>([]);
  const [evalResults, setEvalResults] = useState<EvaluatedProduct[]>([]);

  const debouncedFetchResults = useCallback(
    debounce(async (product: string) => {
      try {
        if (product.length >= 3) {
          const results = await fetchResults(product);
          setProducts(results.slice(0, 15));
          const evalResults = await Promise.all(
            results.map((product) => fetchProductEvaluation(product)),
          );
          setEvalResults(evalResults);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }, 400),
    [],
  );

  const handleShowResults = (product: KassalappProduct) => {
    if (!evalResults.some((p) => p.kassalappId === product.id)) {
      setProductsUnderEval([...productsUnderEval, product.id]);
      fetchProductEvaluation(product).then((res: EvaluatedProduct) => {
        setProductsUnderEval(
          productsUnderEval.filter((id) => id !== product.id),
        );
        setEvalResults((prevEvalResults) => [...prevEvalResults, res]);
      });
    }
    setShowWelcome(false);
    //setSelectedProduct(product);
    //setModalOpen(true);
  };

  return (
    <div>
      <Header
        showSearch={!showWelcome}
        debouncedFetchResults={debouncedFetchResults}
        products={products}
        setShowAllResults={setShowWelcome}
      />
      <main>
        {showWelcome ? (
          <>
            <Title />
            <Search
              debouncedFetchResults={debouncedFetchResults}
              products={products}
              setShowAllResults={setShowWelcome}
            />
          </>
        ) : (
          <ProductResults
            products={products}
            evalResults={evalResults}
            handleShowResults={handleShowResults}
          />
        )}
      </main>
    </div>
  );
}
