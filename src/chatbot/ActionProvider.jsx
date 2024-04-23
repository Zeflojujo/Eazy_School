import axios from 'axios';
import React, { useState } from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {

  const handleSendMessage = async (userMessage) => {
    // const botMessage = createChatBotMessage('Hello. Nice to meet you.');
    try {
      const response = await axios.get(`https://api.wit.ai/message?v=20240419&q=${encodeURIComponent(userMessage)}`, {
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
          console.log(`${traitName}: ${typeof(traitValue)}`);
          // const botResponse = traitValue;
          let botResponse;
          if(traitValue !== ""){
            botResponse = createChatBotMessage(traitValue);
          }else{
            botResponse = await createChatBotMessage("I don't understand what do you mean, can you clarify more?");
          }

          setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botResponse],
          }));
        }
      }

      
    } catch (error) {
      console.error('Error sending message to Wit.ai:', error);
    }
  };

    const handleHello = () => {
        const botMessage = createChatBotMessage('Hello. Nice to meet you.');

        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    }

    const handleDog = () => {
        const botMessage = createChatBotMessage(
          "Here's a nice dog picture for you!",
          {
            widget: 'dogPicture',
          }
        );
    
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, botMessage],
        }));
      };
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleDog,
            handleSendMessage,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;

