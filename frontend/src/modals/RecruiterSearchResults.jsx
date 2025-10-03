import React, {useEffect, useState} from "react";
import {RiEyeLine} from "react-icons/ri";

import RecruiterCertificatePreview from "../modals/RecruiterCertificatePreview";

const RecruiterSearchResults = ({closeRecruiterSearch, closeCertificatePreview, setRecruiterSearch, setOpenVerifyGraduate, alumniData}) => {
  const [openModal, setOpenModal ] = useState(false); 

  useEffect(() => {
    document.body.style.overflow = "hidden"; // lock scroll
    return () => {
      document.body.style.overflow = "auto"; // restore when modal closes
    };
  }, []);
  const handleViewCertificate = ()=>{
    // closeRecruiterSearch()
    // setCertificatePreview(true);
    setOpenModal(true);
  }
  return (
    <div className="fixed z-40 inset-0 flex items-center justify-center bg-black/50">
      <div className="relative mx-auto  w-[90%] md:w-[700px] lg:w-2/3 bg-light max-h-fit px-5 py-5 rounded-[20px] ">
        <button
          onClick={() => setOpenVerifyGraduate(false)}
          className="absolute top-8  right-5 md:right-8 cursor-pointer text-gray-500 hover:text-gray-700 text-large ml-4"
          type="button"
        >
          ✕
        </button>

        {/* Main Title */}
        <h1 className="text-xl md:text-2xl py-8 font-bold mx-auto text-black text-center  ">
          Alumni Certificate
        </h1>
        <div className="bg-(--color-dark-brown) rounded-lg h-fit w-[95%] py-4 mx-auto">
          {/* {Alumni Record table heading} */}

          <div className="hidden md:grid grid-cols-[2fr_2fr_3fr] xl:grid-cols-[2fr_2fr_5fr] items-center pb-3 pl-10 px-5 gap-5 font-bold text-sm sm:text-lg">
            <span>Name</span>
            <span>Track</span>
            <span>Certificate Preview</span>
          </div>

          {/* Alumni Records Table */}
          <div className=" px-5">
            {alumniData.map((alumni, i) => (
              <div
                // key={alumni.id}
                key={i}
                className="bg-[#fffafa]  mb-2 rounded-lg py-5 px-5 grid grid-cols-2 md:grid-cols-[2fr_2fr_3fr] xl:grid-cols-[2fr_2fr_5fr] gap-2 md:gap-5 items-center justify-center border-b border-[#d9d9d9] last:border-b-0"
              >
                {/* Mobile stacked version */}
                <div className="md:hidden flex flex-col order-2 self-start  ">
                  {(() => {
                    const [track, year] = alumni.track
                      .split()
                      .map((part) => part.trim());
                    return (
                      <>
                        <p>
                          Name:
                          <span className="font-semibold text-sm pl-1">
                            {alumni.name}
                          </span>
                        </p>
                        <p>
                          Track:
                          <span className="font-semibold text-sm pl-1">
                            {alumni.track}
                          </span>
                        </p>
                        <p>
                        Cohort:
                          <span className="font-semibold text-sm pl-1">
                            {alumni.cohort}
                          </span>
                        </p>
                      </>
                    );
                  })()}
                </div>
                {/* Name and Cohort */}
                <span className="hidden text-lg leading-9 md:block">
                  {alumni.name}
                </span>
                <span className="hidden text-lg leading-9 md:block">
                  {alumni.track}
                </span>
                <div className="w-full order-1 md:order-3 grid xl:grid-cols-2 grid-cols-1 gap-4 items-center md:px-[10]">
                  {/* Certificate Preview Placeholder */}
                  <div className="w-[110px] md:w-[180px] h-[75px] md:h-[100px] bg-[#d9d9d9] rounded-md flex items-center justify-center border border-gray-300">
                    <span className="text-gray-400 text-sm"></span>
                  </div>

                  {/* View Certificate Button */}
                  <button
                  onClick={handleViewCertificate}
                  className="flex items-center justify-center gap-1 px-2 py-2 w-fit  bg-primary-950 hover:opacity-80 transition-discrete text-white text-xs md:text-sm rounded-lg cursor-pointer">
                    {/* View Icon */}
                    <RiEyeLine size={20} />
                    <span className="">View Certificate</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      { openModal && (<RecruiterCertificatePreview closeCertificatePreview={ closeCertificatePreview} setRecruiterSearch={setRecruiterSearch} setOpenVerifyGraduate={setOpenVerifyGraduate}  alumniData={alumniData}/>)}
  {/* {openModal && <RecruiterCertificatePreview />} */}
    </div>
  );
};

export default RecruiterSearchResults;
