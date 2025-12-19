import React from "react";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/hero-section.jpg')`,
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
          Welcome to Our Agency
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl drop-shadow-md">
          Creating stunning digital experiences through consultation, design,
          and marketing
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <a
            href="#contact"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition transform hover:scale-105"
          >
            Get Started
          </a>
          <a
            href="#projects"
            className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition"
          >
            View Projects
          </a>
        </div>
      </div>
    </section>
  );
}
