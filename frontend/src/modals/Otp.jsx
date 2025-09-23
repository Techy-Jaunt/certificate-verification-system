import { useState } from "react";
import { useNavigate } from "react-router";
import { FaTimes } from "react-icons/fa";

const Otp = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [otp, setOtp] = useState("");
  const isValidOtp = /^\d{6}$/.test(otp);

  const navigate = useNavigate();

  const handleCloseBtnClick = () => {
    setIsOpen((prev) => !prev);
    navigate("/");
  };

  return (
    <>
      {isOpen && (
        <div className="h-[calc(100vh-4.2rem)] px-4 flex flex-col items-center justify-center border">
          (<div className="overlay bg-black opacity-65 absolute inset-0"></div>
          <div className="bg-white w-96 max-w-full px-10 py-6 flex flex-col gap-2 relative rounded-md">
            <button
              className="p-1 absolute top-5 right-4 cursor-pointer"
              onClick={handleCloseBtnClick}
            >
              <FaTimes size={16} />
            </button>

            <h3 className="font-semibold">OTP Verification</h3>
            <p>Enter the 6-digit pin sent to your email</p>
            <div className="input-box w-full  flex flex-col gap-2">
              <label htmlFor="" className="font-semibold">
                OTP Code
              </label>
              <input
                type="number"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="000000"
                className="h-8 text-center border rounded-md"
              />
              <button
              disabled={!isValidOtp}
                className={`${
                  isValidOtp ? "bg-[#0667D6]" : "bg-[#686868]"
                } text-white h-8 rounded-md`}
              >
                Verify OTP
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Otp;
