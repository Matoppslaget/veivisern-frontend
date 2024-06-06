import { useState, useEffect } from 'react';
import SearchingAnimation from "../components/chat_components/SearchingAnimation";
import Header from '@/components/page_components/Header';
import ChatHistory from '@/components/chat_components/ChatHistory';
import { KassalappProduct } from '../types/Kassalapp';
import { Message } from '../types/Chat';
import Navbar from '@/components/page_components/NavBar';
import SendButton from '@/components/page_components/SendButton';


const Home = () => {
  const [inputValue, setInputValue] = useState('');
  const [chatLog, setChatLog] = useState<Message[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isProductsToEval, setIsProductsToEval] = useState<boolean>(false);

  useEffect(() => {
  }, [isProductsToEval]);

  const handleSubmit = async (event: any) => {
    setInputValue('');
    setIsSearching(true);
    event.preventDefault();
    setChatLog((prevChatLog) => [...prevChatLog, { type: "user", message: inputValue }]);
    const products: KassalappProduct[] = await fetchKassalappProducts(inputValue);
    setIsProductsToEval(() => true);
    if (products && products.length > 0) {
      setIsSearching(() => true);
      const productSceletonMessages: Message[] = products.map(product => ({ type: "product", message: "", product: product, evaluated: false }))
      setChatLog(prevChatLog => [...prevChatLog, ...productSceletonMessages]);
      Promise.all(products.map(async (product) => {
        try {
          const evaluatedProduct: KassalappProduct = await fetchUpEvaluation(product);
          const evaluatedProductMessage = { type: "product", message: "", product: evaluatedProduct, evaluated: true };
          // TODO: Fix this, it should replace the productSceletonMessage with the evaluatedProductMessage
          // Dont shuffle the html elements as they finish evaluating
          setChatLog(prevChatLog => [...prevChatLog.filter(m => m.product?.id !== evaluatedProduct.id), evaluatedProductMessage]);
        } catch (error: any) {
          console.error("Failed to evaluate product:", error);
          const errorMessage = { type: "error", message: error.message, product };
          setChatLog(prevChatLog => [...prevChatLog, errorMessage]);
        }
        // TODO: Fix this, it should replace the productSceletonMessage with the evaluatedProductMessage
      })).then(() => setIsProductsToEval(() => false));
    }
  };

  async function fetchKassalappProducts(message: string): Promise<KassalappProduct[]> {
    return fetch('http://localhost:8000/find_products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ product: message }),
    })
      .then((response) => {
        return response.json() as Promise<KassalappProduct[]>;
      })
      .catch((error) => {
        console.error('Error:', error);
        return [];
      });

  };

  async function fetchUpEvaluation(product: KassalappProduct): Promise<KassalappProduct> {
    const response = await fetch('http://localhost:8000/evaluate_product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch product evaluation");
    }
    const data: KassalappProduct = await response.json();
    return data;
  };


  return (
    <div className="container mx-auto">
      <div className="flex flex-col h-screen overflow-y-auto bg-stone-50">
        <Navbar />
        <div className="fixed top-0 left-0 right-0 z-50">
          {isSearching && <SearchingAnimation spinnerText='Søker etter produkter..' />}
          {isProductsToEval && <SearchingAnimation spinnerText='Evaluerer produkter..' />}
        </div>
        <div className="flex-grow p-10">
          <div className="flex-col">
            <ChatHistory chatLog={chatLog} />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex-none p-10">
          <div className="flex rounded-lg border border-gray-700  text-black bg-white" >
            <input type="text" className="flex-grow px-4 py-2 bg-transparent text-black focus:outline-none text-xl" placeholder="Spør meg om et matprodukt..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <SendButton />
          </div>
        </form>
      </div>
    </div>
  )
};

export default Home;
