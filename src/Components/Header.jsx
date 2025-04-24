import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";
// Updated logo import
import logo from "../assets/logo.png"; // Replace with the correct path to your new logo
import { TiThMenu } from "react-icons/ti";
import { GifState } from "../Context/GifContext";

function Header() {
  const [Isopen, setISopen] = useState(false);

  const { filter, setFilter, favorites } = GifState();

  return (
    <header className="text-white">
      <div className="flex justify-between items-center px-6 py-4 mx-auto max-w-7xl">
        {/* Logo Section */}
        <nav>
          <Link to="/" aria-label="Home">
            <img
              src={logo}
              alt="S-GRAPHIC Logo"
              className="w-50 h-auto object-cover"
            />
          </Link>
        </nav>

        {/* Navigation Links */}
        <div className="flex items-center gap-1 md:gap-8">
          <div className="hidden md:flex gap-4">
          {categories?.slice(0, 5).map((category) => {
            return (
              <Link
                className="p-2 border-b-4 border-purple-400 bg-gray-800 rounded hover:bg-gray-700"
                key={category.name}
                to={`/${category.name_encoded}`}
              >
                {category.name}
              </Link>
            );
          })}
          </div>

          {favorites.length > 0 && (
            <div className="text-center px-4 py-2 bg-pink-500 rounded hover:bg-pink-400">
              <Link to="/favorites">Favorite GIFs</Link>
            </div>
          )}

          <div>
            <TiThMenu
              className="text-5xl cursor-pointer"
              onClick={() => setISopen(!Isopen)}
            />
          </div>
        </div>
      </div>

      {/* Mobile Responsive or Other Categories */}
      <div
        className={`max-w-6xl mx-auto px-4 py-8 bg-pink-500 rounded ${
          Isopen ? "block" : "hidden"
        }`}
      >
        <h1 className="text-2xl font-bold mb-6">Categories</h1>

        <div className="flex justify-around items-start mb-3">
          {/* Column 1 */}
          <div className="space-y-2">
            <p className="font-semibold text-gray-800">GIPHY Studios</p>
            <ul className="space-y-1">
              <li>
                <Link to="/animals" className="text-gray-700 hover:underline">
                  Animals
                </Link>
              </li>
              <li>
                <Link to="/actions" className="text-gray-700 hover:underline">
                  Actions
                </Link>
              </li>
              <li>
                <Link to="/anime" className="text-gray-700 hover:underline">
                  Anime
                </Link>
              </li>
              <li>
                <Link to="/cartoons" className="text-gray-700 hover:underline">
                  Cartoons
                </Link>
              </li>
              <li>
                <Link to="/emotions" className="text-gray-700 hover:underline">
                  Emotions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="space-y-1">
            <p className="font-semibold text-gray-800">Food/Drink</p>
            <ul className="space-y-1">
              <li>
                <Link to="/gaming" className="text-gray-700 hover:underline">
                  Gaming
                </Link>
              </li>
              <li>
                <Link to="/holidays" className="text-gray-700 hover:underline">
                  Holidays/Greetings
                </Link>
              </li>
              <li>
                <Link to="/memes" className="text-gray-700 hover:underline">
                  Memes
                </Link>
              </li>
              <li>
                <Link to="/clips" className="text-gray-700 hover:underline">
                  Clips
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-2">
            <p className="font-semibold text-gray-800">Originals</p>
            <ul className="space-y-1">
              <li>
                <Link to="/trending" className="text-gray-700 hover:underline">
                  Trending
                </Link>
              </li>
              <li>
                <Link to="/reactions" className="text-gray-700 hover:underline">
                  Reactions
                </Link>
              </li>
              <li>
                <Link to="/packs" className="text-gray-700 hover:underline">
                  Packs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 text-sm text-gray-900 text-center">
          <p>
            © 2025 Suraj Savle, Inc. | Powered by{" "}
            <a
              href="https://developers.giphy.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:underline"
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
