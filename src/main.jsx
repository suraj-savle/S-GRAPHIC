import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import GifProvider from "./context/GifContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GifProvider>
      <App />
    </GifProvider>
  </BrowserRouter>
);