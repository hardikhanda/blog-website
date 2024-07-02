import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';

function RecentPosts() {
  const [userData, setUserData] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [error, setError] = useState(null);

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
    if (userData && userData._id) {
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

      setRecentPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      alert('Post deleted successfully!');
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('Failed to delete post. Please try again later.');
    }
  };

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
              <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Your Recent Posts
                </h2>
                <p className="mt-2 text-lg leading-8">
                  Manage and explore your latest contributions.
                </p>
              </div>
              <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-700 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {recentPosts.length > 0 ? (
                  recentPosts.map((post) => (
                    <article key={post._id} className="flex max-w-xl flex-col items-start justify-between shadow-md rounded-xl p-6 bg-gray-800">
                      <div className="flex items-center gap-x-4 text-xs">
                        <time dateTime={post.createdAt} className="text-gray-400">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </time>
                        <div>
                          {post.tags.slice(0, 3).map((tag, index) => (
                            <a
                              key={index}
                              href={`/posts/tag/${tag}`}
                              className="relative z-10 rounded-full bg-gray-600 px-3 py-1.5 font-medium hover:bg-gray-700 mr-2"
                            >
                              {tag}
                            </a>
                          ))}
                          {post.tags.length > 3 && <span className="text-gray-600">+{post.tags.length - 3} more</span>}
                        </div>
                      </div>
                      <div className="group relative mt-4">
                        <h3 className="mt-3 text-lg font-semibold leading-6 group-hover:text-gray-300">
                          <Link to={`/posts/${post._id}`} className="hover:underline">
                            {post.title}
                          </Link>
                        </h3>
                        <p className="mt-2 line-clamp-3 text-sm leading-6">{post.content}</p>
                      </div>
                      <div className="relative mt-8 flex items-center gap-x-4">
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
                        <span className="text-gray-400">
                          {post.likes} {post.likes === 1 ? 'Like' : 'Likes'}
                        </span>
                      </div>
                      <div className="text-gray-400 mt-2">
                        Author: {post.author ? post.author.name : 'Unknown'}
                      </div>
                    </article>
                  ))
                ) : (
                  <p className="text-white">No recent posts found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default RecentPosts;
