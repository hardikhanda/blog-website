import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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

  const logout = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Access token not found');
      }

      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ refresh_token: localStorage.getItem('refreshToken') }),
      });

      if (response.ok) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        console.log('Logout Successfully');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <h3 className="text-xl font-bold">Dashboard</h3>
        {userData && (
          <div className="flex items-center">
            <p className="mr-4">Welcome, {userData.name}!</p>
            <button
              className="mr-2 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
              onClick={logout}
            >
              Log Out
            </button>
            <Link to="/dashboard/user">
              <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </Link>
          </div>
        )}
      </nav>

      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Welcome Back! Explore Your Dashboard</h1>

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
    </div>
  );
}

export default Dashboard;

