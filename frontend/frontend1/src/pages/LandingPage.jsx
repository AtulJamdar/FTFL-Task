import React from "react";
import Header from "../components/layout/Header";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import Stats from "../components/landing/Stats";
import About from "../components/landing/About";
import Testimonials from "../components/landing/Testimonials";
import CTA from "../components/landing/CTA";
import Contact from "../components/landing/Contact";
import Footer from "../components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="landing-bn min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 w-full">
        <Hero />
        <Features />
        <Stats />
        <About />
        <Testimonials />
        <CTA />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
