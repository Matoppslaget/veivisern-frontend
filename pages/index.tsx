import { useState, useEffect } from 'react';
import SearchingAnimation from "../components/chat_components/SearchingAnimation";
import ChatHistory from '@/components/chat_components/ChatHistory';
import { KassalappProduct } from '../types/Kassalapp';
import { Message } from '../types/Chat';
import Navbar from '@/components/page_components/NavBar';
import SendButton from '@/components/page_components/SendButton';
import Sidebar from '@/components/page_components/Sidebar/Sidebar';
import { useAppContext } from '@/components/context_components/AppContext';
import { AppContextProvider } from '@/components/context_components/AppContext';


/**
 * TODO:
 * Make Sidebar open and close 
*/

/**
 * The Home component is the main component of the application.
 * It renders the navbar, chat history, input field and send button.
 * It also handles the submission of the input field and fetches products and evaluations from the backend.
 */
const Home = () => {
  // State variables
  const [inputValue, setInputValue] = useState('');
  const [renderKeyCounter, setRenderKeyCounter] = useState<number>(1000000);
  const [chatLog, setChatLog] = useState<Message[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isProductsToEval, setIsProductsToEval] = useState<boolean>(false);
  const { isSidebarOpen, toggleSidebar } = useAppContext();


  // Effect hook that runs when isProductsToEval changes
  useEffect(() => {
  }, [isProductsToEval]);

  /**
   * Handle the form submission
   * @param event - The submit event
   */
  const handleSubmit = async (event: any) => {
    setInputValue('');
    setIsSearching(true);
    event.preventDefault();
    setChatLog((prevChatLog) => [...prevChatLog, { renderKey: renderKeyCounter, type: "user", message: inputValue }]);
    const products: KassalappProduct[] = await fetchKassalappProducts(inputValue);
    setIsProductsToEval(() => true);
    if (products && products.length > 0) {
      setIsSearching(() => false);
      const productSceletonMessages: Message[] = products.map(product => ({ renderKey: renderKeyCounter + product.id, type: "product", message: "", product: product, evaluated: false }))
      setChatLog(prevChatLog => [...prevChatLog, ...productSceletonMessages]);
      Promise.all(products.map(async (product) => {
        try {
          const evaluatedProduct: KassalappProduct = await fetchUpEvaluation(product);
          const evaluatedProductMessage = { renderKey: renderKeyCounter + product.id, type: "product", message: "", product: evaluatedProduct, evaluated: true };
          setChatLog(prevChatLog => [...prevChatLog.filter(m => m.product?.id !== evaluatedProduct.id), evaluatedProductMessage]);
        } catch (error: any) {
          console.error("Failed to evaluate product:", error);
          const errorMessage = { renderKey: Infinity, type: "error", message: error.message, product: product };
          setChatLog(prevChatLog => [...prevChatLog, errorMessage]);
        }
      })).then(() => {
        setIsProductsToEval(() => false)
        setRenderKeyCounter((prevRenderKeyCounter) => prevRenderKeyCounter + 1000000);
      }
      );
    }
  };

  /**
   * Fetch products from the backend
   * @param message - The product query
   * @returns The products matching the query
   */
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

  /**
   * Fetch the evaluation of a product from the backend
   * @param product - The product to evaluate
   * @returns The evaluated product
   */
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
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${isSidebarOpen ? 'block' : 'hidden'
          } w-64 bg-white p-4 shadow-md`}
      >
        <Sidebar />
      </div>
      <div className="container mx-auto">
        <div className="flex flex-col h-screen overflow-y-auto bg-stone-50">
          <AppContextProvider>
            <Sidebar />
            <Navbar />
          </AppContextProvider>
          <div className="fixed top-24 left-0 right-0 z-50">
            {isSearching && <SearchingAnimation spinnerText='Søker etter produkter..' />}
            {isProductsToEval && <SearchingAnimation spinnerText='Evaluerer produkter..' />}
          </div>
          {/* Render the chat history */}
          <div className="flex-grow p-10">
            <div className="flex-col">
              <ChatHistory chatLog={chatLog} />
            </div>
          </div>
          {/* Render the input field and send button */}
          <form onSubmit={handleSubmit} className="flex-none p-10">
            <div className="flex rounded-lg border border-gray-700  text-black bg-white" >
              <input type="text" className="flex-grow px-4 py-2 bg-transparent text-black focus:outline-none text-xl" placeholder="Spør meg om et matprodukt..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
              <SendButton />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
};

export default Home;
