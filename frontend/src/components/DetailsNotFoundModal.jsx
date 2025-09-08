import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

export const DetailsNotFoundModal = ({ onClose }) => {
  const navigate = useNavigate();

  const handleTryAgain = () => {
    navigate("#"); // 👈 change this to the page you want
  };                      

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Modal Content */}
        <div className="flex flex-col items-center p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center mb-4">
            <span className="text-white text-6xl font-bold">!</span>
          </div>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            We couldn't find your details!
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            The email or cohort doesn't seem to match our records. Please double
            check and try again.
          </p>

          {/* Try Again Button */}
          <button
            onClick={handleTryAgain} 
            className="bg-blue-600 text-white font-medium py-2 px-6 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
};
