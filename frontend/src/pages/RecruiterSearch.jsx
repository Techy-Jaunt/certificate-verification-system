import React from "react";
import { useNavigate } from "react-router";

const RecruiterSearch = () => {
  const navigate = useNavigate();
  const handleSearch = () => {
    navigate("/recruiter-search-results");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fffefe] px-4 py-8">
      <div className="w-full max-w-md sm:max-w-2xl bg-white rounded-lg p-6 sm:p-8 lg:p-12 shadow-md  border border-(--color-normal-hover)">
        {/* Header */}
        <h1 className="text-center text-(--color-primary-500) font-bold text-lg sm:text-2xl lg:text-3xl mb-4">
          Verify Alumni Certificates <br className="hidden sm:block" />
          Instantly
        </h1>

        <p className="text-center text-gray-600 text-sm sm:text-base mb-8">
          Enter alumni details below to check authenticity in seconds
        </p>

        {/* Form */}
        <form className="space-y-4">
          {/* Full name */}
          <div>
            <label className="block text-sm text-gray-800 mb-1">
              Full name
            </label>
            <input
              type="text"
              placeholder="Alumni Name"
              className="w-full border border-gray-400/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-(--color-primary-500) transition"
              required
            />
          </div>

          {/* Cohort */}
          <div>
            <label className="block text-sm text-gray-800 mb-1">Cohort</label>
            <input
              type="text"
              placeholder="Alumni cohort"
              className="w-full border border-gray-400/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-(--color-primary-500) transition"
              required
            />
          </div>

          {/* Track */}
          <div>
            <label className="block text-sm text-gray-800 mb-1">Track</label>
            <input
              type="text"
              placeholder="Alumni Track"
              className="w-full border border-gray-400/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-(--color-primary-500) transition"
              required
            />
          </div>

          {/* Actions */}
          <div className="flex justify-center pt-4">
            <button
              onClick={handleSearch}
              type="submit"
              className="px-10 py-2 rounded-lg bg-(--color-primary-500)  text-white text-sm font-medium shadow-lg  hover:bg-(--color-primary-400) transition cursor-pointer"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecruiterSearch;
