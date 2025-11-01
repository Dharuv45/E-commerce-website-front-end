import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} from "../Store/cartSlice";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import StripePayment from "../StripePayment";

const BASE_URL = `${VITE_API_BASE_URL_SOCKET}`;

export default function Cart() {
  const cartArr = useSelector((state) => state.cart.cartArr);
  const state = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [showStripe, setShowStripe] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row justify-between gap-10 p-6 md:p-12 bg-gray-50 min-h-screen mt-24">
      {/* Left Section - Cart Items */}
      <div className="flex-1 bg-white rounded-3xl shadow-lg p-6 overflow-x-auto border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Cart</h2>
        <table className="w-full text-sm md:text-base">
          <thead className="bg-gray-100 rounded-lg">
            <tr>
              <th className="py-3 px-4 text-left text-gray-600 font-medium">
                Product
              </th>
              <th className="py-3 px-4 text-left text-gray-600 font-medium">
                Quantity
              </th>
              <th className="py-3 px-4 text-left text-gray-600 font-medium">
                Price
              </th>
              <th className="py-3 px-4 text-left text-gray-600 font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {cartArr?.length > 0 ? (
              cartArr.map((item) => (
                <CartItem
                  key={item._id}
                  id={item._id}
                  category={item?.category?.name}
                  image={`${BASE_URL}/${item.image?.replaceAll("\\", "/")}`}
                  price={item.discountedprice}
                  quantity={item.quantity}
                  title={item.name}
                  onIncreaseQuantity={() =>
                    dispatch(increaseQuantity(item._id))
                  }
                  onDecreaseQuantity={() =>
                    dispatch(decreaseQuantity(item._id))
                  }
                />
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-12 text-gray-500">
                  Your cart is empty. Start shopping!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Right Section - Summary */}
      <div className="w-full lg:w-96 bg-white border border-gray-200 rounded-3xl shadow-xl p-8 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">
            Order Summary
          </h2>
          <div className="space-y-4 text-base">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Products</span>
              <span className="font-semibold text-gray-800">
                {cartArr?.length || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="text-gray-800 font-medium">$0.00</span>
            </div>
            <div className="flex justify-between pt-4 mt-4 border-t">
              <span className="text-xl font-bold text-gray-800">
                Total Price
              </span>
              <span className="text-xl font-bold text-green-600">
                ${state.totalAmount?.toFixed(2) || "0.00"}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 space-y-4">
          {!showStripe ? (
            <>
              <Link to="/payment">
                <button
                  onClick={() => setShowStripe(true)}
                  className="w-full px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-700 text-white text-base font-semibold hover:scale-105 transition transform"
                >
                  Checkout
                </button>
              </Link>
              <button
                onClick={() => dispatch(clearCart())}
                className="w-full px-5 py-3 border border-red-500 text-red-600 rounded-xl font-semibold hover:bg-red-50 hover:scale-105 transition transform"
              >
                Clear Cart
              </button>
            </>
          ) : (
            <StripePayment amount={state.totalAmount || 0} />
          )}
        </div>
      </div>
    </div>
  );
}
