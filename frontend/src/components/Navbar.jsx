// import { useState } from "react";
// import axios from "axios";
// import { FaTimes, FaBars } from "react-icons/fa";
// import logo from "/icons/image 2.png";
// import { CertificateDownloadForm } from "../modals/CertificateDownloadForm";
// import Otp from "../modals/Otp";
// import SuccessDownloadAlumni from "../modals/SuccessDownloadAlumni";
// import VerifyGraduates from "../modals/VerifyGraduates";
// import RecruiterSearchResults from "../modals/RecruiterSearchResults";
// import RecruiterCertificatePreview from "../modals/RecruiterCertificatePreview";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [downloadCertificate, setDownloadCertificate] = useState(false);
//   const [openOtpModal, setOpenOtpModal] = useState(false);
//   const [openSuccessModal, setOpenSuccessModal] = useState(false);
//   const [openVerifyGraduates, setOpenVerifyGraduate] = useState(false);
//   const [recruiterSearch, setRecruiterSearch] = useState(false);
//   const [certificatePreview, setCertificatePreview] = useState(false);

//   //Getting the fetched data for the whole recruiter verification process
//   const [step, setStep] = useState("search");
//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [alumniData, setAlumniData] = useState([]); // ✅ lives here and persists
//   const [selectedAlumni, setSelectedAlumni] = useState(null);
//   const [searchParams, setSearchParams] = useState({
//     track: "",
//     otherInput: "",
//   });

//   const searchAlumni = async () => {
//     setLoading(true);
//     try {
//       const params = { track: searchParams.track };
//       if (searchParams.otherInput.includes("@")) {
//         params.email = searchParams.otherInput;
//       } else {
//         params.name = searchParams.otherInput;
//       }

//       const response = await axios.get("/api/certificate/verify", { params });
//       const results = Array.isArray(response.data)
//         ? response.data
//         : [response.data];

//       setAlumniData(results);
//       setStep("results"); // ✅ move to results view
//     } catch (error) {
//       console.error("Search failed:", error);
//       setError(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <nav className="w-full sm:w-[95%] mx-auto px-8 py-7 bg-white flex items-center justify-between ">
//         {/* Logo Section */}
//         <div className="flex items-center space-x-2 ">
//           <h1 className="text-2xl text-(--color-primary-950) font-[Poppins]">
//             <span className="font-bold">Techy</span>
//             <span className="">Jaunt</span>
//           </h1>
//           <img src={logo} alt="TechyJaunt Logo" className="w-8 h-8" />
//         </div>

//         {/* Desktop Links */}
//         <ul className="hidden md:flex items-center gap-2 ">
//           <li className="">
//             <a
//               href="/"
//               className="text-(--color-darkened) rounded-md hover:bg-(--color-primary-50) font-medium py-2 px-2 cursor-pointer"
//             >
//               Home
//             </a>
//           </li>

//           <li className="">
//             <a
//               href="#about"
//               className="text-(--color-darkened) rounded-md hover:bg-(--color-primary-50) font-medium py-2 px-2"
//             >
//               About
//             </a>
//           </li>

//           <li className="">
//             <button
//               onClick={() => setDownloadCertificate(true)}
//               className="text-(--color-darkened) rounded-md hover:bg-(--color-primary-50) font-medium py-2 px-2"
//             >
//               Download Certificate
//             </button>
//           </li>

//           <li className="">
//             <button
//               onClick={() => setOpenVerifyGraduate(true)}
//               className="text-(--color-darkened) rounded-md hover:bg-(--color-primary-50) font-medium py-2 px-2"
//             >
//               Verify Graduates
//             </button>
//           </li>
//         </ul>

//         <div
//           type="button"
//           onClick={() => setIsOpen(true)}
//           className="md:hidden cursor-pointer"
//         >
//           <FaBars />
//         </div>

//         {/* Mobile Sidebar */}
//         <div
//           className={`fixed top-0 right-0 h-full w-64 bg-white shadow py-10  transform ${
//             isOpen ? "translate-x-0" : "translate-x-full"
//           } transition-transform duration-300 ease-in-out md:hidden z-50`}
//         >
//           <div className="flex justify-end pb-8 pr-10  shadow cursor-pointer">
//             <button onClick={() => setIsOpen(false)}>
//               <FaTimes />
//             </button>
//           </div>

//           <ul className="flex flex-col px-4 py-6 space-y-6 ">
//             <li className="">
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="text-(--color-darkened) rounded-md hover:bg-(--color-primary-50) font-medium py-2 px-2"
//               >
//                 Home
//               </button>
//             </li>

//             <li className="">
//               <a
//                 href="#about"
//                 onClick={() => setIsOpen(false)}
//                 className="text-(--color-darkened) rounded-md hover:bg-(--color-primary-50) font-medium py-2 px-2"
//               >
//                 About
//               </a>
//             </li>

