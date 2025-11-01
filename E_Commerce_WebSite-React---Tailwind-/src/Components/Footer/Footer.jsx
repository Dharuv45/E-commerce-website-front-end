import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-purple-800 via-indigo-800 to-blue-800 text-white py-12 mt-16 shadow-inner">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 grid gap-12 md:grid-cols-2 lg:grid-cols-4">

        {/* Newsletter Section */}
        <div className="col-span-1">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <form className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Your Email Address"
              className="w-full h-12 px-4 rounded-md bg-white/10 border border-white/30 text-white placeholder-white/70 focus:ring-2 focus:ring-blue-300 focus:outline-none transition duration-300"
            />
            <button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 rounded-md font-semibold transition duration-300 transform hover:-translate-y-0.5 hover:shadow-xl"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Navigation Sections */}
        {[...Array(3)].map((_, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-xl font-semibold uppercase tracking-wide">Company</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition duration-200">About Us</a></li>
              <li><a href="#" className="hover:text-white transition duration-200">Company History</a></li>
              <li><a href="#" className="hover:text-white transition duration-200">Our Team</a></li>
              <li><a href="#" className="hover:text-white transition duration-200">Our Vision</a></li>
              <li><a href="#" className="hover:text-white transition duration-200">Press Release</a></li>
            </ul>
          </div>
        ))}
      </div>

      <hr className="my-10 border-gray-600 mx-auto max-w-7xl" />

      {/* Bottom Section */}
      <div className="mx-auto max-w-7xl px-4 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-300">
        <p>© 2025 E-Commerce. All rights reserved.</p>
        <div className="flex space-x-4">
          {/* Placeholder for social icons */}
          <a href="#" aria-label="Facebook" className="hover:text-white">Fb</a>
          <a href="#" aria-label="Twitter" className="hover:text-white">Tw</a>
          <a href="#" aria-label="Instagram" className="hover:text-white">Ig</a>
        </div>
      </div>
    </footer>
  );
}
