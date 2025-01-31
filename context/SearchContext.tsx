'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/types/ProductTypes';

interface SearchContextType {
  SearchComponent: JSX.Element | null;
  setSearchComponent: (component: JSX.Element) => void;
  products: Product[];
  setProducts: (products: Product[]) => void;
}

const SearchContext = createContext<SearchContextType | null>(null);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [SearchComponent, setSearchComponent] = useState<JSX.Element | null>(
    null,
  );
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <SearchContext.Provider
      value={{ SearchComponent, setSearchComponent, products, setProducts }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
};
