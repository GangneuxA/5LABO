import React, { useState, useEffect } from 'react';
import { Route, Switch, Link, useHistory } from 'react-router-dom';
import Users from './components/Users';
import Chat from './components/Chat';
import Login from './components/Login';
import Register from './components/register';
import './App.css';

function App() {
  const history = useHistory();
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    history.push('/login');
  };

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  return (
    <div className="App">
      <nav>
        {token ? (
          <>
            <button onClick={handleLogout} className="nav-button">Logout</button>
            <Link to="/users" className="nav-link">Users</Link>
          </>
        ) : (
          <>
            <Link to="/register" className="nav-link">Register</Link>
            <Link to="/login" className="nav-link">Login</Link>
          </>
        )}
      </nav>
      <Switch>
        <Route path="/users" component={Users} />
        <Route path="/chat" component={Chat} />
        <Route path="/login">
          <Login onLogin={handleLogin} />
        </Route>
        <Route path="/register" component={Register} />
      </Switch>
    </div>
  );
}

export default App;
