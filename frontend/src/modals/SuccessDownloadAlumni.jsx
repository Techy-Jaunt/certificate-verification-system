import successIcon from "/icons/tick.png";
import { useEffect } from "react";

const SuccessDownloadAlumni = ({ closeSuccessModal}) => {

    useEffect(() => {
    document.body.style.overflow = "hidden"; // lock scroll
    return () => {
      document.body.style.overflow = "auto"; // restore when modal closes
    };
  }, []);

  const handleClose = () => {
    closeSuccessModal()
  };
  return (
    <div
      className='fixed z-40 inset-0 flex items-center justify-center bg-black/50'
    >
      <div className="rounded-xl flex flex-col  justify-center items-center bg-white w-[20rem] md:max-w-[28rem] lg:max-w-[35rem] md:w-full p-6 h-fit md:h-[20rem] lg:h-[25rem] px-16 scale-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:-translate-y-27 lg:-translate-y-43">
        <div className="flex items-center justify-center w-20 h-20 mx-auto  mb-4 border-5 border-(--color-success) rounded-full">
          <img src={successIcon} alt="" className="w-10" />
        </div>

        <h2 className="text-xl font-semibold text-gray-800 text-gray-100 text-center">
          Download Successful
        </h2>

        <p className="mt-4 text-(--color-darker) text-sm text-center">
          Your certificate has been sent to your email address
          ekate****@gmail.com
        </p>

        <div className="mt-6 flex flex-col items-center gap-3">
          <button
                        onClick={handleClose}
                        className="absolute top-6 md:top-8 right-5 md:right-8 cursor-pointer text-gray-500 hover:text-gray-700 text-large ml-4"
                        type="button"
                    >
                        ✕
                    </button>

        </div>
      </div>
    </div>
  );
};

export default SuccessDownloadAlumni;
