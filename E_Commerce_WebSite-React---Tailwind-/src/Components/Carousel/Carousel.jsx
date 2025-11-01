import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";

// Carousel Component
function Carousel({ slides }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [currentSlide, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index) => setCurrentSlide(index);

  return (
    <div className="relative overflow-hidden my-5 w-full max-w-5xl mx-auto mt-14 h-[30rem] bg-white rounded-xl shadow-2xl border border-gray-200">
      <div
        className="flex h-full w-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-full h-full flex-shrink-0 flex flex-col md:flex-row items-center justify-center p-6 md:p-12"
          >
            <div className="flex-1 text-center md:text-left md:pr-8 mb-8 md:mb-0">
              <p className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-2 drop-shadow-sm">
                {slide.salePercentage}
                <span className="text-lg md:text-xl text-gray-600 font-semibold ml-2">
                  SALE OFF
                </span>
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
                {slide.productName}
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
                {slide.description}
              </p>
              <Link
                to={`/product/${slide.productId}`}
                className="px-8 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Shop Now
              </Link>
            </div>
            <div className="flex-1 flex justify-center items-center">
              <img
                src={slide.image}
                alt={`slide-${index}`}
                className="max-h-full max-w-full object-contain rounded-lg shadow-lg"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? "bg-blue-600 w-8" : "bg-gray-400"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}

// Home Page
function Home() {
  const [slidesData, setSlidesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/random/random`)
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((product) => ({
          productId: product._id,
          image: `${VITE_API_BASE_URL_SOCKET}/${product.image?.replaceAll("\\", "/")}`,
          salePercentage: product.discount ? `${product.discount}%` : "10%",
          productName: product.name,
          description: product.description?.slice(0, 150) || "No description available.",
        }));
        setSlidesData(formatted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching random products:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans">
      {loading ? (
        <p className="text-xl font-semibold text-gray-600">Loading...</p>
      ) : (
        <Carousel slides={slidesData} />
      )}
    </div>
  );
}

// Product Detail Page
function ProductDetail() {
  const { id } = useParams();
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold text-gray-800">
        Product Detail Page for Product ID: {id}
      </h1>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetail />} />
    </Routes>
  );
}
