import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../Components/ProductCard/ProductCard';
import Container from '../Components/Container/Container';

const FilterPage = () => {
  const products = useSelector((state) => state.products.allProducts);
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100000]);

  const categories = [...new Set(products.map((p) => p.category))];

  // Sort all products by price
  
  const sortedProducts = [...products].sort(
    (a, b) => a.discountedprice - b.discountedprice
  );

  // Apply filters on top of sorted list
  const filteredProducts = sortedProducts.filter((product) => {
    const inCategory = category ? product.category === category : true;
    const inPriceRange =
      product.discountedprice >= priceRange[0] &&
      product.discountedprice <= priceRange[1];
    return inCategory && inPriceRange;
  });

  return (
    <Container>
      <div className="pt-24 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Filter Products by Category & Price
        </h2>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-10 bg-gray-100 p-6 rounded-xl shadow-md">

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All</option>
              {categories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Min Price</label>
              <input
                type="number"
                value={priceRange[null]}
                onChange={(e) =>
                  setPriceRange([+e.target.value, priceRange[1]])
                }
                className="w-28 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Min"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Max Price</label>
              <input
                type="number"
                value={priceRange[null]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], +e.target.value])
                }
                className="w-28 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Max"
              />
            </div>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg mt-10">
            No products found in selected filters.
          </p>
        )}
      </div>
    </Container>
  );
};

export default FilterPage;
