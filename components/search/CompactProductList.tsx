import {
  EvaluatedProduct,
  KassalappProduct,
  ProcessedClass,
} from '@/types/ProductTypes';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface CompactProductListProps {
  selectedProduct?: KassalappProduct;
  selectedProducts: KassalappProduct[];
  evaluationResults: EvaluatedProduct[];
  onProductClick: (product: KassalappProduct) => void;
}

const CompactProductList: React.FC<CompactProductListProps> = ({
  selectedProduct,
  selectedProducts,
  evaluationResults,
  onProductClick,
}) => {
  const getEvaluatedProduct = (
    product: KassalappProduct,
  ): EvaluatedProduct | null => {
    return evaluationResults.find((e) => e.kassalappId === product.id) || null;
  };

  const getProcessedStyling = (evaluatedProduct: EvaluatedProduct) => {
    let className = '';
    let label = '';

    switch (evaluatedProduct.processedClass) {
      case ProcessedClass.ZERO:
        className = ' bg-gray-200';
        label = 'Prosesseseringsgrad: ikke funnet';
        break;
      case ProcessedClass.ONE:
        className = 'border-green-600 bg-green-200';
        label = 'Minimalt prosessert';
        break;
      case ProcessedClass.TWO:
        className = 'border-green-600 bg-green-200';
        label = 'Minimalt prosessert';
        break;
      case ProcessedClass.THREE:
        className = 'border-orange-600 bg-orange-200';
        label = 'Prosessert';
        break;
      case ProcessedClass.FOUR:
        className = 'border-red-600 bg-red-200';
        label = 'Ultraprosessert';
        break;
      default:
        className = ' bg-gray-200';
        label = 'Ukjent prosesseringsgrad';
    }

    return (
      <span
        className={`border text-md font-normal px-2 rounded-xl ${className}`}
      >
        {label}
      </span>
    );
  };

  return (
    <>
      <ul className="bg-white rounded-xl mt-4 w-full shadow-lg flex-initial">
        {selectedProducts.map((product, index) => {
          const evaluatedProduct = getEvaluatedProduct(product);
          const displayProduct = evaluatedProduct;
          const isSelected =
            selectedProduct &&
            selectedProduct.id === displayProduct?.kassalappId;
          return (
            <li
              key={index}
              className={`even:bg-white odd:bg-gray-200 odd:bg-opacity-50 flex items-center py-2 px-2 hover:cursor-pointer hover:bg-green-700 hover:bg-opacity-20 ${isSelected ? 'rounded-md ring-green-700 ring-2 ring-inset p-0' : ''}`}
              onClick={() => onProductClick(product)}
            >
              <div className="w-full font-semibold flex space-x-2 items-center px-2">
                <div className="whitespace-nowrap overflow-hidden">
                  {' '}
                  {product.name}{' '}
                </div>
                <div className="">
                  {evaluatedProduct && getProcessedStyling(evaluatedProduct)}
                </div>
              </div>
              <div className="w-11/12  text-gray-500 hover:text-black">
                <div className="justify-end hidden 2xl:flex items-center">
                  <div className="px-2 ">Detaljer</div>{' '}
                  <ArrowRightIcon className="w-6 h-6 justify-end" />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CompactProductList;
