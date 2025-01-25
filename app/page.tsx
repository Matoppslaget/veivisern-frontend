'use client';

import { useCallback, useState } from 'react';
import Title from '@/components/layout/Title';
import Search from '@/components/search/Search';
import { Product } from '@/types/ProductTypes';
import Header from '@/components/layout/Header';
import { getProcessingInfo } from '@/api/ProductEvaluator';
import { getKassalappProducts } from '@/api/KassalappApi';
import debounce from 'lodash.debounce';
import ProductResults from '@/components/ProductResults';

export default function Home() {
  //const padding = typeof screen !== 'undefined' ? screen.width * 0.05 : 0;
  const [showWelcome, setShowWelcome] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  const debouncedFetchResults = useCallback(
    debounce(async (queryString: string) => {
      try {
        if (queryString.length >= 3) {
          const products = await getKassalappProducts(queryString);
          const limitedProducts = products.slice(0, 15);
          setProducts(limitedProducts);
          limitedProducts.forEach(async (product) => {
            try {
              const productWithEvaluation = await getProcessingInfo(product);

              setProducts((prevProducts) =>
                prevProducts.map((p) =>
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

  const handleShowResults = (product: Product) => {
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
            handleShowResults={handleShowResults}
          />
        )}
      </main>
    </div>
  );
}
