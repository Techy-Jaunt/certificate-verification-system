import { useState, useEffect } from "react";
import { LuChevronLeft, LuShieldCheck, LuX } from "react-icons/lu";
import logo from "/icons/image 2.png";
import RecruiterSearchResults from "./RecruiterSearchResults";


const RecruiterCertificatePreview = ({closeCertificatePreview, closeVerifyGraduates, setOpenVerifyGraduate, setRecruiterSearch, alumniData}) => {
 const [ openModal, setOpenModal ] = useState(false);
  const handleGoBack = () => {
    setOpenModal(true);
  //  setRecruiterSearch(true)
   setOpenVerifyGraduate(true);
   closeCertificatePreview()
   console.log("back was clicked")
  };

 
    useEffect(() => {
      document.body.style.overflow = "hidden"; // lock scroll
      return () => {
        document.body.style.overflow = "auto"; // restore when modal closes
      };
    }, []);

  return (
    <div className="fixed z-40 inset-0 flex items-center justify-center bg-black/50">
      <div className="w-[90%] md:w-2/3 lg:w-[700px] min-h-fit bg-[#E6E6E6] p-10 rounded-2xl">
        <div className="flex items-center justify-between mb-9">
          {/* Back Button */}
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 cursor-pointer text-black text-sm hover:text-(--color-dark-hover)"
          >
            <LuChevronLeft size={18} />
            <span>Back</span>
          </button>

          {/* Close Button */}
          <button
            className="cursor-pointer hover:text-(--color-dark-hover)"
            onClick={closeCertificatePreview}
          >
            <LuX />
          </button>
        </div>

        {/* Title */}
        <h1 className="text-center text-3xl font-bold mb-7 ">Certificate</h1>

        {alumniData.map((alumni) => (
          <>
            <div className="flex justify-center items-center gap-3 mb-8">
              <LuShieldCheck color="green" size={24} />
              <p className="text-base font-bold">
                Certificate preview of {alumni.name}
              </p>
            </div>

            <div className="flex justify-center">
              <div className="w-[90%]  bg-white h-[250px] border border-(--color-primary-950) flex items-center justify-center rounded-xs relative">
                <div className="head h-10 w-full  px-4 p-2 absolute left-0 right-0 self-start">
                  <img src={logo} width={50} alt="" />
                </div>
                {/* <p className="text-black/50">Image preview of certificate</p> */}
                <p className="text-black/50 px-4 text-center">{alumni.name} is a verified TechyJaunt Graduate in {alumni.track} track of cohort {alumni.cohort}</p>
              </div>
            </div>
          </>
        ))}
      </div>
      { openModal && (<RecruiterSearchResults closeRecruiterSearch={closeVerifyGraduates} setRecruiterSearch={setRecruiterSearch} setOpenVerifyGraduate={setOpenVerifyGraduate} alumniData={alumniData}/>)}
    </div>
  );
};

export default RecruiterCertificatePreview;
