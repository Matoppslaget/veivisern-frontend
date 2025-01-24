import { EvaluatedProduct, KassalappProduct } from '@/types/ProductTypes';
import ProductCard from './ProductCard';

interface ProductResultsProps {
  products: KassalappProduct[];
  handleShowResults: (product: KassalappProduct) => void;
  evalResults: EvaluatedProduct[];
}

export default function ProductResults({
  products,
  handleShowResults,
  evalResults,
}: ProductResultsProps) {
  return (
    <div className="p-2 w-full mt-4 grid grid-cols-2 gap-4 border-2">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          index={index}
          handleShowResults={handleShowResults}
          evalResults={evalResults}
        />
      ))}
    </div>
  );
}
