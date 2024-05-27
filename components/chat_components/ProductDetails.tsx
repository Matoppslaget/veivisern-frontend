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
    <div className="leading-7">
      <details className="border p-4 rounded shadow">
        <summary className="cursor-pointer">
          <span className="font-bold">{product.name}

            <span className={`inline-flex items-center rounded-lg px-2 py-1 ml-2 text-sm bg-${customColor}`}>
              {product.processed_class}
            </span>
          </span>
        </summary>
        <p></p>
        <div className="mt-4">
          <h4 id="ultraprosessert" className={`text${customColor} font-semibold`}>
            <div className="flex items-center">
              <a href="#ultraprosessert" className="text-current no-underline">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
              </a>
              <span>{product.processed_class}</span>
            </div>
          </h4>
        </div>
        <p className="mt-2">
          <a href={product.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{product.name}</a>
          er et <span className={`text-${customColor}`}>{product.processed_class}</span> produkt.
        </p>
        <div className="mt-4">
          <h5 id="ingredienser" className="text-gray-700 font-semibold">
            <div className="flex items-center">
              <a href="#ingredienser" className="text-current no-underline">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
              </a>
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
      </details>
    </div>
  );
}

export default ProductDetails;
