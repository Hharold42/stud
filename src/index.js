import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import UltimateProvider from "./context/UltimateContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UltimateProvider>
    <App />
  </UltimateProvider>
);
