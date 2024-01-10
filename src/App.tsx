import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './navbar';
import { Main } from './pages/main/main';
import { Login } from './pages/login';
import { CreatePost } from './pages/create-post/create-post';
function App() {
  return (
    <div className="App">
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path = '/' element={<Main/>}></Route>
        <Route path = '/login' element={<Login/>}></Route>
        <Route path = '/post' element={<CreatePost/>}></Route>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
