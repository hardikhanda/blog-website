import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
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

    fetchUserData();
  }, []);

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="hidden sm:block h-full min-h-screen w-64 bg-gray-900 text-gray-100 shadow-xl">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-20 border-b border-gray-800">
          <h5 className="text-xl font-semibold">Welcome</h5>
        </div>
        <nav className="flex flex-col gap-1 p-4 overflow-y-auto">
          {userData && (
            <>
              <Link
                to="/dashboard"
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-100 rounded-lg hover:bg-gray-700"
              >
                <div className="grid place-items-center mr-4">
                  {/* Dashboard Icon */}
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h18M3 21h18M12 6v12m-6-6h12"
                    ></path>
                  </svg>
                </div>
                Dashboard
              </Link>

              <Link
                to={`/analytics/${userData._id}`}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-100 rounded-lg hover:bg-gray-700"
              >
                <div className="grid place-items-center mr-4">
                  {/* Analytics Icon */}
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h18v18H3V3z"
                    ></path>
                  </svg>
                </div>
                Analytics
              </Link>
              <Link
                to="/dashboard/recent-posts"
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-100 rounded-lg hover:bg-gray-700"
              >
                <div className="grid place-items-center mr-4">
                  {/* Recent Posts Icon */}
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5h18M3 10h18M3 15h18M3 20h18"
                    ></path>
                  </svg>
                </div>
                Recent Posts
              </Link>
              <Link
                to="/dashboard/user"
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-100 rounded-lg hover:bg-gray-700"
              >
                <div className="grid place-items-center mr-4">
                  {/* Profile Icon */}
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 12a4 4 0 100-8 4 4 0 000 8zM4 18v-1a4 4 0 014-4h8a4 4 0 014 4v1"
                    ></path>
                  </svg>
                </div>
                Profile
              </Link>
              <Link
                to="/settings"
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-100 rounded-lg hover:bg-gray-700"
              >
                <div className="grid place-items-center mr-4">
                  {/* Settings Icon */}
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 3h2m-1 4h0M4.22 4.22l1.42 1.42M3 11v2m4-1h0M4.22 19.78l1.42-1.42M11 21h2m-1-4h0m7.78-1.78l1.42 1.42M21 13v-2m-4 1h0m1.78-7.78l-1.42 1.42"
                    ></path>
                  </svg>
                </div>
                Settings
              </Link>
              <Link
                to="/create-post"
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-100 rounded-lg hover:bg-gray-700"
              >
                <div className="grid place-items-center mr-4">
                  {/* Create Post Icon */}
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    ></path>
                  </svg>
                </div>
                Create Post
              </Link>
            </>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
