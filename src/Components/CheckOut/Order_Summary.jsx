import React from 'react';
import { useDispatch } from 'react-redux';
import { removeItem } from '../Store/cartSlice';

const Order_Summary = ({ category, id, image, price, quantity, title }) => {
  const dispatch = useDispatch();

  const handleRemoveItem = () => {
    dispatch(removeItem({ id, price, quantity }));
  };

  return (
    <tr className="rounded-md mt-4 mx-2 bg-white shadow-md">
      <td colSpan="2" className="py-4 px-2">
        <div className="flex items-center space-x-4">
          <img
            src={image}
            alt={title}
            className="w-20 h-20 object-cover rounded-md"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/fallback-image.png';
            }}
          />
          <div>
            <div className="font-semibold text-sm text-gray-800">{title}</div>
            <div className="text-xs text-gray-500">{category}</div>
          </div>
        </div>
      </td>

      <td className="text-center">
        <span className="text-base font-semibold text-gray-700">{quantity}</span>
      </td>

      <td className="text-center text-gray-700">${price}</td>

      <td className="text-center">
        <button
          onClick={handleRemoveItem}
          className="px-4 py-2 text-sm text-red-500 border border-red-400 rounded-md hover:bg-red-50 transition"
        >
          Remove Item
        </button>
      </td>
    </tr>
  );
};

export default Order_Summary;
