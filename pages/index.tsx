import { useState, useEffect } from 'react';
import TypingAnimation from "../components/chat_components/TypingAnimation";
import Header from '@/components/page_components/Header';
import ChatHistory from '@/components/chat_components/ChatHistory';
import StreamMessage from '@/components/chat_components/StreamMessage';

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

  const sendMessage = (message: string) => {
    var accumulatedString = ""
    setIsLoading(true);

    // fetch('http://localhost:8000/up-evaluation', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ question: message }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     // Handle the response data here
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //     // Handle the error here
    //   });

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
