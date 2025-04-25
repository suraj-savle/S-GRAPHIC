import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/GifContext";
import Gif from "../components/Gif";
import FollowOn from "../components/Follow";
import Loader from "../components/Loader";

import { HiMiniChevronDown, HiMiniChevronUp, HiMiniHeart } from "react-icons/hi2";
import { FaPaperPlane } from "react-icons/fa6";
import { IoCodeSharp } from "react-icons/io5";

const contentType = ["gifs", "stickers", "texts"];

const GifPage = () => {
  const { type, slug } = useParams();
  const [gif, setGif] = useState(null);
  const [relatedGifs, setRelatedGifs] = useState([]);
  const [readMore, setReadMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { GIF, addToFavorites, favorites } = GifState();

  useEffect(() => {
    if (!contentType.includes(type)) {
      setError("Invalid Content Type");
      return;
    }

    const fetchGifData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const gifId = slug.split("-").pop();
        const { data } = await GIF.gif(gifId);
        const { data: related } = await GIF.related(gifId, { limit: 10 });
        
        setGif(data);
        setRelatedGifs(related);
      } catch (err) {
        console.error("Error fetching GIF data:", err);
        setError("Failed to load GIF. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchGifData();
  }, [type, slug, GIF]);

  const handleShare = () => {
    if (!gif) return;
    const shareUrl = `${window.location.origin}/gifs/${type}/${slug}`;
    shareOnSocial({
      title: gif.title || "Check out this GIF!",
      url: shareUrl,
    });
  };

  const handleEmbed = () => {
    if (!gif) return;
    const embedCode = `<iframe src="${gif.embed_url}" width="${gif.images.original.width}" height="${gif.images.original.height}" frameBorder="0" allowFullScreen></iframe>`;
    copyToClipboard(embedCode);
    alert("Embed code copied to clipboard!");
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!gif) return <div className="text-center py-10">No GIF found</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 my-10 gap-6 px-4 max-w-7xl mx-auto">
      {/* Left Sidebar */}
      <div className="hidden md:block space-y-6">
        {gif.user && (
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex gap-3 items-center">
              <img
                src={gif.user.avatar_url}
                alt={gif.user.display_name}
                className="h-14 w-14 rounded-full object-cover"
              />
              <div>
                <div className="font-bold">{gif.user.display_name}</div>
                <div className="text-gray-400 text-sm">@{gif.user.username}</div>
              </div>
            </div>

            {gif.user.description && (
              <div className="mt-4">
                <p className="text-gray-300 text-sm whitespace-pre-line">
                  {readMore ? gif.user.description : `${gif.user.description.substring(0, 100)}...`}
                </p>
                <button
                  onClick={() => setReadMore(!readMore)}
                  className="text-purple-400 text-sm flex items-center mt-1 hover:text-purple-300"
                >
                  {readMore ? (
                    <>
                      Show less <HiMiniChevronUp className="ml-1" />
                    </>
                  ) : (
                    <>
                      Read more <HiMiniChevronDown className="ml-1" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        <FollowOn />
      </div>

      {/* Main Content */}
      <div className="md:col-span-3 space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h1 className="text-gray-300 text-xl font-bold mb-4 truncate">{gif.title}</h1>
            <div className="relative">
              <Gif gif={gif} hover={false} className="rounded-lg" />
              
              {/* Mobile User Info */}
              {gif.user && (
                <div className="md:hidden flex items-center gap-3 mt-4 p-3 bg-gray-800 rounded-lg">
                  <img
                    src={gif.user.avatar_url}
                    alt={gif.user.display_name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-bold">{gif.user.display_name}</div>
                    <div className="text-gray-400 text-sm">@{gif.user.username}</div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={handleShare} className="p-2 text-gray-300 hover:text-white">
                      <FaPaperPlane size={20} />
                    </button>
                    <button 
                      onClick={() => addToFavorites(gif.id)} 
                      className={`p-2 ${favorites.includes(gif.id) ? "text-red-500" : "text-gray-300 hover:text-white"}`}
                    >
                      <HiMiniHeart size={22} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex flex-col gap-4 w-48">
            <button
              onClick={() => addToFavorites(gif.id)}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${favorites.includes(gif.id) ? "bg-red-900/30 text-red-400" : "bg-gray-800 hover:bg-gray-700 text-gray-300"}`}
            >
              <HiMiniHeart size={24} />
              <span>Favorite</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-3 p-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
            >
              <FaPaperPlane size={20} />
              <span>Share</span>
            </button>
            <button
              onClick={handleEmbed}
              className="flex items-center gap-3 p-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
            >
              <IoCodeSharp size={24} />
              <span>Embed</span>
            </button>
          </div>
        </div>

        {/* Related GIFs */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4 text-gray-300">Related GIFs</h2>
          {relatedGifs.length > 0 ? (
            <div className="columns-2 md:columns-3 gap-3">
              {relatedGifs.map((relatedGif) => (
                <Gif gif={relatedGif} key={relatedGif.id} />
              ))}
            </div>
          ) : (
            <div className="text-gray-400">No related GIFs found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GifPage;