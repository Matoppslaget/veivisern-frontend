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
    setChatLog((prevChatLog) => [...prevChatLog, new Message("user", inputValue)])
    const products = await fetchKassalappProducts(inputValue);
    // Handle the response data here
    console.log(products);
    products.forEach(async (product) => {
      const evaluatedProduct = await fetchUpEvaluation(product);
      const evaluatedProductMessage = new Message("product", evaluatedProduct.name + " " + evaluatedProduct.up_answer)
      setChatLog((prevChatLog) => [...prevChatLog, evaluatedProductMessage])

      // Render the evaluated product here
      console.log(evaluatedProduct);
    });

    setInputValue('');
  }

  async function fetchKassalappProducts(message: string): Promise<KassalappProduct[]> {
    setIsLoading(true);

    return fetch('http://localhost:8000/find_products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ product: message }),
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle the error from the first endpoint here
      })
  }

  async function fetchUpEvaluation(product: KassalappProduct): Promise<KassalappProduct> {
    console.log(JSON.stringify(product));
    return fetch('http://localhost:8000/evaluate_product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false)
        return data;
        // Handle the response data from the second endpoint here
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle the error from the second endpoint here
      })
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col h-screen bg-stone-50">
        <Header />
        <div className="flex-grow p-6">
          <div className="flex flex-col space-y-4">
            <ChatHistory chatLog={chatLog} />
            <StreamMessage isStreaming={isStreaming} keyIndex={chatLog.length} messageStream={messageStream} />
            <TypingAnimation isLoading={isLoading} keyIndex={chatLog.length} />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex-none p-6">
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
