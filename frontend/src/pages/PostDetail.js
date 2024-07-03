import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import BottomNavigationBar from '../components/BottomNavigationBar';

function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasLiked, setHasLiked] = useState(false); // State to track whether the user has liked the post

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${postId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        setPost(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError('Failed to fetch post. Please try again later.');
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  useEffect(() => {
    // Check if the user has already liked the post
    const checkLikeStatus = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          return; // If user is not logged in, do nothing
        }

        const response = await fetch(`/api/posts/${postId}/like/check`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setHasLiked(true); // Update state if user has already liked
        }
      } catch (error) {
        console.error('Error checking like status:', error);
      }
    };

    checkLikeStatus();
  }, [postId]);

  const handleLike = async () => {
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

      setHasLiked(true); // Update local state to indicate user has liked the post

      // Update the local state to reflect the increased likes count
      setPost(prevPost => ({
        ...prevPost,
        likes: prevPost.likes + 1
      }));

    } catch (error) {
      console.error('Error liking post:', error);
      // Handle error state
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 text-gray-100 py-24 sm:py-32 flex justify-center">
        <div className="max-w-4xl w-full px-6 lg:px-8">
          <article className="flex flex-col items-start justify-between shadow-md rounded-xl p-6 bg-gray-800">
            <div className="flex items-center gap-x-4 text-sm mb-4">
              <time dateTime={post.createdAt} className="text-gray-400">
                {new Date(post.createdAt).toLocaleDateString()}
              </time>
              <div className="flex flex-wrap gap-x-2">
                {post.tags.map((tag, index) => (
                  <a
                    key={index}
                    href={`/posts/tag/${tag}`}
                    className="relative z-10 rounded-full bg-gray-600 px-3 py-1.5 font-medium hover:bg-gray-700"
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </div>
            <div className="group relative">
              <h3 className="text-2xl font-semibold leading-8 mb-4">
                {post.title}
              </h3>
              <p className="text-lg leading-7">{post.content}</p>
            </div>
            <div className="flex items-center gap-x-4 mt-6">
              <span className="text-gray-400">{post.author.name}</span>
              {!hasLiked && (
                <button
                  onClick={handleLike}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Like
                </button>
              )}
              <span className="text-gray-400">{post.likes} Likes</span>
            </div>
          </article>
        </div>
      </div>
      <Footer />
      <div className="block sm:hidden">
        <BottomNavigationBar />
      </div>
    </>
  );
}

export default PostDetail;
