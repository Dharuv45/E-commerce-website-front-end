import React, { useEffect } from "react";
import Container from "../Components/Container/Container";
import ProductCard from "../Components/ProductCard/ProductCard";
import Carousel from "../Components/Carousel/Carousel";
import { getAllProducts } from "../Components/Store/productSlice";
import { useSelector, useDispatch } from "react-redux";
import SkeltenCard from "../Components/SkeltenCard/SkeltenCard";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const products = useSelector((state) => state.products.allProducts);
  const loading = useSelector((state) => state.products.isLoading);

 console.log("products", products)
  const slides = (products || []).slice(0, 3).map((product) => ({
  productId: product._id,
  image: `${VITE_API_BASE_URL_SOCKET}/${product.image?.replaceAll("\\", "/")}`,
})) || [];

console.log("slides", slides)

  return (
    <div className="w-full py-8">
      <Container>
        <div>
          <Carousel slides={slides} />
        </div>
        <div className="flex flex-wrap justify-center py-7 gap-2">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeltenCard key={i} />)
            : (products || []).map((item) => (
                <ProductCard key={item._id} product={item} />
              ))}
        </div>
      </Container>
    </div>
  );
};

export default Home;
