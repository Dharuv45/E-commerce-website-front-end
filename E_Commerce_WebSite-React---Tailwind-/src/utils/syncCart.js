import axios from "axios";
import Cookies from "js-cookie";



export const syncCartToBackend = async (cartArr) => {
  const formattedCart = cartArr.map(item => ({
    productId: item._id,
    price: item.discountedprice,
    quantity: item.quantity,
  }));
  const token = Cookies.get("auth_token")
  try {
    const response = await axios.post(
      "http://localhost:3001/api/cart/create",
      formattedCart,{
        
        headers: {
          Authorization: `${token}`, 
        },
      }
    //   { withCredentials: true } // send token from cookies
    );
console.log(response.data,"ssssssssssss")
    return response.data; // contains items, totalAmount, totalProduct
  } catch (error) {
    console.error("Failed to sync cart:", error.response?.data || error.message);
  }
};



