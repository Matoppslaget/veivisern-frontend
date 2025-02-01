'use client';

import Header from '@/components/layout/Header';
import ProductGrid from '@/components/product/ProductGrid';
import { useSearchContext } from '@/context/SearchContext';

export default function Search() {
  const { products } = useSearchContext();
  return (
    <div>
      <Header />
      <ProductGrid products={products} />
    </div>
  );
}
