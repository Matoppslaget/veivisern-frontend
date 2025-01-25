import { Product } from '@/types/ProductTypes';
import ProductCard from './ProductCard';

interface ProductResultsProps {
  products: Product[];
  handleShowResults: (product: Product) => void;
}

export default function ProductResults({
  products,
  handleShowResults,
}: ProductResultsProps) {
  return (
    <div className="p-2 w-full mt-4 grid grid-cols-2 gap-4 border-2">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          index={index}
          handleShowResults={handleShowResults}
        />
      ))}
    </div>
  );
}
