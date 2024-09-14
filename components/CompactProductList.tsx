import { KassalappProduct } from '@/components/ApiResponse';
import { ArrowRightIcon } from "@heroicons/react/24/outline";

interface CompactProductListProps {
    selectedProducts: KassalappProduct[];
    onProductClick: (product: KassalappProduct) => void;
}

const CompactProductList: React.FC<CompactProductListProps> = ({ selectedProducts, onProductClick }) => {
    return (
        <>
            <ul className="bg-white rounded-xl mt-4 w-full shadow-lg">
                {selectedProducts.map((product, index) => (
                    <li key={index} className="flex items-center even:bg-white odd:bg-gray-200 odd:bg-opacity-50 py-2 px-2">
                        <div className="w-full my-auto font-semibold rounded-md ">
                            {product.name}
                        </div>
                        <div className="w-11/12 hover:cursor-pointer text-gray-500 hover:text-black" onClick={() => onProductClick(product)}>
                            <div className="justify-end flex items-center">
                                <div className="px-2 hidden lg:block"> Se prosesseringsgrad </div> <ArrowRightIcon className="w-6 h-6 justify-end" />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default CompactProductList;