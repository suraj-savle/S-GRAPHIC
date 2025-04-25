import { createContext, useContext, useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";

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
        setGifs,
        filter,
        setFilter,
        favorites,
        setFavorites,
      }}
    >
      {children}
    </GifContext.Provider>
  );
};

export const GifState = () => useContext(GifContext);

export default GifProvider;