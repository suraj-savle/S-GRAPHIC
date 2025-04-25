import { useEffect, useState, useCallback } from "react";
import { GifState } from "../Context/GifContext";
import { useParams } from "react-router-dom";
import Gif from "../Components/Gif";
import FollowOn from "../Components/Follow";
import Loader from "../Components/Loader"; // Consider adding a loader

const Category = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state
  const { GIF } = GifState();
  const { category } = useParams();

  const fetchSearchResults = useCallback(async () => {
    try {
      if (!category) return;
      setLoading(true);
      const { data } = await GIF.search(category, { limit: 50 });
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  }, [category, GIF]);

  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col sm:flex-row gap-5 my-4 mx-5">
      {/* Sidebar */}
      <div className="w-full sm:w-72">
        {searchResults[0] && <Gif gif={searchResults[0]} />}
        <span className="text-gray-400 text-sm pt-2">
          Don&apos;t tell me, you don&apos;t follow us!
        </span>
        <FollowOn />
        <div className="w-full h-0.5 mt-6 bg-gray-800" />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <h2 className="text-4xl pb-1 font-extrabold capitalize">
          {category?.split("-").join(" & ")} GIFs
        </h2>
        <h2 className="text-lg text-gray-400 pb-3 font-bold hover:text-gray-50 cursor-pointer">
          @{category}
        </h2>

        {searchResults.length > 1 ? (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
            {searchResults.slice(1).map((gif) => (
              <Gif gif={gif} key={gif.id} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400">
            No GIFs found for this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;