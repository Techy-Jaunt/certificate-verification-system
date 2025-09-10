import React from "react";
import { RiSearch2Line } from "react-icons/ri";
import { RiEyeLine } from "react-icons/ri";

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
  return (
    <div className="bg-light min-h-screen xl:px-[175px] lg:px-16 xl:pt-25 lg:pt-15 pt-7.5 xl:pb-[58px] lg:pb-10">
      {/* Main Title */}
      <h1 className="text-2xl md:text-5xl xl:text-6xl font-bold mx-auto text-primary-950 text-center mb-7.5 md:mb-15">
        Recruiter Search Results
      </h1>
      <div className="bg-[#d9d9d9] rounded-lg px-[15px] py-2.5 md:px-[50px] md:py-7.5 max-w-[1090px] w-full mx-auto">
        {/* Search Bar Section */}
        <form className="grid grid-cols-[2fr_1fr] md:grid-cols-[3fr_2fr_2fr] xl:grid-cols-[5fr_3fr_2fr] items-center gap-4 md:gap-0">
          <div className="bg-[#fffafa] relative w-full rounded-lg md:rounded-none md:rounded-l-lg order-1">
            <input
              type="text"
              placeholder="Name"
              className="w-full pl-20 md:pl-[128px] pr-1 md:pr-4 py-2.5 md:py-[25px] text-[20px] md:text-2xl placeholder:text-[20px] md:placeholder:text-2xl leading-9 focus:outline-none focus-within:border-b-2 focus-within:border-primary-950"
            />
            {/* Search Icon */}
            <RiSearch2Line className="h-6 md:h-12 w-6 md:w-12 text-primary-950 absolute left-5 md:left-10 top-[19px]" />
          </div>
          <div className="bg-[#fffafa] sm:w-full rounded-lg md:rounded-none md:rounded-r-lg order-3 md:order-2 col-span-2 md:col-span-1 w-[300px] ">
            <input
              type="text"
              placeholder="Cohort"
              className="w-full pl-5 md:pl-16 md:py-[25px] pr-1 md:pr-4 py-2.5 border-l-2 border-[#d9d9d9] text-[20px] md:text-2xl placeholder:text-[20px] md:placeholder:text-2xl leading-9 focus:outline-none focus-within:border-b-primary-950 focus-within:border-b-2 "
            />
          </div>
          <button className="w-full md:h-[76px] h-[46px] flex-1/3 md:flex-1/6 ml-0 md:ml-[18px] bg-primary-950 hover:opacity-80 transition-discrete text-white text-base md:text-2xl rounded-lg order-2 md:order-3">
            Search
          </button>
        </form>

        {/* Results Section */}
        <h2 className="text-xl sm:text-3xl md:text-4xl font-semibold text-black px-5 my-[25px]">
          Matched Alumni Records
        </h2>
        {/* {Alumni Record table heading} */}
        <div className="hidden md:grid grid-cols-[2fr_2fr_3fr] xl:grid-cols-[2fr_2fr_5fr] items-center pb-3 px-5 gap-5 font-bold text-2xl">
          <span>Name</span>
          <span>Cohort</span>
          <span>Certificate Preview</span>
        </div>

        {/* Alumni Records Table */}
        <div className="bg-[#fffafa] rounded-lg px-5">
          {alumniData.map((alumni) => (
            <div
              key={alumni.id}
              className="xl:py-[28px] md:py-[36px] py-5 md:px-0 grid grid-cols-2 md:grid-cols-[2fr_2fr_3fr] xl:grid-cols-[2fr_2fr_5fr] gap-2 md:gap-5 items-center justify-center border-b border-[#d9d9d9] last:border-b-0"
            >
              {/* Mobile stacked version */}
              <div className="md:hidden flex flex-col order-2 self-start">
                {(() => {
                  const [cohort, year] = alumni.cohort
                    .split(",")
                    .map((part) => part.trim());
                  return (
                    <>
                      <p>
                        Name:
                        <span className="font-bold text-sm pl-1">
                          {alumni.name}
                        </span>
                      </p>
                      <p>
                        Cohort:
                        <span className="font-bold text-sm pl-1">{cohort}</span>
                      </p>
                      <p>
                        Year:
                        <span className="font-bold text-sm pl-1">{year}</span>
                      </p>
                    </>
                  );
                })()}
              </div>
              {/* Name and Cohort */}
              <span className="hidden text-2xl leading-9 md:block">
                {alumni.name}
              </span>
              <span className="hidden text-2xl leading-9 md:block">
                {alumni.cohort}
              </span>
              <div className="w-full order-1 md:order-3 grid xl:grid-cols-2 grid-cols-1 gap-4 items-center md:px-[10]">
                {/* Certificate Preview Placeholder */}
                <div className="w-[126px] md:w-[197px] h-[81px] md:h-[115px] bg-[#d9d9d9] rounded-md flex items-center justify-center border border-gray-300">
                  <span className="text-gray-400 text-sm"></span>
                </div>

                {/* View Certificate Button */}
                <button className="flex items-center justify-center gap-2 px-4 py-3 w-[150%] sm:w-[216px] bg-primary-950 hover:opacity-80 transition-discrete text-white rounded-lg">
                  {/* View Icon */}
                  <RiEyeLine size={24} />
                  <span className="">View Certificate</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecruiterSearchResults;
