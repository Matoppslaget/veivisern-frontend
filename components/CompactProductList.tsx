import { KassalappProduct } from '@/components/KassalappResponse';
import { ArrowRightIcon } from "@heroicons/react/24/outline";

interface CompactProductListProps {
    selectedProduct?: KassalappProduct;
    selectedProducts: KassalappProduct[];
    onProductClick: (product: KassalappProduct) => void;
}

const CompactProductList: React.FC<CompactProductListProps> = ({ selectedProduct, selectedProducts, onProductClick }) => {
    return (
        <>
            <ul className="bg-white rounded-xl mt-4 w-full shadow-lg">
                {selectedProducts.map((product, index) => {
                    const isSelected = selectedProduct && selectedProduct.id === product.id;
                    return (
                        <li key={index}
                            className={`even:bg-white odd:bg-gray-200 odd:bg-opacity-50 flex items-center py-2 px-2 hover:cursor-pointer hover:bg-green-700 hover:bg-opacity-20 ${isSelected ? 'rounded-md ring-green-700 ring-2 ring-inset p-0' : ''}`}
                            onClick={() => onProductClick(product)}>
                            <div className="w-full my-auto font-semibold rounded-md ">
                                {product.name}
                            </div>
                            <div className="w-11/12  text-gray-500 hover:text-black" >
                                <div className="justify-end flex items-center">
                                    <div className="px-2 hidden lg:block"> Se detaljer</div> <ArrowRightIcon className="w-6 h-6 justify-end" />
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