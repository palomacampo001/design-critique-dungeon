import React from "react";
import { createRoot } from "react-dom/client";
import OfficeWayfinder from "./components/OfficeWayfinder.jsx";
import "./styles/globals.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <OfficeWayfinder />
  </React.StrictMode>
);
