import React, { useEffect } from "react";
import { RiEyeLine } from "react-icons/ri";
import { LuChevronLeft } from "react-icons/lu";

const RecruiterSearchResults = ({
  alumniData,
  closeVerifyGraduates, // Function to close the main modal
  openCertificatePreview, // Function to advance to the preview step
  closeResults, // New function to go back to the search form
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // NOTE: The 'View Certificate' button should pass the specific alumni object
  const handleViewCertificate = (alumni) => {
    openCertificatePreview(alumni); // Calls Navbar's function
  };

  // NOTE: If you want the 'X' button to go back to search, use closeResults.
  // Since you asked for it to close the component, I'll use closeVerifyGraduates.
  // If you prefer to go back to the search form, change onClick={closeVerifyGraduates} to onClick={closeResults}

  return (
    <div className="fixed z-40 inset-0 flex items-center justify-center bg-black/50">
      <div className="relative mx-auto w-[90%] md:w-[700px] lg:w-2/3 bg-light max-h-fit px-5 py-5 rounded-[20px] ">
        <button
          onClick={closeResults}
          className="absolute flex items-center top-8 left-5 cursor-pointer text-gray-500 hover:text-gray-700 text-large ml-4"
          type="button"
        >
          <LuChevronLeft size={18} />
          <span>Back</span>
        </button>
        <button
          onClick={closeVerifyGraduates}
          className="absolute top-8 right-5 md:right-8 cursor-pointer text-gray-500 hover:text-gray-700 text-large ml-4"
          type="button"
        >
          ✕
        </button>

        <h1 className="text-xl md:text-2xl py-8 font-bold mx-auto text-black text-center  ">
          Alumni Certificate
        </h1>
        <div className="bg-(--color-dark-brown) rounded-lg h-fit w-[95%] py-4 mx-auto">
          
          <div className=" px-5">
            {alumniData.map((alumni, i) => (
              <div
                key={i}
                className="bg-[#d9d9d9] mb-2 rounded-lg py-5 px-2 gap-2 md:gap-5 flex flex-col items-center justify-center border-b border-[#d9d9d9] last:border-b-0"
              >
               
                <div className="w-full max-w-[25rem] font-bold px-4 flex justify-between self-start">
                  <div className="hidden md:flex gap-24">
                    <span>Name</span>
                    <span>Track</span>
                  </div>
                  <span className="hidden md:flex">Certificate Preview</span>
                </div>
                <div className="w-full bg-[#fffafa] px-4 py-4 flex flex-col md:flex-row gap-10">
                  <div className="font-semibold flex flex-col md:flex-row items-center md:gap-10">
                    <span className=" text-lg leading-9 flex gap-4">
                      <p className="md:hidden">Name:</p>
                      {alumni.name}
                    </span>
                    <span className=" text-lg leading-9 flex gap-4">
                      <p className="md:hidden">Track:</p>
                      {alumni.track}
                    </span>
                  </div>
                  <div className="w-full order-1 md:order-3 flex flex-col md:flex-row gap-4 items-center md:px-[10]">
                    {/* Certificate Preview Placeholder */}
                    <div className="w-full md:w-[180px] h-[75px] md:h-[100px] bg-[#d9d9d9] rounded-md flex items-center justify-center border border-gray-300">
                      <span className="text-gray-400 text-sm"></span>
                    </div>

                    {/* View Certificate Button */}
                    <button
                      onClick={() => handleViewCertificate(alumni)} // ✅ Pass the specific alumni object
                      className="w-full lg:max-w-[10rem] flex items-center justify-center gap-1 px-2 py-2 bg-primary-950 hover:opacity-80 transition-discrete text-white text-xs md:text-sm rounded-lg cursor-pointer"
                    >
                      <RiEyeLine size={20} />
                      <span className="">View Certificate</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterSearchResults;