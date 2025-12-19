import React from "react";
import Header from "../components/Header";
import Hero from "../components/LandingPage/Hero";
import Services from "../components/LandingPage/AboutUs";
import Projects from "../components/LandingPage/Projects";
import Clients from "../components/LandingPage/Clients";
import Contact from "../components/LandingPage/ContactForm";
import Footer from "../components/Footer";
import AboutUs from "../components/LandingPage/AboutUs";

export default function LandingPage() {
  return (
    <div>
      <Header />
      <Hero />
      <AboutUs />
      <Projects />
      <Clients />
      <Contact />
      <Footer />
    </div>
  );
}
