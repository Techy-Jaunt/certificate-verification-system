import React from "react";
import { Route, Routes } from "react-router";

import SuccessDownloadAlumni from "./modals/SuccessDownloadAlumni";
import CertificateVerificationSuccess from "./modals/CertificateVerificationSuccess";
import Home from "./pages/Home";
import RecruiterSearch from "./pages/RecruiterSearch";
import CertificateRequest from "./pages/CertificateRequest";
import RecruiterSearchResults from "./pages/RecruiterSearchResults";
import { ErrorPopUp } from "./modals/ErrorPopup";
import CertificateVerificationPreview from "./pages/CertificateVerificationPreview";
import RecruiterCertificatePreview from "./pages/RecruiterCertificatePreview";
import Navbar from "./components/Navbar";

function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/certificate-request" element={<CertificateRequest />} />
        <Route path="/recruiter-search" element={<RecruiterSearch />} />
        <Route
          path="/recruiter-search-results"
          element={<RecruiterSearchResults />}
        />
        {/* download  */}
        <Route
          path="/alumni-certificate-download"
          element={<CertificateVerificationPreview />}
        />
        {/* preview  */}
        <Route
          path="/recruiter-certificate-preview"
          element={<RecruiterCertificatePreview />}
        />

        {/* success modal */}
        <Route
          path="/alumni-success-download"
          element={<SuccessDownloadAlumni />}
        />
        <Route
          path="/certificate-success-verification"
          element={<CertificateVerificationSuccess />}
        />
        {/* error modal  */}
        <Route path="/error-popup" element={<ErrorPopUp />} />
      </Routes>
    </>
  );
}
export default AppRoutes;
