'use client';

import Header from '@/components/layout/Header';
import ProductGrid from '@/components/ProductGrid';
import { Product } from '@/types/ProductTypes';

interface SearchProps {
  products: Product[];
}

export default function Search({ products }: SearchProps) {
  return (
    <div>
      <Header />
      <ProductGrid products={products} />
    </div>
  );
}
