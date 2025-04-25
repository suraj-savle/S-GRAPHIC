export const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };
  
  export const shareOnSocial = ({ title, url }) => {
    if (navigator.share) {
      navigator.share({ title, url });
    } else {
      copyToClipboard(url);
      alert("Link copied to clipboard!");
    }
  };