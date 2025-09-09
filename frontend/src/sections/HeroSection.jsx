import React from "react"
import "../style/HeroSection.css";
import alumni from "./Alumni icon.png"
import arrow from "./arrow-square-up.png"
import certificate from "./certificate icon.png"



const HeroSection = () =>  {
  return (
    <section className="hero">
      <div className="hero-container">
        <h1 className="hero-title">
          TechyJaunt <span className="highlight">Alumni Network</span>
        </h1>
        <p className="hero-subtitle">
          Join our thriving community of tech professionals who have transformed
          their careers through TechyJaunt
        </p>

     
        <div className="stats">
          <div className="stat-box">
            <h2 className="stat-number blue">219+</h2>
            <p>Successful Graduates</p>
          </div>
          <div className="stat-box">
            <h2 className="stat-number red">6</h2>
            <p>Completed Cohorts</p>
          </div>
          <div className="stat-box">
            <h2 className="stat-number green">2223+</h2>
            <p>Certificates Issued</p>
          </div>
          <div className="stat-box">
            <h2 className="stat-number orange">8</h2>
            <p>Tech Tracks</p>
          </div>
        </div>

        <div className="hero-buttons">
          <button className="btn-outline"> <img src={alumni} alt="" /> Join Alumni</button>
          <button className="btn-filled"> <img src={certificate} alt="" /> Certificate <img src={arrow} alt="" /></button>
        </div>
      </div>
    </section>
  );
}



export default HeroSection