import React from "react";
import { Route, Routes } from "react-router";

import { CertificateDownloadForm } from "./pages/CertificateDownloadForm";
import SuccessDownloadAlumni from "./modals/SuccessDownloadAlumni";
import CertificateVerificationSuccess from "./modals/CertificateVerificationSuccess";
import Home from "./pages/Home";
import RecruiterSearch from "./pages/RecruiterSearch";
// import CertificatePreview from "./pages/CertificatePreview"; page does not exist yet
import CertificateRequest from "./pages/CertificateRequest";
import CertificateDownload from "./modals/SuccessDownloadAlumni";
import CertificateVerification from "./modals/CertificateVerificationSuccess";
import RecruiterSearchResults from "./pages/RecruiterSearchResults";
import { ErrorPopUp } from "./modals/ErrorPopup";
import CertificateVerificationPreview from "./pages/CertificateVerificationPreview";
import RecruiterCertificatePreview from "./pages/RecruiterCertificatePreview";
import Navbar from "./components/Navbar";
import Otp from "./modals/Otp";

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
        <Route path="/download-certificate" element={<CertificateDownloadForm />} />

        {/* success modal */}
        <Route
          path="/alumni-success-download"
          element={<SuccessDownloadAlumni />}
        />
        <Route
          path="/certificate-success-verification"
          element={<CertificateVerificationSuccess />}
        />
        <Route
          path="/otp"
          element={<Otp />}
        />
        {/* error modal  */}
        <Route path="/error-popup" element={<ErrorPopUp />} />
        {/* Event Registration Modal */}
        
      </Routes>
    </>
  );
}
export default AppRoutes;
