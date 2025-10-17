import React, { useEffect, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { fetchCertificateData } from '../services/certificateService';
import { ErrorPopUp } from './ErrorPopup';
import axios from 'axios';

const CustomDropdown = ({ label, placeholder, options, value, onChange }) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleSelect = (option) => {
		onChange(option.value);
		setIsOpen(false);
	};

	useEffect(() => {
		document.body.style.overflow = 'hidden'; // lock scroll
		return () => {
			document.body.style.overflow = 'auto'; // restore when modal closes
		};
	}, []);

	return (
		<div className="form-group mb-5">
			<label className="block text-gray-700 font-semibold mb-2">{label}</label>
			<div className="relative">
				<div
					className={`
            w-full p-3 border border-gray-300 rounded-md bg-white 
            flex items-center justify-between cursor-pointer 
            transition-all duration-300 
            ${isOpen ? 'border-blue-500 shadow-md' : 'border-gray-300'}
          `}
					onClick={() => setIsOpen(!isOpen)}
				>
					<span
						className={`text-sm ${
							value ? 'text-gray-800' : 'text-gray-400 italic'
						}`}
					>
						{options.find((opt) => opt.value === value)?.label || placeholder}
					</span>
					<ChevronDownIcon
						className={`w-5 h-5 text-gray-400 transition-transform duration-300 
              ${isOpen ? 'transform rotate-180' : ''}`}
					/>
				</div>
				{isOpen && (
					<ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden max-h-48 overflow-y-auto">
						{options.map((option, index) => (
							<li
								key={index}
								className="p-3 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
								onClick={() => handleSelect(option)}
							>
								{option.label}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export const CertificateDownloadForm = ({ onClose, setOpenOtpModal }) => {
	const [formData, setFormData] = useState({
		email: '',
		cohort: '',
		track: '',
	});

	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [errorModalOpen, setErrorModalOpen] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			// Save details locally for OTP verification step
			localStorage.setItem('certificateData', JSON.stringify(formData));

			const response = await axios.post(
				'https://techyjaunt-react.onrender.com/api/certificate/request',
				{
					email: formData.email,
					cohort: formData.cohort,
					track: formData.track,
				}
			);

			const data = response.data;

			setMessage(response.data || 'OTP sent to your email!');
			setOpenOtpModal(true);
			setLoading(false);
		} catch (error) {
			// console.error('Error:', error.response?.data || error.message);
			setMessage(error.response?.data?.message || 'Something went wrong.');
			setErrorModalOpen(true);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="fixed z-40 inset-0 flex items-center justify-center bg-black/50">
			<div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative">
				<div className="flex justify-between items-start border-b border-gray-200 pb-5 mb-6">
					<div>
						{/* {message && (
							<div
								className={`px-4 py-2 rounded mb-3 w-full ${
									message.toLowerCase().includes('wrong') ||
									message.toLowerCase().includes('error')
										? 'bg-red-100 border border-red-400 text-red-700'
										: 'bg-green-100 border border-green-400 text-green-700'
								}`}
							>
								{message}
							</div>
						)} */}
						<h2 className="text-xl font-bold text-primary-950">
							Download Certificate
						</h2>
						<p className="text-sm text-blue-400 mt-1">
							Enter your correct details
						</p>
					</div>

					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700 text-large ml-4"
						type="button"
					>
						✕
					</button>
				</div>

				<form onSubmit={handleSubmit}>
					<div className="form-group mb-5">
						<label
							htmlFor="email"
							className="block text-gray-700 font-semibold mb-2"
						>
							E-mail
						</label>
						<input
							type="email"
							id="email"
							value={formData.email}
							onChange={(e) =>
								setFormData({ ...formData, email: e.target.value })
							}
							placeholder="Kindly input your registered Techyjaunt E-mail"
							className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 placeholder-italic text-sm"
							required
						/>
					</div>

					<CustomDropdown
						label="Cohort"
						placeholder="Kindly input your Techyjaunt cohort"
						options={[
							{ label: 'Cohort 1', value: 1 },
							{ label: 'Cohort 2', value: 2 },
							{ label: 'Cohort 3', value: 3 },
							{ label: 'Cohort 4', value: 4 },
							{ label: 'Cohort 5', value: 5 },
							{ label: 'Cohort 6', value: 6 },
						]}
						value={formData.cohort}
						onChange={(val) => setFormData({ ...formData, cohort: val })}
					/>

					<CustomDropdown
						label="Track"
						placeholder="Kindly input your track"
						options={[
							{ label: 'UI/UX', value: 'uiux' },
							{ label: 'Cybersecurity', value: 'cybersecurity' },
							{ label: 'Blockchain', value: 'blockchain' },
							{ label: 'Frontend Development', value: 'frontend' },
							{ label: 'Backend Development', value: 'backend' },
							{ label: 'Data Analysis', value: 'data analysis' },
							{ label: 'Product Management', value: 'product management' },
						]}
						value={formData.track}
						onChange={(val) => setFormData({ ...formData, track: val })}
					/>

					<button
						type="submit"
						className={`bg-blue-600 text-white font-bold py-2 px-5 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300 mt-6 flex items-center justify-center space-x-2 mx-auto  ${
							loading ? 'opacity-50 cursor-not-allowed' : ''
						}`}
						disabled={loading}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2.5}
							stroke="currentColor"
							className="w-5 h-5 -rotate-45 transform"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
							/>
						</svg>
						<span>{loading ? 'Fetching Certificate...' : 'Submit'}</span>
					</button>
				</form>
			</div>

			{/* Error Modal */}
			{errorModalOpen && (
				<ErrorPopUp
					message={message}
					onClose={() => setErrorModalOpen(false)}
				/>
			)}
			{/* OTP Modal */}
			{/* {openOtpModal && (
				<OTPModal message={message} onClose={() => setOpenOtpModal(false)} />
			)} */}
		</div>
	);
};
