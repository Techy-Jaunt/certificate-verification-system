import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router";
import AppRoutes from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <AppRoutes />
    </Router>
  </React.StrictMode>
);
