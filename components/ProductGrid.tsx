import { Product } from '@/types/ProductTypes';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  //handleShowResults: (product: Product) => void;
}

export default function ProductGrid({
  products,
  //handleShowResults,
}: ProductGridProps) {
  return (
    <div className="p-2 w-full mt-4 grid grid-cols-2 gap-4 border-2">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          index={index}
          //handleShowResults={handleShowResults}
        />
      ))}
    </div>
  );
}
