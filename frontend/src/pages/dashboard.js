import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar';
import Footer from '../components/footer';


function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    const fetchMeData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          alert('Login First!');
          throw new Error('Access token not found');
        }

        const response = await fetch('/api/me', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  useEffect(() => {
    if (userData) {
      const fetchRecentPosts = async () => {
        try {
          const response = await fetch(`/api/posts/user/${userData._id}`, {
            method: 'GET',
          });

          if (!response.ok) {
            throw new Error('Failed to fetch recent posts');
          }

          const posts = await response.json();
          setRecentPosts(posts);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchRecentPosts();
    }
  }, [userData]);

  return (
    <div>
      <Navbar />
      {error && <p className="text-red-500">{error}</p>}
      

      {userData && (
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold text-center mb-6">Welcome, {userData.name}! Explore Your Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl text-black font-semibold mb-4">Quick Stats</h2>
              <p className="text-black">Total Posts: {recentPosts.length}</p>
              {/* Add more stats here as needed */}
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl text-black font-semibold mb-4">Actions</h2>
              <Link
                to="/create-post"
                className="block bg-blue-500 text-white text-center py-2 px-4 rounded hover:bg-blue-700"
              >
                Create New Post
              </Link>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6" style={{ maxHeight: '200px', overflowY: 'auto' }}>
              <h2 className="text-xl text-black font-semibold mb-4">Recent Posts</h2>
              {recentPosts.length > 0 ? (
                <div>
                  {recentPosts.map((post) => (
                    <div key={post._id} className="mb-2">
                      <Link to={`/post/${post._id}`} className="text-blue-500 hover:underline">
                        {post.title}
                      </Link>
                      <span className="ml-2 text-gray-500 text-sm">
                        ({new Date(post.createdAt).toLocaleDateString()})
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No recent posts found.</p>
              )}
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl text-black font-semibold mb-4">Recent Comments</h2>
              <p className="text-black">Comment 1 (Approve/Delete)</p>
              <p className="text-black">Comment 2 (Approve/Delete)</p>
              <p className="text-black">Comment 3 (Approve/Delete)</p>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl text-black font-semibold mb-4">Analytics</h2>
              <p className="text-black">Views: 1500</p>
              <p className="text-black">Likes: 200</p>
              <p className="text-black">Shares: 50</p>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl text-black font-semibold mb-4">Profile</h2>
              <Link to="/profile" className="block bg-blue-500 text-white text-center py-2 px-4 rounded hover:bg-blue-700">
                Edit Profile
              </Link>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold text-black mb-4">Settings</h2>
              <Link to="/settings" className="block bg-blue-500 text-white text-center py-2 px-4 rounded hover:bg-blue-700">
                Account Settings
              </Link>
            </div>
          </div>
        </div>
        
      )}
      <Footer/>
    </div>
  );
}

export default Dashboard;
