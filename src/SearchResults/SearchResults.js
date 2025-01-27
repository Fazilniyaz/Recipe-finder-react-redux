import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const { products = [] } = useSelector((state) => state.productsState);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=a5de3521&app_key=28f8a20bd893e2740e68d4bbb349b977&from=0&to=50`
        );

        const filteredResults = response.data.hits.filter((item) =>
          item.recipe.label.toLowerCase().includes(query.toLowerCase())
        );

        setSearchResults(filteredResults);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    const filteredProducts = products.filter((product) =>
      product.recipe?.label.toLowerCase().includes(query.toLowerCase())
    );

    if (query) {
      fetchSearchResults();
      setSearchResults(filteredProducts);
    }
  }, [query, products]);

  if (loading) {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  if (!searchResults.length) {
    return (
      <h2 className="text-center mt-10">No results found for "{query}"</h2>
    );
  }

  return (
    <div className="container mx-auto my-8 px-6">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">
        Search Results for "{query}"
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchResults.map((result) => (
          <div
            key={result.recipe.uri}
            className="bg-white shadow-md rounded-lg p-4"
          >
            <img
              src={result.recipe.image}
              alt={result.recipe.label}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {result.recipe.label}
            </h2>
            <p className="text-gray-600 mb-4">
              <strong>Source:</strong> {result.recipe.source}
            </p>

            <Link
              to={`/product/${result.recipe.uri.split("_")[1]}`}
              className="bg-orange-600 text-white px-6 py-2 rounded-full hover:bg-orange-700"
            >
              View Full Detail...
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
