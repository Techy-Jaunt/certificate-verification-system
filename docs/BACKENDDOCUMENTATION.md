# Alumni Certificate System API Documentation

## Overview
This API provides endpoints for alumni verification and certificate retrieval. The system validates alumni credentials, sends OTPs for authentication, and provides certificate links via email.

## Base URL
`https://backend-domain.com` (Replace with actual deployment URL)

## Authentication
No initial authentication required. Uses OTP (One-Time Password) verification for secure access.

## API Endpoints

### 1. Validate Alumni Details

**Endpoint:** `POST /api/validate-alumni`

Validates alumni information and sends an OTP to their registered email.

#### Request Body
```json
{
  "email": "string (required)",
  "cohort": "string (required)",
  "track": "string (required)"
}
```

#### Track Options
- `"frontend"`
- `"backend"`
- `"ui/ux"`
- `"product management"`
- `"cybersecurity"`
- `"data analysis"`

#### Success Response (200)
```json
{
  "status": "success",
  "message": "OTP sent"
}
```

#### Error Responses
- **400 Bad Request** - Missing fields or invalid track
- **404 Not Found** - Alumni record not found
- **500 Internal Server Error** - Server error

#### React Implementation Example
```jsx
import { useState } from 'react';
import axios from 'axios';

const AlumniValidation = () => {
  const [formData, setFormData] = useState({
    email: '',
    cohort: '',
    track: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const validateAlumni = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/validate-alumni', formData);
      setMessage('OTP sent to your email!');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Validation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input 
        type="email" 
        placeholder="Email"
        onChange={(e) => setFormData({...formData, email: e.target.value})}
      />
      <input 
        placeholder="Cohort"
        onChange={(e) => setFormData({...formData, cohort: e.target.value})}
      />
      <select onChange={(e) => setFormData({...formData, track: e.target.value})}>
        <option value="">Select Track</option>
        <option value="frontend">Frontend</option>
        <option value="backend">Backend</option>
        <option value="ui/ux">UI/UX</option>
        <option value="product management">Product Management</option>
        <option value="cybersecurity">Cybersecurity</option>
        <option value="data analysis">Data Analysis</option>
      </select>
      <button onClick={validateAlumni} disabled={loading}>
        {loading ? 'Validating...' : 'Validate & Send OTP'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};
```

### 2. Verify OTP and Get Certificate

**Endpoint:** `POST /api/verify-otp`

Verifies the OTP and sends certificate link to the alumni's email.

#### Request Body
```json
{
  "email": "string (required)",
  "otp": "string (required)",
  "track": "string (required)"
}
```

#### Success Response (200)
```json
{
  "status": "success",
  "message": "Certificate link sent to user@example.com"
}
```

#### Error Responses
- **401 Unauthorized** - Invalid or expired OTP
- **404 Not Found** - Email not found
- **500 Internal Server Error** - Server error

#### React Implementation Example
```jsx
import { useState } from 'react';
import axios from 'axios';

const OTPVerification = () => {
  const [otpData, setOtpData] = useState({
    email: '',
    otp: '',
    track: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const verifyOTP = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/verify-otp', otpData);
      setMessage('Certificate link sent to your email!');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input 
        type="email" 
        placeholder="Email"
        onChange={(e) => setOtpData({...otpData, email: e.target.value})}
      />
      <input 
        placeholder="OTP"
        onChange={(e) => setOtpData({...otpData, otp: e.target.value})}
      />
      <select onChange={(e) => setOtpData({...otpData, track: e.target.value})}>
        <option value="">Select Track</option>
        <option value="frontend">Frontend</option>
        <option value="backend">Backend</option>
        {/* ... other track options */}
      </select>
      <button onClick={verifyOTP} disabled={loading}>
        {loading ? 'Verifying...' : 'Verify OTP'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};
```

### 3. Get Alumni Details

**Endpoint:** `GET /api/get-details`

Retrieves alumni details by email or name.

#### Query Parameters
- `track` (required) - The track name
- `email` (optional) - Alumni email
- `name` (optional) - Alumni name

**Note:** Either `email` or `name` must be provided.

#### Success Response (200)
```json
{
  "name": "John Doe",
  "cohort": "2023",
  "track": "frontend",
  "verified": true
}
```

#### Error Responses
- **404 Not Found** - Alumni not found
- **500 Internal Server Error** - Server error

#### React Implementation Example
```jsx
import { useState } from 'react';
import axios from 'axios';

const AlumniLookup = () => {
  const [searchParams, setSearchParams] = useState({
    track: '',
    email: '',
    name: ''
  });
  const [alumniData, setAlumniData] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchAlumni = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/get-details', { 
        params: searchParams 
      });
      setAlumniData(response.data);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <select 
        value={searchParams.track}
        onChange={(e) => setSearchParams({...searchParams, track: e.target.value})}
      >
        <option value="">Select Track</option>
        {/* ... track options */}
      </select>
      <input 
        placeholder="Email"
        value={searchParams.email}
        onChange={(e) => setSearchParams({...searchParams, email: e.target.value, name: ''})}
      />
      <span>OR</span>
      <input 
        placeholder="Name"
        value={searchParams.name}
        onChange={(e) => setSearchParams({...searchParams, name: e.target.value, email: ''})}
      />
      <button onClick={searchAlumni} disabled={loading || !searchParams.track}>
        {loading ? 'Searching...' : 'Search'}
      </button>
      
      {alumniData && (
        <div>
          <h3>Alumni Details</h3>
          <p>Name: {alumniData.name}</p>
          <p>Cohort: {alumniData.cohort}</p>
          <p>Track: {alumniData.track}</p>
        </div>
      )}
    </div>
  );
};
```

## Complete React Component Example

```jsx
import React, { useState } from 'react';
import axios from 'axios';

const AlumniCertificateSystem = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({
    email: '',
    cohort: '',
    track: '',
    otp: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Step 1: Validate alumni and send OTP
  const handleValidation = async () => {
    setLoading(true);
    try {
      await axios.post('/api/validate-alumni', userData);
      setMessage('OTP sent to your email!');
      setCurrentStep(2);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Validation failed');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP and get certificate
  const handleOTPVerification = async () => {
    setLoading(true);
    try {
      await axios.post('/api/verify-otp', userData);
      setMessage('Certificate link sent to your email!');
      setCurrentStep(3);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="alumni-system">
      {currentStep === 1 && (
        <div className="validation-step">
          <h2>Step 1: Validate Your Alumni Details</h2>
          {/* Form inputs for email, cohort, track */}
          <button onClick={handleValidation} disabled={loading}>
            Validate & Send OTP
          </button>
        </div>
      )}

      {currentStep === 2 && (
        <div className="otp-step">
          <h2>Step 2: Enter OTP</h2>
          <input 
            placeholder="Enter OTP"
            onChange={(e) => setUserData({...userData, otp: e.target.value})}
          />
          <button onClick={handleOTPVerification} disabled={loading}>
            Verify OTP
          </button>
        </div>
      )}

      {currentStep === 3 && (
        <div className="success-step">
          <h2>Success!</h2>
          <p>Your certificate link has been sent to your email.</p>
        </div>
      )}

      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default AlumniCertificateSystem;
```

## Error Handling Best Practices

1. **Always use try-catch blocks** when making API calls
2. **Handle loading states** to improve user experience
3. **Validate inputs** before making API calls
4. **Provide clear error messages** to users
5. **Implement retry logic** for failed requests

## Important Notes

- OTPs are valid for 10 minutes only
- Track names are case-insensitive but should match the provided options
- Either email or name is required for the lookup endpoint, not both
- Certificate links are sent via email, not returned in the API response

