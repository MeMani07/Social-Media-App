import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/authContext";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { PostContextProvider } from "./context/postContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <PostContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
      </PostContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>
);
