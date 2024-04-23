import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'

import config from './config';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import "../index.css"
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const ChatbotApp = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-blue-300">
      <div>
        <Link to={"/"} className="flex gap-2 items-center justify-center w-32 text-lg mb-3 text-center rounded-md font-bold text-white bg-blue-500 py-1 px-2"><FaArrowLeft /> Go Back</Link>
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
          className="w-full h-screen"
        />
      </div>
      
    </div>
  )
}

export default ChatbotApp

