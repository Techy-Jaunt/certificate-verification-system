import axios from 'axios';

const API_BASE_URL =
	'https://certificate-verification-system-m7s7.onrender.com/api/certificate';

export const certificateService = {
	// 🔹 POST request to request certificate (OTP)
	requestCertificate: async (formData) => {
		try {
			const response = await axios.post(`${API_BASE_URL}/request`, formData);
			return response.data;
		} catch (error) {
			throw error.response?.data || { message: 'Request failed' };
		}
	},

	// 🔹 POST request to verify OTP
	verifyOtp: async (formData) => {
		try {
			const response = await axios.post(`${API_BASE_URL}/verify-otp`, formData);
			console.log('📩 Verify OTP Response:', response.data);
			return response.data;
		} catch (error) {
			throw error.response?.data || { message: 'OTP verification failed' };
		}
	},

	// 🔹 GET request to verify certificate by email & track
	verifyCertificate: async ({ email, track }) => {
		try {
			const response = await axios.get(`${API_BASE_URL}/verify`, {
				params: { email, track },
			});
			return response.data;
		} catch (error) {
			throw error.response?.data || { message: 'Verification failed' };
		}
	},
};
