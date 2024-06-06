import React from 'react';
import { KassalappProduct } from '../../types/Kassalapp';


const ProductSceleton = ({ product }: { product: KassalappProduct }) => {
  return (
    <div className={`border-2 p-2 shadow max-w-97 `}>
      <span> {product.name}</span> <span className={`animate-pulse inline-flex rounded-lg px-2 py-1 ml-2 text-sm bg-gray-200`}>Evaluerer...</span>
    </div >
  )
};

export default ProductSceleton;
