import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StripePayment from "../Components/StripePayment";
import axios from "axios";
import Cookies from "js-cookie";

const Payment = () => {
  const state = useSelector((state) => state.cart);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    shippingAddress: "",
    shippingCity: "",
    shippingState: "",
    shippingZip: "",
    billingAddress: "",
    billingCity: "",
    billingState: "",
    billingZip: "",
  });

  const token = Cookies.get("auth_token");

  // Fetch addresses
  const fetchAddresses = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/address/fetch`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (res.status === 200 || res.status === 201) {
        const addressData = res.data?.data || [];
        // Sort default address to top
        const sorted = [...addressData].sort((a, b) =>
          a.isDefault === b.isDefault ? 0 : a.isDefault ? -1 : 1
        );
        setAddresses(sorted);
      }
    } catch (err) {
      console.error("Failed to fetch addresses", err);
      setAddresses([]);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [token]);

  const handleSelectAddress = (id) => {
    setSelectedAddress(id);
  };

  const handleFormChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddNewAddress = () => {
    setShowForm((prev) => !prev);
    setSelectedAddress(""); // reset for new entry
    setFormData({
      firstName: "",
      lastName: "",
      shippingAddress: "",
      shippingCity: "",
      shippingState: "",
      shippingZip: "",
      billingAddress: "",
      billingCity: "",
      billingState: "",
      billingZip: "",
    });
  };

  const handleSubmitAddress = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        shipping: {
          address: formData.shippingAddress,
          city: formData.shippingCity,
          state: formData.shippingState,
          zip: formData.shippingZip,
        },
        billing: {
          address: formData.billingAddress,
          city: formData.billingCity,
          state: formData.billingState,
          zip: formData.billingZip,
        },
      };

      if (selectedAddress && addresses.some((a) => a._id === selectedAddress)) {
        // Update address
        await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/address/update/${selectedAddress}`,
          payload,
          {
            headers: {
              Authorization: `${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        // Add new address
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/address/add`,
          payload,
          {
            headers: {
              Authorization: `${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      }

      fetchAddresses();
      setShowForm(false);
      setFormData({
        firstName: "",
        lastName: "",
        shippingAddress: "",
        shippingCity: "",
        shippingState: "",
        shippingZip: "",
        billingAddress: "",
        billingCity: "",
        billingState: "",
        billingZip: "",
      });
      setSelectedAddress("");
    } catch (err) {
      console.error("Failed to save address", err);
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/address/update/default/${id}`,
        {},
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      fetchAddresses();
    } catch (err) {
      console.error("Failed to set default address", err);
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/address/delete/${id}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      fetchAddresses();
    } catch (err) {
      console.error("Failed to delete address", err);
    }
  };

  return (
    <div className="mt-10 min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center tracking-tight">
          Checkout
        </h1>

        {/* Address Section */}
        <div className="bg-white shadow-xl rounded-2xl p-8 mb-10">
          <div className="flex justify-between items-center mb-6 border-b-2 border-gray-100 pb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Select Shipping Address
            </h2>
            <button
              onClick={handleAddNewAddress}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              {showForm ? "Cancel" : "Add New Address"}
            </button>
          </div>

          {/* Add/Update Address Form */}
          {showForm && (
            <form
              onSubmit={handleSubmitAddress}
              className="mb-8 p-6 border-2 border-gray-200 rounded-2xl bg-white shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                {selectedAddress ? "Update Address" : "Add New Address"}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { name: "firstName", label: "First Name" },
                  { name: "lastName", label: "Last Name" },
                  { name: "shippingAddress", label: "Shipping Address" },
                  { name: "shippingCity", label: "Shipping City" },
                  { name: "shippingState", label: "Shipping State" },
                  { name: "shippingZip", label: "Shipping Zip Code" },
                  { name: "billingAddress", label: "Billing Address" },
                  { name: "billingCity", label: "Billing City" },
                  { name: "billingState", label: "Billing State" },
                  { name: "billingZip", label: "Billing Zip Code" },
                ].map((field) => (
                  <div key={field.name} className="flex flex-col">
                    <label
                      htmlFor={field.name}
                      className="text-sm font-medium text-gray-700 mb-1"
                    >
                      {field.label}
                    </label>
                    <input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleFormChange}
                      className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-3 shadow-sm transition"
                      placeholder={field.label}
                      required
                    />
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleAddNewAddress}
                  className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 shadow-md transition"
                >
                  {selectedAddress ? "Update Address" : "Save Address"}
                </button>
              </div>
            </form>
          )}

          {/* Address List */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {addresses.length > 0 ? (
              addresses.map((addr) => (
                <div
                  key={addr._id}
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg transform hover:-translate-y-1 ${
                    selectedAddress === addr._id
                      ? "border-blue-600 bg-blue-50 shadow-lg"
                      : "border-gray-200 bg-white"
                  }`}
                  onClick={() => handleSelectAddress(addr._id)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-lg text-gray-900">
                      {addr.firstName} {addr.lastName}
                    </h3>
                    {addr.isDefault && (
                      <span className="text-xs font-medium px-3 py-1 bg-green-100 text-green-800 rounded-full">
                        Default
                      </span>
                    )}
                  </div>

                  {/* Shipping Address */}
                  <div className="mb-4 border-t border-gray-200 pt-4">
                    <p className="font-bold text-base text-gray-800">
                      Shipping Address
                    </p>
                    <p className="text-gray-600">{addr.shipping?.address}</p>
                    <p className="text-gray-600">
                      {addr.shipping?.city}, {addr.shipping?.state} -{" "}
                      {addr.shipping?.zip}
                    </p>
                  </div>

                  {/* Billing Address */}
                  <div>
                    <p className="font-bold text-base text-gray-800">
                      Billing Address
                    </p>
                    <p className="text-gray-600">{addr.billing?.address}</p>
                    <p className="text-gray-600">
                      {addr.billing?.city}, {addr.billing?.state} -{" "}
                      {addr.billing?.zip}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 flex flex-wrap gap-2 justify-end">
                    {!addr.isDefault && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSetDefault(addr._id);
                        }}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                      >
                        Set as Default
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormData({
                          firstName: addr.firstName,
                          lastName: addr.lastName,
                          shippingAddress: addr.shipping?.address || "",
                          shippingCity: addr.shipping?.city || "",
                          shippingState: addr.shipping?.state || "",
                          shippingZip: addr.shipping?.zip || "",
                          billingAddress: addr.billing?.address || "",
                          billingCity: addr.billing?.city || "",
                          billingState: addr.billing?.state || "",
                          billingZip: addr.billing?.zip || "",
                        });
                        setShowForm(true);
                        setSelectedAddress(addr._id);
                      }}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                    >
                      Update
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteAddress(addr._id);
                      }}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full">
                <p className="text-center text-gray-500 text-lg">
                  No addresses found. Please add one.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Payment Section */}
        <div className="bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-gray-100 pb-4">
            Proceed to Payment
          </h2>
          <StripePayment amount={state.totalAmount || 0} />
        </div>
      </div>
    </div>
  );
};

export default Payment;
