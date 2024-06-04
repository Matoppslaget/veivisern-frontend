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

const ProductDetails = ({ product }: { product: KassalappProduct }) => {
  const customBgColor = pickBackgroundColor(product.processed_class);
  const customTextColor = pickTextColor(product.processed_class);
  const customBorderColor = pickBorderColor(product.processed_class);
  console.log(customBgColor + " for product" + product.name)
  const novaIngredients: Ingredient[] = Object.entries(product.nova_ingredients).map(([name, nova_group]) => ({
    name,
    nova_group: Number(nova_group)
  }));
  return (
    <details className={`border-2 p-2 shadow max-w-97`}>
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
  )
};


// return (
//     <details className="border p-3 shadow w-250">
//       <summary>
//         <span>{product.name}
//           <span className={`inline-flex rounded-lg px-2 py-1 ml-2 text-sm bg-${customColor}`}>
//             {product.processed_class}
//           </span>
//         </span>
//       </summary>
//       <div className="mt-4">
//         <h4 id="ultraprosessert" className="text font-semibold">
//           <div className={`flex items-center`}>
//             <span className={`text-${customColor}`}>{product.processed_class}</span>
//           </div>
//         </h4>
//       </div >
//       <p className="mt-2">
//         <a href={product.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{product.name}</a>
//         {" "}er </p>et <span className={`text-${customColor}`}>{product.processed_class.toLowerCase()}</span> produkt.
//       </p>
//       <div className="mt-4">
//         <h5 id="ingredienser" className="text-gray-700 font-semibold">
//           <div className="flex items-center">
//             <span>Ingredienser:</span>
//           </div>
//         </h5>
//       </div>
//       <ul className="list-disc list-inside mt-2 space-y-1">
//         {novaIngredients.map((ingredient, index) => (
//           <li key={index}>
//             {ingredient.name} <span className="italic">(Nova gruppe {ingredient.</ul>nova_group})</span>
//           </li>
//       </ul >
//     </details >
//   );
// };
export default ProductDetails;
