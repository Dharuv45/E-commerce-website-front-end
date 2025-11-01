import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const discountPercentage =
    product.totalprice > product.discountedprice
      ? Math.round(
          ((product.totalprice - product.discountedprice) / product.totalprice) * 100
        )
      : 0;

  return (
    <Link to={`/product/${product._id}`} className="block">
      <div
        className="w-full flex-col gap-10 sm:w-[300px] md:w-[320px] lg:w-[280px] xl:w-[300px]
                   mx-auto my-4 bg-white rounded-2xl overflow-hidden
                   shadow-md hover:shadow-xl transition-all duration-300
                   flex flex-col"
      >
    
        <div className="relative h-48 md:h-56 overflow-hidden flex items-center justify-center bg-gray-100 p-4">
          <img
            src={`${VITE_API_BASE_URL_SOCKET}/${product.image.replaceAll("\\", "/")}`}
            alt={product.name}
            className="object-contain h-full w-full"
          />
        </div>

       
        <div className="px-4 py-4 flex flex-col gap-3 flex-grow">
   
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1 capitalize">
            {product.name}
          </h3>

          
          <p className="text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>

         
          <div className="flex items-center">
            <span className="text-lg font-bold text-green-600">
              ${product.discountedprice}
            </span>

            {product.totalprice > product.discountedprice && (
              <>
                <span className="text-sm line-through text-gray-500 ml-2">
                  ${product.totalprice}
                </span>
                <span className="ml-auto text-sm font-medium text-red-600">
                  -{discountPercentage}%
                </span>
              </>
            )}
          </div>

     
          <div>
            <button
              type="button"
              className="w-full py-2 px-4 rounded-lg bg-black text-white text-sm font-semibold
                         hover:bg-gray-900 transition-colors duration-200"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
