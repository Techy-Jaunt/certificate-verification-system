import eyeIcon from "/images/eye.svg";
import sheildTick from "/icons/shield-tick.svg";
import close from "/icons/close.svg";
import backArrow from "/icons/Back arrow.png";

const CertificateVerificationSuccess = () => {
  return (
    <div className="w-full h-screen inset-0 flex flex-col items-center justify-center gap-5 bg-[#0c030350] text-center z-50 relative">
      <button className="absolute left-16 top-10 flex">
        <img src={backArrow} alt="" className="rotate-90 w-5" /> Back
      </button>
      <h2 className="hidden md:flex gap-2 text-4xl font-semibold">
        Certificate Verification Successful! <img src={sheildTick} alt="" />
      </h2>
      <div className="hidden md:flex gap-2"></div>
      <div className="certificate md:w-[65%] lg:w-[50%] md:h-[18rem] lg:h-[22rem] bg-[var(--color-background-alt)] border border-[#0000FE]"></div>

      <div className="flex flex-col justify-center items-center bg-white w-[20rem] md:max-w-[28rem] lg:max-w-[35rem] md:w-full p-6 h-[90%] md:h-[20rem] lg:h-[25rem] px-16 scale-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:-translate-y-27 lg:-translate-y-43">
        <img src={sheildTick} alt="" className="w-32" />

        <h2 className="text-2xl font-semibold text-gray-800">
          Certificate Verified
        </h2>

        <p className="mt-2 text-gray-60 text-sm md:text-base">
          This certificate has been successfully verified. For security, only
          alumni can download certificates. You may view it directly here.
        </p>

        <div className="mt-6 flex flex-col items-center gap-3">
          <button className="flex justify-center items-center gap-2 w-[10rem] md:w-[16rem] h-[2.5rem] bg-[#0000FE] text-white text-xs md:text-base py-2 px-4 rounded-lg transition">
            <img src={eyeIcon} alt="" />
            View Certificate
          </button>
          <button className="absolute top-6 md:top-8 right-2 md:right-8 cursor-pointer">
            <img src={close} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificateVerificationSuccess;
