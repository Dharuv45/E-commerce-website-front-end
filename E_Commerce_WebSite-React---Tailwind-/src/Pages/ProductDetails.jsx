import React from "react";
import Container from "../Components/Container/Container";
import ProductDetail from "../Components/ProductDetails/ProductDetail";

const ProductDetails = () => {
  return (
    <div>
      <Container>
        <div className="border-2 mt-32 mb-32">
          <h2 className="text-3xl font-semibold ml-14 mt-14 mb-5">
            Product Detail
          </h2>
          <ProductDetail />
        </div>
      </Container>
    </div>
  );
};

export default ProductDetails;
