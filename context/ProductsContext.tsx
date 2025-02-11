'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/types/ProductTypes';

interface ProductsContextType {
  products: Product[];
  setProducts: (products: Product[]) => void;
  searchResults: Product[];
  setSearchResults: (products: Product[]) => void;
}

const ProductsContext = createContext<ProductsContextType | null>(null);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  return (
    <ProductsContext.Provider
      value={{ products, setProducts, searchResults, setSearchResults }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error(
      'useProductsContext must be used within a ProductsProvider',
    );
  }
  return context;
};
