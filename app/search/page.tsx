'use client';

import Header from '@/src/components/layout/Header';
import ProductGrid from '@/src/components/product/ProductGrid';
import { useProductsContext } from '@/src/data-access-layer/ProductsContext';
import { Suspense } from 'react';

export default function Search() {
  const { products } = useProductsContext();
  return (
    <Suspense>
      <Header />
      <ProductGrid products={products} />
    </Suspense>
  );
}
