import { Product } from '@/types/ProductTypes';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products?: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="p-2 w-full mt-4 grid grid-cols-2 gap-4 border-2">
      {products ? (
        products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
}
