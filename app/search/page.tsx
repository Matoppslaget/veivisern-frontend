'use client';

import Header from '@/components/layout/Header';
import ProductGrid from '@/components/product/ProductGrid';
import { useProductsContext } from '@/context/ProductsContext';

export default function Search() {
  const { products } = useProductsContext();
  return (
    <div>
      <Header />
      <ProductGrid products={products} />
    </div>
  );
}
