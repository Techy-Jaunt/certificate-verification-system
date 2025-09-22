import eyeIcon from "/images/eye.svg";
import sheildTick from "/icons/shield-tick.svg";
import close from "/icons/close.svg";
import { useNavigate } from "react-router";

const CertificateVerificationSuccess = ({ openModal, setOpenModal }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleViewCertificate = () => {
    navigate("/recruiter-certificate-preview");
  };

  return (
    <div
      className={`${
        openModal ? "flex" : "hidden"
      } w-full h-[calc(100vh+100px)]  min-h-screen inset-0 flex flex-col items-center justify-center gap-5 bg-black/70 text-center z-50 relative`}
    >
      <h2 className="hidden md:flex items-center gap-2 mb-5 text-3xl text-white font-semibold">
        Certificate Verification Successful! <img src={sheildTick} alt="" />
      </h2>
      <div className="hidden md:flex gap-2"></div>
      <div className="certificate md:w-[65%] lg:w-[50%] md:h-[18rem] lg:h-[22rem] bg-(--color-background-alt) border border-(--color-primary-500)"></div>

      <div className="flex flex-col justify-center items-center bg-white w-[85%] md:max-w-[28rem] lg:max-w-[35rem] md:w-full pt-10 p-6 h-fit md:h-[20rem] lg:h-[25rem] sm:px-16 scale-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:-translate-y-27 lg:-translate-y-43">
        <img src={sheildTick} alt="" className="w-20" />

        <h2 className="text-2xl pt-10 sm:pt-5 font-semibold text-gray-800">
          Certificate Verified
        </h2>

        <p className="mt-2 text-(--color-darker) text-sm md:text-base">
          This certificate has been successfully verified. For security, only
          alumni can download certificates. You may view it directly here.
        </p>

        <div className="mt-6 flex flex-col items-center gap-3">
          <button
            onClick={handleViewCertificate}
            className="flex justify-center items-center gap-2 w-[10rem] md:w-[16rem] h-[2.5rem] mt-5 md:mt-0 bg-(--color-primary-500) text-white text-xs md:text-base py-2 px-4 rounded-lg  cursor-pointer transition hover:bg-(--color-primary-400)"
          >
            <img src={eyeIcon} alt="" className="w-5" />
            View Certificate
          </button>
          <button
            onClick={handleClose}
            className="absolute top-6 md:top-8 right-2 md:right-8 cursor-pointer"
          >
            <img src={close} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificateVerificationSuccess;
