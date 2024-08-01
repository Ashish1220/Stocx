import React, { useState } from 'react';
import './ChatPopup.css'; // Ensure to create this CSS file for styling
// import axios from 'axios';

const ChatPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (input.trim()) {
      const newMessage = input;
      setMessages([...messages, newMessage]);

    //   try {
    //     const response = await axios.post(
    //       'http://127.0.0.1:5000/api/data',
    //       { message: newMessage },
    //       {
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //       }
    //     );
    //     console.log('Message sent successfully:', response.data);
    //   } catch (error) {
    //     console.error('Error sending message:', error);
    //   }

    const url = "http://localhost:5000/api/data"
    const data = {
        req: newMessage
    }
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    fetch(url,options).then((response) => {
        if (!response.ok) {
            throw new Error("")
        }
        return response.json();
    }).then((data) => {
        setMessages([...messages, data.res]);
    }).catch((error) => {
        console.error(error);
    })

      setInput('');
    }
  };

  return (
    <div className="chat-popup-container">
      <button className="chat-button" onClick={toggleChat}>
        {isOpen ? 'Close Chat' : 'Open Chat'}
      </button>
      {isOpen && (
        <div className="chat-window">
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className="chat-message">
                {message}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type a message..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPopup;
