import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { FaTimes } from "react-icons/fa";

const Otp = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [verifyOtp, setVerifyOtp] = useState("Verify Otp");

  // Just Testing the different states with the two expressions immediately below
  const [ otpOk, setOtpOk ] = useState(true);
  const [ isSuccess, setIsSuccess ] = useState(true);

  const [otp, setOtp] = useState("");
  const isValidOtp = /^\d{6}$/.test(otp);

  const navigate = useNavigate();
  const timerRef = useRef(null);

  const handleCloseBtnClick = () => {
    setIsOpen((prev) => !prev);
    navigate("/");
  };

  const handleVerifyBtnClick = () => {
   // Just Testing the different states with the two expressions immediately below
    setOtpOk(prev => !prev);
    setIsSuccess(prev => !prev);

    setVerifyOtp("Verifying....");

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setVerifyOtp("Verify Otp");
      timerRef.current = null;
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <>
      {isOpen && (
        <div className="h-[calc(100vh-4.2rem)] px-4 flex flex-col items-center justify-center border">
          <div className="overlay bg-[var(--color-darkened)] opacity-65 absolute inset-0"></div>
          <div className="bg-[var(--color-light)] w-96 max-w-full px-10 py-6 flex flex-col gap-2 relative rounded-md">
            <button
              className="p-1 absolute top-5 right-4 cursor-pointer"
              onClick={handleCloseBtnClick}
            >
              <FaTimes size={16} />
            </button>

            <h3 className="font-semibold">OTP Verification</h3>
            <p className="text-[var(--color-darker)]">Enter the 6-digit pin sent to your email</p>
            <div className="input-box w-full  flex flex-col gap-2">
              <label htmlFor="" className="font-semibold">
                OTP Code
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="000000"
                className="h-8 text-center border rounded-md"
              />
              <div className={`${otpOk? "bloxk" : "hidden"}`}>
              {isSuccess? (<span className="w-max bg-[#E1F7E2] text-[var(--color-success)] px-2 rounded-lg">Verification complete</span>) : (<span className="w-max bg-[#FCE1E1] text-[var(--color-error)] px-2 rounded-lg">Incorrect Otp</span>)}
              </div>
              <button
                disabled={!isValidOtp}
                className={`${
                  isValidOtp ? "bg-[var(--color-primary-400)]" : "bg-[var(--color-dark-active)]"
                } text-white h-8 rounded-md ${
                  isValidOtp ? "cursor-pointer" : "cursor-auto"
                }`}
                onClick={handleVerifyBtnClick}
              >
                {verifyOtp}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Otp;
