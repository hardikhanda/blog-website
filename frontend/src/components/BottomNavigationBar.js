import React, { useState } from 'react';

const BottomNavigationBar = () => {
  const [activeTooltip, setActiveTooltip] = useState(null);

  const handleTooltipToggle = (tooltipId) => {
    setActiveTooltip(activeTooltip === tooltipId ? null : tooltipId);
  };

  return (
    <div className="fixed z-50 w-full max-w-lg bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900 border border-gray-700 dark:bg-gray-800 dark:border-gray-600 rounded-full">
      <div className="grid h-full grid-cols-5 mx-auto max-w-lg">
        {/* Home Button and Tooltip */}
        <button
          data-tooltip-target="tooltip-home"
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-800 dark:hover:bg-gray-700 group"
          onClick={() => handleTooltipToggle('tooltip-home')}
        >
          <svg
            className="w-5 h-5 mb-1 text-gray-400 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
            <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
          </svg>
          <span className="sr-only">Home</span>
        </button>
        <div
          id="tooltip-home"
          role="tooltip"
          className={`absolute z-10 ${
            activeTooltip === 'tooltip-home'
              ? 'visible opacity-100'
              : 'invisible opacity-0'
          } inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700`}
        >
          Home
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>

        {/* Wallet Button and Tooltip */}
        <button
          data-tooltip-target="tooltip-wallet"
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-800 dark:hover:bg-gray-700 group"
          onClick={() => handleTooltipToggle('tooltip-wallet')}
        >
          {/* Replaced with provided SVG for Analytics */}
          <svg
            className="w-5 h-5 mb-1 text-gray-400 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
            />
          </svg>
          <span className="sr-only">Analytics</span>
        </button>
        <div
          id="tooltip-wallet"
          role="tooltip"
          className={`absolute z-10 ${
            activeTooltip === 'tooltip-wallet'
              ? 'visible opacity-100'
              : 'invisible opacity-0'
          } inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700`}
        >
          Analytics
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>

        {/* New Item Button (with no tooltip) */}
        <div className="flex items-center justify-center">
          <button
            data-tooltip-target="tooltip-new"
            type="button"
            className="inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => handleTooltipToggle('tooltip-new')}
          >
            <svg
              className="w-4 h-4 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
            <span className="sr-only">Create</span>
          </button>
        </div>

        {/* Recent Button and Tooltip */}
        <button
          data-tooltip-target="tooltip-recent"
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-800 dark:hover:bg-gray-700 group"
          onClick={() => handleTooltipToggle('tooltip-recent')}
        >
          <svg
            className="w-5 h-5 mb-1 text-gray-400 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="size-6"
          >
            <path
              d="M9.97.97a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1-1.06 1.06l-1.72-1.72v3.44h-1.5V3.31L8.03 5.03a.75.75 0 0 1-1.06-1.06l3-3ZM9.75 6.75v6a.75.75 0 0 0 1.5 0v-6h3a3 3 0 0 1 3 3v7.5a3 3 0 0 1-3 3h-7.5a3 3 0 0 1-3-3v-7.5a3 3 0 0 1 3-3h3Z"
            />
            <path
              d="M7.151 21.75a2.999 2.999 0 0 0 2.599 1.5h3.75a2.999 2.999 0 0 0 2.599-1.5h-8.948Z"
            />
          </svg>
          <span className="sr-only">Recent</span>
        </button>
        <div
          id="tooltip-recent"
          role="tooltip"
          className={`absolute z-10 ${
            activeTooltip === 'tooltip-recent'
              ? 'visible opacity-100'
              : 'invisible opacity-0'
          } inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700`}
        >
          Recent
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>

        {/* Profile Button and Tooltip */}
        <button
          data-tooltip-target="tooltip-profile"
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-800 dark:hover:bg-gray-700 group"
          onClick={() => handleTooltipToggle('tooltip-profile')}
        >
          <svg
            className="w-5 h-5 mb-1 text-gray-400 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              clipRule="evenodd"
            />
          </svg>
          <span className="sr-only">Profile</span>
        </button>
        <div
          id="tooltip-profile"
          role="tooltip"
          className={`absolute z-10 ${
            activeTooltip === 'tooltip-profile'
              ? 'visible opacity-100'
              : 'invisible opacity-0'
          } inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700`}
        >
          Profile
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      </div>
    </div>
  );
};

export default BottomNavigationBar;
