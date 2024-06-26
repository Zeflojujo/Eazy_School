import { createChatBotMessage } from 'react-chatbot-kit';
import DogPicture from './DogPicture.jsx';
const botName = 'Ezy-School Assistant';

const config = {
  initialMessages: [createChatBotMessage(`Hi! I'm ${botName}`)],
  botName: botName,
  customStyles: {
    botMessageBox: {
        backgroundColor: '#376B7E',
    },
    chatButton: {
        backgroundColor: "#5ccc9d",
    },
  },
  widgets: [
    {
      widgetName: 'dogPicture',
      widgetFunc: (props) => <DogPicture {...props} />,
    },
  ],
};

export default config;