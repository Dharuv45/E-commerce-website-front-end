import React,{useState} from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// Layout and Pages
import MainLayout from "./Layout/MainLayout.jsx";
import Home from "./Pages/Home.jsx";
import ProductDetails from "./Pages/ProductDetails.jsx";
import Cart from "./Components/Cart/Cart.jsx";
import CheckOut from "./Components/CheckOut/CheckOut.jsx";
import Shop from "./Components/Shop/Shop.jsx";
import Upload from "./Components/upload/Upload.jsx";
import SignUp from "./Pages/signUp.jsx";
import Login from "./Pages/Login.jsx";
import FilterPage from "./Pages/FilterPage.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import About from "./Pages/About.jsx";

// Redux + Persist
import { Provider } from "react-redux";
import { persistor, store } from "./Components/Store/store.js";
import { PersistGate } from "redux-persist/integration/react";

// Stripe
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Tailwind Material UI Theme
import { ThemeProvider } from "@material-tailwind/react";
import Payment from "./Pages/Payment.jsx";

// Stripe public key (from your .env file)
// const stripePromise = loadStripe(String(import.meta.env.VITE_PUBLISH_KEY));

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
// App routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
                <Route path="/payment" element={<Payment />} />

        <Route path="/filter" element={<FilterPage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/payment"
          element={
            <Elements stripe={stripePromise}>
              <CheckOut />
            </Elements>
          }
        />
      </Route>

      {/* Auth Pages outside MainLayout */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/google/callback" element={<SignUp />} />
      <Route path="/" element={<Navigator to="/login" />} />
    </>
  )
);

// Render the app
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <Elements stripe={stripePromise}>
          <PersistGate loading={null} persistor={persistor}>
            <RouterProvider router={router} />
          </PersistGate>
        </Elements>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
