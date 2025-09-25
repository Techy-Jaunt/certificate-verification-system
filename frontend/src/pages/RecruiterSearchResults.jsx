import React, { useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { RiEyeLine } from "react-icons/ri";

import CertificateVerificationSuccess from "../modals/CertificateVerificationSuccess";

const alumniData = [
  {
    id: "1",
    name: "Barry Allen",
    cohort: "Cohort 6, 2024",
  },
  {
    id: "2",
    name: "Barry Allen",
    cohort: "Cohort 5, 2023",
  },
  {
    id: "3",
    name: "Barry Allen",
    cohort: "Cohort 4, 2022",
  },
];
const RecruiterSearchResults = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleViewCertificate = () => {
    setOpenModal(true);
  };
  return (
    <div className="absolute inset-0 bg-black/40 flex justify-center pt-[507px] h-[3500px]">
      <div className="bg-light max-h-fit w-full rounded-[20px] xl:max-w-[1070px] xl:px-5 lg:px-5 xl:pt-7.5 lg:pt-5 pt-5 xl:pb-[56px] lg:pb-10">
        {/* Main Title */}
        <h1 className="text-xl md:text-4xl font-bold mx-auto text-primary-950 text-center mb-7.5 md:mb-[42px]">
          Alumni Certificate
        </h1>
        <div className="bg-(--color-dark-brown) rounded-lg px-[15px] py-2.5 md:px-[50px] md:py-[45px] max-w-[1030px] w-full mx-auto">
          {/* {Alumni Record table heading} */}
          <div className="hidden md:grid grid-cols-[2fr_2fr_3fr] xl:grid-cols-[2fr_2fr_5fr] items-center pb-3 px-5 gap-5 font-bold text-lg sm:text-xl">
            <span>Name</span>
            <span>Cohort</span>
            <span>Certificate Preview</span>
          </div>

          {/* Alumni Records Table */}
          <div className="bg-[#fffafa] rounded-lg px-5">
            {alumniData.map((alumni) => (
              <div
                key={alumni.id}
                className=" py-5 md:px-0 grid grid-cols-2 md:grid-cols-[2fr_2fr_3fr] xl:grid-cols-[2fr_2fr_5fr] gap-2 md:gap-5 items-center justify-center border-b border-[#d9d9d9] last:border-b-0"
              >
                {/* Mobile stacked version */}
                <div className="md:hidden flex flex-col order-2 self-start ">
                  {(() => {
                    const [cohort, year] = alumni.cohort
                      .split(",")
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
                          Cohort:
                          <span className="font-semibold text-sm pl-1">
                            {cohort}
                          </span>
                        </p>
                        <p>
                          Year:
                          <span className="font-semibold text-sm pl-1">
                            {year}
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
                  {alumni.cohort}
                </span>
                <div className="w-full order-1 md:order-3 grid xl:grid-cols-2 grid-cols-1 gap-4 items-center md:px-[10]">
                  {/* Certificate Preview Placeholder */}
                  <div className="w-[126px] md:w-[197px] h-[81px] md:h-[115px] bg-[#d9d9d9] rounded-md flex items-center justify-center border border-gray-300">
                    <span className="text-gray-400 text-sm"></span>
                  </div>

                  {/* View Certificate Button */}
                  <button
                    onClick={handleViewCertificate}
                    className="flex items-center justify-center gap-1 px-2 py-2 w-full sm:w-[216px] bg-primary-500 hover:opacity-80 transition-discrete text-white text-sm rounded-lg cursor-pointer"
                  >
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

      <div
        className={`${
          openModal ? "block" : "hidden"
        } z-50 absolute top-16 w-full h-[calc(100vh+100px)] bg-black/70`}
      >
        <CertificateVerificationSuccess
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      </div>
    </div>
  );
};

export default RecruiterSearchResults;
