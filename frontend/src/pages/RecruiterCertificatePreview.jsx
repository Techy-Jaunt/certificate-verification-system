import { LuChevronLeft, LuShieldCheck, LuX } from "react-icons/lu";
import { useNavigate } from "react-router";

const RecruiterCertificatePreview = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen  flex items-center justify-center px-4">
      <div className="w-full max-w-[1000px] min-h-screen bg-[#E6E6E6] py-4 md:py-20 px-[124px] rounded-2xl">
        
        <div className="flex items-center justify-between mb-9">
          {/* Back Button */}
          <div
            onClick={handleGoBack}
            className="flex items-center gap-2 cursor-pointer text-black text-sm hover:text-(--color-dark-hover)"
          >
            <LuChevronLeft size={18} />
            <span>Back</span>
          </div>

          {/* Close Button */}
          <button className="cursor-pointer hover:text-(--color-dark-hover)" onClick={() => navigate('/')}>
            <LuX  />
          </button>
        </div>

        {/* Title */}
          <h1 className="text-center text-3xl font-bold mb-7 ">
            Certificate 
          </h1>

        {/* Verification text */}
        <div className="flex justify-center items-center gap-3 mb-8">
          <LuShieldCheck color="green" size={24} />
          <p className="text-base">Certificate preview of Kate Eze</p>
        </div>

        {/* Certificate Preview Box */}
        <div className="flex justify-center">
          <div className="w-full max-w-[650px] bg-white h-[400px] border border-(--color-primary-950) flex items-center justify-center rounded-xs">
            <p className="text-black/50">
              Image preview of certificate
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterCertificatePreview;
