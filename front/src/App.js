import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Users from './components/Users';
import Chat from './components/Chat';
import Login from './components/Login';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/users" component={Users} />
        <Route path="/chat" component={Chat} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
