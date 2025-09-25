import React from "react";
import HeroSection from "../components/HeroSection";
import AlumniCommunity from "../components/AlumniCommunity";
import Events from "../components/UpcomingAlumniEvent";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import AlumniComm from "../components/AlumniComm";

const Home = () => {
  return (
    <>
      <div className="relative">
        {/* <Navbar />*/}
        <HeroSection />
        <AlumniCommunity />
        <Events />
        <AlumniComm />
        <Footer />
      </div>
    </>
  );
};

export default Home;
