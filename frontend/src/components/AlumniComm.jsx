import React from "react";

const AlumniComm = () => {
  return (
    <section className="w-full sm:w-[90%]  mx-auto pb-16 pt-5">
      {/* About section */}
      <h2 className="text-3xl font-bold text-center">
        Join our <span className="text-primary-950">Alumni Community</span>
      </h2>
      <p className="mt-4 text-center text-gray-700 pt-2 px-5 sm:px-0 mx-auto">
       Connect with fellow graduates, access exclusive resources, and be part of a thriving network of tech professionals. Get access to job opportunities, mentorship, and continuous learning.
      </p>
      <div className="flex items-center justify-center">
        <button className="flex items-center gap-2 mt-6 text-sm bg-secondary-150  text-white font-medium rounded-lg py-3 px-6  cursor-pointer transition-all hover:bg-secondary-50">
          <img src="/icons/alumni.svg" className="h-5 w-5" /> <span>Join Alumni Community</span>
        </button>
      </div>
    </section>
  );
};

export default AlumniComm;
