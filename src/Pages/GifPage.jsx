import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GifState } from "../context/GifContext";
import Gif from "../components/Gif";
import FollowOn from "../components/Follow";

import { FaLink } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa6";

const contentType = ["gifs", "stickers", "texts"];

const GifPage = () => {
  const { type, slug } = useParams();
  const navigate = useNavigate();
  const [gif, setGif] = useState({});
  const [relatedGifs, setRelatedGifs] = useState([]);

  const { GIF } = GifState();

  useEffect(() => {
    if (!contentType.includes(type)) {
      throw new Error("Invalid Content Type");
    }
    const fetchGif = async () => {
      const gifId = slug.split("-").pop();
      const { data } = await GIF.gif(gifId);
      const { data: related } = await GIF.related(gifId, { limit: 10 });
      setGif(data);
      setRelatedGifs(related);
    };

    fetchGif();
  }, [type, slug]);

  const handleRelatedGifClick = (relatedGif) => {
    const gifSlug = `${relatedGif.slug || relatedGif.id}`;
    navigate(`/${type}/${gifSlug}`);
  };

  const downloadGif = async () => {
    try {
      const url = gif.images?.original?.url || gif.images?.downsized?.url;
      if (!url) return;

      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${gif.slug || gif.id}.${
        type === "stickers" ? "webp" : "gif"
      }`;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      }, 100);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const copyGifLink = () => {
    const gifUrl = `${window.location.origin}/${type}/${slug}`;
    navigator.clipboard
      .writeText(gifUrl)
      .then(() => alert("Link copied to clipboard!"))
      .catch(() => alert("Failed to copy link"));
  };

  return (
    <div className="flex flex-col sm:flex-row my-10 gap-6 px-5 sm:px-10 md:px-20">
      <div className="hidden sm:block">
        <FollowOn />
      </div>

      <div className="flex-1">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <Gif gif={gif} hover={false} />

            {/* Mobile share/embed buttons */}
            <div className="flex sm:hidden gap-4 mt-4 justify-center">
              <button
                onClick={copyGifLink}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <FaLink size={20} />
                <span>Copy Link</span>
              </button>
              <button
                onClick={downloadGif}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg"
              >
                <FaDownload size={20} />
                <span>Download</span>
              </button>
            </div>
          </div>

          {/* Desktop share/embed buttons */}
          <div className="hidden sm:flex flex-col gap-4">
            <button
              onClick={copyGifLink}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <FaLink size={20} />
              <span>Copy Link</span>
            </button>
            <button
              onClick={downloadGif}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg"
            >
              <FaDownload size={20} />
              <span>Download</span>
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="font-extrabold mb-4">Related GIFs</h2>
          <div className="columns-2 md:columns-3 gap-2">
            {relatedGifs.slice(1).map((relatedGif) => (
              <div
                key={relatedGif.id}
                onClick={() => handleRelatedGifClick(relatedGif)}
                className="cursor-pointer mb-2"
              >
                <Gif gif={relatedGif} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="block sm:hidden border-t-2">
        <FollowOn />
      </div>
    </div>
  );
};

export default GifPage;
