import React from "react";
import { Link } from "react-router-dom";
import { FaEye, FaHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../Store/cartSlice"; // adjust this path to where your cartSlice2 is

const VITE_API_BASE_URL_SOCKET = import.meta.env.VITE_API_BASE_URL_SOCKET;
const ShopCard = ({ product }) => {
  const dispatch = useDispatch();
  const imageUrl = `${VITE_API_BASE_URL_SOCKET}/${product.image?.replaceAll("\\", "/")}`;
  const isOutOfStock = product.stock === 0;

  const discountPercentage = Math.round(
    ((product.totalprice - product.discountedprice) / product.totalprice) * 100
  );

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="group relative w-full max-w-sm flex flex-col items-center space-y-4">
      {/* Card */}
      <div className="bg-white rounded-2xl shadow-md p-4 relative flex flex-col justify-between w-full transition group-hover:shadow-xl">
        {/* Discount or Out of Stock Tag */}
        <span
          className={`absolute top-4 right-4 text-white text-xs font-semibold px-2 py-1 rounded-full z-10 transition-all duration-300 ${
            isOutOfStock ? "bg-red-500" : "bg-blue-600"
          }`}
        >
          {isOutOfStock ? "Out of Stock" : `${discountPercentage}% OFF`}
        </span>

        {/* Image Section */}
        <div className="h-48 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105">
          <Link
            to={`/product/${product._id}`}
            className="w-full h-full flex items-center justify-center"
          >
            <img
              src={imageUrl}
              alt={product.name}
              className="max-h-full w-auto object-contain"
            />
          </Link>
        </div>

        {/* Product Title */}
        <h2 className="text-sm font-medium text-gray-900 truncate mb-1">
          {product.name}
        </h2>

        {/* Description */}
        <p className="text-xs text-gray-500 mb-2 line-clamp-2">
          {product.description}
        </p>

        {/* Price Section */}
        <div className="text-sm text-gray-700 mb-2 flex items-center space-x-2">
          <span className="text-base font-bold text-gray-900">
            ${product.discountedprice}
          </span>
          <span className="line-through text-gray-400">
            ${product.totalprice}
          </span>
        </div>
      </div>

      {/* Floating Button Bar BELOW card */}
      <div className="flex justify-between items-center w-full px-4 opacity-0 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
        {/* Eye Icon */}
        <button className="p-2 rounded-md bg-white shadow border hover:bg-gray-100 transition duration-200">
          <FaEye className="w-4 h-4 text-gray-600" />
        </button>

        {/* Add to Cart */}
        {isOutOfStock ? (
          <button className="flex-1 text-center py-2 px-4 rounded-md bg-gray-300 text-white font-semibold cursor-not-allowed mx-2">
            Out of Stock
          </button>
        ) : (
          <button
            onClick={handleAddToCart}
            className="flex-1 text-center py-2 px-4 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-200 mx-2"
          >
            Add to Cart
          </button>
        )}

        {/* Heart Icon */}
        <button className="p-2 rounded-md bg-white shadow border hover:bg-gray-100 transition duration-200">
          <FaHeart className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default ShopCard;
