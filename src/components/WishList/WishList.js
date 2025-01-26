import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  return (
    <div className="container mx-auto my-8 px-6">
      <h1 className="text-4xl font-bold text-center text-orange-600 mb-12">
        Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <h2 className="text-center text-gray-600">Your wishlist is empty!</h2>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item, index) => (
            <Link
              key={index}
              to={`/product/${item.uri.split("_")[1]}`}
              className="recipe-card"
            >
              <img
                src={item.image}
                alt={item.label}
                className="w-full h-60 object-cover rounded-md mb-3"
              />
              <h3 className="font-semibold text-lg mb-2">{item.label}</h3>
              <p>Source: {item.source}</p>
              <button
                className="text-blue-600 underline hover:text-blue-800"
                type="button"
              >
                View Details
              </button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
