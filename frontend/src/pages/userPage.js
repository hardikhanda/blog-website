import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import BottomNavigationBar from '../components/BottomNavigationBar';
import Sidebar from '../components/sidebar';

function UserPage() {
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [totalLikes, setTotalLikes] = useState(0); // Initialize totalLikes state
  const [totalPosts, setTotalPosts] = useState(0); // Initialize totalPosts state
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDataAndPosts = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          alert("Login First!");
          throw new Error('Access token not found');
        }
  
        // Fetch user data
        const response = await fetch('/api/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
  
        const userData = await response.json();
        console.log('Fetched userData:', userData);
        setUserData(userData);
  
        // Fetch user posts
        const postsResponse = await fetch(`/api/posts/user/${userData._id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        if (!postsResponse.ok) {
          throw new Error('Failed to fetch user posts');
        }
  
        const userPostsData = await postsResponse.json();
        console.log('Fetched userPostsData:', userPostsData);
        setUserPosts(userPostsData);
  
        // Calculate total likes and total posts
        let totalLikes = 0;
        let totalPosts = userPostsData.length;
  
        userPostsData.forEach(post => {
          totalLikes += post.likes;
        });
  
        setTotalLikes(totalLikes);
        setTotalPosts(totalPosts);
  
      } catch (error) {
        setError(error.message);
      }
    };
  
    fetchUserDataAndPosts();
  }, []);
  

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 text-gray-100 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex">
          {/* Sidebar */}
          <Sidebar />
          {/* Main Content */}
          <div className="flex-1 ml-8">
            <div className="relative max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full flex justify-center">
                    <div className="relative">
                      <img
                        src={userData ? '/profile.png' : 'https://github.com/creativetimofficial/soft-ui-dashboard-tailwind/blob/main/build/assets/img/team-2.jpg?raw=true'}
                        alt="Profile"
                        className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                      />
                    </div>
                  </div>
                  <div className="w-full text-center mt-20">
                    <div className="flex justify-center lg:pt-4 pt-8 pb-0">
                      <div className="p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                          {totalLikes}
                        </span>
                        <span className="text-sm text-slate-400">Total Likes</span>
                      </div>
                      <div className="p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                          {totalPosts}
                        </span>
                        <span className="text-sm text-slate-400">Total Posts</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-2">
                  <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">
                    {userData ? userData.name : 'Mike Thompson'}
                  </h3>
                  <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
                    {userData ? userData.location : 'Paris, France'}
                  </div>
                </div>
                <div className="mt-6 py-6 border-t border-slate-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full px-4">
                      <p className="font-light leading-relaxed text-slate-600 mb-4">
                        {userData ? userData.bio : 'An artist of considerable range, Mike is the name taken by Melbourne-raised, Brooklyn-based Nick Murphy writes, performs and records all of his own music, giving it a warm.'}
                      </p>
                      <button
                        className="font-normal text-slate-700 hover:text-slate-400"
                        onClick={() => alert('Show more clicked')}
                      >
                        Show more
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <div className="block sm:hidden">
        <BottomNavigationBar />
      </div>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </>
  );
}

export default UserPage;
