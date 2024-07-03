import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import BottomNavigationBar from '../components/BottomNavigationBar';
function TagPage() {
  const { tag } = useParams(); // Get tag parameter from URL
  const [taggedPosts, setTaggedPosts] = useState([]);

  useEffect(() => {
    const fetchPostsByTag = async () => {
      try {
        const response = await fetch(`/api/posts/tag/${tag}`);
        if (!response.ok) {
          throw new Error('Failed to fetch posts by tag');
        }
        const data = await response.json();
        setTaggedPosts(data);
      } catch (error) {
        console.error(`Error fetching posts by tag '${tag}':`, error);
      }
    };

    fetchPostsByTag();
  }, [tag]);

  if (taggedPosts.length === 0) {
    return <div>Loading...</div>; // Add loading state while fetching posts
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 text-gray-100 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-8">
            Posts tagged with '{tag}'
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {taggedPosts.map((post) => (
              <article key={post._id} className="flex flex-col items-start justify-between shadow-md rounded-xl p-6 bg-gray-800">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.createdAt} className="text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </time>
                  <div>
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <Link
                        key={index}
                        to={`/posts/tag/${tag}`}
                        className="relative z-10 rounded-full bg-gray-600 px-3 py-1.5 font-medium hover:bg-gray-700 mr-2"
                      >
                        {tag}
                      </Link>
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
                  <span className="text-gray-400">
                    {post.likes} {post.likes === 1 ? 'Like' : 'Likes'}
                  </span>
                </div>
                <div className="text-gray-400 mt-2">
                  Author: {post.author ? post.author.name : 'Unknown'}
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
}

export default TagPage;
