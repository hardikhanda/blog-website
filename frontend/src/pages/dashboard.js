import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [totalLikes, setTotalLikes] = useState(0);

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
    if (userData && userData._id) { // Ensure userData and userData._id are not null
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

          // Calculate total likes from recent posts
          const likes = posts.reduce((total, post) => total + post.likes, 0);
          setTotalLikes(likes);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchRecentPosts();
    }
  }, [userData]); // Watch for changes in userData

  const handleDeletePost = async (postId) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      // Remove the deleted post from the recentPosts state
      setRecentPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      alert('Post deleted successfully!');
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('Failed to delete post. Please try again later.');
    }
  };

  // Render loading state while fetching user data
  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="sm:flex">
        <div className="hidden sm:block">
          {userData._id && <Sidebar userId={userData._id} />} {/* Ensure userData._id is defined */}
        </div>
        <div className="sm:flex-1">
          {error && <p className="text-red-500">{error}</p>}
          <div className="bg-gray-900 text-gray-100 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-white text-center mb-6">Welcome, {userData.name}! Explore Your Dashboard</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Quick Stats and Recent Posts section */}
                <div className="bg-gray-800 shadow-md rounded-lg p-6">
                  <h2 className="text-xl text-white font-semibold mb-4">Quick Stats</h2>
                  <p className="text-white">Total Posts: {recentPosts.length}</p>
                  <p className="text-white">Total Likes: {totalLikes}</p>
                  {/* Add more stats here as needed */}
                </div>
                <div className="bg-gray-800 shadow-md rounded-lg p-6 md:col-span-2 lg:col-span-1" style={{ maxHeight: '400px', overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: 'gray' }}>
                  <h2 className="text-xl text-white font-semibold mb-4">Recent Posts</h2>
                  {recentPosts.length > 0 ? (
                    <div>
                      {recentPosts.map((post) => (
                        <div key={post._id} className="mb-4 p-4 bg-gray-700 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div>
                              <Link to={`/post/${post._id}`} className="text-blue-500 hover:underline">
                                {post.title}
                              </Link>
                              <span className="ml-2 text-gray-300 text-sm">
                                ({new Date(post.createdAt).toLocaleDateString()})
                              </span>
                            </div>
                            <div>
                              <Link to={`/edit-post/${post._id}`} className="text-yellow-500 mr-2 hover:underline">
                                Edit
                              </Link>
                              <button
                                onClick={() => {
                                  if (window.confirm('Are you sure you want to delete this post?')) {
                                    handleDeletePost(post._id);
                                  }
                                }}
                                className="text-red-500 hover:underline"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-white">No recent posts found.</p>
                  )}
                </div>
                
                {/* Analytics, Profile, Settings, Create Post section */}
                <div className="bg-gray-800 shadow-md rounded-lg p-6">
                  <h2 className="text-xl text-white font-semibold mb-4">Analytics</h2>
                  <p className="text-white">Views: 1500</p>
                  <p className="text-white">Likes: 200</p>
                  <p className="text-white">Shares: 50</p>
                </div>
                <div className="bg-gray-800 shadow-md rounded-lg p-6">
                  <h2 className="text-xl text-white font-semibold mb-4">Profile</h2>
                  <Link to="/profile" className="block bg-blue-500 text-white text-center py-2 px-4 rounded hover:bg-blue-700">
                    Edit Profile
                  </Link>
                </div>
                <div className="bg-gray-800 shadow-md rounded-lg p-6">
                  <h2 className="text-xl text-white font-semibold mb-4">Settings</h2>
                  <Link to="/settings" className="block bg-blue-500 text-white text-center py-2 px-4 rounded hover:bg-blue-700">
                    Account Settings
                  </Link>
                </div>
                <div className="bg-gray-800 shadow-md rounded-lg p-6">
                  <h2 className="text-xl text-white font-semibold mb-4">Create Post</h2>
                  <Link to="/create-post" className="block bg-green-500 text-white text-center py-2 px-4 rounded hover:bg-green-700">
                    Create New Post
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
