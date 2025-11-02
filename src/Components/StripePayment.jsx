// src/Components/StripePayment.jsx
import React, { useState } from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { FaCcVisa, FaCcMastercard, FaCcAmex } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "./Store/cartSlice";   


// Stripe publishable key from .env
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ amount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setMessage("");

    try {
      // 1) Create PaymentIntent from backend
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/payment/create-payment-intent`,
        { amount, currency: "inr" }
      );

      const clientSecret = data?.clientSecret;

      if (!clientSecret) {
        setMessage("Payment initialization failed.");
        setIsProcessing(false);
        return;
      }

      // 2) Confirm payment with Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (result.paymentIntent?.status === "succeeded") {
        setMessage("✅ Payment successful!");
        dispatch(clearCart());   // ✅ Clear Redux cart
        if (onSuccess) onSuccess(); // Pass success handler (Checkout.jsx)
      } else if (result.error) {
        setMessage(result.error.message || "Payment failed.");
      } else {
        setMessage("Payment could not be completed. Try again.");
      }
    } catch (err) {
      console.error("Payment error:", err?.response?.data || err);
      setMessage("Payment failed. Check console for details.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg max-w-md mx-auto mt-8 border border-gray-100">
      <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
        Secure Payment
      </h2>
      <form onSubmit={handlePayment} className="space-y-4">
        <label className="block font-medium text-gray-700">Card Details</label>
        <div className="border border-gray-300 p-3 rounded-lg shadow-sm bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 transition">
          <div className="flex items-center gap-3 mb-2 text-gray-500">
            <FaCcVisa size={28} />
            <FaCcMastercard size={28} />
            <FaCcAmex size={28} />
          </div>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#32325d",
                  "::placeholder": { color: "#a0aec0" },
                },
                invalid: { color: "#fa755a" },
              },
            }}
          />
        </div>
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className={`w-full py-3 rounded-lg text-white font-semibold shadow-md transition-all duration-300 ${
            isProcessing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          }`}
        >
          {isProcessing ? "Processing..." : `Pay ₹${amount}`}
        </button>
        {!!message && (
          <p
            className={`mt-2 text-center text-sm font-medium ${
              message.includes("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default function StripePayment({ onSuccess }) {
  const amount = useSelector((state) => state.cart.totalAmount); // ✅ From real Redux store

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={amount} onSuccess={onSuccess} />
    </Elements>
  );
}
