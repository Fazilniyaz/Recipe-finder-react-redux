import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import ProductDetails from "./components/Product/ProductDetails";
import Wishlist from "./components/WishList/WishList";
import SearchResults from "./SearchResults/SearchResults";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/search-results" element={<SearchResults />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </Fragment>
  );
}

export default App;
