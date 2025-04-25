import { useEffect, useState, useCallback } from "react";
import { GifState } from "../context/GifContext";
import { useParams } from "react-router-dom";
import Gif from "../components/Gif";
import FilterGif from "../components/FilterGif";
import Loader from "../components/Loader";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { GIF, filter } = GifState();
  const { query } = useParams();

  const fetchSearchResults = useCallback(async () => {
    try {
      if (!query) return;
      
      setLoading(true);
      setError(null);
      
      const { data } = await GIF.search(query, {
        sort: "relevant",
        lang: "en",
        type: filter,
        limit: 50, // Increased limit for better initial results
      });
      
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setError("Failed to load search results. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [query, filter, GIF]);

  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]);

  return (
    <div className="my-4 px-2 md:px-5 max-w-7xl mx-auto">
      {/* Search Header */}
      <div className="mb-6">
        <h2 className="text-3xl md:text-5xl pb-3 font-extrabold capitalize">
          Results for "{query}"
        </h2>
        <FilterGif alignLeft={true} />
      </div>

      {/* Status Indicators */}
      {loading && <Loader className="my-10" />}
      
      {error && (
        <div className="text-center py-10">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchSearchResults}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Retry Search
          </button>
        </div>
      )}

      {/* Results Grid */}
      {!loading && !error && (
        <>
          {searchResults.length > 0 ? (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
              {searchResults.map((gif) => (
                <div 
                  key={gif.id} 
                  className="mb-2 break-inside-avoid"
                >
                  <Gif gif={gif} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              <p>No {filter === 'stickers' ? 'stickers' : 'GIFs'} found for "{query}".</p>
              {filter !== 'stickers' && (
                <button
                  onClick={() => window.location.href = `/search/${query}?type=stickers`}
                  className="mt-3 px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
                >
                  Try searching for Stickers instead
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage;