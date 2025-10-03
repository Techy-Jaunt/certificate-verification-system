import { useState } from "react";
import { FaTimes, FaBars } from "react-icons/fa";
import logo from "/icons/image 2.png";
import { CertificateDownloadForm } from "../modals/CertificateDownloadForm";
import Otp from "../modals/Otp";
import SuccessDownloadAlumni from "../modals/SuccessDownloadAlumni";
import VerifyGraduates from "../modals/VerifyGraduates";
import RecruiterSearchResults from "../modals/RecruiterSearchResults";
import RecruiterCertificatePreview from "../modals/RecruiterCertificatePreview";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [downloadCertificate, setDownloadCertificate] = useState(false) 
  const [openOtpModal, setOpenOtpModal] = useState(false) 
  const [openSuccessModal, setOpenSuccessModal] = useState(false) 
  const [openVerifyGraduates, setOpenVerifyGraduate] = useState(false) 
  const [recruiterSearch, setRecruiterSearch] = useState(false) 
  const [certificatePreview, setCertificatePreview] = useState(false) 

  return (
    <>
    <nav className="w-full sm:w-[95%] mx-auto px-8 py-7 bg-white flex items-center justify-between ">
     
      {/* Logo Section */}
      <div className="flex items-center space-x-2 ">
        <h1 className="text-2xl text-(--color-primary-950) font-[Poppins]">
          <span className="font-bold">Techy</span>
          <span className="">Jaunt</span>
        </h1>
        <img src={logo} alt="TechyJaunt Logo" className="w-8 h-8" />
      </div>

      {/* Desktop Links */}
      <ul className="hidden md:flex items-center gap-2 ">
        <li className="">
          <a href="/"
            className="text-(--color-darkened) rounded-md hover:bg-(--color-primary-50) font-medium py-2 px-2 cursor-pointer"
            >
            Home
          </a>
        </li>

        <li className="">
         <a href="#about"
            className="text-(--color-darkened) rounded-md hover:bg-(--color-primary-50) font-medium py-2 px-2"
            >
            About
          </a>
        </li>

        <li className="">
          <button
          onClick={()=>setDownloadCertificate(true)}
            className="text-(--color-darkened) rounded-md hover:bg-(--color-primary-50) font-medium py-2 px-2"
            >
            Download Certificate
          </button>
        </li>

        <li className="">
           <button
             onClick={()=>setOpenVerifyGraduate(true)}

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
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow py-10  transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden z-50`}
        >
        <div className="flex justify-end pb-8 pr-10  shadow cursor-pointer">
          <button onClick={() => setIsOpen(false)} >
            <FaTimes />
          </button>
        </div>

        <ul className="flex flex-col px-4 py-6 space-y-6 ">
          <li className="">
            <button onClick={() => setIsOpen(false)}
            className="text-(--color-darkened) rounded-md hover:bg-(--color-primary-50) font-medium py-2 px-2"
            >
            Home
          </button>
          </li>

          <li className="">
          <a href="#about" 
          onClick={() => setIsOpen(false)}
            className="text-(--color-darkened) rounded-md hover:bg-(--color-primary-50) font-medium py-2 px-2"
            >
            About
          </a>
          </li>

          <li className="">
            <button
             onClick={()=>{setDownloadCertificate(true); setIsOpen(false);}} 
            className="text-(--color-darkened) rounded-md hover:bg-(--color-primary-50) font-medium py-2 px-2"
            >
            Download Certificate
          </button>
          </li>

          <li className="">
            <button
             onClick={()=>{setOpenVerifyGraduate(true); setIsOpen(false);}} 
            className="text-(--color-darkened) rounded-md hover:bg-(--color-primary-50) font-medium py-2 px-2"
            >
            Verify Graduates
          </button>
          </li>

        </ul>
      </div>
    </nav>
    {downloadCertificate && (
          <CertificateDownloadForm  onClose={() => setDownloadCertificate(false)} setOpenOtpModal={setOpenOtpModal} />
        )}
    {openOtpModal && (
          <Otp  closeOtp={() => setOpenOtpModal(false)}  setOpenSuccessModal={setOpenSuccessModal}/>
        )}
    {openSuccessModal && (
          <SuccessDownloadAlumni  closeSuccessModal={() => setOpenSuccessModal(false)} />
        )}
    {openVerifyGraduates && (
          <VerifyGraduates  closeVerifyGraduates={() => setOpenVerifyGraduate(false)} setOpenVerifyGraduate={() => setOpenVerifyGraduate(true)}  setRecruiterSearch={setRecruiterSearch} closeCertificatePreview={() => setCertificatePreview(false)}/>
        )}
    {recruiterSearch && (
          <RecruiterSearchResults  closeRecruiterSearch={() => setRecruiterSearch(false)}  setCertificatePreview={setCertificatePreview}/>
        )}
    {certificatePreview && (
          <RecruiterCertificatePreview  closeCertificatePreview={() => setCertificatePreview(false)}  setRecruiterSearch={setRecruiterSearch}/>
        )}

               </>
  );
};

export default Navbar;
