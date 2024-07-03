import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import BottomNavigationBar from '../components/BottomNavigationBar';

function CreatePost() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
  });
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          alert("Login First!");
          throw new Error('Access token not found');
        }

        const response = await fetch('/api/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMeData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const postObject = {
        title: formData.title,
        content: formData.content,
        tags: formData.tags.split(',').map(tag => tag.trim()), // Split and trim tags
        author: userData ? userData._id : null,
      };

      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postObject),
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({ title: '', content: '', tags: '' });

        // Automatically hide success message after 5 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
      } else {
        setError('Error creating post');
      }
    } catch (error) {
      setError('Error creating post');
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 text-gray-100 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center">
              Create New Post
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full bg-gray-800 text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <textarea
                name="content"
                id="content"
                value={formData.content}
                onChange={handleChange}
                rows="5"
                className="mt-1 p-2 border rounded-md w-full bg-gray-800 text-white"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                name="tags"
                id="tags"
                value={formData.tags}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full bg-gray-800 text-white"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Create Post
              </button>
            </div>
          </form>
          {showSuccess && (
            <div className="max-w-2xl mx-auto mt-4 bg-green-100 rounded-lg p-4 text-sm text-green-700">
              <svg className="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
              </svg>
              <span className="font-medium">Success!</span> Post created successfully.
            </div>
          )}
          {error && <div className="text-red-500 text-center mt-4">{error}</div>}
          <div className="text-center mt-4">
            <Link to="/dashboard" className="text-blue-500 hover:text-blue-700">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
      <Footer />
      <div className="block sm:hidden">
        <BottomNavigationBar />
      </div>
    </>
  );
}

export default CreatePost;
