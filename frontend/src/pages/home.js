import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

function Home() {
  const [posts, setPosts] = useState([]);

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

  const handleLike = async (postId) => {
    try {
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to like post');
      }
      const updatedPosts = posts.map((post) =>
        post._id === postId ? { ...post, likes: post.likes + 1 } : post
      );
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Empowering Engineers, Inspiring Innovations
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Explore insightful articles, project guides, and student experiences from the world of engineering.
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post._id} className="flex max-w-xl flex-col items-start justify-between shadow-md rounded-xl p-6">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.createdAt} className="text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </time>
                  <div>
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <a
                        key={index}
                        href={`/posts/tag/${tag}`}
                        className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100 mr-2"
                      >
                        {tag}
                      </a>
                    ))}
                    {post.tags.length > 3 && <span className="text-gray-600">+{post.tags.length - 3} more</span>}
                  </div>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <Link to={`/posts/${post._id}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.content}</p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <button
                    onClick={() => handleLike(post._id)}
                    className="like-button"
                  >
                    <img
                      src="/like.png" // Relative path to the image file in the public folder
                      alt="Like"
                      className="like-icon"
                      style={{ width: '22px', height: '22px' }}
                    />
                  </button>
                  <span className="text-gray-600">{post.likes}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
