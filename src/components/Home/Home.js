import React, { useEffect, useState } from "react";
import { getProducts } from "../../actions/productsAction";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const [visibleCount, setVisibleCount] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    dietLabels: "",
    healthLabels: "",
    mealType: "",
  });
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const {
    products = [],
    loading,
    dietLabels = [],
    healthLabels = [],
    mealTypes = [],
  } = useSelector((state) => state.productsState);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  const handleViewAll = () => {
    setShowFilters(true);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    let filtered = products;

    if (filters.dietLabels) {
      filtered = filtered.filter((item) =>
        item.recipe.dietLabels.includes(filters.dietLabels)
      );
    }

    if (filters.healthLabels) {
      filtered = filtered.filter((item) =>
        item.recipe.healthLabels.includes(filters.healthLabels)
      );
    }

    if (filters.mealType) {
      filtered = filtered.filter(
        (item) =>
          item.recipe.mealType &&
          item.recipe.mealType.includes(filters.mealType)
      );
    }

    setFilteredProducts(filtered);
  };

  console.log(products);

  const posters = [
    {
      title: "Delicious Burgers",
      img: "https://atri-apps.github.io/restaurant_website/app-assets/616dca333c0bd679a77bec56_classic-burger-restaurante-x-template-p-500.jpeg",
    },
    {
      title: "Fresh Salads",
      img: "https://atri-apps.github.io/restaurant_website/app-assets/616dc9ba43f4163d5f7b436e_chocolate-milkshake-restaurante-x-template-p-500.jpeg",
    },
    {
      title: "Tasty Desserts",
      img: "https://atri-apps.github.io/restaurant_website/app-assets/616dc9aac480169bcc819e69_classic-fries-restaurante-x-template-p-500.jpeg",
    },
  ];

  return (
    <main className="container mx-auto my-8 px-6">
      <h1 className="text-4xl font-bold text-center text-orange-600 mb-12">
        Explore Recipes You'll Love
      </h1>

      {/* Loading Spinner
      {loading && (
        <h2 className="text-center text-orange-600 mb-3 mt-3">Loading...</h2>
      )} */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posters.map((poster, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-2xl shadow-lg group mt-8 mb-8"
          >
            <img
              src={poster.img}
              alt={poster.title}
              className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <h2 className="text-black text-2xl font-semibold">
                {poster.title}
              </h2>
            </div>
          </div>
        ))}
      </div>

      <h1 className="mb-8 mt-8">Recipes</h1>

      {showFilters && (
        <div className="filters bg-gray-100 p-4 mb-6 rounded-lg">
          <h3 className="font-semibold text-lg mb-3">Filter Recipes</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label htmlFor="dietLabels" className="block font-medium mb-1">
                Diet Labels
              </label>
              <select
                id="dietLabels"
                name="dietLabels"
                value={filters.dietLabels}
                onChange={handleFilterChange}
                className="border rounded-md p-2 w-full"
              >
                <option value="">All</option>
                {dietLabels.map((label, index) => (
                  <option key={index} value={label}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="healthLabels" className="block font-medium mb-1">
                Health Labels
              </label>
              <select
                id="healthLabels"
                name="healthLabels"
                value={filters.healthLabels}
                onChange={handleFilterChange}
                className="border rounded-md p-2 w-full"
              >
                <option value="">All</option>
                {healthLabels.map((label, index) => (
                  <option key={index} value={label}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="mealType" className="block font-medium mb-1">
                Meal Type
              </label>
              <select
                id="mealType"
                name="mealType"
                value={filters.mealType}
                onChange={handleFilterChange}
                className="border rounded-md p-2 w-full"
              >
                <option value="">All</option>
                {mealTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={applyFilters}
            className="mt-4 bg-orange-600 text-white px-6 py-2 rounded-full hover:bg-orange-700"
          >
            Apply Filters
          </button>
        </div>
      )}

      <div className="recipe-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.slice(0, visibleCount).map((item, index) => (
          <div key={index} className="recipe-card">
            <img
              src={item.recipe.image}
              alt={item.recipe.label}
              className="w-full h-60 object-cover rounded-md mb-3"
            />
            <h3 className="font-semibold text-lg mb-2">{item.recipe.label}</h3>
            <p>Source: {item.recipe.source}</p>
            <a
              href={item.recipe.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View Recipe
            </a>
            <button>
              <Link
                to={`/product/${item.recipe.uri.split("_")[1]}`}
                key={index}
              >
                View Full Detail...
              </Link>
            </button>
          </div>
        ))}
      </div>

      <div className="text-center my-6">
        {visibleCount < filteredProducts.length && (
          <button
            onClick={handleViewMore}
            className="bg-orange-600 text-white px-6 py-2 rounded-full hover:bg-orange-700 mr-4"
          >
            View More
          </button>
        )}
        <button
          onClick={handleViewAll}
          className="bg-gray-700 text-white px-6 py-2 rounded-full hover:bg-gray-800"
        >
          View All with Filteration
        </button>
      </div>
    </main>
  );
};

export default Home;
