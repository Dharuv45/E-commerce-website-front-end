import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const RazorPayment = () => {
    const price = useSelector((state)=> state.cart.totalPrice)

    const loadScript = (src) => {                       
        return new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = src;
          script.onload = () => {
            resolve(true);
          };
          script.onerror = () => {
            resolve(false);
          };
          document.body.appendChild(script);
        });
      };
    
      const displayRazorpay = async () => {                            
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');   
   
    
        if (!res) {
          alert('Razorpay SDK failed to load. Are you online?');
          return;
        }
    
        const options = {
          key: 'rzp_test_VoalPTAE9SvV8B',
          amount: price*100, 
          currency: 'USD',
          name: 'Test Transaction',
          description: 'Test Transaction',
          handler: function (response) {
            alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
          },
          prefill: {
            name: 'Test User',
            email: 'testuser@example.com',
            contact: '9999999999',
          },
          notes: {
            address: 'Test Address',
          },
          theme: {
            color: '#61dafb',
          },
        };
    
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      };
    
      return (
        <div>
          <button onClick={displayRazorpay} className="bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 hover:bg-blue-700
           text-white font-bold py-2 px-4 ml-14
           rounded focus:outline-none focus:shadow-outline">
            Pay With RazorPay
          </button>
        </div>
      );
}

export default RazorPayment
