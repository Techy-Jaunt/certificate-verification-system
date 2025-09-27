import { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";

const VerifyGraduates = ({ closeVerifyGraduates, setRecruiterSearch }) => {
  const [verifyData, setVerifyData] = useState("Verify");
  const [otpOk, setOtpOk] = useState(false);
  const [data, setData] = useState("");

  const timerRef = useRef(null);

  const handleVerifyBtnClick = () => {
    setVerifyData("Verifying....");
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setOtpOk(true);
      setVerifyData("Verify");
      timerRef.current = null;
      closeVerifyGraduates();
      setRecruiterSearch(true);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden"; // lock scroll
    return () => {
      document.body.style.overflow = "auto"; // restore when modal closes
    };
  }, []);

  return (
    <>
      <div className="fixed z-40 inset-0 flex items-center justify-center bg-black/50">
        <div className="bg-[var(--color-light)] w-[90%] md:w-[550px] max-w-full px-10 py-6 flex flex-col gap-2 relative rounded-md">
          <button
            className="p-1 absolute top-5 right-4 cursor-pointer"
            onClick={closeVerifyGraduates}
          >
            <FaTimes size={12} />
          </button>

          <h3 className="font-semibold">
            Verify Alumni Certificates instantly
          </h3>
          <p className="text-[var(--color-darker)] text-sm">
            Search by full name or email address to verify alumni credentials
          </p>
          <div className="input-box w-full  flex items-center gap-2 py-4">
            <div className="w-full px-1 flex items-center  gap-2 h-8 border border-dark-hover rounded-md ">
              <CiSearch />
              <input
                type="text"
                value={data}
                onChange={(e) => setData(e.target.value)}
                placeholder="Enter fullname or email address..."
                className="outline-none w-full text-xs sm:text-sm"
              />
            </div>
            <div
              className={`${
                data.length > 5
                  ? "bg-primary-950"
                  : "bg-[var(--color-dark-active)]"
              } text-white h-8 rounded-md min-w-fit flex items-center px-4 ${
                data ? "cursor-pointer" : "cursor-auto"
              }`}
            >
              <CiSearch className="w-5 h-5" />
              <button
                className={`${data ? "cursor-pointer" : "cursor-auto"}`}
                disabled={!data}
                onClick={handleVerifyBtnClick}
              >
                {verifyData}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default VerifyGraduates;
