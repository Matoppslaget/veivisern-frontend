import { EvaluatedProduct, KassalappProduct } from '@/types/ProductTypes';
import ProductCard from './ProductCard';

interface ProductResultsProps {
  products: KassalappProduct[];
  handleProductClick: (product: KassalappProduct) => void;
  evalResults: EvaluatedProduct[];
}

export default function ProductResults({
  products,
  handleProductClick,
  evalResults,
}: ProductResultsProps) {
  return (
    <div className="p-2 w-full mt-4 grid grid-cols-2 gap-4 border-2">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          index={index}
          handleProductClick={handleProductClick}
          evalResults={evalResults}
        />
      ))}
    </div>
  );
}
