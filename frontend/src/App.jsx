import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import CertificateVerification from "./modals/CertificateVerificationSuccess";
import CertificateDownload from "./modals/SuccessDownloadAlumni";
import CertificatePreview from "./pages/CertificatePreview";
import CertificateRequest from "./pages/CertificateRequest";
import Home from "./pages/Home";
import RecruiterSearch from "./pages/RecruiterSearch";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recruiter-search" element={<RecruiterSearch />} />
      <Route path="/certificate-request" element={<CertificateRequest />} />
      <Route path="/certificate-verified" element={<CertificatePreview />} />
      <Route path="/certificate-download" element={<CertificateDownload />} />
      <Route
        path="/certificate-verification"
        element={<CertificateVerification />}
      />
    </Routes>
  );
}
export default AppRoutes;
