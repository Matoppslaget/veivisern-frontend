import { useState, useEffect } from 'react';
import TypingAnimation from "../components/TypingAnimation.jsx";

class Message {
  type: string;
  message: string;
  constructor(type: string, message: string) {
    this.type = type;
    this.message = message;
  }
}

const Home = () => {
  const [messageStream, setMessageStream] = useState<string>('');
  const [inputValue, setInputValue] = useState('');
  const [chatLog, setChatLog] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);


  const handleSubmit = (event: any) => {
    event.preventDefault();
    setChatLog((prevChatLog) => [...prevChatLog, new Message("user", inputValue)])
    sendMessage(inputValue);
    setInputValue('');
  }

  const sendMessage = (_: string) => {
    var accumulatedString = ""
    setIsLoading(true);
    const sse = new EventSource('http://localhost:8000/stream', {
      withCredentials: true,
    });

    const closeConnection = () => {
      setChatLog((prevChatLog) => [...prevChatLog, new Message("bot", accumulatedString)]);
      setMessageStream('');
      setIsStreaming(false);
      sse.close();
    }

    const getRealtimeData = (data: string) => {
      console.log(data);
      if (!isStreaming) {
        setIsLoading(false);
        setIsStreaming(true);
      }
      accumulatedString += data;
      setMessageStream((prevMessage) => prevMessage + data);

    };

    sse.onopen = () => console.log('Connection opened!');
    sse.onmessage = (e) => {
      getRealtimeData(e.data);
    };

    sse.addEventListener('terminate', async (e) => {
      console.log('Connection terminated:', e);
      closeConnection();
    });

    sse.onerror = (e) => {
      closeConnection();
      if (sse.readyState === EventSource.CLOSED) {
        console.log('Connection closed');
      }
    };
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col h-screen bg-stone-50">
        <h1 className="bg-gradient-to-r from-blue-400 to-green-700 text-transparent bg-clip-text text-center py-3 font-bold text-7xl">UP-ORAKEL</h1>
        <div className="flex-grow p-6">
          <div className="flex flex-col space-y-4">
            {
              chatLog.map((message, index) => (
                <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}>
                  <div className={`${message.type === 'user' ? 'bg-green-600' : 'bg-blue-400'
                    } rounded-lg p-4 text-white max-w-sm`}>
                    {message.message}
                  </div>
                </div>
              ))
            }
            {
              isStreaming &&
              <div key={chatLog.length} className="flex justify-start">

                <div className=" bg-blue-400 rounded-lg p-4 text-white max-w-sm">
                  {messageStream}
                </div>
              </div>
            }
            {
              isLoading &&
              <div key={chatLog.length} className="flex justify-start">
                <div className=" bg-blue-400 rounded-lg p-4 text-white max-w-sm">
                  <TypingAnimation />
                </div>
              </div>
            }
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
