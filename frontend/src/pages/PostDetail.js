import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

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
      <div className="bg-gray-900 text-gray-100 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <article className="flex max-w-xl flex-col items-start justify-between shadow-md rounded-xl p-6 bg-gray-800">
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
              <h3 className="mt-3 text-lg font-semibold leading-6">
                {post.title}
              </h3>
              <p className="mt-2 text-sm leading-6">{post.content}</p>
            </div>
            <div className="flex items-center gap-x-4 mt-4">
              <span className="text-gray-400">{post.author.name}</span> {/* Display author's name */}
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
    </>
  );
}

export default PostDetail;
