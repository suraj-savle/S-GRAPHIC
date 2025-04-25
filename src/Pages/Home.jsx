import { useEffect, useState, useCallback } from "react";
import { GifState } from "../context/GifContext";
import Gif from "../components/Gif";
import GifSearch from "../components/GifSearch";
import FilterGif from "../components/FilterGif";
import Loader from "../components/Loader"; 
function Home() {
  const { GIF, gifs, setGifs, filter } = GifState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTrendingGIFs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await GIF.trending({
        limit: 50,
        type: filter,
        rating: "g",
      });
      setGifs(data);
    } catch (err) {
      console.error("Error fetching trending GIFs:", err);
      setError("Failed to load GIFs. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [GIF, filter, setGifs]);

  useEffect(() => {
    fetchTrendingGIFs();
  }, [fetchTrendingGIFs]);

  return (
    <div className="px-5">
      {/* Search and Welcome Section */}
      <GifSearch />
      <div className="w-full h-30 md:h-40 mb-5 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex items-center justify-center text-xl md:text-4xl font-bold px-5 text-white shadow-lg rounded-lg">
        <h1>Welcome to S-GRAPHIC! Discover GIFs, Stickers, and More!</h1>
      </div>

      {/* Filter Controls */}
      <FilterGif />

      {/* Status Indicators */}
      {loading && <Loader />}
      {error && (
        <div className="text-center py-10 text-red-500">
          {error}
          <button 
            onClick={fetchTrendingGIFs}
            className="ml-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Retry
          </button>
        </div>
      )}

      {/* GIF Grid */}
      {!loading && !error && (
        <>
          {gifs.length > 0 ? (
            <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 px-1 md:px-10 py-3">
              {gifs.map((gif) => (
                <div
                  key={gif.id}
                  className="mb-4 transform transition duration-300 hover:scale-105 hover:shadow-lg rounded-lg overflow-hidden"
                >
                  <Gif gif={gif} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              No GIFs found. Try a different filter.
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;