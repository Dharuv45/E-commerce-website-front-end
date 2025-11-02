import React from 'react'
import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from 'react-redux';
const CartBtn = () => {
  const cart = useSelector(state => state.cart.cartArr);
  console.log(
    "cart", cart
  )
  return (
    <span className=' relative'>
      <FaCartShopping className='h-6 w-11 relative' />
      {cart.length > 0 && (
        <span className='absolute top-[-9px] right-0 h-4 w-4 bg-red-800 flex  items-center justify-center text-xs'>{cart.length}</span>
      )}
    </span>
  )
}

export default CartBtn
