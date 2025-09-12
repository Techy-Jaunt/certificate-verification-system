import React from "react";
import CountUp from "react-countup";
import alumni from "./Alumni icon.png";
import arrow from "./arrow-square-up.png";
import certificate from "./certificate icon.png";
import { useNavigate } from "react-router";

const HeroSection = () => {
  const navigate = useNavigate();
  const handleRequestCertificate = () => {
    navigate("/certificate-request");
  };
  return (
    <section className="w-full bg-(--color-foundation-background) py-12 px-4 text-center ">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl text-(--color-darkened) md:text-4xl font-bold mb-6">
          TechyJaunt{" "}
          <span className="text-(--color-primary-400)">Alumni Network</span>
        </h1>
        <p className="text-black mb-10 text-lg font-normal">
          Join our thriving community of tech professionals who have transformed
          their careers through TechyJaunt
        </p>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10 justify-items-center">
          <div className="border border-(--color-primary-500) rounded-xl shadow p-6 h-48 flex flex-col items-center justify-center w-full max-w-sm">
            <h2 className="text-3xl font-bold text-(--color-primary-500) mb-2">
              <CountUp end={219} duration={3} />+
            </h2>
            <p>Successful Graduates</p>
          </div>

          <div className="border border-(--color-primary-500) rounded-xl shadow p-6 h-48 flex flex-col items-center justify-center w-full max-w-sm">
            <h2 className="text-3xl font-bold text-(--color-error) mb-2">
              <CountUp end={6} duration={3} />
            </h2>
            <p>Completed Cohorts</p>
          </div>

          <div className="border border-(--color-primary-500) rounded-xl shadow p-6 h-48 flex flex-col items-center justify-center w-full max-w-sm">
            <h2 className="text-3xl font-bold text-(--color-success) mb-2">
              <CountUp end={2223} duration={3} />+
            </h2>
            <p>Certificates Issued</p>
          </div>

          <div className="border border-(--color-primary-500) rounded-xl shadow p-6 h-48 flex flex-col items-center justify-center w-full max-w-sm">
            <h2 className="text-3xl font-bold text-(--color-error) mb-2">
              <CountUp end={8} duration={3} />
            </h2>
            <p>Tech Tracks</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="flex items-center gap-2 border border-(--color-primary-500) text-(--color-primary-500) px-6 py-3 rounded-lg font-medium hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <img src={alumni} alt="alumni" className="w-5 h-5" />
            Join Alumni
          </button>

          <button
            onClick={handleRequestCertificate}
            className="flex items-center gap-2 bg-(--color-primary-500) text-white px-6 py-3 rounded-lg font-medium hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            <img src={certificate} alt="certificate" className="w-5 h-5" />
            Certificate
            <img src={arrow} alt="arrow" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
