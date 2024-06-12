import React from 'react';
import { Ingredient, KassalappProduct, ProcessedClass } from '../../types/Kassalapp';


function pickBackgroundColor(processedClass: ProcessedClass): string {
  if (processedClass === ProcessedClass.ULTRAPROCESSED) {
    return `bg-red-500`;
  } else if (processedClass === ProcessedClass.MINIMAL_PROCESSED) {
    return `bg-green-600`;
  } else {
    return `bg-yellow-400`;
  }
}

function pickTextColor(processedClass: ProcessedClass): string {
  if (processedClass === ProcessedClass.ULTRAPROCESSED) {
    return `text-red-500`;
  } else if (processedClass === ProcessedClass.MINIMAL_PROCESSED) {
    return `text-green-600`;
  } else {
    return `text-yellow-500`;
  }
}

function pickBorderColor(processedClass: ProcessedClass): string {
  if (processedClass === ProcessedClass.ULTRAPROCESSED) {
    return `border-red-500`;
  } else if (processedClass === ProcessedClass.MINIMAL_PROCESSED) {
    return `border-green-600`;
  } else {
    return `border-yellow-500`;
  }
}

const ProductDetails = ({ product, evaluated }: { product: KassalappProduct, evaluated: boolean }) => {
  const customBgColor = pickBackgroundColor(product.processed_class);
  const customTextColor = pickTextColor(product.processed_class);
  const novaIngredients: Ingredient[] = Object.entries(product.nova_ingredients).map(([name, nova_group]) => ({
    name,
    nova_group: Number(nova_group)
  }));
  return <div>
    {!evaluated && <div className={`border-2 p-2 shadow max-w-97 `}>
      <span> {product.name}</span> <span className={`animate-pulse inline-flex rounded-lg px-2 py-1 ml-2 text-sm bg-gray-200`}>Evaluerer...</span>
    </div >
    }
    {evaluated && <details className={`border-2 p-2 shadow max-w-97`}>
      <summary>
        <span> {product.name}</span> <span className={`inline-flex rounded-lg px-2 py-1 ml-2 text-sm ${customBgColor}`}>{product.processed_class}</span>
      </summary>
      <p className={`mt-1 p-2 flex items-center font-semibold ${customTextColor}`}> {product.processed_class}</p>
      <div className={`p-2 items-center `}>
        <a href={product.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{product.name}</a>
        {" "}er et <span className={customTextColor}>{product.processed_class.toLowerCase()}</span> produkt.
      </div>
      <h5 id="ingredienser" className="p-2 font-semibold">
        <div className="flex items-center">
          <span>Ingredienser:</span>
        </div>
      </h5>
      <ul className="list-disc list-inside p-3 space-y-0.5">
        {novaIngredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.name} <span className="text-gray-600 italic">(Nova gruppe <span className='font-semibold'>{ingredient.nova_group}</span>)</span>
          </li>))}
      </ul >
    </details >
    }

  </div >
};

export default ProductDetails;
