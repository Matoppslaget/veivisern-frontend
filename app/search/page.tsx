"use client"

import { useState, useCallback, useRef, useEffect } from "react";
import { MagnifyingGlassIcon, ArrowRightIcon } from "@heroicons/react/24/outline"
import axios from 'axios';
import debounce from 'lodash.debounce';
import ApiResponse, { KassalappProduct } from '@/components/ApiResponse';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';

const apiKey = process.env.NEXT_PUBLIC_KASSALAPP_API_KEY;

export default function Home() {
    const [query, setQuery] = useState('');
    const [products, setProducts] = useState<KassalappProduct[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<KassalappProduct[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<KassalappProduct | null>(null);
    const [showResults, setShowResults] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const resultsRef = useRef<HTMLDivElement>(null);

    const fetchResults = async (product: string) => {
        const url = 'https://kassal.app/api/v1/products'
        try {
            const response: ApiResponse = await axios.get(url, {
                params: { search: product },
                headers: { 'Authorization': `Bearer ${apiKey}` }
            });
            console.log(response.data.data);
            setProducts(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const debouncedFetchResults = useCallback(debounce(fetchResults, 400), []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setQuery(value);
        debouncedFetchResults(value);
        setShowResults(true);
    };


    const handleClick = (product: KassalappProduct) => {
        setSelectedProducts((prevSelectedProducts) => {
            if (!prevSelectedProducts.some(p => p.id === product.id)) {
                return [...prevSelectedProducts, product];
            }
            return prevSelectedProducts;
        });
        setSelectedProduct(product);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            searchInputRef.current &&
            !searchInputRef.current.contains(event.target as Node) &&
            resultsRef.current &&
            !resultsRef.current.contains(event.target as Node)
        ) {
            setShowResults(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="space-y-5 z-20" >
            <div className="px-10 mx-auto max-w-4xl">
                <div className="p-2 px-4 bg-white rounded-xl shadow-sm flex justify-between space-x-4 border">
                    <input
                        placeholder="Søk etter produkt..."
                        type="text"
                        className="w-full rounded-md py-1.5 pl-4 pr-20 text-gray-900 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-1 focus:ring-green-700 focus:ring-opacity-30 focus:outline-none sm:text-sm sm:leading-6"
                        value={query}
                        onChange={handleInputChange}
                        onFocus={() => setShowResults(true)}
                        ref={searchInputRef}
                    />
                    <MagnifyingGlassIcon className="text-gray-500 w-10 h-10 justify-end hover:cursor-pointer hover:text-black" />
                </div>
                <div>
                    {showResults && query.length > 0 ? (
                        <div className="pr-4 absolute z-10" ref={resultsRef}>
                            {products.length > 0 ? (
                                <div className="bg-white rounded-xl shadow-sm p-4 space-y-1 border w-full ">
                                    {products.map((product, index) => (
                                        <div key={index} className="flex justify-between border">
                                            <div className='min-w-20 min-h-20 max-w-20 max-h-20 rounded-lg'>
                                                <a href={product.url} target="_blank" rel="noopener noreferrer">
                                                    <Image className="h-full w-full object-contain h-18 w-18" sizes="(max-width: 768px) 100vw, 33vw" src={product.image} alt={product.name} width={20} height={20} />
                                                </a>
                                            </div>
                                            <div className="w-full p-3 font-semibold rounded-md">
                                                <a href={product.url} target="_blank" rel="noopener noreferrer">

                                                    {product.name} <br></br> <span className="font-normal">{product.brand.charAt(0).toUpperCase() + product.brand.slice(1).toLowerCase()}</span>
                                                </a>
                                            </div>
                                            <div className="w-11/12 h-20 flex items-center hover:cursor-pointer text-gray-500 hover:text-black pr-2" onClick={() => handleClick(product)}>
                                                <div className='p-2'>Se prosesseringsgrad</div> <ArrowRightIcon className="w-6 h-6 justify-end hover:cursor-pointer" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white rounded-xl shadow-sm p-4 border">Ingen produkter funnet</div>
                            )}
                        </div>
                    ) : null}
                </div>
            </div>

            <div className="p-4 px-10 mx-auto z-0">
                <div className="py-10 px-10 grid grid-cols-7 space-x-10 justify-between">
                    <div className="col-span-3 font-semibold justify-center">
                        <div className="mx-auto font-normal text-lg">Undersøkte produkter</div>
                        {selectedProducts.length > 0 ? (
                            <div className="bg-white rounded-xl shadow-sm p-4 space-y-2  w-full ">
                                {selectedProducts.map((product, index) => (
                                    <div key={index} className="flex items-center">
                                        <div className="w-full my-auto font-semibold rounded-md">
                                            {product.name}
                                        </div>
                                        <div className="w-11/12 hover:cursor-pointer text-gray-500 hover:text-black" onClick={() => handleClick(product)}>
                                            <div className="justify-end flex items-center">
                                                <div className="px-2 hidden lg:block"> Se prosesseringsgrad </div> <ArrowRightIcon className=" w-6 h-6 justify-end" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl shadow-sm p-4 font-normal text-center ">Du har enda ikke valgt produkter <br></br><br></br> <span className="italic">prøv et søk!</span></div>

                        )}
                    </div>
                    <div className="flex justify-center col-start-5 col-span-2">
                        {selectedProduct && (
                            <ProductCard product={selectedProduct} />
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
};
