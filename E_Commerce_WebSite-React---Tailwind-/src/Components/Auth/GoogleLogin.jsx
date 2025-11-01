import { GoogleLogin as GoogleLoginButton } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
    
const GoogleLogin = () => {
    const navigate = useNavigate();
  const handleSuccess = async (credentialResponse) => {
    try {
      console.log("object", credentialResponse);

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/google-login`,
        {
          token: credentialResponse.credential,
        }
      );
      if (response.data) {
        Cookies.set("auth_token", response?.data?.token); // expires in 7 days
        navigate("/");
      }
      console.log("Logged in successfully:", response.data);
    } catch (error) {
      console.error("Login Failed", error);
    }
  };

  return (
    <div>
      <GoogleLoginButton
        onSuccess={handleSuccess}
        onError={() => console.log("Login Failed")}
      />
    </div>
  );
};

export default GoogleLogin;
