import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from 'next/image';
import { KassalappProduct } from '@/components/ApiResponse';

interface ShowProductsProps {
    products: KassalappProduct[];
    handleClick: (product: KassalappProduct) => void;
}

const ShowProducts: React.FC<ShowProductsProps> = ({ products, handleClick }) => {
    return (
        <div className="rounded-xl shadow-sm p-1 pt-1 space-y-1 border 50 w-full ">
            {products.map((product, index) => (
                <div key={index} className="rounded-md flex justify-stretch border border-gray-300 border-opacity-70">
                    <div className='min-w-20 min-h-20 max-w-20 max-h-20 rounded-lg'>
                        <a href={product.url} target="_blank" rel="noopener noreferrer">
                            <Image className="p-1 h-full w-full object-contain" sizes="(max-width: 768px) 100vw, 33vw" src={product.image} alt={product.name} width={20} height={20} />
                        </a>
                    </div>
                    <div className="my-auto pl-8 w-full font-semibold rounded-md">
                        <a href={product.url} target="_blank" rel="noopener noreferrer">
                            {product.name} <br></br> <span className="font-normal">{product?.brand ? product.brand.charAt(0).toUpperCase() + product.brand.slice(1).toLowerCase() : "Ukjent merke"}</span>
                        </a>
                    </div>
                    <div className="mx-4 w-6/12 h-20 flex items-center justify-center hover:cursor-pointer text-gray-500 hover:text-black" onClick={() => handleClick(product)}>
                        <div className=''>Se prosesseringsgrad</div> <ArrowRightIcon className="w-6 h-6 mx-2" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ShowProducts;