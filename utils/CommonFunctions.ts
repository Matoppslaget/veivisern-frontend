import { Product } from '@/types/ProductTypes';
import { useState, useEffect } from 'react';

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export function cleanedProductName(product: Product): string {
  if (!product.name) {
    return '';
  }
  // Remove any non-alphanumeric characters except spaces
  let cleanedName = product.name.replace(/[^a-zA-Z0-9\s]/g, '');

  // Remove numbers followed by 'g' or 'x' or 'pk'
  cleanedName = cleanedName.replace(/\d+g/g, '');
  cleanedName = cleanedName.replace(/\d+x/g, '');
  cleanedName = cleanedName.replace(/\d+pk/g, '');

  if (product.brand) {
    const brandRegex = new RegExp(product.brand, 'i');
    cleanedName = cleanedName.replace(brandRegex, '').trim();
  }

  return cleanedName;
}

export function productSubtitle(product: Product): string {
  if (!product.name) {
    return '';
  }
  const cleanedName = cleanedProductName(product);
  const cleanedNameRegex = new RegExp(cleanedName, 'i');
  return product.name.replace(cleanedNameRegex, '').trim();
}
