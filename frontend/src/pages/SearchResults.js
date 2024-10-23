import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import BottomNavigationBar from '../components/BottomNavigationBar';

const SearchResults = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query');
    if (query) {
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [location.search, posts]);

  const handleLike = async (postId) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        alert('Login First!');
        throw new Error('Access token not found');
      }

      const response = await fetch(`/api/posts/${postId}/like`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to like post');
      }

      const updatedPosts = filteredPosts.map((post) =>
        post._id === postId
          ? { ...post, likes: post.likes + 1, liked: true }
          : post
      );
      setFilteredPosts(updatedPosts);

      const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || {};
      likedPosts[postId] = true;
      localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  if (filteredPosts.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 text-gray-100 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Search Results
            </h2>
            <p className="mt-2 text-lg leading-8">
              Explore the articles that match your search query.
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-700 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <article key={post._id} className="flex flex-col items-start justify-between shadow-md rounded-xl bg-gray-800">
                <div className="p-6 w-full">
                  <div className="flex items-center gap-x-4 text-xs flex-wrap"> {/* Added flex-wrap */}
                    <time dateTime={post.createdAt} className="text-gray-400">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </time>
                    <div className="flex flex-wrap gap-x-2 gap-y-2"> {/* Ensuring tags wrap correctly */}
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <a
                          key={index}
                          href={`/posts/tag/${tag}`}
                          className="relative z-10 rounded-full bg-gray-600 px-3 py-1.5 font-medium hover:bg-gray-700 mr-2"
                        >
                          {tag}
                        </a>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="text-gray-600">+{post.tags.length - 3} more</span>
                      )}
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
                    {post.liked ? (
                      <span className="text-blue-500">Liked</span>
                    ) : (
                      <button
                        onClick={() => handleLike(post._id)}
                        className="like-button"
                      >
                        <img
                          src="/like.png"
                          alt="Like"
                          className="like-icon"
                          style={{ width: '22px', height: '22px' }}
                        />
                      </button>
                    )}
                    <span className="text-gray-400">
                      {post.likes} {post.likes === 1 ? 'Like' : 'Likes'}
                    </span>
                  </div>
                  <div className="text-gray-400 mt-2">
                    Author: {post.author ? post.author.name : 'Unknown'}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      <div className="block sm:hidden">
        <BottomNavigationBar />
      </div>
    </>
  );
};

export default SearchResults;
