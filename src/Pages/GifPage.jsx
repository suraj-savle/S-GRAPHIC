import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GifState } from "../context/GifContext";
import Gif from "../components/Gif";
import FollowOn from "../components/Follow";
import { FaLink, FaDownload } from "react-icons/fa6";

const contentType = ["gifs", "stickers", "texts"];

const GifPage = () => {
  const { type, slug } = useParams();
  const navigate = useNavigate();
  const [gif, setGif] = useState({});
  const [relatedGifs, setRelatedGifs] = useState([]);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

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
      setDownloading(true);
      const url = gif.images?.original?.url || gif.images?.downsized?.url;
      if (!url) return;

      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${gif.slug || gif.id}.${type === "stickers" ? "webp" : "gif"}`;
      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
        setDownloading(false);
      }, 100);
    } catch (error) {
      console.error("Download failed:", error);
      setDownloading(false);
    }
  };

  const copyGifLink = () => {
    const gifUrl = `${window.location.origin}/${type}/${slug}`;
    navigator.clipboard
      .writeText(gifUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => setCopied(false));
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

            {/* Mobile buttons */}
            <div className="flex sm:hidden gap-4 mt-4 justify-center">
              <button
                onClick={copyGifLink}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  copied ? "bg-green-600" : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                <FaLink size={20} />
                <span>{copied ? "Copied!" : "Copy Link"}</span>
              </button>
              <button
                onClick={downloadGif}
                disabled={downloading}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  downloading ? "bg-gray-600" : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                <FaDownload size={20} />
                <span>{downloading ? "Downloading..." : "Download"}</span>
              </button>
            </div>
          </div>

          {/* Desktop buttons */}
          <div className="hidden sm:flex flex-col gap-4">
            <button
              onClick={copyGifLink}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                copied ? "bg-green-600" : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              <FaLink size={20} />
              <span>{copied ? "Copied!" : "Copy Link"}</span>
            </button>
            <button
              onClick={downloadGif}
              disabled={downloading}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                downloading ? "bg-gray-600" : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              <FaDownload size={20} />
              <span>{downloading ? "Downloading..." : "Download"}</span>
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
                className="cursor-pointer mb-2 hover:opacity-90 transition-opacity"
              >
                <Gif gif={relatedGif} />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="block sm:hidden border-t-2 pt-4">
        <FollowOn />
      </div>
    </div>
  );
};

export default GifPage;