import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [apikey, setapikey] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      history.push('/'); // Redirect to home page if already logged in
    }
  }, [history]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(process.env.REACT_APP_API_URL + '/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pseudo: username, password: password,apikey:apikey }),
    });

    if (response.ok) {
      history.push('/login'); // Redirect to home page
    } else {
      // ...handle registration failure...
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>apikey:</label>
          <input
            type="text"
            value={apikey}
            onChange={(e) => setapikey(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

export default Register;