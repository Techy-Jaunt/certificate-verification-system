
import React from "react";
import HeroSection from "../sections/HeroSection"

import AlumniCommunity from "../components/AlumniCommunity";
import Events from "../components/Upcomingalumnievent";
import Footer from "../pages/Footer";


const Home = () => {
  return (
    <>
      <div>

        <HeroSection />

        <h1 className="text-3xl">AlumniNetwork</h1>
        <AlumniCommunity/>
        <Events />
        <Footer />

      </div>
    </>
  );
};

export default Home;