//             <li className="">
//               <button
//                 onClick={() => {
//                   setDownloadCertificate(true);
//                   setIsOpen(false);
//                 }}
//                 className="text-(--color-darkened) rounded-md hover:bg-(--color-primary-50) font-medium py-2 px-2"
//               >
//                 Download Certificate
//               </button>
//             </li>

//             <li className="">
//               <button
//                 onClick={() => {
//                   setOpenVerifyGraduate(true);
//                   setIsOpen(false);
//                 }}
//                 className="text-(--color-darkened) rounded-md hover:bg-(--color-primary-50) font-medium py-2 px-2"
//               >
//                 Verify Graduates
//               </button>
//             </li>
//           </ul>
//         </div>
//       </nav>
//       {downloadCertificate && (
//         <CertificateDownloadForm
//           onClose={() => setDownloadCertificate(false)}
//           setOpenOtpModal={setOpenOtpModal}
//         />
//       )}
//       {openOtpModal && (
//         <Otp
//           closeOtp={() => setOpenOtpModal(false)}
//           setOpenSuccessModal={setOpenSuccessModal}
//         />
//       )}
//       {openSuccessModal && (
//         <SuccessDownloadAlumni
//           closeSuccessModal={() => setOpenSuccessModal(false)}
//         />
//       )}
//       {openVerifyGraduates && (
//   <VerifyGraduates
//     searchParams={searchParams}
//     setSearchParams={setSearchParams}
//     searchAlumni={searchAlumni}
//     alumniData={alumniData}
//     step={step}
//     setStep={setStep}
//     error={error}
//     loading={loading}
//     closeRecruiterSearch={() => setRecruiterSearch(false)}
//     closeVerifyGraduates={() => setOpenVerifyGraduate(false)}
//     setRecruiterSearch={setRecruiterSearch} // ✅ allow VerifyGraduates to open recruiterSearch modal
//   />
// )}
// {/* {recruiterSearch && (
//   <RecruiterSearchResults
//     alumniData={alumniData}
//     closeRecruiterSearch={() => setRecruiterSearch(false)} // ✅ proper close
//     openCertificatePreview={() => setCertificatePreview(true)} // ✅ trigger preview
//   />
// )}
//      {certificatePreview && (
//   <RecruiterCertificatePreview
//     alumniData={alumniData}
//     closeCertificatePreview={() => setCertificatePreview(false)}
//     reopenRecruiterSearch={() => setRecruiterSearch(true)} // ✅ reopen search when Back is clicked
//   />
// )} */}

// {recruiterSearch && (
//   <RecruiterSearchResults
//     alumniData={alumniData}
//     closeRecruiterSearch={() => setRecruiterSearch(false)}
//     openCertificatePreview={() => setCertificatePreview(true)}
//   />
// )}

// {certificatePreview && (
//   <RecruiterCertificatePreview
//     alumniData={alumniData}
//     onClose={() => setCertificatePreview(false)}
//   />
// )}

//     </>
//   );
// };

// export default Navbar;

