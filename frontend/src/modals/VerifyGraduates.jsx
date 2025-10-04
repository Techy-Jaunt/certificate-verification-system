import { useState, useEffect } from "react";
import { FaTimes, FaSearch } from "react-icons/fa";
// import gradErrorIcon from "../../public/icons/verify-grad-error-icon.svg"; // Assuming this path is correct
import RecruiterSearchResults from "./RecruiterSearchResults";
import RecruiterCertificatePreview from "./RecruiterCertificatePreview";

const VerifyGraduates = ({
    searchAlumni,
    alumniData,
    searchParams,
    setSearchParams,
    step,
    setStep,
    error,
    loading,
    selectedAlumni,
    openCertificatePreview,
    closeVerifyGraduates, // Function to close the main modal (sets openVerifyGraduates=false in Navbar)
}) => {
    const [isValid, setIsValid] = useState(false);
    
    const trackRegex = /^[A-Za-z]{3,}(?: [A-Za-z]{3,})?$/;
    const OtherInputRegex =
        /^([a-zA-Z\s'-]{3,}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

    const handleTrackInputChange = (e) => {
        const value = e.target.value;
        setSearchParams({ ...searchParams, track: value });
        setIsValid(trackRegex.test(value) && OtherInputRegex.test(searchParams.otherInput));
    };

    const handleOtherInputChange = (e) => {
        const value = e.target.value;
        setSearchParams({ ...searchParams, otherInput: value });
        setIsValid(trackRegex.test(searchParams.track) && OtherInputRegex.test(value));
    };

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
      <>
        {step === "search" && (
          <div className="fixed z-40 inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-[var(--color-light)] w-full max-w-[90%] text-[1rem] sm:text-[1.25rem] px-6 sm:px-8 pt-10 py-6 flex flex-col gap-4 relative rounded-md">
              <button
                className="p-1 absolute top-4 right-4 cursor-pointer"
                onClick={closeVerifyGraduates} // Closes the main modal
              >
                <FaTimes size={16} />
              </button>

              <h3 className="sm:text-[1.7rem] font-semibold">
                Verification Alumni Certificate Instantly
              </h3>
              <p className="text-[var(--color-darker)]">
                Search by full name or email address to verify alumni
                credentials
              </p>
              <div className="input-box w-full flex flex-col md:flex-row gap-2">
                <div className="w-full relative">
                  <input
                    type="text"
                    value={searchParams.track}
                    onChange={handleTrackInputChange}
                    placeholder="Enter track"
                    className="w-full text-sm md:text-base h-10 pl-8 border rounded-md"
                  />
                </div>
                <div className="w-full relative">
                  <input
                    type="text"
                    value={searchParams.otherInput}
                    onChange={handleOtherInputChange}
                    placeholder="Enter full name or email address..."
                    className="w-full text-sm md:text-base h-10 pl-8 border rounded-md"
                  />
                </div>
                <button
                  disabled={!isValid || loading}
                  className={`${
                    isValid ? "bg-[#09A311]" : "bg-[var(--color-dark-active)]"
                  } text-white h-8 rounded-md ${
                    isValid ? "cursor-pointer" : "cursor-not-allowed"
                  } md:w-fit h-10 px-3 flex items-center justify-center gap-1`}
                  onClick={searchAlumni}
                >
                  <FaSearch size={15} />
                  {loading ? "Searching..." : "Verify"}
                </button>
              </div>

              {error && (
                <div className="error text-center flex flex-col items-center gap-2">
                  <img src={"/icons/verify-grad-error-icon.svg"} alt="Error" />
                  <div className="content flex flex-col gap-1">
                    <h4 className="font-semibold">
                      No matching alumni record found
                    </h4>
                    {/* <p className="text-[var(--color-darker)]">
                                        We couldn't find any verified graduate matching{" "}
                                        {`Track: ${searchParams.track} and ${searchParams.otherInput}`}
                                    </p> */}

                    <p className="text-[var(--color-darker)]">
                      {/* Determine if the user entered an email or a name */}
                      {(() => {
                        const isEmail = searchParams.otherInput.includes("@");
                        const label = isEmail ? "email" : "name";

                        return (
                          <>
                            We couldn't find any verified graduate matching
                            **track: {searchParams.track}** and **{label}:{" "}
                            {searchParams.otherInput}**
                          </>
                        );
                      })()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {step === "results" && (
          <RecruiterSearchResults
            alumniData={alumniData}
            openCertificatePreview={openCertificatePreview} // Calls Navbar function to set selectedAlumni and step="preview"
            closeResults={() => setStep("search")} // ✅ Closes results table and goes back to search form
            closeVerifyGraduates={closeVerifyGraduates} // ✅ Closes the main modal completely
          />
        )}

        {step === "preview" && (
          <RecruiterCertificatePreview
            alumniData={selectedAlumni} // Pass the single selected alumni object
            onGoBack={() => setStep("results")} // ✅ Goes back to the results table
            onClose={closeVerifyGraduates} // ✅ Closes the main modal completely
          />
        )}
      </>
    );
};

export default VerifyGraduates;



// import { useState, useEffect } from "react";
// import { FaTimes, FaSearch } from "react-icons/fa";
// import gradErrorIcon from "../../public/icons/verify-grad-error-icon.svg";
// import RecruiterSearchResults from "./RecruiterSearchResults";
// import RecruiterCertificatePreview from "./RecruiterCertificatePreview";

// const VerifyGraduates = ({
//   searchAlumni,
//   alumniData,
//   searchParams,
//   setSearchParams,
//   step,
//   setStep,
//   error,
//   loading,
//   closeRecruiterSearch,
//   closeVerifyGraduates,
//   setRecruiterSearch, // ✅ needed to open RecruiterSearchResults correctly
// }) => {
//   const [isValid, setIsValid] = useState(false);
//   const closeCertificatePreview = () => {
//     setStep("results"); // go back to results
//     setSelectedAlumni(null);
//   };

//   const openCertificatePreview = (alumni) => {
//     setSelectedAlumni(alumni);
//     setStep("preview");
//   };
//   const [selectedAlumni, setSelectedAlumni] = useState(null);

//   const trackRegex = /^[A-Za-z]{3,}(?: [A-Za-z]{3,})?$/;
//   const OtherInputRegex =
//     /^([a-zA-Z\s'-]{3,}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

//   const handleTrackInputChange = (e) => {
//     const value = e.target.value;
//     setSearchParams({ ...searchParams, track: value });
//     setIsValid(trackRegex.test(value));
//   };

//   const handleOtherInputChange = (e) => {
//     const value = e.target.value;
//     setSearchParams({ ...searchParams, otherInput: value });
//     setIsValid(OtherInputRegex.test(value));
//   };

//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);

//   return (
//     <>
//       {step === "search" && (
//         <div className="fixed z-40 inset-0 flex items-center justify-center bg-black/50">
//           <div className="bg-[var(--color-light)] max-w-[90%] text-[1rem] sm:text-[1.25rem] px-6 sm:px-8 pt-10 py-6 flex flex-col gap-4 relative rounded-md">
//             <button
//               className="p-1 absolute top-4 right-4 cursor-pointer"
//               onClick={closeVerifyGraduates}
//             >
//               <FaTimes size={16} />
//             </button>

//             <h3 className="sm:text-[1.7rem] font-semibold">
//               Verification Alumni Certificate Instantly
//             </h3>
//             <p className="text-[var(--color-darker)]">
//               Search by full name or email address to verify alumni credentials
//             </p>
//             <div className="input-box w-full flex flex-col md:flex-row gap-2">
//               <div className="w-full relative">
//                 <input
//                   type="text"
//                   value={searchParams.track}
//                   onChange={handleTrackInputChange}
//                   placeholder="Enter track"
//                   className="w-full text-sm md:text-base h-10 pl-8 border rounded-md"
//                 />
//                 {/* <FaSearch className="text-[#00000066] absolute top-[50%] left-2 -translate-y-1/2" /> */}
//               </div>
//               <div className="w-full relative">
//                 <input
//                   type="text"
//                   value={searchParams.otherInput}
//                   onChange={handleOtherInputChange}
//                   placeholder="Enter full name or email address..."
//                   className="w-full text-sm md:text-base h-10 pl-8 border rounded-md"
//                 />
//                 {/* <FaSearch className="text-[#00000066] absolute top-[50%] left-2 -translate-y-1/2" /> */}
//               </div>
//               <button
//                 disabled={!isValid}
//                 className={`${
//                   isValid ? "bg-[#09A311]" : "bg-[var(--color-dark-active)]"
//                 } text-white h-8 rounded-md ${
//                   isValid ? "cursor-pointer" : "cursor-auto"
//                 } md:w-fit h-10 px-3 flex items-center justify-center gap-1`}
//                 onClick={searchAlumni}
//               >
//                 <FaSearch size={15} />
//                 {loading ? "Searching..." : "Verify"}
//               </button>
//             </div>

//             {error && (
//               <div className="error text-center flex flex-col items-center gap-2">
//                 <img src={gradErrorIcon} alt="" />
//                 <div className="content flex flex-col gap-1">
//                   <h4 className="font-semibold">
//                     No matching alumni record found
//                   </h4>
//                   <p className="text-[var(--color-darker)]">
//                     We couldn't find any verified graduate matching{" "}
//                     {`${searchParams.track} and ${searchParams.otherInput}`}
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* {step === "results" && (
//         <div className="fixed z-40 inset-0 flex items-center justify-center bg-black/50">
//           <div className="bg-white p-6 rounded-md shadow-md">
//             <h3 className="text-lg font-semibold">Search Results</h3>
//             <button
//               className="bg-[#09A311] text-white px-4 py-2 rounded-md mt-4"
//               onClick={() => {
//                 closeVerifyGraduates(); // close this modal
//                 setRecruiterSearch(true); // ✅ tell parent to open RecruiterSearchResults
//               }}
//             >
//               View Results
//             </button>
//           </div>
//         </div>
//       )} */}
//       {step === "results" && (
//   <RecruiterSearchResults
//     alumniData={alumniData}
//     openCertificatePreview={openCertificatePreview} // 👈 passes alumni to preview
//     closeRecruiterSearch={closeRecruiterSearch}
//     closeResults={() => setStep("search")} // 👈 lets you go back to search
//   />
// )}

//       {step === "preview" && (
//         <RecruiterCertificatePreview
//           alumniData={selectedAlumni}
//           onGoBack={() => setStep("results")} // 👈 goes back to results
//           onClose={closeVerifyGraduates} // 👈 closes everything
//         />
//       )}
//     </>
//   );
// };

// export default VerifyGraduates;


// import { useState, useEffect } from "react";
// import { FaTimes, FaSearch } from "react-icons/fa";
// import gradErrorIcon from "../../public/icons/verify-grad-error-icon.svg";
// import RecruiterSearchResults from "./RecruiterSearchResults";
// import RecruiterCertificatePreview from "./RecruiterCertificatePreview";

// const VerifyGraduates = ({
//   searchAlumni,
//   alumniData,
//   searchParams,
//   setSearchParams,
//   step,
//   setStep,
//   error,
//   loading,
//   closeVerifyGraduates,
// }) => {
//   const [isValid, setIsValid] = useState(false);
//   const [selectedAlumni, setSelectedAlumni] = useState(null);

//   const openCertificatePreview = (alumni) => {
//     setSelectedAlumni(alumni);
//     setStep("preview");
//   };

//   const closeCertificatePreview = () => {
//     setSelectedAlumni(null);
//     setStep("results");
//   };

//   const trackRegex = /^[A-Za-z]{3,}(?: [A-Za-z]{3,})?$/;
//   const OtherInputRegex =
//     /^([a-zA-Z\s'-]{3,}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

//   const handleTrackInputChange = (e) => {
//     const value = e.target.value;
//     setSearchParams({ ...searchParams, track: value });
//     setIsValid(trackRegex.test(value));
//   };

//   const handleOtherInputChange = (e) => {
//     const value = e.target.value;
//     setSearchParams({ ...searchParams, otherInput: value });
//     setIsValid(OtherInputRegex.test(value));
//   };

//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);

//   return (
//     <>
//       {step === "search" && (
//         <div className="fixed z-40 inset-0 flex items-center justify-center bg-black/50">
//           <div className="bg-[var(--color-light)] max-w-[90%] text-[1rem] sm:text-[1.25rem] px-6 sm:px-8 pt-10 py-6 flex flex-col gap-4 relative rounded-md">
//             <button
//               className="p-1 absolute top-4 right-4 cursor-pointer"
//               onClick={closeVerifyGraduates}
//             >
//               <FaTimes size={16} />
//             </button>

//             <h3 className="sm:text-[1.7rem] font-semibold">
//               Verification Alumni Certificate Instantly
//             </h3>
//             <p className="text-[var(--color-darker)]">
//               Search by full name or email address to verify alumni credentials
//             </p>

//             <div className="input-box w-full flex flex-col md:flex-row gap-2">
//               <div className="w-full relative">
//                 <input
//                   type="text"
//                   value={searchParams.track}
//                   onChange={handleTrackInputChange}
//                   placeholder="Enter track"
//                   className="w-full text-sm md:text-base h-10 pl-8 border rounded-md"
//                 />
//               </div>
//               <div className="w-full relative">
//                 <input
//                   type="text"
//                   value={searchParams.otherInput}
//                   onChange={handleOtherInputChange}
//                   placeholder="Enter full name or email address..."
//                   className="w-full text-sm md:text-base h-10 pl-8 border rounded-md"
//                 />
//               </div>
//               <button
//                 disabled={!isValid}
//                 className={`${
//                   isValid ? "bg-[#09A311]" : "bg-[var(--color-dark-active)]"
//                 } text-white h-8 rounded-md ${
//                   isValid ? "cursor-pointer" : "cursor-auto"
//                 } md:w-fit h-10 px-3 flex items-center justify-center gap-1`}
//                 onClick={searchAlumni}
//               >
//                 <FaSearch size={15} />
//                 {loading ? "Searching..." : "Verify"}
//               </button>
//             </div>

//             {error && (
//               <div className="error text-center flex flex-col items-center gap-2">
//                 <img src={gradErrorIcon} alt="" />
//                 <div className="content flex flex-col gap-1">
//                   <h4 className="font-semibold">
//                     No matching alumni record found
//                   </h4>
//                   <p className="text-[var(--color-darker)]">
//                     We couldn't find any verified graduate matching{" "}
//                     {`${searchParams.track} and ${searchParams.otherInput}`}
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {step === "results" && (
//         <RecruiterSearchResults
//         alumniData={alumniData}
//         onViewCertificate={openCertificatePreview} 
//         onBack={() => setStep("search")}
//         onClose={closeVerifyGraduates}  // 👈 THIS replaces closeRecruiterSearch
//       />
//       )}

//       {step === "preview" && (
//         <RecruiterCertificatePreview
//           alumniData={selectedAlumni}
//           onGoBack={closeCertificatePreview} // 👈 back to results
//           onClose={closeVerifyGraduates} // 👈 close everything
//         />
//       )}
//     </>
//   );
// };

// export default VerifyGraduates;


// import { useState, useEffect } from "react";
// import { FaTimes, FaSearch } from "react-icons/fa";
// import gradErrorIcon from "../../public/icons/verify-grad-error-icon.svg";
// import RecruiterSearchResults from "./RecruiterSearchResults";
// import RecruiterCertificatePreview from "./RecruiterCertificatePreview";

// const VerifyGraduates = ({
//   searchAlumni,
//   alumniData,
//   searchParams,
//   setSearchParams,
//   step,
//   setStep,
//   error,
//   loading,
//   closeVerifyGraduates,
// }) => {
//   const [isValid, setIsValid] = useState(false);
//   const [selectedAlumni, setSelectedAlumni] = useState(null);

//   const trackRegex = /^[A-Za-z]{3,}(?: [A-Za-z]{3,})?$/;
//   const OtherInputRegex =
//     /^([a-zA-Z\s'-]{3,}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

//   const handleTrackInputChange = (e) => {
//     const value = e.target.value;
//     setSearchParams({ ...searchParams, track: value });
//     setIsValid(trackRegex.test(value));
//   };

//   const handleOtherInputChange = (e) => {
//     const value = e.target.value;
//     setSearchParams({ ...searchParams, otherInput: value });
//     setIsValid(OtherInputRegex.test(value));
//   };

//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);

//   return (
//     <>
//       {step === "search" && (
//         <div className="fixed z-40 inset-0 flex items-center justify-center bg-black/50">
//           <div className="bg-[var(--color-light)] max-w-[90%] text-[1rem] sm:text-[1.25rem] px-6 sm:px-8 pt-10 py-6 flex flex-col gap-4 relative rounded-md">
//             <button
//               className="p-1 absolute top-4 right-4 cursor-pointer"
//               onClick={closeVerifyGraduates}
//             >
//               <FaTimes size={16} />
//             </button>

//             <h3 className="sm:text-[1.7rem] font-semibold">
//               Verify Alumni Certificate Instantly
//             </h3>
//             <p className="text-[var(--color-darker)]">
//               Search by full name or email address to verify alumni credentials
//             </p>

//             <div className="input-box w-full flex flex-col md:flex-row gap-2">
//               <input
//                 type="text"
//                 value={searchParams.track}
//                 onChange={handleTrackInputChange}
//                 placeholder="Enter track"
//                 className="w-full text-sm md:text-base h-10 pl-8 border rounded-md"
//               />
//               <input
//                 type="text"
//                 value={searchParams.otherInput}
//                 onChange={handleOtherInputChange}
//                 placeholder="Enter full name or email..."
//                 className="w-full text-sm md:text-base h-10 pl-8 border rounded-md"
//               />
//               <button
//                 disabled={!isValid}
//                 className={`${
//                   isValid ? "bg-[#09A311]" : "bg-[var(--color-dark-active)]"
//                 } text-white h-10 px-3 rounded-md flex items-center justify-center gap-1`}
//                 onClick={searchAlumni}
//               >
//                 <FaSearch size={15} />
//                 {loading ? "Searching..." : "Verify"}
//               </button>
//             </div>

//             {error && (
//               <div className="error text-center flex flex-col items-center gap-2">
//                 <img src={gradErrorIcon} alt="" />
//                 <h4 className="font-semibold">
//                   No matching alumni record found
//                 </h4>
//                 <p className="text-[var(--color-darker)]">
//                   Couldn’t find any verified graduate matching{" "}
//                   {`${searchParams.track} and ${searchParams.otherInput}`}
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {step === "results" && (
//         <RecruiterSearchResults
//           alumniData={alumniData}
//           onViewCertificate={(alumni) => {
//             setSelectedAlumni(alumni);
//             setStep("preview");
//           }}
//           onBack={() => setStep("search")}
//           onClose={closeVerifyGraduates}
//         />
//       )}

//       {step === "preview" && (
//         <RecruiterCertificatePreview
//           alumniData={selectedAlumni}
//           onGoBack={() => setStep("results")}
//           onClose={closeVerifyGraduates}
//         />
//       )}
//     </>
//   );
// };

// export default VerifyGraduates;

// import { useEffect } from "react";
// import { FaTimes, FaSearch } from "react-icons/fa";
// import gradErrorIcon from "../../public/icons/verify-grad-error-icon.svg";

// const VerifyGraduates = ({
//   searchParams={searchParams}
//   setSearchParams={setSearchParams}
//   searchAlumni={searchAlumni}
//   alumniData={alumniData}
//   error={error}
//   loading={loading}
//   closeVerifyGraduates={closeVerifyGraduates}
//   openRecruiterSearch={() => setRecruiterSearch(true)}  {/* 👈 ADD THIS */}
// }) => {
//   const handleTrackInputChange = (e) => {
//     setSearchParams({ ...searchParams, track: e.target.value });
//   };

//   const handleOtherInputChange = (e) => {
//     setSearchParams({ ...searchParams, otherInput: e.target.value });
//   };

//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => (document.body.style.overflow = "auto");
//   }, []);

//   return (
//     <div className="fixed z-40 inset-0 flex items-center justify-center bg-black/50">
//       <div className="bg-white max-w-[90%] px-8 pt-10 py-6 flex flex-col gap-4 relative rounded-md">
//         <button
//           className="p-1 absolute top-4 right-4 cursor-pointer"
//           onClick={closeVerifyGraduates}
//         >
//           <FaTimes size={16} />
//         </button>

//         <h3 className="font-semibold text-xl">
//           Verify Alumni Certificate Instantly
//         </h3>

//         <div className="flex flex-col md:flex-row gap-2">
//           <input
//             type="text"
//             value={searchParams.track}
//             onChange={handleTrackInputChange}
//             placeholder="Enter track"
//             className="border p-2 rounded"
//           />
//           <input
//             type="text"
//             value={searchParams.otherInput}
//             onChange={handleOtherInputChange}
//             placeholder="Enter full name or email"
//             className="border p-2 rounded"
//           />
//           <button
//             onClick={async () => {
//               await searchAlumni();
//               closeVerifyGraduates();
//               openRecruiterSearch(); // ✅ go straight to results
//             }}
//             disabled={loading}
//             className="bg-green-600 text-white px-4 py-2 rounded"
//           >
//             {loading ? "Searching..." : "Verify"}
//           </button>
//         </div>

//         {error && (
//           <div className="text-center">
//             <img src={gradErrorIcon} alt="" />
//             <p>No matching alumni record found.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VerifyGraduates;


