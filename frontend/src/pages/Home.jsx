import React from "react";
import HeroSection from "../components/HeroSection";
import AlumniCommunity from "../components/AlumniCommunity";
import Events from "../components/Upcomingalumnievent";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <div>
        {/* <Navbar /> */}
        <HeroSection />
        <AlumniCommunity />
        <Events />
        <Footer />
      </div>
    </>
  );
};

export default Home;
