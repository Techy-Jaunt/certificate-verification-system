// import { useState, useEffect } from "react";
// import { FaTimes, FaSearch } from "react-icons/fa";
// import gradErrorIcon from "../../public/icons/verify-grad-error-icon.svg";
// import axios from 'axios';
// import RecruiterSearchResults from "./RecruiterSearchResults";

// const VerifyGraduates = ({ closeVerifyGraduates, setRecruiterSearch, setOpenVerifyGraduate }) => {
//   const [ isValid, setIsValid ] = useState(false);
//   const [ error, setError ] = useState(false);
//   const [openModal, setOpenModal ] = useState(false);

//   // ✅ Track must be at least 3 letters, optional second word also ≥ 3 letters
//   const trackRegex = /^[A-Za-z]{3,}(?: [A-Za-z]{3,})?$/;

//   // ✅ Either: plain name ≥ 3 chars OR valid email format
//   const OtherInputRegex = /^([a-zA-Z\s'-]{3,}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

//   const [searchParams, setSearchParams] = useState({
//     track: '',
//     otherInput: ''   // NOTE: this is ambiguous, backend expects "name" OR "email"
//   });

//   // const closeAlumniDetails = () => {
//   //   setOpenModal(false);
//   // }
//   const handleTrackInputChange = (e) => {
//     const value = e.target.value;
//     setSearchParams({...searchParams, track : value})
//     setIsValid(trackRegex.test(value));
//   }

//   const handleOtherInputChange = (e) => {
//     const value = e.target.value;
//     setSearchParams({...searchParams, otherInput : value})
//     setIsValid(OtherInputRegex.test(value));
//   }

//   const [alumniData, setAlumniData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const searchAlumni = async () => {
//     setLoading(true);
//     console.log(searchParams)

//     try {
//       const params = { track: searchParams.track };
//       if (searchParams.otherInput.includes("@")) {
//         params.email = searchParams.otherInput;
//       } else {
//         params.name = searchParams.otherInput;
//       }

//       const response = await axios.get('/api/certificate/verify', { 
//         params 
//       });
//       const results = Array.isArray(response.data) 
//       ? response.data 
//       : [response.data];

//       setOpenModal(true);
//       setAlumniData(results);
//       console.log("Response:", response.data);
//       console.log("AlumniData:", alumniData);
//     } catch (error) {
//       console.error('Search failed:', error);
//       setError(true);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     document.body.style.overflow = "hidden"; 
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);

//   return (
//     <>
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
//                 <FaSearch className="text-[#00000066] absolute top-[50%] left-2 -translate-y-1/2" />
//               </div>
//               <div className="w-full relative">
//                 <input
//                   type="text"
//                   value={searchParams.otherInput}
//                   onChange={handleOtherInputChange}
//                   placeholder="Enter full name or email address..."
//                   className="w-full text-sm md:text-base h-10 pl-8 border rounded-md"
//                 />
//                 <FaSearch className="text-[#00000066] absolute top-[50%] left-2 -translate-y-1/2" />
//               </div>
//               <button
//                 disabled={!isValid}
//                 className={`${
//                   isValid
//                     ? "bg-[#09A311]"
//                     : "bg-[var(--color-dark-active)]"
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
//                   <h4 className="font-semibold">No matching alumni record found</h4>
//                   <p className="text-[var(--color-darker)]">
//                     We couldn't find any verified graduate matching {`${searchParams.track} and ${searchParams.otherInput}`}
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       { openModal && (<RecruiterSearchResults closeRecruiterSearch={closeVerifyGraduates} setRecruiterSearch={setRecruiterSearch} setOpenVerifyGraduate={setOpenVerifyGraduate} alumniData={alumniData}/>)}
//     </>
//   );
// };
// export default VerifyGraduates;




import { useState, useEffect } from "react";
import { FaTimes, FaSearch } from "react-icons/fa";
import gradErrorIcon from "../../public/icons/verify-grad-error-icon.svg";
import axios from "axios";
import RecruiterSearchResults from "./RecruiterSearchResults";
import RecruiterCertificatePreview from "./RecruiterCertificatePreview";

