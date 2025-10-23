import { useState, useEffect, useRef } from "react";
import { FaTimes, FaSearch, FaAngleDown } from "react-icons/fa";
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
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Select Track");

  const OtherInputRegex =
    /^([a-zA-Z\s'-]{3,}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

  const handleTrackInputChange = (value) => {
    setSearchParams({ ...searchParams, track: value.toLowerCase() });
    setIsValid(
      OtherInputRegex.test(searchParams.otherInput)
    );
  };

  const handleOtherInputChange = (e) => {
    const value = e.target.value;
    setSearchParams({ ...searchParams, otherInput: value });
    setIsValid(
     OtherInputRegex.test(value)
    );
  };

  const selectRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          <div className="bg-[var(--color-light)] w-[90%] max-w-[43.5rem] text-[1rem] sm:text-[1.25rem] px-6 sm:px-8 pt-10 py-6 flex flex-col gap-4 relative rounded-md">
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
              Search by full name or email address to verify alumni credentials
            </p>
            <div className="input-box w-full flex flex-col md:flex-row gap-2">
              <div className="w-full relative">
                <div ref={selectRef} className="relative w-full">
                  <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="border rounded-md p-2 flex justify-between items-center cursor-pointer"
                  >
                    <span className="text-sm">
                      {selected || "Select Track"}
                    </span>
                    <FaAngleDown
                      className={`transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {isOpen && (
                    <ul className="absolute -mt-10 w-full bg-white flex flex-col border rounded-md shadow-lg z-10 overflow-y-scoll">
                      {[
                        "Frontend",
                        "Backend",
                        "Cybersecurity",
                        "Product Management",
                        "UI/UX",
                        "Data Analysis",
                      ].map((track) => (
                        <li
                          key={track}
                          onClick={() => {
                            setSelected(track);
                            handleTrackInputChange(track);
                            setIsOpen(false);
                          }}
                          className="text-sm px-2 py-1 hover:bg-gray-100 cursor-pointer"
                        >
                          {track}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className="w-full relative">
                <input
                  type="text"
                  value={searchParams.otherInput}
                  onChange={handleOtherInputChange}
                  placeholder="Enter email address"
                  className="w-full text-sm md:text-base h-10 pl-2 border rounded-md"
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
                  <p className="text-[var(--color-darker)]">
                    {/* Determine if the user entered an email or a name */}
                    {(() => {
                      const isEmail = searchParams.otherInput.includes("@");
                      const label = isEmail ? "email" : "name";

                      return (
                        <>
                          We couldn't find any verified graduate matching track:{" "}
                          {searchParams.track} and {label}:{" "}
                          {searchParams.otherInput}
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
          closeResults={() => setStep("search")} // Closes results table and goes back to search form
          closeVerifyGraduates={closeVerifyGraduates} // Closes the main modal completely
        />
      )}

      {step === "preview" && (
        <RecruiterCertificatePreview
          alumniData={selectedAlumni} // Pass the single selected alumni object
          onGoBack={() => setStep("results")} // Goes back to the results table
          onClose={closeVerifyGraduates} // Closes the main modal completely
        />
      )}
    </>
  );
};

export default VerifyGraduates;
