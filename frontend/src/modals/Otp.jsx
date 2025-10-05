import { useState, useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';

const Otp = ({ closeOtp, setOpenSuccessModal }) => {
	const [verifyOtp, setVerifyOtp] = useState('Verify Otp');

	// Just Testing the different states with the two expressions immediately below
	const [otpOk, setOtpOk] = useState(false);
	const [isSuccess, setIsSuccess] = useState(true);

	const [otp, setOtp] = useState('');
	const isValidOtp = /^\d{6}$/.test(otp);

	const timerRef = useRef(null);

	const handleVerifyBtnClick = async () => {
		setVerifyOtp('Verifying....');

		if (timerRef.current) clearTimeout(timerRef.current);

		timerRef.current = setTimeout(async () => {
			// Just Testing the different states with the two expressions immediately below
			setOtpOk(true);
			// setIsSuccess((prev) => !prev);
			setVerifyOtp('Verify Otp');
			timerRef.current = null;
			closeOtp();
			setOpenSuccessModal(true);
		}, 1000);
	};

	useEffect(() => {
		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, []);

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
					<div className="input-box w-full  flex flex-col gap-2 py-4">
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
							disabled={!isValidOtp}
							className={`${
								isValidOtp ? 'bg-primary-950' : 'bg-[var(--color-dark-active)]'
							} text-white h-8 rounded-md ${
								isValidOtp ? 'cursor-pointer' : 'cursor-auto'
							}`}
							onClick={handleVerifyBtnClick}
						>
							{verifyOtp}
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
export default Otp;
