// validation.js

export const validateCertificateRequest = (formData) => {
  const errors = {};

  // Validate Full name
  if (!formData.fullName || formData.fullName.trim() === "") {
    errors.fullName = "Full name is required.";
  } else if (formData.fullName.length < 3) {
    errors.fullName = "Full name must be at least 3 characters long.";
  }

  // Validate E-mail
  if (!formData.email || formData.email.trim() === "") {
    errors.email = "Email is required.";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())
  ) {
    errors.email = "Email address is invalid.";
  }

  // Validate Cohort
  if (!formData.cohort || formData.cohort.trim() === "") {
    errors.cohort = "Cohort is required.";
  } else if (!/^Cohort\s\d{1,2},\s\d{4}$/.test(formData.cohort.trim())) {
    errors.cohort =
      "Cohort format should be like 'Cohort 6, 2020' as per examples.";
  }

  // Validate Track
  if (!formData.track || formData.track.trim() === "") {
    errors.track = "Track is required.";
  } else if (formData.track.length < 2) {
    errors.track = "Track must be at least 2 characters long.";
  }

  return errors;
};

//usage on submit - validate the form input

// const handleSubmit = (e) => {
//     e.preventDefault();
//     const validationErrors = validateCertificateRequest(formData);
//     setErrors(validationErrors);
//     if (Object.keys(validationErrors).length === 0) {
// Submit form data
//       console.log("Form submitted:", formData);
//     }
//   };
