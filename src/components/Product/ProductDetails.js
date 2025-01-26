import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const { products = [] } = useSelector((state) => state.productsState);

  const [product, setProduct] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    let selectedProduct =
      products.find((item) => item.recipe.uri.split("_")[1] === id)?.recipe ||
      null;

    console.log(products);

    if (!selectedProduct) {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      selectedProduct =
        wishlist.find((item) => item.uri.split("_")[1] === id) || null;
    }

    setProduct(selectedProduct);

    if (
      selectedProduct &&
      JSON.parse(localStorage.getItem("wishlist") || "[]").some(
        (item) => item.uri === selectedProduct.uri
      )
    ) {
      setIsInWishlist(true);
    }
  }, [id, products]);

  if (!product) {
    return <h2 className="text-center mt-10">Product Not Found</h2>;
  }

  const addToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    setIsInWishlist(true);
  };

  const removeFromWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const updatedWishlist = wishlist.filter((item) => item.uri !== product.uri);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setIsInWishlist(false);
  };

  return (
    <div className="container mx-auto my-8 px-6">
      <h1 className="text-4xl font-bold text-center text-orange-600 mb-12">
        {product.label}
      </h1>

      <div className="flex flex-col lg:flex-row items-center lg:items-start">
        <div className="lg:w-1/2">
          <img
            src={product.image}
            alt={product.label}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        <div className="lg:w-1/2 lg:pl-8">
          <h2 className="text-3xl font-semibold mb-4">{product.label}</h2>
          <p className="text-gray-600 mb-4">
            <strong>Source:</strong> {product.source}
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Meal Type:</strong> {product.mealType?.join(", ")}
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Diet Labels:</strong> {product.dietLabels?.join(", ")}
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Health Labels:</strong> {product.healthLabels?.join(", ")}
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Price:</strong> ${Math.floor(Math.random() * 50) + 10}.99
          </p>

          <button
            onClick={isInWishlist ? removeFromWishlist : addToWishlist}
            className={`mt-4 px-6 py-2 rounded-full ${
              isInWishlist
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          </button>

          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-600 text-white px-6 py-2 rounded-full hover:bg-orange-700 ml-3 no-underline"
            style={{ textDecoration: "none" }}
          >
            View Recipe
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
