import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from 'next/image';
import { KassalappProduct } from '@/types/ProductTypes';

interface ShowProductsProps {
    products: KassalappProduct[];
    handleClick: (product: KassalappProduct) => void;
}

const ShowProducts: React.FC<ShowProductsProps> = ({ products, handleClick }) => {
    return (
        products.length > 0 ? (
            <div className="rounded-xl shadow-sm  p-1 pt-1 space-y-1 border-t-0 border 50 w-full">
                {products.map((product, index) => (
                    <div key={index} className="rounded-md flex justify-stretch border border-gray-300 border-opacity-70 hover:cursor-pointer hover:bg-green-700 hover:bg-opacity-20" onClick={() => handleClick(product)}>
                        <div className='min-w-20 min-h-20 max-w-20 max-h-20 rounded-lg'>
                            <Image className="p-1 h-full w-full object-contain text-sm" sizes="(max-width: 768px) 100vw, 33vw" src={product.image ? product.image : ''} alt={''} width={20} height={20} />
                        </div>
                        <div className="my-auto pl-2 sm:pl-8 w-full font-normal sm:font-semibold rounded-md ">
                            {product.name}
                        </div>
                        <div className=" w-6/12 h-20 flex items-center justify-center hover:cursor-pointer" >
                            <div className='hidden sm:block'>Se detaljer</div> <ArrowRightIcon className="w-6 h-6 mx-2" />
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <div className="rounded-xl shadow-sm  p-4 border-t-0 border 50 w-full">Ingen produkter funnet</div>
        )
    );
};


export default ShowProducts;