import React from 'react';
import { KassalappProduct, ProcessedClass } from '../../types/Kassalapp';


const pickProcessedColor = (processedClass: ProcessedClass): string => {
  if (processedClass === ProcessedClass.ULTRAPROCESSED) {
    return 'custom-red';
  } else if (processedClass === ProcessedClass.MINIMAL_PROCESSED) {
    return 'custom-green';
  } else {
    return 'custom-yellow';
  }
};

const ProductDetails = ({ product }: { product: KassalappProduct }) => {
  const customColor = pickProcessedColor(product.processed_class);
  const ingredients = Object.entries(product.nova_ingredients);
  return (
    <details className="border p-3 shadow w-250">
      <summary>
        <span>{product.name}
          <span className={`inline-flex rounded-lg px-2 py-1 ml-2 text-sm bg-${customColor}`}>
            {product.processed_class}
          </span>
        </span>
      </summary>
      <div className="mt-4">
        <h4 id="ultraprosessert" className="text font-semibold">
          <div className="flex items-center">
            <span>{product.processed_class}</span>
          </div>
        </h4>
      </div >
      <p className="mt-2">
        <a href={product.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{product.name}</a>
        er et <span className={`text-${customColor}`}>{product.processed_class}</span> produkt.
      </p>
      <div className="mt-4">
        <h5 id="ingredienser" className="text-gray-700 font-semibold">
          <div className="flex items-center">
            <span>Ingredienser:</span>
          </div>
        </h5>
      </div>
      <ul className="list-disc list-inside mt-2 space-y-1">
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient[1].name} <span className="italic">({ingredient[1].nova_group ? ingredient[1].nova_group : ""})</span></li>
        ))}
      </ul>
      <p></p>
    </details >
  );
}

export default ProductDetails;
