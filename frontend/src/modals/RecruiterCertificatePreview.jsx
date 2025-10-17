import { useEffect } from "react";
import { LuChevronLeft, LuShieldCheck, LuX } from "react-icons/lu";
import tjCert from "/images/TJCert.png";

const RecruiterCertificatePreview = ({ alumniData, onGoBack, onClose }) => {
    // Renamed props for clarity: 
    // alumniData is the single selected object
    // onGoBack sets step="results"
    // onClose sets openVerifyGraduates=false (closes everything)

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const alumniName = alumniData?.name || "Alumni";

    return (
        <div className="fixed z-40 inset-0 flex items-center justify-center bg-black/50">
            <div className="w-[90%] md:w-2/3 lg:w-[700px] min-h-fit bg-[#E6E6E6] p-10 rounded-2xl">

                <div className="flex items-center justify-between mb-9">
                    {/* Back Button */}
                    <div
                        onClick={onGoBack} // ✅ Goes back to the results step
                        className="flex items-center gap-2 cursor-pointer text-black text-sm hover:text-(--color-dark-hover)"
                    >
                        <LuChevronLeft size={18} />
                        <span>Back</span>
                    </div>

                    {/* Close Button */}
                    <button className="cursor-pointer hover:text-(--color-dark-hover)" onClick={onClose}>
                        <LuX />
                    </button>
                </div>

                {/* Title */}
                <h1 className="text-center text-3xl font-bold mb-7 ">
                    Certificate
                </h1>

                {/* Verification text */}
                <div className="flex justify-center items-center gap-3 mb-8">
                    <LuShieldCheck color="green" size={24} />
                    <p className="text-base">Certificate preview of {alumniName}</p>
                </div>

                {/* Certificate Preview Box */}
                <div className="flex justify-center">
                    <div className="w-[90%] bg-white h-[250px] border border-(--color-primary-950) flex items-center justify-center rounded-xs relative">
                        <p className="text-black/50 absolute text-xs sm:text-base right-[14%] sm:right-[18%] md:right-[20%] lg:right-[25%] z-50">
                            {alumniName}
                        </p>
                        <img src={tjCert} alt="TechJaunt Cert Preview" className="h-full w-full absolute inset-0"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecruiterCertificatePreview;
