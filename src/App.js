import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from '../src/pages/Chat/Chat';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import SetAvatar from './pages/SetAvatar/SetAvatar';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Chat />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/avatar" exact element={<SetAvatar />} />
        <Route path="/register" exact element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
