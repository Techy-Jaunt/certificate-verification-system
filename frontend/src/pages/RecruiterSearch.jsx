import React from "react";

const RecruiterSearch = () => {
  return (
    <>
      <body class="bg-white flex items-center justify-center min-h-screen p-4">
        <div class="w-full max-w-lg bg-white px-6 rounded-lg ">
          <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-center text-blue-600 mb-2">
            Verify Alumni Certificates <br class="hidden sm:block" /> Instantly
          </h1>

          <p class="text-center text-black-200 text-sm sm:text-base mb-6 mt-6">
            Enter alumni details below to check authenticity in seconds
          </p>

          <form class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-black-200 mb-1">
                Full name
              </label>
              <input
                type="text"
                placeholder="Alumni Name"
                class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-black-200 mb-1">
                Cohort
              </label>
              <input
                type="text"
                placeholder="Alumni cohort"
                class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-black-200 mb-1">
                Track
              </label>
              <input
                type="text"
                placeholder="Alumni Track"
                class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div class="flex justify-center pt-2 ">
              <button
                type="submit"
                class="w-full sm:w-auto bg-blue-600 mt-4 text-white px-6 sm:px-8 py-2 rounded-md font-medium text-sm sm:text-base hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </body>
    </>
  );
};

export default RecruiterSearch;
