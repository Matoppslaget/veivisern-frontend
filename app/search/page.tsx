"use client"

import { EvaluatedProduct, KassalappProduct } from '@/components/KassalappResponse';
import ProductCard from '@/components/ProductCard';
import SearchBar from "@/components/SearchBar";
import ShowProducts from "@/components/ShowProducts";
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useRef, useState } from "react";
import { fetchResults } from '@/api/KassalappApi';
import CompactProductList from '@/components/CompactProductList';
import { fetchProductEvaluation } from '@/api/ProductEvaluator';

export default function Home() {
    // State variables
    const [query, setQuery] = useState('');
    const [products, setProducts] = useState<KassalappProduct[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<KassalappProduct[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<KassalappProduct | undefined>(undefined);
    const [productsUnderEvaluation, setProductsUnderEvaluation] = useState<number[]>([]);
    const [evaluationResults, setEvaluationResults] = useState<EvaluatedProduct[]>([]);
    const [showResults, setShowResults] = useState(false);

    // References for click-outside detection
    const searchInputRef = useRef<HTMLInputElement>(null);
    const searchDivRef = useRef<HTMLDivElement>(null);
    const resultsRef = useRef<HTMLDivElement>(null);


    const debouncedFetchResults = useCallback(
        debounce(async (product: string) => {
            try {
                const results = await fetchResults(product);
                setProducts(results);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }, 400),
        []
    );

    const handleInputChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            setQuery(value);
            debouncedFetchResults(value);
            if (value.length > 0) {
                setShowResults(true);
            } else {
                setShowResults(false);
            }
        },
        [debouncedFetchResults]
    );


    const handleProductClick = (product: KassalappProduct) => {
        if (!evaluationResults.some(p => p.id === product.id)) {
            setProductsUnderEvaluation([...productsUnderEvaluation, product.id]);
            fetchProductEvaluation(product).then((res: EvaluatedProduct) => {
                setProductsUnderEvaluation(productsUnderEvaluation.filter(id => id !== product.id));
                setEvaluationResults([...evaluationResults, res]);
            });
        }
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
            searchDivRef.current &&
            !searchDivRef.current.contains(event.target as Node) &&
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

    const renderSelectedProducts = () => {
        console.log("Rendering selected products", (!showResults && selectedProducts.length > 0))
        if (!showResults && selectedProducts.length > 0) {
            return (
                <div className="mt-4">
                    Valgte produkter:
                    <CompactProductList
                        selectedProduct={selectedProduct}
                        selectedProducts={selectedProducts}
                        onProductClick={handleProductClick}
                    />
                </div>
            );
        }
        return null;
    };

    const renderSearchResults = () => {
        if (showResults && query.length > 0) {
            return (
                <div className="max-w-4xl" ref={resultsRef}>
                    <ShowProducts products={products} handleClick={handleProductClick} />
                </div>
            );
        }
        return null;
    };
    // Debug:: Når eg har valgt produkt, deretter visker vekk alt i søkefeltet, så forsvinner "SelectedProducts"- lista
    return (
        <div className="space-y-" >
            <div className="p-4 px-10 mx-">
                <div className="py-4 px-10 grid grid-cols-7 space-x-10 justify-between">
                    <div className="col-span-3 font-semibold justify-center">
                        <div className="pl-4 mx-auto font-normal text-2xl">Søk og velg produkter</div>
                        <div className="my-4 px-4 max-w-4xl">
                            <SearchBar
                                query={query}
                                searchInputRef={searchInputRef}
                                searchDivRef={searchDivRef}
                                onInputChange={handleInputChange}
                                onFocus={() => {
                                    if (query.length > 0) {
                                        setShowResults(true);
                                    }
                                }}
                            />
                            {renderSearchResults()}
                            {renderSelectedProducts()}
                        </div>
                    </div>
                    <div className="flex justify-center col-start-5 col-span-2">
                        {selectedProduct && (
                            <ProductCard product={selectedProduct} isEvaluating={productsUnderEvaluation.includes(selectedProduct.id)} evaluatedProduct={evaluationResults.find((product) => product.id === selectedProduct?.id)} />
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
};