import React from "react";

const Footer = () => {
  return (
    <footer className="bg-orange-500 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Recipe<span className="text-yellow-300">-Finder</span>
          </h2>
          <p className="text-sm">
            Discover thousands of recipes at your fingertips. Your perfect meal
            starts here!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#home" className="hover:text-yellow-300">
                Home
              </a>
            </li>
            <li>
              <a href="#recipes" className="hover:text-yellow-300">
                Recipes
              </a>
            </li>
            <li>
              <a href="#wishlist" className="hover:text-yellow-300">
                Wishlist
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-yellow-300">
                About Us
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-lg font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              className="hover:text-yellow-300"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f text-xl"></i>
            </a>
            <a
              href="https://twitter.com"
              className="hover:text-yellow-300"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a
              href="https://instagram.com"
              className="hover:text-yellow-300"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a
              href="https://youtube.com"
              className="hover:text-yellow-300"
              aria-label="YouTube"
            >
              <i className="fab fa-youtube text-xl"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center mt-6 border-t border-white pt-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Recipe-Finder. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
