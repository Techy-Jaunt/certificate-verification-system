import downloadIcon from "/icons/download-icon.svg";
import successIcon from "/icons/tick.png";
import close from "/icons/close.svg";

const SuccessDownloadAlumni = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg max-w-md w-full p-6 text-center transition transform scale-100">
        <div className="flex items-center justify-center w-32 h-32 mx-auto  mb-4 border-8 border-[#2E7D32] rounded-full">
          <img src={successIcon} alt="" />
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Download Successful
        </h2>

        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Your certificate has been sent to your email address
          ekate****@gmail.com
        </p>

        <div className="mt-6 flex flex-col items-center gap-3">
          <button className="flex justify-center items-center gap-2 w-[16rem] h-[3rem] bg-[#0000FE] text-white py-2 px-4 rounded-lg transition">
            <img src={downloadIcon} alt="" />
            Download Again
          </button>
          <button className="absolute top-8 right-8 cursor-pointer">
            <img src={close} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessDownloadAlumni;
