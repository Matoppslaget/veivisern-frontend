"use client"

import ApiResponse, { KassalappProduct } from '@/components/ApiResponse';
import ProductCard from '@/components/ProductCard';
import SearchBar from "@/components/SearchBar";
import ShowProducts from "@/components/ShowProducts";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import axios from 'axios';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useRef, useState } from "react";

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
        setShowResults(false);
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
        <div className="space-y-" >
            <div className="p-4 px-10 mx-">
                <div className="py-4 px-10 grid grid-cols-7 space-x-10 justify-between">
                    <div className="col-span-3 font-semibold justify-center">
                        <div className="pl-4 mx-auto font-normal text-2xl">Søk og velg produkter</div>
                        <div className="my-4 px-4 max-w-4xl">
                            <SearchBar
                                query={query}
                                onInputChange={handleInputChange}
                                onFocus={() => setShowResults(true)}
                            />
                            {showResults && query.length > 0 ? (
                                <div className="max-w-4xl" ref={resultsRef}>
                                    {products.length > 0 ? (
                                        <ShowProducts products={products} handleClick={handleClick} />  // Use
                                    ) : (
                                        <div className="bg-white rounded-xl shadow-sm p-4 border">Ingen produkter funnet</div>
                                    )}
                                </div>
                            ) : null}
                            {!showResults && selectedProducts.length > 0 ? (
                                <div className="mt-4">
                                    Valgte produkter:
                                    <ul className="bg-white rounded-xl mt-4 w-full shadow-lg">
                                        {selectedProducts.map((product, index) => (
                                            <li key={index} className="flex items-center even:bg-white odd:bg-gray-200 odd:bg-opacity-50 py-2 px-2">
                                                <div className="w-full my-auto font-semibold rounded-md ">
                                                    {product.name}
                                                </div>
                                                <div className="w-11/12 hover:cursor-pointer text-gray-500 hover:text-black" onClick={() => handleClick(product)}>
                                                    <div className="justify-end flex items-center">
                                                        <div className="px-2 hidden lg:block"> Se prosesseringsgrad </div> <ArrowRightIcon className="w-6 h-6 justify-end" />
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : null
                            }
                        </div>
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
