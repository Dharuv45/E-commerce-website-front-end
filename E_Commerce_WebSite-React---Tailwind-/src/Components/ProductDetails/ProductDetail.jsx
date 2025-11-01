import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../Store/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faTruck,
  faCheckCircle,
  faHeart,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  const [newReview, setNewReview] = useState({ rating: 0, review: "" });
  const [submitting, setSubmitting] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/product/getone/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product:", err));

    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/review/product-reviews?productId=${id}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Error fetching reviews:", err));
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    setIsAdded(true);
  };

  const handleQuantityChange = (type) => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else {
      setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (newReview.rating < 1 || newReview.review.trim() === "") {
      return alert("Please provide a rating and a review.");
    }

    try {
      setSubmitting(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/review/create-review`,
        {
          productId: id,
          rating: newReview.rating,
          review: newReview.review,
        },
        { withCredentials: true } // for cookie-based auth
      );

      setReviews((prev) => [res.data.review, ...prev]);
      setNewReview({ rating: 0, review: "" });
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!product) {
    return (
      <p className="text-center mt-20 text-xl text-gray-600 animate-pulse">
        Loading Product Details...
      </p>
    );
  }

  const discount =
    product.totalprice && product.discountedprice
      ? Math.round(
          ((product.totalprice - product.discountedprice) /
            product.totalprice) *
            100
        )
      : 0;

  return (
    <div className="bg-gray-100 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative bg-gray-50 flex items-center justify-center p-8">
            <img
              src={`${VITE_API_BASE_URL_SOCKET}/${product.image?.replaceAll(
                "\\",
                "/"
              )}`}
              alt={product.name}
              className="w-full max-w-lg object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="p-8 lg:p-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  {product.name}
                </h1>
                {discount > 0 && (
                  <span className="bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                    {discount}% OFF
                  </span>
                )}
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-6 space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className={
                        i < product.rating ? "text-yellow-400" : "text-gray-300"
                      }
                    />
                  ))}
                  <span className="ml-2">
                    ({reviews ? reviews.length : 0} customer reviews)
                  </span>
                </div>
                {product.stock > 0 ? (
                  <div className="flex items-center text-green-500">
                    <FontAwesomeIcon icon={faCheckCircle} className="mr-1" />
                    <span>In Stock</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-500">
                    <span>Out of Stock</span>
                  </div>
                )}
              </div>
              <div className="mb-6">
                <span className="text-lg font-semibold text-gray-600 mr-2">
                  Price:
                </span>
                <span className="text-3xl font-bold text-gray-900 mr-2">
                  ${product.discountedprice}
                </span>
                <span className="text-lg line-through text-gray-400">
                  ${product.totalprice}
                </span>
              </div>
              <div className="flex items-center text-blue-600 mb-8">
                <FontAwesomeIcon icon={faTruck} className="mr-2" />
                <span>Free delivery available</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center border border-gray-300 rounded-full h-12 w-32 justify-between px-4">
                  <button
                    onClick={() => handleQuantityChange("decrement")}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <span className="font-semibold text-lg">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange("increment")}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 w-full sm:w-auto ${
                    isAdded
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isAdded ? "Added" : "Add to Cart"}
                </button>
                <button className="bg-white text-gray-700 border border-gray-300 font-semibold p-3 rounded-full hover:bg-gray-50 transition-colors">
                  <FontAwesomeIcon icon={faHeart} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl mt-8 p-8">
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab("description")}
              className={`py-3 px-6 text-lg font-medium transition-colors ${
                activeTab === "description"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("additional")}
              className={`py-3 px-6 text-lg font-medium transition-colors ${
                activeTab === "additional"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Additional Information
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`py-3 px-6 text-lg font-medium transition-colors ${
                activeTab === "reviews"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Reviews
            </button>
          </div>

          <div className="p-4">
            {activeTab === "description" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Description
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {product.description ||
                    "No description available for this product."}
                </p>
                <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Specifications
                </h2>
                {product.specifications?.length > 0 ? (
                  <ul className="text-gray-600 leading-relaxed list-disc list-inside">
                    {product.specifications.map((spec, index) => (
                      <li key={index}>{spec}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No specifications available.</p>
                )}
              </div>
            )}

            {activeTab === "additional" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Additional Details
                </h2>
                {product.additionalDetails ? (
                  <ul className="text-gray-600 space-y-2">
                    {Object.entries(product.additionalDetails).map(
                      ([key, value]) => (
                        <li key={key}>
                          <span className="font-semibold capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}:
                          </span>{" "}
                          {value}
                        </li>
                      )
                    )}
                  </ul>
                ) : (
                  <p className="text-gray-500">
                    No additional details available.
                  </p>
                )}
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Customer Reviews
                </h2>

                {/* Review Form */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-2">Write a Review</h3>
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FontAwesomeIcon
                          key={star}
                          icon={faStar}
                          className={`cursor-pointer text-xl ${
                            newReview.rating >= star
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          onClick={() =>
                            setNewReview((prev) => ({
                              ...prev,
                              rating: star,
                            }))
                          }
                        />
                      ))}
                    </div>
                    <textarea
                      rows="4"
                      className="w-full border border-gray-300 rounded-lg p-2"
                      placeholder="Write your review..."
                      value={newReview.review}
                      onChange={(e) =>
                        setNewReview((prev) => ({
                          ...prev,
                          review: e.target.value,
                        }))
                      }
                      required
                    ></textarea>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
                    >
                      {submitting ? "Submitting..." : "Submit Review"}
                    </button>
                  </form>
                </div>

                {/* Display Reviews */}
                {reviews.length > 0 ? (
                  <div className="space-y-6">
                    {reviews.map((review, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <p className="font-semibold text-gray-900 mr-2">
                            {review.user?.name || "Anonymous"}
                          </p>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <FontAwesomeIcon
                                key={i}
                                icon={faStar}
                                className={
                                  i < review.rating
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                          {review.review}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">
                    No reviews yet. Be the first to review this product!
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
