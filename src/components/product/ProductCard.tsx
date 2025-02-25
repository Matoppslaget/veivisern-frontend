'use client';

import Image from 'next/image';
import ProcessedLabel from '../ProcessedLabel';
import { useState } from 'react';
import ProductModal from './ProductModal';
import { Product } from '@/src/types/ProductTypes';
import {
  cleanedProductName,
  productSubtitle,
} from '@/src/utils/CommonFunctions';

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  return (
    <>
      <article
        key={index}
        className="min-w-[160px] max-w-[245px] rounded-md hover:cursor-pointer hover:bg-green-700 hover:bg-opacity-20 border-2 border-gray-300 border-opacity-60"
        onClick={() => handleProductClick(product)}
      >
        <div className="bg-white w-full">
          <Image
            className="mx-auto h-[9.85rem] w-[9.85rem] object-contain"
            sizes="100vw, 33vw"
            src={product.image ? product.image : ''}
            alt={product.name || 'Product image'}
            width={1}
            height={1}
          />
        </div>
        <div className="h-[7.85rem] grid grid-rows-2 px-2 py-4 space-y-1">
          <section className="row-span-2 pl-2 font-semibold text-sm sm:pl-2 sm:font-semibold">
            {cleanedProductName(product)}
            <section className="text-sm font-normal">
              {productSubtitle(product)}
            </section>
          </section>

          <section className="pl-2 sm:pl-2 sm:font-semibold">
            {product.processedClass ? (
              <ProcessedLabel
                processedClass={product.processedClass}
                size="sm"
              />
            ) : (
              ''
            )}
          </section>
        </div>
      </article>
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
        />
      )}
    </>
  );
}
