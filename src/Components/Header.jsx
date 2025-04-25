import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import logo from "../assets/logo.png";
import { TiThMenu } from "react-icons/ti";

function Header() {
  const [Isopen, setISopen] = useState(false);
  const [categories, setcategories] = useState([]);

  const fetchGifCategories = async () => {
    const res = await fetch("/categories.json");
    const { data } = await res.json();
    setcategories(data);
  };

  useEffect(() => {
    fetchGifCategories();
  }, []);

  return (
    <header className="text-white">
      <div className="flex justify-between items-center px-6 py-4 mx-auto max-w-7xl">
        {/* Logo Section */}
        <nav>
          <Link to="/" aria-label="Home">
            <img
              src={logo}
              alt="S-GRAPHIC Logo"
              className="w-50 h-auto object-cover transition-transform duration-300 hover:scale-105"
            />
          </Link>
        </nav>

        {/* Navigation Links */}
        <div className="flex items-center gap-1 md:gap-8">
          <div className="hidden md:flex gap-4">
            {categories?.slice(0, 5).map((category) => {
              return (
                <Link
                  className="p-2 border-b-4 border-purple-400 bg-gray-800 rounded hover:bg-gray-700 transition-all duration-300 hover:scale-105"
                  key={category.name}
                  to={`/${category.name_encoded}`}
                >
                  {category.name}
                </Link>
              );
            })}
          </div>

          <div>
            <TiThMenu
              className="text-5xl cursor-pointer hover:text-pink-400 transition-colors duration-300 transform hover:scale-110"
              onClick={() => setISopen(!Isopen)}
            />
          </div>
        </div>
      </div>

      {/* Mobile Responsive or Other Categories */}
      <div
        className={`mx-5 md:mx-10 my-3 px-4 py-8 bg-pink-500 rounded transition-all duration-500 ease-in-out ${
          Isopen
            ? "block opacity-100 translate-y-0"
            : "hidden opacity-0 -translate-y-5"
        }`}
      >
        <h1 className="text-2xl font-bold mb-6">Categories</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-3">
          {categories?.map((category) => {
            return (
              <Link
                onClick={() => setISopen(false)}
                className="transition-all duration-300 font-bold hover:text-purple-200 hover:scale-105"
                key={category.name}
                to={`/${category.name_encoded}`}
              >
                {category.name}
              </Link>
            );
          })}
        </div>

        <div className="border-t border-gray-200 pt-4 text-sm text-gray-900 text-center transition-opacity duration-500">
          <p>
            © 2025 Suraj Savle, Inc. | Powered by{" "}
            <a
              href="https://developers.giphy.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:underline transition-colors duration-300"
            >
              GIPHY API
            </a>
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;