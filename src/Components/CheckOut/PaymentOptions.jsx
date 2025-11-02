import React from 'react'
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PaymentOptions({onClick}) {
    const stripe = useStripe();
    const elements = useElements();
    const notify = () => toast("Wow Your Order Placed Success Fully !");
    const handleSubmit = async (event) => {
        event.preventDefault();
         onClick();
        if (!stripe || !elements) {
            return;
        }


    };
  return (
    <>
      
      <form onSubmit={handleSubmit} className='bg-gray-200  mt-2 ml-5 s
                                                     shadow-md rounded px-8 pt-6  pb-8 mb-4 w-full max-w-md'>
                        <div className="mb-4">
                            <label className="block text-gray text-sm font-bold mb-2 h w" htmlFor="name">
                                Card Holder's name
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-3 h px-3 text-gray leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Name" />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray text-sm font-bold mb-2" htmlFor="card-element">
                                Card Information
                            </label>
                            <div className="shadow appearance-none border rounded w-full py-3 px-3 
                                            text-gray leading-tight focus:outline-none focus:shadow-outline">
                                <CardElement
                                    options={{
                                        style: {
                                            base: {
                                                fontSize: '16px',
                                                color: '#424770',
                                                '::placeholder': {
                                                    color: '#aab7c4',
                                                },
                                            },
                                            invalid: {
                                                color: '#9e2146',
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <button className="bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" disabled={!stripe}>
                                Pay Now
                            </button>
                        </div>
                        <ToastContainer
              position="top-center"
            />
                    </form>
    </>
  )
}

export default PaymentOptions
