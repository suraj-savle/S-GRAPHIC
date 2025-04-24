import { GiphyFetch } from "@giphy/js-fetch-api";
import { createContext, useContext, useState } from "react";

const GifContecxt = createContext();

const GifProvider = ({ Children }) => {

  const [gifs, setGifs] = useState([]);
  const [filter, setFilter] = useState("gifs");
  const [favorites, setFavorites] = useState([]);

  const GIF = new GiphyFetch(import.meta.env.VITE_GIPHY_KEY);

  return (
    <GifContecxt.Provider value={{ GIF , gifs ,filter,setGifs,setFilter,favorites}}>{Children}</GifContecxt.Provider>
  );
};

export const GifState = () => {
  return useContext(GifContecxt);
};

export default GifProvider;
