import downloadIcon from "/icons/download-icon.svg";
import successIcon from "/icons/tick.png";
import close from "/icons/close.svg";
import sheildTick from "/icons/shield-tick.svg";

const SuccessDownloadAlumni = ({ openModal, setOpenModal }) => {
  const handleClose = () => {
    setOpenModal(false);
  };
  return (
    <div
      className={`${
        openModal ? "flex" : "hidden"
      } w-full h-[calc(100vh+100px)] min-h-screen inset-0 flex flex-col items-center justify-center gap-5 text-center z-50 relative bg-black/70`}
    >
      <h2 className="text-2xl text-white font-semibold">Certificate</h2>
      <div className="hidden md:flex gap-2 mb-16">
        <img src={sheildTick} alt="" className="w-5 h-5" />
        <p className="text-lg text-white font-semibold pb-5">
          Verification successful! Here is your certificate
        </p>
      </div>
      <div className="certificate md:w-[65%] lg:w-[50%] md:h-[18rem] lg:h-[22rem] bg-(--color-background-alt) border border-primary-500"></div>

      <div className="flex flex-col justify-center items-center bg-white w-[20rem] md:max-w-[28rem] lg:max-w-[35rem] md:w-full p-6 h-fit md:h-[20rem] lg:h-[25rem] px-16 scale-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:-translate-y-27 lg:-translate-y-43">
        <div className="flex items-center justify-center w-20 h-20 mx-auto  mb-4 border-5 border-(--color-success) rounded-full">
          <img src={successIcon} alt="" className="w-10" />
        </div>

        <h2 className="text-xl font-semibold text-gray-800 text-gray-100">
          Download Successful
        </h2>

        <p className="mt-2 text-(--color-darker) text-sm ">
          Your certificate has been sent to your email address
          ekate****@gmail.com
        </p>

        <div className="mt-6 flex flex-col items-center gap-3">
          <button className="flex justify-center items-center gap-2 w-[10rem] md:w-[16rem] h-8 bg-primary-500 text-white text-xs py-2 px-4 rounded-lg transition cursor-pointer hover:bg-(--color-primary-400) duration-300">
            <img src={downloadIcon} alt="" />
            Download Again
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

export default SuccessDownloadAlumni;
