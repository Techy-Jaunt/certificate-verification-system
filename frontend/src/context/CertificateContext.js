import React, { createContext, useState } from "react";

// Create the context
const CertificateContext = createContext();

// Provider component
export const CertificateProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]); // Store recruiter search results
  const [selectedCertificate, setSelectedCertificate] = useState(null); // Currently selected certificate
  const [certificateStatus, setCertificateStatus] = useState(null); // Status such as 'verified', 'downloaded', 'error'
  const [error, setError] = useState(null); // To store errors such as "We couldn't find your details"
  const [isLoading, setIsLoading] = useState(false); // Loading status for async actions

  // Function to handle certificate search by recruiter
  const searchCertificates = async (name, cohort) => {
    setIsLoading(true);
    setError(null);
    try {
      // Call your API or service to get search results
      const response = await fetch(
        `/api/certificates?name=${name}&cohort=${cohort}`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        setSearchResults(data);
      } else {
        setSearchResults([]);
        setError("No matching certificates found");
      }
    } catch (err) {
      console.log(err);

      setError("An error occurred while searching");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to select a certificate to preview or download
  const selectCertificate = (certificate) => {
    setSelectedCertificate(certificate);
    setCertificateStatus(null);
    setError(null);
  };

  // Function to verify the selected certificate
  const verifyCertificate = async () => {
    if (!selectedCertificate) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/certificates/verify/${selectedCertificate.id}`
      );
      const result = await response.json();

      if (result.isValid) {
        setCertificateStatus("verified");
      } else {
        setCertificateStatus("error");
        setError("Certificate could not be verified");
      }
    } catch (err) {
      console.log(err);
      setCertificateStatus("error");
      setError("Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to download certificate
  const downloadCertificate = async () => {
    if (!selectedCertificate) return;

    // Simulate download and set status
    try {
      setCertificateStatus("downloaded");
    } catch {
      setCertificateStatus("error");
      setError("Download failed");
    }
  };

  // Clear all selections and errors
  const clearState = () => {
    setSelectedCertificate(null);
    setCertificateStatus(null);
    setError(null);
    setSearchResults([]);
  };

  return (
    <CertificateContext.Provider
      value={{
        searchResults,
        selectedCertificate,
        certificateStatus,
        error,
        isLoading,
        searchCertificates,
        selectCertificate,
        verifyCertificate,
        downloadCertificate,
        clearState,
      }}
    >
      {children}
    </CertificateContext.Provider>
  );
};

// Custom hook to use the certificate context
// export const useCertificate = () => {
//   return useContext(CertificateContext);
// };
