// import axios from 'axios';

// const BASE_URL =
// 	'https://certificate-verification-system-m7s7.onrender.com/api/certificate';

// // 🔹 Simple reusable fetch function
// export const fetchCertificateData = async (
// 	endpoint,
// 	method = 'GET',
// 	data = {}
// ) => {
// 	try {
// 		let response;

// 		if (method === 'GET') {
// 			// For GET: send as query params
// 			response = await axios.get(`${BASE_URL}/${endpoint}`, { params: data });
// 		} else if (method === 'POST') {
// 			// For POST: send as request body
// 			console.log('📦 Sending:', data);
// 			console.log('📡 URL:', `${BASE_URL}/${endpoint}`);
// 			console.log('📨 Method:', method);

// 			response = await axios.post(`${BASE_URL}/${endpoint}`, data);
// 		}

// 		console.log('✅ API Response:', response.data);
// 		return response.data;
// 	} catch (error) {
// 		console.error('❌ API Error:', error.response?.data || error.message);
// 		throw error.response?.data || { message: 'Request failed' };
// 	}
// };

import axios from 'axios';

const BASE_URL =
	'https://certificate-verification-system-m7s7.onrender.com/api/certificate';

export const fetchCertificateData = async (
	endpoint,
	method = 'GET',
	data = {}
) => {
	try {
		console.log('📦 Sending:', data);
		console.log('📡 URL:', `${BASE_URL}/${endpoint}`);
		console.log('📨 Method:', method);

		const config = {
			headers: { 'Content-Type': 'application/json' },
		};

		let response;

		if (method === 'GET') {
			response = await axios.get(`${BASE_URL}/${endpoint}`, {
				params: data,
				...config,
			});
		} else if (method === 'POST') {
			response = await axios.post(`${BASE_URL}/${endpoint}`, data, config);
		}

		console.log('✅ API Response:', response.data);
		return response.data;
	} catch (error) {
		console.error('❌ API Error:', error.response?.data || error.message);
		throw error.response?.data || { message: 'Request failed' };
	}
};
