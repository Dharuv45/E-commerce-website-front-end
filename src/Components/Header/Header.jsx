import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setTitle } from "../Store/paginationSlice";
import { useDebounce } from "../../CustomHooks/deBounce";

const Header = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.pagination);
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  const cartItemCount = cart?.items?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;

  const [currTitle, setCurrTitle] = useState(filters?.title ?? "");
  const debouncedTitle = useDebounce(currTitle, 500);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    dispatch(setTitle(debouncedTitle));
  }, [debouncedTitle, dispatch]);

  const handleChange = (e) => setCurrTitle(e.target.value);
  const handleKeyPress = (e) => e.key === "Enter" && dispatch(setTitle(debouncedTitle));

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Left: Logo & Nav */}
          <div className="flex items-center gap-6">
            <Link to="/" className="text-white text-2xl font-extrabold">
              ShopEase
            </Link>

            <nav className="hidden lg:flex gap-4 text-sm font-medium">
              {["Shop", "Upload", "Filter", "About"].map((label) => (
                <NavLink
                  key={label}
                  to={`/${label.toLowerCase()}`}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md transition ${
                      isActive
                        ? "bg-white/10 text-white ring-1 ring-white/20"
                        : "text-white/90 hover:text-cyan-200"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Center: Search */}
          <div className="flex-1 mx-4 hidden md:block">
            <div className="relative">
              <input
                type="search"
                value={currTitle}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                placeholder="Search products, categories, brands..."
                className="w-full max-w-2xl px-5 py-2.5 rounded-full bg-white/10 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-300"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 pointer-events-none">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 21l-4.35-4.35M11 17a6 6 0 1 1 0-12 6 6 0 0 1 0 12z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Right: Cart, Auth */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <Link to="/cart" className="relative">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  d="M3 3h2l.4 2M7 13h10l3-8H6.4"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="10" cy="20" r="1.5" fill="currentColor" />
                <circle cx="18" cy="20" r="1.5" fill="currentColor" />
              </svg>
              {cartItemCount > 0 && (
                <>
                  <span className="absolute -top-1.5 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-70"></span>
                  <span className="absolute -top-2 -right-2 text-xs text-white bg-red-600 px-1.5 py-0.5 rounded-full">
                    {cartItemCount > 99 ? "99+" : cartItemCount}
                  </span>
                </>
              )}
            </Link>

            {/* Auth */}
            {!auth?.user ? (
              <div className="hidden md:flex gap-2">
                <Link
                  to="/login"
                  className="px-4 py-1.5 rounded-full text-sm border border-white/30 text-white hover:bg-white hover:text-indigo-900 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-1.5 rounded-full text-sm bg-white text-indigo-900 hover:bg-indigo-100 transition"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm bg-white/10 text-white rounded-full hover:bg-white/20"
                >
                  <span className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center font-bold">
                    {auth.user.name[0].toUpperCase()}
                  </span>
                  {auth.user.name}
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white text-gray-900 rounded shadow-md py-2 z-50">
                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                    <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100">Orders</Link>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu */}
            <button
              className="md:hidden text-white p-2 rounded hover:bg-white/10"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-blue-900/95 px-4 pb-4">
          <nav className="flex flex-col pt-4 space-y-2 text-white">
            {["Shop", "Upload", "Filter", "About"].map((label) => (
              <NavLink
                key={label}
                to={`/${label.toLowerCase()}`}
                className="px-3 py-2 rounded hover:bg-white/10"
              >
                {label}
              </NavLink>
            ))}

            <div className="pt-4 border-t border-white/10">
              {!auth?.user ? (
                <>
                  <Link to="/login" className="block px-3 py-2 bg-white text-indigo-900 rounded text-center">Login</Link>
                  <Link to="/signup" className="block mt-2 px-3 py-2 border border-white/30 text-white text-center rounded">Sign Up</Link>
                </>
              ) : (
                <>
                  <p className="px-3 py-2 font-semibold">{auth.user.name}</p>
                  <Link to="/orders" className="block px-3 py-2 text-white/80">Orders</Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
