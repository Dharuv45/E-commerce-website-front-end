import React from "react";
import { FaEnvelope, FaUsers, FaBullseye, FaCheckCircle } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 text-gray-800 px-6 py-16 mt-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-indigo-900 mb-12">
          About Us
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-indigo-800">
            <FaBullseye /> Our Mission
          </h2>
          <p className="text-lg mt-3 leading-relaxed">
            At <strong className="text-indigo-700">E-Commerce</strong>, our mission is to provide a seamless and enjoyable shopping experience with a curated selection of top-quality products. We aim to combine affordability with innovation and style.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-indigo-800">
            <FaCheckCircle /> Why Choose Us?
          </h2>
          <ul className="list-disc pl-6 text-lg mt-3 leading-relaxed space-y-2">
            <li>Wide variety of standard, premium, and premium plus clothing.</li>
            <li>Secure payment options including Razorpay.</li>
            <li>Fast & reliable delivery service.</li>
            <li>Responsive customer support.</li>
            <li>User-friendly, modern interface with real-time cart sync.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-indigo-800">
            <FaUsers /> Meet Our Team
          </h2>
          <p className="text-lg mt-3 leading-relaxed">
            We’re a passionate team of developers, designers, and e-commerce enthusiasts who believe in creating simple yet powerful digital experiences. From frontend styling to backend security, we build everything with care.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-indigo-800">
            <FaEnvelope /> Contact Us
          </h2>
          <p className="text-lg mt-3 leading-relaxed">
            Have questions or feedback? Reach out to us at: <br />
            <a href="mailto:support@ecommerce.com" className="text-indigo-700 underline">
              📧 support@ecommerce.com
            </a>
          </p>
          
        </section>
      </div>
    </div>
    
  );
};

export default About;
