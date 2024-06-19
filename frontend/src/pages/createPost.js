import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
function CreatePost() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
  });

  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

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
    if (name === 'author') {
      // Set author only if userData is available
      if (userData && userData._id) {
        setFormData({ ...formData, author: userData._id });
      } else {
        // If userData is not available, you might want to handle this case accordingly
        console.error('User data not available');
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Construct the post object with formData and author from userData
      const postObject = {
        title: formData.title,
        content: formData.content,
        tags: formData.tags,
        author: userData ? userData._id : null // Set author to userData.id if available, otherwise null
      };
  
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postObject), // Send postObject as the request body
      });
      if (response.ok) {
        // Post created successfully, redirect to dashboard or show success message
        console.log('Post created successfully');
      } else {
        // Error creating post
        console.error('Error creating post');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div>
      <Navbar/>
      <br></br>
      <h1 className="text-3xl font-bold text-center mb-6">Create New Post</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
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
            className="mt-1 p-2 border rounded-md w-full"
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
            className="mt-1 p-2 border rounded-md w-full"
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
            className="mt-1 p-2 border rounded-md w-full"
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
      <div className="text-center mt-4">
        <Link to="/dashboard" className="text-blue-500 hover:text-blue-700">
          Back to Dashboard
        </Link>
      </div>
      <br></br>
      <Footer/>
    </div>
  );
}

export default CreatePost;
