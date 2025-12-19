import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  // State to track if mobile menu is open or closed
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle function for mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3">
            <img src="/images/logo.png" alt="Logo" className="h-20 w-auto" />
            <span className="text-2xl font-bold text-gray-800 hidden sm:inline">
              ᏒᎬᎪᏞ ᏆᏒusᏆ
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex gap-8 items-center">
            <a
              href="#services"
              className="text-gray-700 hover:text-blue-600 font-semibold transition"
            >
              SERVICES
            </a>
            <a
              href="#projects"
              className="text-gray-700 hover:text-blue-600 font-semibold transition"
            >
              PROJECTS
            </a>
            <a
              href="#clients"
              className="text-gray-700 hover:text-blue-600 font-semibold transition"
            >
              CLIENTS
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-blue-600 font-semibold transition"
            >
              CONTACT
            </a>
            {/* Admin page link */}
            <Link
              to="/admin"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold transition"
            >
              ADMIN
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-2xl text-gray-700"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 pt-4 border-t space-y-2">
            <a
              href="#services"
              className="block py-2 text-gray-700 hover:text-blue-600"
            >
              SERVICES
            </a>
            <a
              href="#projects"
              className="block py-2 text-gray-700 hover:text-blue-600"
            >
              PROJECTS
            </a>
            <a
              href="#clients"
              className="block py-2 text-gray-700 hover:text-blue-600"
            >
              CLIENTS
            </a>
            <a
              href="#contact"
              className="block py-2 text-gray-700 hover:text-blue-600"
            >
              CONTACT
            </a>
            <Link
              to="/admin"
              className="block py-2 text-blue-600 font-semibold"
            >
              ADMIN
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
