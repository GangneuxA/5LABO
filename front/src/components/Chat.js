import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Chat() {
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      history.push('/login');
    }
  }, [history]);

  return (
    <div>
      <h1>Chat</h1>
      {/* Add chat-related functionalities here */}
    </div>
  );
}

export default Chat;