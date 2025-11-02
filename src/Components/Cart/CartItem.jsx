// CartItem.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { removeItem } from '../Store/cartSlice'; 

export default function CartItem({
  id, 
  category,
  image,
  price,
  quantity,
  title,
  onIncreaseQuantity,
  onDecreaseQuantity,
}) {
  const dispatch = useDispatch();

  const handleRemoveItem = () => {
    dispatch(removeItem(id));
  };

  return (
    <tr className="bg-white hover:bg-gray-50 transition duration-150 ease-in-out">
     
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-20 w-20">
            <img className="h-full w-full rounded-md object-cover" src={image} alt={title} />
          </div>
          <div className="ml-4">
            <div className="text-base font-medium text-gray-900">{title}</div>
            <div className="text-sm text-gray-500">{category}</div>
          </div>
        </div>
      </td>

     
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-2">
          <button
            onClick={onDecreaseQuantity}
            disabled={quantity <= 1}
            className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            -
          </button>
          <span className="text-lg font-semibold text-gray-800 w-8 text-center">{quantity}</span>
          <button
            onClick={onIncreaseQuantity}
            className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
          >
            +
          </button>
        </div>
      </td>

      {/* Price */}
      <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">
        ${(price * quantity)?.toFixed(2)}
      </td>

     
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <button
          onClick={handleRemoveItem} 
          className="text-red-600 hover:text-red-900 transition-colors duration-200"
        >
          Remove
        </button>
      </td>
    </tr>
  );
}