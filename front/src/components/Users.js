import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Users({ onAccountDeletion }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [password, setPassword] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('user'));

    if (token) {
      setPseudo(userData.pseudo);
      setApiKey(userData.apikey);
    } else {
      console.log('Redirecting to login');
      history.push('/login');
    }
  }, [history, setUser, setPseudo, setApiKey,user]);

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

  const handleDelete = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + '/users', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(null);
      onAccountDeletion();
      history.push('/login');
    } catch (error) {
      console.error('Error deleting user:', error);
      setMessage('Error deleting user');
    }
  };

  if (!user || !user._id) {
    history.push('/login');
    return null;
  }

  return (
    <div>
      <h1>Users</h1>
      <p>ID: {user._id}</p>
      <p>Pseudo: {user.pseudo}</p>
      <p>Apikey chatgpt: {user.apikey}</p>
      <div>
        <h2>Update User Details</h2>
        <form>
          <div>
            <label>Pseudo</label>
            <input type="text" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
          </div>
          <div>
            <label>Apikey chatgpt</label>
            <input type="text" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
          </div>
          <div>
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="button" onClick={handleUpdate}>Update</button>
          {message && <p>{message}</p>}
        </form>
      </div>
      <div>
        <h2>Delete Account</h2>
        <button type="button" className="delete-button" onClick={handleDelete}>Delete Account</button>
      </div>
    </div>
  );
}

export default Users;