import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Sidebar from '../components/sidebar'; // Import the Sidebar component
import { useParams } from 'react-router-dom';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const Analytics = () => {
  const { userId } = useParams();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [error, setError] = useState(null);
  const [totalLikes, setTotalLikes] = useState(0);
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('Access token not found');
        }

        const response = await fetch(`/api/analytics/user/${userId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user analytics data');
        }

        const data = await response.json();
        setAnalyticsData(data);

        const total = data.likesPerPost.reduce((sum, post) => sum + post.likes, 0);
        setTotalLikes(total);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchAnalyticsData();
  }, [userId]);

  useEffect(() => {
    if (analyticsData && canvasRef.current) {
      renderChart(analyticsData.likesPerPost);
    }
  }, [analyticsData]);

  const renderChart = (likesPerPost) => {
    const ctx = canvasRef.current.getContext('2d');

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: likesPerPost.map(post => post.title),
        datasets: [{
          label: 'Number of Likes',
          data: likesPerPost.map(post => post.likes),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          fill: false
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };

  return (
    <>
      <Navbar />
      <div className="sm:flex">
        <div className="hidden sm:block">
          <Sidebar userId={userId} />
        </div>
        <div className="sm:flex-1 bg-gray-900 text-gray-100 min-h-screen">
          <div className="container mx-auto max-w-7xl px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold mb-6 text-white">Analytics Dashboard</h1>
            {error && <p className="text-red-500">Error: {error}</p>}
            {analyticsData && (
              <section className="text-gray-100 body-font">
                <div className="container px-5 py-24 mx-auto">
                  <div className="flex flex-wrap -m-4 text-center">
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                      <div className="bg-gray-800 border-2 border-gray-700 px-4 py-6 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-indigo-500 w-12 h-12 mb-3 inline-block">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                        </svg>
                        <h2 className="title-font font-medium text-3xl text-gray-100">{totalLikes}</h2>
                        <p className="leading-relaxed">Total Likes</p>
                      </div>
                    </div>
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                      <div className="bg-gray-800 border-2 border-gray-700 px-4 py-6 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-indigo-500 w-12 h-12 mb-3 inline-block">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                        </svg>
                        <h2 className="title-font font-medium text-3xl text-gray-100">{analyticsData.totalPosts}</h2>
                        <p className="leading-relaxed">Total Posts</p>
                      </div>
                    </div>
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                      <div className="bg-gray-800 border-2 border-gray-700 px-4 py-6 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-indigo-500 w-12 h-12 mb-3 inline-block">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>
                        <h2 className="title-font font-medium text-3xl text-gray-100">{analyticsData.mostLikedPost ? analyticsData.mostLikedPost.title : 'No data'}</h2>
                        <p className="leading-relaxed">Most Liked Post: Title</p>
                      </div>
                    </div>
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                      <div className="bg-gray-800 border-2 border-gray-700 px-4 py-6 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-indigo-500 w-12 h-12 mb-3 inline-block">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                        <h2 className="title-font font-medium text-3xl text-gray-100">{analyticsData.mostLikedPost ? analyticsData.mostLikedPost.likes : 'No data'}</h2>
                        <p className="leading-relaxed">Most Liked Post: Likes</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-center mt-6">
                    Dive deep into your statistics and gain valuable insights to enhance your presence and engagement. Analyze your total posts, likes, and more to refine your strategies and achieve greater success.
                  </p>
                  <div className="mt-12">
                    <canvas ref={canvasRef} id="likesChart" className="bg-gray-800 border-2 border-gray-700 rounded-lg"></canvas>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Analytics;
