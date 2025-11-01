import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, setFilters, setOffset } from "../Store/paginationSlice";
import ShopCard from "./ShopCard";
import ShopCard_Skelten from "./ShopCard_Skelten";
import { getCategories } from "../Store/categorySlice";

const Shop = () => {
  const { offset, products, isLoading, limit, filters } = useSelector(
    (state) => state.pagination
  );
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  useEffect(() => {
    dispatch(getProducts({ offset, limit, filters }));
  }, [offset, limit, filters, dispatch]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setFilters({ minPrice: 0, maxPrice: null, categoryId: null }));
    dispatch(setOffset(0));
  }, [dispatch]);

  // 👇 Scroll to top whenever offset (page changes)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [offset]);

  const handlePrevious = () => {
    if (offset > 0) {
      dispatch(setOffset(offset - limit));
    }
  };

  const handleNext = () => {
    dispatch(setOffset(offset + limit));
  };

  const applyFilters = () => {
    dispatch(setFilters({ minPrice, maxPrice, categoryId }));
    dispatch(setOffset(0));
    if (isFilterPanelOpen) {
      setIsFilterPanelOpen(false);
    }
  };

  const resetFilters = () => {
    setMinPrice(0);
    setMaxPrice("");
    setCategoryId("");
    dispatch(setFilters({ minPrice: 0, maxPrice: null, categoryId: null }));
    dispatch(setOffset(0));
    setIsFilterPanelOpen(false);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 pt-28 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden w-full mb-6">
        <button
          onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
          className="w-full bg-indigo-600 text-white py-3 rounded-xl text-lg font-bold shadow-lg
                               hover:bg-indigo-700 transition-colors duration-300 ease-in-out transform hover:-translate-y-0.5
                               flex items-center justify-center space-x-2"
        >
          <span>{isFilterPanelOpen ? "Hide Filters" : "Show Filters"}</span>
        </button>
      </div>

      {/* Filters Section */}
      <aside
        className={`lg:sticky fixed top-28 lg:top-32 inset-y-0 left-0 w-80 max-w-[85vw] bg-white rounded-r-2xl shadow-2xl lg:shadow-xl transform ${
          isFilterPanelOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out z-50 lg:z-auto border-r border-gray-200 max-h-[calc(100vh-7rem)] lg:max-h-[calc(100vh-7rem)]`}
      >
        <div className="flex flex-col h-full overflow-y-auto p-8 space-y-10">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4 pb-4 border-b-2 border-gray-200">
            Filter By
          </h2>

          {/* Categories Filter */}
          <div>
            <label
              htmlFor="category"
              className="block text-lg font-semibold text-gray-800 mb-3"
            >
              Categories
            </label>
            <select
              id="category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 transition duration-150 appearance-none bg-white pr-8 shadow-sm"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9' /%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.75rem center",
                backgroundSize: "1.5em 1.5em",
              }}
            >
              <option value="">All Products</option>
              {categories?.map((category) => (
                <option key={category.id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price Filter */}
          <div>
            <p className="block text-lg font-semibold text-gray-800 mb-3">
              Price Range
            </p>
            <div className="flex items-center space-x-4">
              <select
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 bg-white pr-8 shadow-sm"
              >
                <option value="" disabled hidden>
                  Min
                </option>
                <option value="0">$0</option>
                <option value="10">$10</option>
                <option value="20">$20</option>
                <option value="30">$30</option>
                <option value="50">$50</option>
                <option value="100">$100</option>
              </select>

              <span className="text-gray-500 font-medium">to</span>

              <select
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 bg-white pr-8 shadow-sm"
              >
                <option value="">Max</option>
                <option value="40">$40</option>
                <option value="60">$60</option>
                <option value="100">$100</option>
                <option value="200">$200</option>
                <option value="500">$500</option>
                <option value="1000">$1000</option>
                <option value="2000">$2000</option>
              </select>
            </div>
          </div>

          {/* Apply Filters */}
          <button
            onClick={applyFilters}
            className="w-full mt-6 px-6 py-3 rounded-xl text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
          >
            Apply Filters
          </button>

          {/* Reset Filters */}
          <button
            onClick={resetFilters}
            className="w-full mt-3 px-6 py-3 rounded-xl text-lg font-bold text-indigo-600 bg-white border border-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm"
          >
            Reset Filters
          </button>
        </div>
      </aside>

      {/* Mobile filter backdrop */}
      {isFilterPanelOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsFilterPanelOpen(false)}
        ></div>
      )}

      {/* Product Grid & Pagination */}
      <main className="flex-1 w-full flex flex-col items-center lg:ml-8 px-4 sm:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-screen-xl">
          {isLoading ? (
            Array.from({ length: 12 }).map((_, index) => (
              <ShopCard_Skelten key={index} />
            ))
          ) : products?.data?.length === 0 ? (
            <div className="col-span-full text-center py-20 bg-white rounded-xl shadow-lg mx-auto w-11/12 md:w-3/4 lg:w-2/3">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Oops! No Products Found.
              </h2>
              <p className="text-lg text-gray-500 mt-2">
                It looks like there are no products matching your current
                filters.
              </p>
              <p className="text-md text-gray-400 mt-1">
                Try adjusting your search criteria or clearing your filters to
                see more products.
              </p>
            </div>
          ) : (
            products.data?.map((item) => (
              <ShopCard key={item.id} product={item} />
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="flex w-full justify-between items-center mt-12 pb-4 px-4">
          <button
            className={`px-8 py-3 rounded-full text-base font-bold ${
              offset === 0
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            } transition-colors duration-300 ease-in-out transform hover:scale-105`}
            onClick={handlePrevious}
            disabled={offset === 0}
          >
            &larr; Previous
          </button>
          <button
            onClick={handleNext}
            className="px-8 py-3 rounded-full text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 ease-in-out transform hover:scale-105"
          >
            Next &rarr;
          </button>
        </div>
      </main>
    </div>
  );
};

export default Shop;
