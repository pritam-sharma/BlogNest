import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";
import BlogNest from "../../assets/BlogNest.png";

const Footer = () => {
  return (
    <footer className="bg-white/90 backdrop-blur-md border-t border-gray-200 mt-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          {/* Logo + Description */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-3">
              <img
                src={BlogNest}
                alt="BlogNest Logo"
                className="w-10 h-10 rounded-full border border-indigo-200 shadow-sm"
              />
              <h2 className="text-xl font-bold text-indigo-600">BlogNest</h2>
            </div>
            <p className="text-gray-600 max-w-sm">
              Discover inspiring stories, share your thoughts, and explore ideas that matter — all in one nest of creativity.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-gray-800 font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-indigo-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/posts" className="text-gray-600 hover:text-indigo-600 transition-colors">
                  Posts
                </Link>
              </li>
              <li>
                <Link to="/add-post" className="text-gray-600 hover:text-indigo-600 transition-colors">
                  Write a Post
                </Link>
              </li>
              <li>
                <Link to="/user-profile" className="text-gray-600 hover:text-indigo-600 transition-colors">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-right">
            <h3 className="text-gray-800 font-semibold mb-3">Follow Us</h3>
            <div className="flex justify-center md:justify-end gap-4 text-gray-600">
              <a href="#" className="hover:text-indigo-600 transition">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="hover:text-indigo-600 transition">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="hover:text-indigo-600 transition">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="hover:text-indigo-600 transition">
                <FaGithub size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-6"></div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} <span className="text-indigo-600 font-semibold">BlogNest</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