import { useState } from "react";
import axios from "axios";
import { FaTimes, FaBars } from "react-icons/fa";
// import logo from "/icons/image 2.png"; // Assuming this path is correct
import { CertificateDownloadForm } from "../modals/CertificateDownloadForm";
import Otp from "../modals/Otp";
import SuccessDownloadAlumni from "../modals/SuccessDownloadAlumni";
import VerifyGraduates from "../modals/VerifyGraduates";
// The RecruiterSearchResults and RecruiterCertificatePreview components are now rendered INSIDE VerifyGraduates
// import RecruiterSearchResults from "../modals/RecruiterSearchResults";
// import RecruiterCertificatePreview from "../modals/RecruiterCertificatePreview";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [downloadCertificate, setDownloadCertificate] = useState(false);
    const [openOtpModal, setOpenOtpModal] = useState(false);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [openVerifyGraduates, setOpenVerifyGraduate] = useState(false);
    // REMOVED: const [recruiterSearch, setRecruiterSearch] = useState(false);
    // REMOVED: const [certificatePreview, setCertificatePreview] = useState(false);

    // Getting the fetched data for the whole recruiter verification process
    const [step, setStep] = useState("search"); // step inside the VerifyGraduates flow
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alumniData, setAlumniData] = useState([]);
    const [selectedAlumni, setSelectedAlumni] = useState(null); // Used to pass the single selected alumni to the preview
    const [searchParams, setSearchParams] = useState({
        track: "",
        otherInput: "",
    });

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
            setError(false);
            setStep("results"); // ✅ move to results view
            console.log(alumniData[0])
        } catch (error) {
            console.error("Search failed:", error);
            setError(true);
            setAlumniData([]);
        } finally {
            setLoading(false);
        }
    };
    
    // Function to completely reset the verification flow state when the modal closes
    const closeVerifyGraduatesAndReset = () => {
        setOpenVerifyGraduate(false);
        setStep("search"); // Reset the step for next time
        setAlumniData([]);
        setError(false);
        setSearchParams({ track: "", otherInput: "" });
    };

    // The two functions for internal flow control are now passed down to VerifyGraduates
    const openCertificatePreview = (alumni) => {
        setSelectedAlumni(alumni);
        setStep("preview");
    };

    const closeCertificatePreview = () => {
        setSelectedAlumni(null);
        setStep("results");
    };


    return (
        <>
            <nav className="w-full sm:w-[95%] mx-auto px-8 py-7 bg-white flex items-center justify-between ">
                {/* ... (Navbar content remains the same) ... */}
                <div className="flex items-center space-x-2 ">
                    <h1 className="text-2xl text-(--color-primary-950) font-[Poppins]">
                        <span className="font-bold">Techy</span>
                        <span className="">Jaunt</span>
                    </h1>
                    <img src={"/icons/image 2.png"} alt="TechyJaunt Logo" className="w-8 h-8" />
                </div>

                {/* Desktop Links */}
                <ul className="hidden md:flex items-center gap-2 ">
                    <li className="">
                        <a
                            href="/"
                            className="text-(--color-darkened) rounded-md hover:bg-(--color-primary-50) font-medium py-2 px-2 cursor-pointer"
                        >
                            Home
                        </a>
                    </li>

                    <li className="">
                        <a
                            href="#about"
                            className="text-(--color-darkened) rounded-md hover:bg-(--color-primary-50) font-medium py-2 px-2"
                        >
                            About
                        </a>
                    </li>

                    <li className="">
                        <button
                            onClick={() => setDownloadCertificate(true)}
                            className="text-(--color-darkened) rounded-md hover:bg-(--color-primary-50) font-medium py-2 px-2"
                        >
                            Download Certificate
                        </button>
                    </li>

                    <li className="">
                        <button
                            onClick={() => setOpenVerifyGraduate(true)}
                            className="text-(--color-darkened) rounded-md hover:bg-(--color-primary-50) font-medium py-2 px-2"
                        >
                            Verify Graduates
                        </button>
                    </li>
                </ul>

                <div
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="md:hidden cursor-pointer"
                >
                    <FaBars />
                </div>

                {/* Mobile Sidebar */}
                <div
                    className={`fixed top-0 right-0 h-full w-64 bg-white shadow py-10  transform ${
                        isOpen ? "translate-x-0" : "translate-x-full"
                    } transition-transform duration-300 ease-in-out md:hidden z-50`}
                >
                    <div className="flex justify-end pb-8 pr-10  shadow cursor-pointer">
                        <button onClick={() => setIsOpen(false)}>
                            <FaTimes />
                        </button>
                    </div>

                    <ul className="flex flex-col px-4 py-6 space-y-6 ">
                        <li className="">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-(--color-darkened) rounded-md hover:bg-(--color-primary-50) font-medium py-2 px-2"
                            >
                                Home
                            </button>
                        </li>

                        <li className="">
                            <a
                                href="#about"
                                onClick={() => setIsOpen(false)}
                                className="text-(--color-darkened) rounded-md hover:bg-(--color-primary-50) font-medium py-2 px-2"
                            >
                                About
                            </a>
                        </li>

                        <li className="">
                            <button
                                onClick={() => {
                                    setDownloadCertificate(true);
                                    setIsOpen(false);
                                }}
                                className="text-(--color-darkened) rounded-md hover:bg-(--color-primary-50) font-medium py-2 px-2"
                            >
                                Download Certificate
                            </button>
                        </li>

                        <li className="">
                            <button
                                onClick={() => {
                                    setOpenVerifyGraduate(true);
                                    setIsOpen(false);
                                }}
                                className="text-(--color-darkened) rounded-md hover:bg-(--color-primary-50) font-medium py-2 px-2"
                            >
                                Verify Graduates
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
            {/* Download Certificate Modals */}
            {downloadCertificate && (
                <CertificateDownloadForm
                    onClose={() => setDownloadCertificate(false)}
                    setOpenOtpModal={setOpenOtpModal}
                />
            )}
            {openOtpModal && (
                <Otp
                    closeOtp={() => setOpenOtpModal(false)}
                    setOpenSuccessModal={setOpenSuccessModal}
                />
            )}
            {openSuccessModal && (
                <SuccessDownloadAlumni
                    closeSuccessModal={() => setOpenSuccessModal(false)}
                />
            )}
            
            {/* Main Verification Flow Modal */}
            {openVerifyGraduates && (
                <VerifyGraduates
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    searchAlumni={searchAlumni}
                    alumniData={alumniData}
                    step={step}
                    setStep={setStep}
                    error={error}
                    loading={loading}
                    selectedAlumni={selectedAlumni} // Pass down selectedAlumni
                    openCertificatePreview={openCertificatePreview} // Passed down to RecruiterSearchResults
                    closeCertificatePreview={closeCertificatePreview} // Used in RecruiterCertificatePreview (not currently needed, but good practice)
                    closeVerifyGraduates={closeVerifyGraduatesAndReset} // The function to close the main modal and reset state
                />
            )}
        </>
    );
};

export default Navbar;
