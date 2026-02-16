import React from "react";
import { createRoot } from "react-dom/client";
import MainScreen from "./imports/MainScreen.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <div style={{ width: '1152px', height: '646.4px' }}>
    <MainScreen />
  </div>
);
  