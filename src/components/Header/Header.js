import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search-results?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-orange-500 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-2xl font-bold">
          Recipe<span className="text-yellow-300">-Finder</span>
        </div>

        <div className="relative w-1/2 max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            style={{ border: "0.5px solid yellow", color: "yellow" }}
            placeholder="Search recipes..."
            className="w-full px-4 py-2 text-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
        </div>

        <nav>
          <a
            href="/wishlist"
            className="text-yellow-300 text-lg font-medium transition"
            style={{
              textDecoration: "none",
              backgroundColor: "yellow",
              color: "black",
              padding: "10px",
              borderRadius: "10%",
              margin: "5%",
            }}
          >
            Wishlist
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
