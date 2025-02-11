'use client';

import Header from '@/components/layout/Header';
import ProductGrid from '@/components/product/ProductGrid';
import { useProductsContext } from '@/context/ProductsContext';
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
