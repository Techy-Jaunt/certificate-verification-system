// import { useState, useEffect, useRef } from "react";
// import { CiSearch } from "react-icons/ci";
// import { FaTimes } from "react-icons/fa";

// const VerifyGraduates = ({ closeVerifyGraduates, setRecruiterSearch }) => {
//   const [verifyData, setVerifyData] = useState("Verify");
//   const [otpOk, setOtpOk] = useState(false);
//   const [data, setData] = useState("");

//   const timerRef = useRef(null);

//   const handleVerifyBtnClick = () => {
//     setVerifyData("Verifying....");
//     if (timerRef.current) clearTimeout(timerRef.current);
//     timerRef.current = setTimeout(() => {
//       setOtpOk(true);
//       setVerifyData("Verify");
//       timerRef.current = null;
//       closeVerifyGraduates();
//       setRecruiterSearch(true);
//     }, 1000);
//   };

//   useEffect(() => {
//     return () => {
//       if (timerRef.current) clearTimeout(timerRef.current);
//     };
//   }, []);

//   useEffect(() => {
//     document.body.style.overflow = "hidden"; // lock scroll
//     return () => {
//       document.body.style.overflow = "auto"; // restore when modal closes
//     };
//   }, []);

//   return (
//     <>
//       <div className="fixed z-40 inset-0 flex items-center justify-center bg-black/50">
//         <div className="bg-[var(--color-light)] w-[90%] md:w-[550px] max-w-full px-10 py-6 flex flex-col gap-2 relative rounded-md">
//           <button
//             className="p-1 absolute top-5 right-4 cursor-pointer"
//             onClick={closeVerifyGraduates}
//           >
//             <FaTimes size={12} />
//           </button>

//           <h3 className="font-semibold">
//             Verify Alumni Certificates instantly
//           </h3>
//           <p className="text-[var(--color-darker)] text-sm">
//             Search by full name or email address to verify alumni credentials
//           </p>
//           <div className="input-box w-full  flex items-center gap-2 py-4">
//             <div className="w-full px-1 flex items-center  gap-2 h-8 border border-dark-hover rounded-md ">
//               <CiSearch />
//               <input
//                 type="text"
//                 value={data}
//                 onChange={(e) => setData(e.target.value)}
//                 placeholder="Enter fullname or email address..."
//                 className="outline-none w-full text-xs sm:text-sm"
//               />
//             </div>
//             <div
//               className={`${
//                 data.length > 5
//                   ? "bg-primary-950"
//                   : "bg-[var(--color-dark-active)]"
//               } text-white h-8 rounded-md min-w-fit flex items-center px-4 ${
//                 data ? "cursor-pointer" : "cursor-auto"
//               }`}
//             >
//               <CiSearch className="w-5 h-5" />
//               <button
//                 className={`${data ? "cursor-pointer" : "cursor-auto"}`}
//                 disabled={!data}
//                 onClick={handleVerifyBtnClick}
//               >
//                 {verifyData}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default VerifyGraduates;




import { useState, useEffect } from "react";
import { FaTimes, FaSearch } from "react-icons/fa";
import gradErrorIcon from "../../public/icons/verify-grad-error-icon.svg";
import axios from 'axios';

const VerifyGraduates = ({ closeVerifyGraduates, setRecruiterSearch }) => {
  const [ isValid, setIsValid ] = useState(false);
  const [ error, setError ] = useState(false);

  const [userInput, setUserInput] = useState("");
  const inputRegex = /^([a-zA-Z\s'-]{3,}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

  const [searchParams, setSearchParams] = useState({
    track: '',
    email: '',
    name: ''
  });

  const handleInputChange = (e) => {
    const value = e.target.value;
    setUserInput(value);
    // setSearchParams({...searchParams, [name || email] : value})
    setIsValid(inputRegex.test(value));
  }


  const [alumniData, setAlumniData] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchAlumni = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://certificate-verification-system-m7s7.onrender.com//api/get-details', { 
        params: searchParams 
      });
      // const response = await axios.get('/api/get-details', { 
      //   params: searchParams 
      // });
      setAlumniData(response.data);
    } catch (error) {
      console.error('Search failed:', error);
      setError(true)
    } finally {
      setLoading(false);
      
    }
  }

  useEffect(() => {
        document.body.style.overflow = "hidden"; // lock scroll
        return () => {
          document.body.style.overflow = "auto"; // restore when modal closes
        };
      }, []);

  return (
    <>
      {setRecruiterSearch && (
        // <div className="h-[calc(100vh-4.2rem)] px-4 flex flex-col items-center justify-center border">
          <div className="fixed z-40 inset-0 flex items-center justify-center bg-black/50">
          <div className="overlay bg-[var(--color-darkened)] opacity-65 absolute inset-0"></div>
          <div className="bg-[var(--color-light)] max-w-full text-[1rem] sm:text-[1.25rem] px-6 sm:px-8 pt-10 py-6 flex flex-col gap-4 relative rounded-md">
            <button
              className="p-1 absolute top-4 right-4 cursor-pointer"
              onClick={closeVerifyGraduates}
              // onClick={() => setIsOpen(false)}
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
                  value={userInput}
                  onChange={handleInputChange}
                  placeholder="Enter full name or email address..."
                  className="w-full text-sm md:text-base h-10 pl-8 border rounded-md"
                />
                <FaSearch className="text-[#00000066] absolute top-[50%] left-2 -translate-y-1/2" />
              </div>
              <button
                disabled={!isValid}
                className={`${
                  isValid?
                      "bg-[#09A311]"
                    : "bg-[var(--color-dark-active)]"
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
                <h4 className="font-semibold">No matching alumni record found</h4>
                <p className="text-[var(--color-darker)]">We couldn't find any  verified graduate matching { userInput }</p>
              </div>
            </div>
            )}
          </div>
          
        </div>
      )}
    </>
  );
};
export default VerifyGraduates;

