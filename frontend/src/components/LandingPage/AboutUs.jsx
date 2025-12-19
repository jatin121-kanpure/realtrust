import React from "react";

export default function AboutUs() {
  const reasons = [
    {
      id: 1,
      icon: "🏠",
      title: "Potential ROI",
      description:
        "Get maximum return on your investment with our data-driven strategies and proven methodologies.",
    },
    {
      id: 2,
      icon: "🎨",
      title: "Design",
      description:
        "Beautiful, modern designs that capture attention and engage your audience effectively.",
    },
    {
      id: 3,
      icon: "📱",
      title: "Marketing",
      description:
        "Strategic marketing campaigns that drive results and grow your business exponentially.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Us Section - Text Left, Image Right */}
        <div className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT SIDE - Text Content */}
          <div className="bg-white">
            <h2 className="text-5xl font-bold text-gray-800 mb-4">
              Not Your Average
              <br />
              <span className="text-blue-600">Realtor</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We bring innovation, creativity, and strategic thinking to every
              project. Our team of experts is dedicated to delivering
              exceptional results that exceed expectations and drive real
              business growth.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition duration-300 flex items-center gap-2 w-fit">
              Learn More
              <span>→</span>
            </button>
          </div>

          {/* RIGHT SIDE - Image */}
          <div className="relative rounded-2xl overflow-hidden h-96">
            <img
              src="/images/aboutus.png"
              alt="About Us"
              className="w-full h-full object-cover hover:scale-105 transition duration-300"
            />
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-20 pt-20 border-t-2 border-gray-200">
          <h2 className="text-5xl font-bold text-center text-gray-800 mb-4">
            Why Choose Us?
          </h2>

          {/* Blue underline */}
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-16"></div>

          {/* Reasons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {reasons.map((reason) => (
              <div
                key={reason.id}
                className="text-center group hover:bg-gradient-to-br hover:from-blue-50 hover:to-orange-50 p-8 rounded-2xl transition duration-300"
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition duration-300">
                  {reason.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {reason.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
          {/* Image Section */}
          <section className="mt-20">
            <div className="max-w-7xl mx-auto px-4">
              <div className="rounded-3xl overflow-hidden shadow-lg">
                <img
                  src="/images/agency.png"
                  alt="Our Work"
                  className="w-full h-[400px] object-cover hover:scale-105 transition duration-300"
                />
              </div>
            </div>
          </section>

          {/* About Us Section */}
          <section id="about" className="py-24 bg-white">
            <div className="max-w-3xl mx-auto px-4 text-center">
              <h2 className="text-5xl font-bold text-gray-800 mb-6">
                About Us
              </h2>

              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                We are a passionate digital agency focused on building
                meaningful digital products. Our goal is to help businesses grow
                by creating beautiful designs, powerful applications, and smart
                marketing strategies.
              </p>

              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                With years of experience and a dedicated team, we believe in
                simple, clean, and effective solutions that deliver real results
                for our clients.
              </p>

              <a
                href="#contact"
                className="inline-block bg-blue-600 text-white px-10 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Work With Us
              </a>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
