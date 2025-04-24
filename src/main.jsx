import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import GifProvider from "./Context/GifContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GifProvider>
      <App />
    </GifProvider>
  </BrowserRouter>
);
