import axios from "axios";

const API_BASE_URL = "https://your-api-endpoint.com/api/certificates";

const certificateService = {
  // Request a certificate (Certificate Request Portal)
  requestCertificate: (certificateData) => {
    // certificateData: { fullName, email, cohort, track }
    return axios.post(`${API_BASE_URL}/request`, certificateData);
  },

  // Search certificates (Recruiter Search Results)
  searchCertificates: (searchParams) => {
    // searchParams: { name, cohort }
    return axios.get(`${API_BASE_URL}/search`, { params: searchParams });
  },

  // Verify a certificate (Recruiters Certificate preview and verification)
  verifyCertificate: (certificateId) => {
    return axios.get(`${API_BASE_URL}/verify/${certificateId}`);
  },

  // Download a certificate (Successful download pop-ups for Recruiter and Alumni)
  downloadCertificate: (certificateId) => {
    return axios({
      method: "GET",
      url: `${API_BASE_URL}/download/${certificateId}`,
      responseType: "blob", // Important for downloading files
    });
  },

  // Additional helper: View certificate preview (if needed)
  getCertificatePreview: (certificateId) => {
    return axios.get(`${API_BASE_URL}/preview/${certificateId}`);
  },
};

export default certificateService;
