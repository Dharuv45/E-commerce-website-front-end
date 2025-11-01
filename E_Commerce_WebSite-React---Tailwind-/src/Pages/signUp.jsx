import axios from "axios";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLogin from "../Components/Auth/GoogleLogin";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phonenumber: "",
    gender: "",
    address: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear error as user types
    setErrors((prev) => ({ ...prev, [name]: "" }));

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstname.trim())
      newErrors.firstname = "First name is required";
    if (!formData.lastname.trim()) newErrors.lastname = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (!formData.phonenumber.trim())
      newErrors.phonenumber = "Phone number is required";
    if (!formData.gender.trim()) newErrors.gender = "Gender is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3001/api/user/signup",
        formData
      );
      console.log("Signup Success:", response.data);
      toast.success("User registered successfully!");
      navigate("/");
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-800 to-blue-800">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="w-1/2">
              <input
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                placeholder="First Name*"
                className="w-full px-4 py-2 border rounded-md"
              />
              {errors.firstname && (
                <p className="text-red-600 text-sm">{errors.firstname}</p>
              )}
            </div>
            <div className="w-1/2">
              <input
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                placeholder="Last Name*"
                className="w-full px-4 py-2 border rounded-md"
              />
              {errors.lastname && (
                <p className="text-red-600 text-sm">{errors.lastname}</p>
              )}
            </div>
          </div>

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email*"
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email}</p>
          )}

          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="Password*"
              className="w-full px-4 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <span
              onClick={togglePassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-500 cursor-pointer"
            >
              {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
            </span>
          </div>
          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password}</p>
          )}

          <input
            name="phonenumber"
            value={formData.phonenumber}
            onChange={handleChange}
            placeholder="Phone Number*"
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.phonenumber && (
            <p className="text-red-600 text-sm">{errors.phonenumber}</p>
          )}

          <div className="flex items-center gap-4">
            <label className="text-sm">Gender:</label>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
              />{" "}
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
              />{" "}
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="other"
                checked={formData.gender === "other"}
                onChange={handleChange}
              />{" "}
              Other
            </label>
          </div>
          {errors.gender && (
            <p className="text-red-600 text-sm">{errors.gender}</p>
          )}

          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            rows={3}
            className="w-full px-4 py-2 border rounded-md"
          ></textarea>
          {errors.address && (
            <p className="text-red-600 text-sm">{errors.address}</p>
          )}

          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 rounded-md hover:bg-purple-800"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <GoogleOAuthProvider clientId="855153844942-6vqhbblbj4k8p65l97t8cegsje57k0r1.apps.googleusercontent.com">
          <GoogleLogin />
        </GoogleOAuthProvider>
        {/* <button
          onClick={handleGoogleSignUp}
          className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-100"
        >
          <img
            src="https://img.icons8.com/color/16/000000/google-logo.png"
            alt="Google logo"
            className="mr-2"
          />
          Sign Up with Google
        </button> */}

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-700 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
