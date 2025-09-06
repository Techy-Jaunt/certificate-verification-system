# TechyJaunt Alumni Network

## File/Folder Responsibilities

### 1. `public/`

- `images/`: Stores images.
- `icons/`: custom icons, logos.

### 2. `components/`

Generic reusable UI elements:

- `Button.jsx`: Button components with customizable props.
- `Modal.jsx`: Base modal wrapper.
- `InputField.jsx`: Customized input for forms.
- `CertificateCard.jsx`: Shows certificate preview with a thumbnail and button.
- `SearchBar.jsx`: Form for recruiter search (name & cohort inputs).

### 3. `pages/`

Single page components for routing:

- `Home.jsx`: Landing page with Alumni Network overview and event listings.
- `CertificateRequest.jsx`: Form for alumni to request certificates with inputs like fullname, email, cohort, and track.
- `RecruiterSearch.jsx`: Page showing search results listing alumni certificates available to recruiters.

### 4. `modals/`

Dedicated modal components for various pop-ups:

- `ErrorPopUp.jsx`: Displays error message on failure.
- `CertificatePreview.jsx`: Shows certificate image and verification text.
- `SuccessDownloadAlumni.jsx`: Confirmation popup after alumni download certificate.
- `SuccessDownloadRecruiter.jsx`: Confirmation popup after recruiter downloads certificate.
- `CertificateVerificationSuccess.jsx`: Successful certificate verification popup.

### 5. `hooks/`

Custom React hooks(optional):

- `useCertificateData.jsx`: Manages form state, API calls, and modal visibility related to certificate functionality.

### 6. `context/`

Context API for state management:

- `CertificateContext.jsx`: Manages global state such as user session or certificate data accessible across components.

### 7. `services/`

API and service calls handling backend interactions:

- `certificateService.jsx`: Functions to call API endpoints like fetching search results, certificate downloads, and verification.

### 8. `utils/`

Helper functions and validators:

- `validation.js`: Input validations for forms (email format, required fields).

### 9. Core Files

- `App.jsx`: Main app component managing route setup.
- `main.jsx`: Entry point rendering App.
- `index.css`: Tailwind customizations including colors, fonts...

---

##

### Error Pop-up Card

- Displays an error icon with message:  
  "We couldn’t find your details!  
  The email or cohort doesn’t seem to match our records. Please double-check and try again."
- Button to retry.

### Recruiter's Certificate Preview

- Shows a "Certificate Verified" message.
- Displays preview image of the certificate.

### Successful Download Popup for Recruiter

- Confirmation of successful certificate verification.
- Button allows viewing certificate.

### Successful Download Popup for Alumni

- Confirmation message: "Download Successful"
- Option to download the certificate again.

### Recruiter Search Results

- Search interface with inputs for Name and Cohort.
- Displays search results in a table with columns: Name, Cohort, Certificate Preview.
- "View Certificate" button for each result.

### Certificate Request Portal Page

- Form for alumni to input:
  - Full name
  - E-mail
  - Cohort
  - Track
- Submit button styled prominently.

### Home Page (TechyJaunt Alumni Network Overview)

- Displays stats:
  - 219+ Successful Graduates
  - 6 Completed Cohorts
  - 2223+ Certificates issued
  - 8 Tech Tracks
- Buttons for joining alumni or requesting certificate.
- Sections include:
  - Alumni Community benefits (Private Community, Exclusive Events, Career Support).
  - Upcoming Alumni Events with date, time, venue details and booking option.
  - Alumni Communities by specialization (UX/UI Design, Frontend Development, Backend Development, Data Science, Cybersecurity, Product Management).
- Footer includes contact info, navigation links, and newsletter subscription.

---

# Contact & Support

- **Email:** support@techyjaunt.com
- **Community:** Join our thriving network of tech professionals who have transformed their careers through TechyJaunt.

---

/certificate-verification-system
│
├── /public
│ ├── /images # Any Images  
│ └── /icons # Any custom icons
│
src/
│
├── components/ # Reusable UI components (modals, buttons, cards etc)
│ ├── Button.jsx
│ ├── Modal.jsx
│ ├── InputField.jsx
│ ├── CertificateCard.jsx # Card showing certificate preview
│ └── SearchBar.jsx
├── pages/ # Page level components (each route’s main container)
│ ├── Home.jsx # Main landing page - Alumni Network content
│ ├── CertificateRequest.jsx # Form for certificate requests
│ ├── RecruiterSearch.jsx # Search result page for recruiters
├── modals/ # Specific pop-up components related to various modals
│ ├── ErrorPopUp.jsx # For error message modal
│ ├── CertificatePreview.jsx # Preview modal for certificates
│ ├── SuccessDownloadAlumni.jsx # Download success modal for alumni
│ ├── SuccessDownloadRecruiter.jsx # Download success modal for recruiters
│ ├── CertificateVerificationSuccess.jsx # Verification success modal
├── hooks/ # Custom hooks (optional, stateful logic)
│ └── useCertificateData.jsx
├── context/ # Context providers (if using React Context for state management)
│ └── CertificateContext.jsx
├── services/ # API calls and data fetching functions
│ └── certificateService.js
├── utils/ # Utility/helper functions
│ └── validation.js # Form validation helpers etc.
├── App.jsx
├── main.jsx
└── index.css # Tailwind CSS configuration
