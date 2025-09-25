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
      } fixed inset-0 z-50 flex items-center justify-center bg-black/70`}
    >
      {/* White modal box */}
      <div
        className="relative flex flex-col justify-center items-center bg-white 
                  w-[20rem] md:max-w-[28rem] lg:max-w-[35rem] md:w-full 
                  p-6 md:p-8 h-fit md:h-[20rem] lg:h-[25rem] 
                  rounded-lg shadow-lg"
      >
        {/* Success Icon */}
        <div
          className="flex items-center justify-center w-20 h-20 mx-auto mb-4 
                    border-4 border-green-500 rounded-full"
        >
          <img src={successIcon} alt="" className="w-10" />
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800">
          Download Successful
        </h2>

        {/* Message */}
        <p className="mt-2 text-gray-600 text-sm text-center">
          Your certificate has been sent to your email address
          ekate****@gmail.com
        </p>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 cursor-pointer"
        >
          <img src={close} alt="close" className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default SuccessDownloadAlumni;
