import { Product } from '@/src/types/ProductTypes';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products?: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="p-2 max-w-[80rem] mx-auto mt-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
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
