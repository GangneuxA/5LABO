import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

function Chat() {
  const history = useHistory();
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [model, setModel] = useState('gpt-4o');
  const [chatMessages, setChatMessages] = useState([]);
  const [messageLoading, setMessageLoading] = useState(false);
  const [messageError, setMessageError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      history.push('/login');
    } else {
      fetchChats();
    }
  }, [history]);

  const fetchChats = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + '/chat', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setChats(data);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  const handleChatChange = async (e) => {
    const id = e.target.value;
    if (id === '') {
      setSelectedChat(null);
      setChatMessages([]);
      return;
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/chat/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSelectedChat(data);
      setChatMessages(data.messages);
    } catch (error) {
      console.error('Error fetching chat:', error);
    }
  };

  const handleCreateChat = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const newChat = await response.json();
      setChats([...chats, newChat]);
      // Sélectionner automatiquement le nouveau chat
      setSelectedChat(newChat);
      setChatMessages([]);
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!selectedChat) return;
    setMessageLoading(true);
    setMessageError('');
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/chat/${selectedChat._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ message, model })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setChatMessages([...chatMessages, { role: 'user', content: message }, { role: 'response', content: data.response }]);
      setMessage('');
    } catch (error) {
      setMessageError('Failed to send message');
      console.error('Error sending message:', error);
    }
    setMessageLoading(false);
  };

  const handleDeleteChat = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/chat/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setChats(chats.filter(chat => chat._id !== id));
      if (selectedChat && selectedChat._id === id) {
        setSelectedChat(null);
        setChatMessages([]);
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };

  return (
    <div className="chat-container">
      <h1>Chat</h1>
      <div className="chat-list">
        <select onChange={handleChatChange} value={selectedChat ? selectedChat._id : ''} className="chat-dropdown">
          <option value="">Select a chat</option>
          {chats.map(chat => (
            <option key={chat._id} value={chat._id}>
              Chat {chat._id}
            </option>
          ))}
        </select>
        <button onClick={handleCreateChat} className="create-button">+</button>
      </div>
      {selectedChat && (
        <div className="chat-box enlarged">
          <h2>Selected Chat</h2>
          <p>ID: {selectedChat._id}</p>
          <p>User: {selectedChat.user}</p>
          <div className="messages-box">
            {chatMessages.map((message, index) => (
              <div key={index} className={`message-item ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}>
                <p><strong>{message.role}:</strong></p>
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            ))}
          </div>
          <div className="message-input">
            <input 
              type="text" 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              placeholder="Type your message here" 
            />
            <select id="model" name="model" value={model} onChange={(e) => setModel(e.target.value)} required>
              <option value="gpt-4o">GPT-4o</option>
              <option value="gpt-4o-2024-08-06">GPT-4o-2024-08-06</option>
              <option value="gpt-4o-2024-05-13">GPT-4o-2024-05-13</option>
              <option value="chatgpt-4o-latest">ChatGPT-4o Latest</option>
              <option value="gpt-4o-mini">GPT-4o Mini</option>
              <option value="gpt-4o-mini-2024-07-18">GPT-4o Mini 2024-07-18</option>
              <option value="gpt-4o-realtime-preview">GPT-4o Realtime Preview</option>
              <option value="gpt-4o-realtime-preview-2024-10-01">GPT-4o Mini Realtime Preview 2024-10-01</option>
              <option value="o1-preview">O1 Preview</option>
              <option value="o1-preview-2024-09-12">O1 Preview 2024-09-12</option>
              <option value="o1-mini">O1 Mini</option>
              <option value="o1-mini-2024-09-12">O1 Mini 2024-09-12</option>
              <option value="gpt-4-turbo">GPT-4 Turbo</option>
              <option value="gpt-4-turbo-2024-04-09">GPT-4 Turbo 2024-04-09</option>
              <option value="gpt-4-turbo-preview">GPT-4 Turbo Preview</option>
              <option value="gpt-4-0125-preview">GPT-4 0125 Preview</option>
              <option value="gpt-4-1106-preview">GPT-4 1106 Preview</option>
              <option value="gpt-4">GPT-4</option>
              <option value="gpt-4-0613">GPT-4 0613</option>
              <option value="gpt-4-0314">GPT-4 0314</option>
              <option value="gpt-3.5-turbo-0125">GPT-3.5 Turbo 0125</option>
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              <option value="gpt-3.5-turbo-1106">GPT-3.5 Turbo 1106</option>
              <option value="gpt-3.5-turbo-instruct">GPT-3.5 Turbo Instruct</option>
            </select>
            {messageError && <p style={{ color: 'red' }}>{messageError}</p>}
            <button onClick={handleSendMessage} className="send-button" disabled={messageLoading}>
              {messageLoading ? 'Sending...' : 'Send'}
            </button>
            <button onClick={() => handleDeleteChat(selectedChat._id)} className="delete-button">Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;