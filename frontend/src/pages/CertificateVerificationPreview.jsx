import { useState } from "react";
import { FaDownload } from "react-icons/fa";
import { LuChevronLeft, LuShieldCheck } from "react-icons/lu";
import { useNavigate } from "react-router";
import SuccessDownloadAlumni from "../modals/SuccessDownloadAlumni";

const CertificateVerificationPreview = () => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  const handleDownloadCertificate = () => {
    setOpenModal(true);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-200 flex items-center justify-center px-4">
        <div className="w-full max-w-[1000px] min-h-screen bg-[#E5E5E5] py-4 md:py-20 px-6 rounded">
          {/* Back Button */}
          <div
            type="button"
            onClick={handleGoBack}
            className="flex items-center gap-2 cursor-pointer text-black text-sm mb-6"
          >
            <LuChevronLeft size={18} />
            <span>Back</span>
          </div>
          {/* Title */}
          <h1 className="text-center text-2xl font-bold mb-8 ">Certificate</h1>

          {/* Verification text */}
          <div className="flex justify-center items-center gap-2 mb-8">
            <LuShieldCheck
              className="text-center pl-2 text-(--color-success)"
              size={32}
            />
            <p className="text-sm">
              Verification successful! Here’s your certificate.
            </p>
          </div>

          {/* Certificate Preview Box */}
          <div className="flex justify-center">
            <div className="w-full max-w-[650px] bg-white h-[400px] border border-(--color-primary-500) flex items-center justify-center">
              <p className="text-gray-400 text-sm">
                Image preview of certificate
              </p>
            </div>
          </div>

          {/* Download Button */}
          <div className="flex justify-center mt-10">
            <button
              onClick={handleDownloadCertificate}
              className="bg-(--color-primary-500) hover:bg-(--color-primary-400) text-white text-sm px-7 py-3 rounded-[8px] shadow flex items-center gap-2 cursor-pointer"
            >
              <FaDownload size={10} />
              <p className="text-[15px]">Download certificate</p>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`${
          openModal ? "block" : "hidden"
        } z-50 absolute top-16 w-full h-[calc(100vh+100px)]  bg-black/70`}
      >
        <SuccessDownloadAlumni
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      </div>
    </>
  );
};

export default CertificateVerificationPreview;
