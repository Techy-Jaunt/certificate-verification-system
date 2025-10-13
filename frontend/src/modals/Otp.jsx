import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import { ErrorPopUp } from './ErrorPopup';

const Otp = ({ closeOtp, setOpenSuccessModal }) => {
	// Just Testing the different states with the two expressions immediately below
	const [otpOk, setOtpOk] = useState(false);
	const [isSuccess, setIsSuccess] = useState(true);
	const [loading, setLoading] = useState(false);
	const [otp, setOtp] = useState('');
	const [errorModalOpen, setErrorModalOpen] = useState(false);

	const handleVerify = async (e) => {
		e.preventDefault();

		setLoading(true);

		// ✅ Retrieve saved data
		const storedData = JSON.parse(localStorage.getItem('certificateData'));
		if (!storedData) {
			alert('Certificate details missing. Please start again.');
			return;
		}

		if (!otp) {
			setLoading(false);
			return;
		}

		const { email, track } = storedData;
		const payload = { email, track, otp };

		try {
			const response = await axios.post(
				'https://techyjaunt-react.onrender.com/api/certificate/verify-otp',
				payload
			);
			console.log('✅ OTP verified:', response.data);
			setOtpOk(true);
			// closeOtp();
			setOpenSuccessModal(true);
			setIsSuccess(true);

			localStorage.removeItem('certificateData');
		} catch (error) {
			setErrorModalOpen(true);
			setIsSuccess(false);
			console.log(error);
			console.error(
				'❌ OTP verification failed:',
				error.response?.data || error.message
			);

			localStorage.removeItem('certificateData');
		} finally {
			console.log('done');
			setLoading(false);
		}
	};

	useEffect(() => {
		document.body.style.overflow = 'hidden'; // lock scroll
		return () => {
			document.body.style.overflow = 'auto'; // restore when modal closes
		};
	}, []);

	return (
		<>
			<div className="fixed z-40 inset-0 flex items-center justify-center bg-black/50">
				<div className="bg-[var(--color-light)] w-96 max-w-full px-10 py-6 flex flex-col gap-2 relative rounded-md">
					<button
						className="p-1 absolute top-5 right-4 cursor-pointer"
						onClick={closeOtp}
					>
						<FaTimes size={12} />
					</button>

					<h3 className="font-semibold">OTP Verification</h3>
					<p className="text-[var(--color-darker)] text-sm">
						Enter the 6-digit pin sent to your email
					</p>
					<form
						className="input-box w-full  flex flex-col gap-2 py-4"
						onSubmit={handleVerify}
					>
						<label htmlFor="" className="font-semibold text-sm">
							OTP Code
						</label>
						<input
							type="text"
							value={otp}
							onChange={(e) => setOtp(e.target.value)}
							placeholder="000000"
							className="h-8 text-center border rounded-md"
						/>
						<div className={`${otpOk ? 'block' : 'hidden'}`}>
							{isSuccess ? (
								<span className="w-max bg-[#E1F7E2] text-[var(--color-success)] px-2 rounded-lg">
									Verification complete
								</span>
							) : (
								<span className="w-max bg-[#FCE1E1] text-[var(--color-error)] px-2 rounded-lg">
									Incorrect Otp
								</span>
							)}
						</div>
						<button
							disabled={loading || otp === ''}
							className={`${
								loading || otp === ''
									? 'bg-[var(--color-dark-active)] hover:bg-[var(--color-dark-hover)] cursor-not-allowed h-8 rounded-md text-white'
									: 'bg-primary-950 cursor-pointer hover:opacity-70 h-8 rounded-md text-white'
							}`}
							// onClick={handleVerifyBtnClick}
						>
							{loading ? 'Verifying...' : 'Verify OTP'}
						</button>
					</form>
				</div>

				{/* Error Modal */}
				{errorModalOpen && (
					<ErrorPopUp
						// message={message}
						onClose={() => setErrorModalOpen(false)}
					/>
				)}
				{/* OTP Modal */}
				{/* {openOtpModal && (
				<OTPModal message={message} onClose={() => setOpenOtpModal(false)} />
			)} */}
			</div>
		</>
	);
};
export default Otp;
