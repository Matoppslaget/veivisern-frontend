import { Product } from '@/types/ProductTypes';
import Image from 'next/image';
import ProcessedLabel from './ProcessedLabel';

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  return (
    <article
      key={index}
      className="border-2 flex-col items-center space-y-6 rounded-md border-gray-300 border-opacity-70 hover:cursor-pointer hover:bg-green-700 hover:bg-opacity-20"
    >
      <section className="mx-auto mt-1 w-36 h-36 flex items-center justify-center rounded-lg ">
        <Image
          className="h-full w-full object-contain "
          sizes="(max-width: 768px) 100vw, 33vw"
          src={product.image ? product.image : ''}
          alt={product.name || 'Product image'}
          width={24}
          height={24}
        />
      </section>
      <section className="my-auto pl-2 sm:pl-8 font-normal sm:font-semibold rounded-md">
        {product.name}
      </section>
      <section className="my-auto pl-2 sm:pl-8 font-normal sm:font-semibold rounded-md">
        {product.processedClass ? (
          <ProcessedLabel processedClass={product.processedClass} />
        ) : (
          ''
        )}
      </section>
    </article>
  );
}
