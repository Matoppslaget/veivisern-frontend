import { EvaluatedProduct, KassalappProduct, ProcessedClass } from '@/types/ProductTypes'
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { join } from 'path';

interface CompactProductListProps {
    selectedProduct?: KassalappProduct;
    selectedProducts: KassalappProduct[];
    evaluationResults: EvaluatedProduct[];
    onProductClick: (product: KassalappProduct) => void;
}

const CompactProductList: React.FC<CompactProductListProps> = ({ selectedProduct, selectedProducts, evaluationResults, onProductClick }) => {

    const getEvaluatedProduct = (product: KassalappProduct): EvaluatedProduct | null => {
        return evaluationResults.find(e => e.id === product.id) || null;
    };

    const getProcessedStyling = (evaluatedProduct: EvaluatedProduct) => {
        return (<span className={`border text-md font-normal p-0.5 px-3 rounded-xl  
            ${evaluatedProduct.upAnswer === ProcessedClass.ULTRAPROCESSED ?
                'border-red-600 bg-red-200' :
                evaluatedProduct.upAnswer === ProcessedClass.PROCESSED ?
                    'border-yellow-400 bg-yellow-200' :
                    'border-green-600 bg-green-600 bg-opacity-50'}`}
        >
            {evaluatedProduct.upAnswer}
        </span>)
    }

    return (
        <>
            <ul className="bg-white rounded-xl mt-4 w-full shadow-lg">
                {selectedProducts.map((product, index) => {
                    const evaluatedProduct = getEvaluatedProduct(product)
                    const displayProduct = evaluatedProduct || product
                    const isSelected = selectedProduct && selectedProduct.id === displayProduct.id
                    return (
                        <li key={index}
                            className={`even:bg-white odd:bg-gray-200 odd:bg-opacity-50 flex items-center py-2 px-2 hover:cursor-pointer hover:bg-green-700 hover:bg-opacity-20 ${isSelected ? 'rounded-md ring-green-700 ring-2 ring-inset p-0' : ''}`}
                            onClick={() => onProductClick(product)}>
                            <div className="w-full my-auto font-semibold rounded-md flex justify-start px-2">
                                <span className="flex-shrink-0">{product.name}</span>
                                <div className="flex-shrink-0 ml-2">
                                    {evaluatedProduct && getProcessedStyling(evaluatedProduct)}
                                </div>
                            </div>
                            <div className="w-11/12  text-gray-500 hover:text-black" >
                                <div className="justify-end flex items-center">
                                    <div className="px-2 hidden 2xl:block"> Se detaljer</div> <ArrowRightIcon className="w-6 h-6 justify-end" />
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

interface CompactListElement {
    isHovered: boolean;
}

const ChildComponent: React.FC<CompactListElement> = ({ isHovered }) => {
    return (
        <div className={`p-2 ${isHovered ? 'bg-green-200' : 'bg-red-200'}`}>
            Child Div
        </div>
    );
};

export default CompactProductList;