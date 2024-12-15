import React, { useState, useEffect } from 'react';
import { Route, Switch, Link, useHistory } from 'react-router-dom';
import Users from './components/Users';
import Chat from './components/Chat';
import Login from './components/Login';
import Register from './components/register'; // Correct the import statement
import Home from './components/Home';
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

  const handleAccountDeletion = () => {
    setToken(null);
  };

  return (
    <div className="App">
      <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
        {token ? (
          <>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/chat" className="nav-link">Chat</Link>
            <Link to="/users" className="nav-link">Users</Link>
            <button onClick={handleLogout} className="nav-link nav-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/chat" className="nav-link">Chat</Link>
            <Link to="/register" className="nav-link">Register</Link>
            <Link to="/login" className="nav-link">Login</Link>
          </>
        )}
      </nav>
      <Switch>
        <Route exact path="/" component={Home} /> {/* Use the new Home component */}
        <Route path="/users">
          <Users onAccountDeletion={handleAccountDeletion} />
        </Route>
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
