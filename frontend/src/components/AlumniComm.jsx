import React from "react";

const AlumniComm = () => {
  return (
    <section className="text-center px-8 md:px-16 xl:px-25 pb-[70px] md:pb-[74px]">
      <h2 className="text-3xl md:text-4xl font-bold text-(--color-darkened) md:leading-10 pb-5 md:pb-7">
        Join our{" "}
        <span className="text-(--color-primary-400)">Alumni Community</span>
      </h2>
      <p className="text-base md:text-2xl leading-7 md:leading-9 tracking-[0.01em] ">
        Connect with fellow graduates, access exclusive resources, and be part
        of a thriving network of tech professionals. Get access to job
        opportunities, mentorship, and continuous learning.
      </p>
      <div className="flex items-center justify-center">
        <button className="w-[320px] bg-[#9f068b] rounded-[10px] text-white mt-7.5 flex items-center justify-center gap-[10px] px-2 py-[13px]  md:py-5 text-base md:text-[20px] font-bold">
          <img src="/icons/alumni.svg" className="h-6 w-6" />
          <span>Join Alumni Community</span>
        </button>
      </div>
    </section>
  );
};

export default AlumniComm;
