import React from 'react';
import { Ingredient, KassalappProduct, ProcessedClass } from '../../types/Kassalapp';


const pickProcessedColor = (processedClass: ProcessedClass): string => {
  if (processedClass === ProcessedClass.ULTRAPROCESSED) {
    return 'red-100';
  } else if (processedClass === ProcessedClass.MINIMAL_PROCESSED) {
    return 'green-300';
  } else {
    return 'yellow-300';
  }
};

const ProductDetails = ({ product }: { product: KassalappProduct }) => {
  const customColor = pickProcessedColor(product.processed_class);
  const novaIngredients: Ingredient[] = Object.entries(product.nova_ingredients).map(([name, nova_group]) => ({
    name,
    nova_group: Number(nova_group) // Convert nova_group to number
  }));
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
          <div className={`flex items-center text-${customColor}`}>
            <span>{product.processed_class}</span>
          </div>
        </h4>
      </div >
      <p className="mt-2">
        <a href={product.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{product.name}</a>
        {" "}er et <span className={`text-${customColor}`}>{product.processed_class}</span> produkt.
      </p>
      <div className="mt-4">
        <h5 id="ingredienser" className="text-gray-700 font-semibold">
          <div className="flex items-center">
            <span>Ingredienser:</span>
          </div>
        </h5>
      </div>
      <ul className="list-disc list-inside mt-2 space-y-1">
        {novaIngredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.name} <span className="italic">(Nova gruppe {ingredient.nova_group})</span>
          </li>
        ))}
      </ul>
      <p></p>
    </details >
  );
}

export default ProductDetails;
