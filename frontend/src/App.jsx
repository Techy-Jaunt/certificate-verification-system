import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RecruiterSearch from "./pages/RecruiterSearch";
import CertificateRequest from "./pages/CertificateRequest";
import CertificatePreview from "./pages/CertificatePreview";
import CertificateDownload from "./modals/SuccessDownloadAlumni";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recruiter-search" element={<RecruiterSearch />} />
        <Route path="/certificate-request" element={<CertificateRequest />} />
        <Route path="/certificate-verified" element={<CertificatePreview />} />
        <Route path="/certificate-download" element={<CertificateDownload />} />
        
      </Routes>
    </Router>
  );
}

export default AppRoutes;
