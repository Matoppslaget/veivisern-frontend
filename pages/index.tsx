import { useState, useEffect } from 'react';
import TypingAnimation from "../components/chat_components/TypingAnimation";
import Header from '@/components/page_components/Header';
import ChatHistory from '@/components/chat_components/ChatHistory';
import StreamMessage from '@/components/chat_components/StreamMessage';
import { KassalappProduct } from '../types/Kassalapp';
import { Message } from '../types/Chat';


const Home = () => {
  const [messageStream, setMessageStream] = useState<string>('');
  const [inputValue, setInputValue] = useState('');
  const [chatLog, setChatLog] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setChatLog((prevChatLog) => [...prevChatLog, { type: "user", message: inputValue }]);
    const products: KassalappProduct[] = await fetchKassalappProducts(inputValue);
    if (products && products.length > 0) {
      Promise.all(products.map(async (product) => {
        try {
          const evaluatedProduct: KassalappProduct = await fetchUpEvaluation(product).then(
            (evaluatedProduct) => evaluatedProduct as KassalappProduct
          );
          const evaluatedProductMessage = { type: "product", message: "This is a product", product: evaluatedProduct };
          setChatLog(prevChatLog => [...prevChatLog, evaluatedProductMessage]);
        } catch (error: any) { // Change the type annotation to 'any'
          console.error("Failed to evaluate product:", error);
          // Optionally handle errors, e.g., by returning a special error object or message
          return { type: "error", message: error.message, product };
        }
      }))
        .then(results => {
          // Optionally handle all results here, e.g., logging completion
          console.log("All products have been processed.", results);
        })
        .catch(error => {
          // Handle any errors that might propagate
          console.error("An error occurred during product evaluations:", error);
        });

      setIsLoading(false);
      setInputValue('');
    }
  };

  async function fetchKassalappProducts(message: string): Promise<KassalappProduct[]> {
    setIsLoading(true);

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
      <div className="flex flex-col h-screen bg-stone-50">
        <Header />
        <div className="flex-grow p-10">
          <div className="flex-col">
            <ChatHistory chatLog={chatLog} />
            <StreamMessage isStreaming={isStreaming} keyIndex={chatLog.length} messageStream={messageStream} />
            <TypingAnimation isLoading={isLoading} keyIndex={chatLog.length} noProducts={3} />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex-none p-10">
          <div className="flex rounded-lg border border-gray-700  text-black bg-white" >
            <input type="text" className="flex-grow px-4 py-2 bg-transparent text-black focus:outline-none text-xl" placeholder="Spør meg om et matprodukt..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <button type="submit" className="bg-stone-400 rounded-lg px-4 py-2 text-black focus:outline-none hover:bg-stone-300 transition-colors duration-300">Send</button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default Home;
