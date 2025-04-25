import { useState, useEffect } from "react";
import { HiMiniXMark, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";

const GifSearch = () => {
  const { query: urlQuery } = useParams(); // Get the query from the URL
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setQuery(urlQuery || ""); // Sync the input value with the URL query
  }, [urlQuery]);

  const searchGIFs = () => {
    if (query.trim() === "") return;
    navigate(`/search/${query}`);
  };

  return (
    <div className="flex relative my-3 mx-1 md:mx-10">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search all the GIFs and Stickers"
        className="w-full pl-4 pr-14 py-5 text-xl text-white rounded-tl rounded-bl border border-purple-300 outline-none"
      />
      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute bg-gray-300 opacity-90 rounded-full right-20 mr-2 top-6"
        >
          <HiMiniXMark size={22} />
        </button>
      )}
      <button
        onClick={searchGIFs}
        className="bg-gradient-to-tr from-purple-600 to-purple-400 text-white px-4 py-2 rounded-tr rounded-br"
      >
        <HiOutlineMagnifyingGlass size={35} className="-scale-x-100" />
      </button>
    </div>
  );
};

export default GifSearch;