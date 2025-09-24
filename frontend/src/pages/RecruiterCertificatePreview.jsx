import { FaDownload } from "react-icons/fa";
import { LuChevronLeft, LuShieldCheck } from "react-icons/lu";
import { useNavigate } from "react-router";

const RecruiterCertificatePreview = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center px-4">
      <div className="w-full max-w-[1000px] min-h-screen bg-[#E5E5E5] py-4 md:py-20 px-6 rounded">
        {/* Back Button */}
        <div
          onClick={handleGoBack}
          className="flex items-center gap-2 cursor-pointer text-black text-sm mb-6"
        >
          <LuChevronLeft size={18} />
          <span>Back</span>
        </div>

        {/* Title */}
        <div className="flex justify-center gap-2 mb-5">
          <h1 className="text-center text-2xl font-bold mb-5 ">
            Certificate Verification Successful!
          </h1>
          <LuShieldCheck className="text-center pl-2" color="green" size={30} />
        </div>

        {/* Verification text */}
        <div className="flex justify-center items-center gap-2 mb-8">
          <p className="text-lg">Precious Adekunle's certificate</p>
        </div>

        {/* Certificate Preview Box */}
        <div className="flex justify-center">
          <div className="w-full max-w-[650px] bg-white h-[400px] border border-(--color-primary-500) flex items-center justify-center">
            <p className="text-gray-400 text-sm">
              Image preview of certificate
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterCertificatePreview;
