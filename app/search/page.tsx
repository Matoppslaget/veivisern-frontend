'use client';

import Header from '@/components/layout/Header';
import ProductGrid from '@/components/ProductGrid';
import { Product } from '@/types/ProductTypes';

interface SearchProps {
  Search: JSX.Element;
  products: Product[];
}

export default function Search({ Search, products }: SearchProps) {
  return (
    <div>
      <Header Search={Search} />
      <ProductGrid products={products} />
    </div>
  );
}
