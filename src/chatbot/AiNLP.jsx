import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const sendMessage = async () => {
    try {
      const response = await axios.get(`https://api.wit.ai/message?v=20240419&q=${encodeURIComponent(inputText)}`, {
        headers: {
          Authorization: 'Bearer 67Z4KILFB5G3CTHWDWR3J2ARAWQ6CQXC',
        },
      });

      const traits = response.data.traits;

      // Iterate over each trait in the traits object
      for (const traitName in traits) {
        if (Object.prototype.hasOwnProperty.call(traits, traitName)) {
          // Access the value property of the current trait
          const traitValue = traits[traitName][0].value;
          
          // Log the trait name and its value
          console.log(`${traitName}: ${traitValue}`);
          const botResponse = traitValue;
      setMessages([...messages, { text: inputText, sender: 'user' }]);
      setMessages([...messages, { text: botResponse, sender: 'bot' }]);
      setInputText('');
        }
      }

      
    } catch (error) {
      console.error('Error sending message to Wit.ai:', error);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
