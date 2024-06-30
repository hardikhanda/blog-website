import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages & components
import Login from './pages/login';
import SignUp from './pages/signUp';
import Dashboard from './pages/dashboard';
import UserPage from './pages/userPage';
import CreatePost from './pages/createPost';
import Home from './pages/home';
import About from './pages/about';
import PostDetail from './pages/PostDetail'
import EditPost from './pages/EditPost';
import SearchResults from './pages/SearchResults';
import TagPage from './pages/TagPage';
import Analytics from './pages/Analytics';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-post" element={<CreatePost/>}/>
            <Route path="/edit-post/:postId" element={<EditPost />} />
            <Route path="/dashboard/user" element={<UserPage />} />
            <Route path="/posts/:postId" element={<PostDetail />} />
            <Route path="/posts/tag/:tag" element={<TagPage />} />
            <Route path="/searchresults" element={<SearchResults />} />
            <Route path="/analytics/:userId" element={<Analytics />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
