import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    // if(message.includes('hello')) {
    //     actions.handleHello();
    // }
    // if (message.includes('dog')) {
    //     actions.handleDog();
    //   }
    // else{
    //     console.log(message);
    // }
    actions.handleSendMessage(message);
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;