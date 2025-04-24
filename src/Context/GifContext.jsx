import { GiphyFetch } from "@giphy/js-fetch-api";
import { createContext, useContext, useState, useEffect } from "react";

const GifContext = createContext();

const GifProvider = ({ children }) => {
  const [gifs, setGifs] = useState([]);
  const [filter, setFilter] = useState("gifs");
  const [favorites, setFavorites] = useState([]);

  const GIF = new GiphyFetch(import.meta.env.VITE_GIPHY_KEY);


  return (
    <GifContext.Provider
      value={{
        GIF,
        gifs,
        filter,
        setGifs,
        setFilter,
        favorites,
        setFavorites,
      }}
    >
      {children}
    </GifContext.Provider>
  );
};

export const GifState = () => {
  return useContext(GifContext);
};

export default GifProvider;