import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import Home from "./pages/Home";
import RecruiterSearch from "./pages/RecruiterSearch";
import CertificateRequest from "./pages/CertificateRequest";
import CertificatePreview from "./pages/CertificatePreview";
import RecruiterSearchResults from "./pages/RecruiterSearchResults";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recruiter-search" element={<RecruiterSearch />} />
        <Route path="/certificate-request" element={<CertificateRequest />} />
        <Route path="/certificate-verified" element={<CertificatePreview />} />
        <Route
          path="/recruiter-search-results"
          element={<RecruiterSearchResults />}
        />
      </Routes>
    </Router>
  );
}
export default AppRoutes;