const VerifyGraduates = ({ closeVerifyGraduates, closeCertificatePreview, closeRecruiterSearch, setOpenVerifyGraduate }) => {
  const [step, setStep] = useState("search"); // "search" | "results" | "preview"
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useState({
    track: "",
    otherInput: ""
  });

  const [alumniData, setAlumniData] = useState([]); // ✅ lives here and persists
  const [selectedAlumni, setSelectedAlumni] = useState(null);

  const trackRegex = /^[A-Za-z]{3,}(?: [A-Za-z]{3,})?$/;
  const OtherInputRegex =
    /^([a-zA-Z\s'-]{3,}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

  const handleTrackInputChange = (e) => {
    const value = e.target.value;
    setSearchParams({ ...searchParams, track: value });
    setIsValid(trackRegex.test(value));
  };

  const handleOtherInputChange = (e) => {
    const value = e.target.value;
    setSearchParams({ ...searchParams, otherInput: value });
    setIsValid(OtherInputRegex.test(value));
  };

  const searchAlumni = async () => {
    setLoading(true);
    try {
      const params = { track: searchParams.track };
      if (searchParams.otherInput.includes("@")) {
        params.email = searchParams.otherInput;
      } else {
        params.name = searchParams.otherInput;
      }

      const response = await axios.get("/api/certificate/verify", { params });
      const results = Array.isArray(response.data)
        ? response.data
        : [response.data];

      setAlumniData(results);
      setStep("results"); // ✅ move to results view
    } catch (error) {
      console.error("Search failed:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
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
          <div className="bg-[var(--color-light)] max-w-[90%] text-[1rem] sm:text-[1.25rem] px-6 sm:px-8 pt-10 py-6 flex flex-col gap-4 relative rounded-md">
            <button
              className="p-1 absolute top-4 right-4 cursor-pointer"
              onClick={closeVerifyGraduates}
            >
              <FaTimes size={16} />
            </button>

            <h3 className="sm:text-[1.7rem] font-semibold">
              Verification Alumni Certificate Instantly
            </h3>
            <p className="text-[var(--color-darker)]">
              Search by full name or email address to verify alumni credentials
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
                <FaSearch className="text-[#00000066] absolute top-[50%] left-2 -translate-y-1/2" />
              </div>
              <div className="w-full relative">
                <input
                  type="text"
                  value={searchParams.otherInput}
                  onChange={handleOtherInputChange}
                  placeholder="Enter full name or email address..."
                  className="w-full text-sm md:text-base h-10 pl-8 border rounded-md"
                />
                <FaSearch className="text-[#00000066] absolute top-[50%] left-2 -translate-y-1/2" />
              </div>
              <button
                disabled={!isValid}
                className={`${
                  isValid ? "bg-[#09A311]" : "bg-[var(--color-dark-active)]"
                } text-white h-8 rounded-md ${
                  isValid ? "cursor-pointer" : "cursor-auto"
                } md:w-fit h-10 px-3 flex items-center justify-center gap-1`}
                onClick={searchAlumni}
              >
                <FaSearch size={15} />
                {loading ? "Searching..." : "Verify"}
              </button>
            </div>

            {error && (
              <div className="error text-center flex flex-col items-center gap-2">
                <img src={gradErrorIcon} alt="" />
                <div className="content flex flex-col gap-1">
                  <h4 className="font-semibold">
                    No matching alumni record found
                  </h4>
                  <p className="text-[var(--color-darker)]">
                    We couldn't find any verified graduate matching{" "}
                    {`${searchParams.track} and ${searchParams.otherInput}`}
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
          onSelectAlumni={(alumni) => {
            setSelectedAlumni(alumni);
            setStep("preview");
          }}
          onGoBack={() => setStep("search")}
          onClose={closeVerifyGraduates}
          closeRecruiterSearch={closeRecruiterSearch}
          closeCertificatePreview={closeCertificatePreview}
          setOpenVerifyGraduate={setOpenVerifyGraduate}
        />
      )}

      {step === "preview" && (
        <RecruiterCertificatePreview
          alumniData={selectedAlumni}
          onGoBack={() => setStep("results")}
          onClose={closeVerifyGraduates}
        />
      )}
    </>
  );
};

export default VerifyGraduates;
