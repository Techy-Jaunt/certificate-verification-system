# Alumni Certificate System API Documentation (Simplified)

## Overview

This API helps verify TechyJaunt alumni and send them their certificates via email using OTP authentication.

## Base URL

```
https://techyjaunt-react.onrender.com/
```

---

## 1. Request OTP

**Endpoint:** `POST /api/certificate/request`

**Description:** Validates alumni details and sends an OTP to their registered email.

### Request Body

```json
{
  "email": "string (required)",
  "cohort": "string (required)",
  "track": "string (required)"
}
```

**Track Options:** frontend | backend | ui/ux | product management | cybersecurity | data analysis

### Success Response

```json
{
  "status": "success",
  "message": "OTP sent"
}
```

### Common Errors

* **400**: Missing or invalid input
* **404**: Alumni not found
* **500**: Server error

### Example (Frontend)

```js
await axios.post(`${BASE_URL}/api/certificate/request`, formData);
```

---

## 2. Verify OTP and Send Certificate

**Endpoint:** `POST /api/certificate/verify-otp`

**Description:** Verifies OTP and sends the alumni's certificate link via email.

### Request Body

```json
{
  "email": "string (required)",
  "otp": "string (required)",
  "track": "string (required)"
}
```
<!--The request must be in lowercase-->

### Success Response

```json
{
  "status": "success",
  "message": "Certificate link sent to user@example.com"
}
```

### Common Errors

* **401**: Invalid or expired OTP
* **404**: Alumni not found
* **500**: Server error

### Example (Frontend)

```js
await axios.post(`${BASE_URL}/api/certificate/verify-otp`, otpData);
```

---

## 3. Search Alumni Details

**Endpoint:** `GET /api/certificate/verify`

**Description:** Searches alumni details using email or name.

### Query Parameters

* `track` *(required)*
* `email` *(optional)*
* `name` *(optional)* — Use either email or name, not both.

### Success Response

```json
{
  "name": "John Doe",
  "cohort": "2023",
  "track": "frontend",
  "verified": true
}
```

### Common Errors

* **404**: Alumni not found
* **500**: Server error

### Example (Frontend)

```js
await axios.get(`${BASE_URL}/api/certificate/verify`, { params });
```

---

## ⚙️ Frontend Integration Notes

1. **Use full URLs** (e.g., `${BASE_URL}/api/...`) instead of relative paths.
2. **Match endpoint names exactly** (e.g., `/api/certificate/request`, not `/api/validate-alumni`).
3. **Always include the `track`** field in requests.
4. **Handle loading and error states** gracefully in the UI.
5. **Do not expect the certificate file** in API response — it’s sent to the email.

---

## 🧩 Example Flow Summary

1. **Step 1:** User enters email, cohort, and track → `POST /api/certificate/request` (OTP sent)
2. **Step 2:** User enters OTP → `POST /api/certificate/verify-otp` (Certificate sent)
3. **Step 3 (Optional):** Admin verifies alumni → `GET /api/certificate/verify`

---

## ✅ Quick Error Reference

| Status Code | Meaning      | Example Cause                |
| ----------- | ------------ | ---------------------------- |
| 400         | Bad Request  | Missing field or wrong input |
| 401         | Unauthorized | Invalid/expired OTP          |
| 404         | Not Found    | Alumni email not in database |
| 500         | Server Error | Internal system issue        |

---

## 🕒 Notes

* OTPs expire in **10 minutes**
* Track names should be lowercase
* Email or name is required for search — **not both**
* Certificate links are delivered via email only
