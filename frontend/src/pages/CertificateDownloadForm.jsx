import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const CustomDropdown = ({ label, placeholder, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="form-group mb-5">
      <label className="block text-gray-700 font-semibold mb-2">{label}</label>
      <div className="relative">
        <div
          className={`
            w-full p-3 border border-gray-300 rounded-md bg-white 
            flex items-center justify-between cursor-pointer 
            transition-all duration-300 
            ${isOpen ? 'border-blue-500 shadow-md' : 'border-gray-300'}
          `}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={`text-sm ${value ? 'text-gray-800' : 'text-gray-400 italic'}`}>
            {value || placeholder}
          </span>
          <ChevronDownIcon
            className={`w-5 h-5 text-gray-400 transition-transform duration-300 
              ${isOpen ? 'transform rotate-180' : ''}`}
          />
        </div>
        {isOpen && (
          <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden">
            {options.map((option, index) => (
              <li
                key={index}
                className="p-3 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export const CertificateDownloadForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    cohort: '',
    track: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted!');

    setFormData({
      fullName: '',
      email: '',
      cohort: '',
      track: '',
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-300 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <div className="flex justify-between items-start border-b border-gray-200 pb-5 mb-6">
          <div>
            <h2 className="text-xl font-bold text-blue-600">Download Certificate</h2>
            <p className="text-sm text-blue-400 mt-1">Enter your correct details</p>
          </div>
          <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200" aria-label="Close form">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-5">
            <label htmlFor="fullName" className="block text-gray-700 font-semibold mb-2">Full name</label>
            <input
              type="text"
              id="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Kindly input your registered Techyjaunt name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 placeholder-italic text-sm"
              required
            />

          </div>
          <div className="form-group mb-5">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">E-mail</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Kindly input your registered Techyjaunt E-mail"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 placeholder-italic text-sm"
              required
            />
          </div>

          <CustomDropdown
            label="Cohort"
            placeholder="Kindly input your Techyjaunt cohort"
            options={['Cohort 1', 'Cohort 2', 'Cohort 3', 'Cohort 4', 'Cohort 5', 'Cohort 6']}
            value={formData.cohort}
            onChange={(val) => setFormData({ ...formData, cohort: val })}
          />

          <CustomDropdown
            label="Track"
            placeholder="Kindly input your track"
            options={['UIUX', 'Cybersecurity', 'Blockchain', 'Frontend Development', 'Backend Development', 'Data Analyst', 'Project manager']}
            value={formData.track}
            onChange={(val) => setFormData({ ...formData, track: val })}
          />

          <button
            type="submit"
            className="bg-blue-600 text-white font-bold py-2 px-5 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300 mt-6 flex items-center justify-center space-x-2 mx-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5 -rotate-45 transform"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
            <span>Submit</span>
          </button>
        </form>
      </div>
    </div>
  );
};
