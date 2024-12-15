import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Users() {
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch user data from local storage or API
      const userData = JSON.parse(localStorage.getItem('user'));
      setUser(userData);
      setPseudo(userData.pseudo);
      setApiKey(userData.apikey);
    } else {
      history.push('/login');
    }
  }, [history]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + '/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          pseudo: pseudo,
          password: password,
          apikey: apiKey
        })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updatedUser = await response.json();
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setMessage('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
      setMessage('Error updating user');
    }
  };

  if (!user) {
    history.push('/login');
    return null;
  }

  return (
    <div>
      <h1>Users</h1>
      <p>ID: {user._id}</p>
      <p>Pseudo: {user.pseudo}</p>
      <p>API Key: {user.apikey}</p>
      <div>
        <h2>Update User Details</h2>
        <label>
          Pseudo:
          <input type="text" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
        </label>
        <label>
          API Key:
          <input type="text" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button onClick={handleUpdate}>Update</button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default Users;