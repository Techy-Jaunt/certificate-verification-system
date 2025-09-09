import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./CertificateRequest.css";

const CertificateRequest = () => {
  const navigate = useNavigate();
  //for state: keeps the inputs controlled
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    cohort: "",
    track: "",
  });
  //UI state
  const [submitting, setSubmitting] = useState(false);//disables submit button when true
  const [error,  setError] = useState("");//human readable error to show in the UI
  //Updates matching form field by name
  const handleChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };
  //Client side validation
  const validate = () => {
    if (!form.fullName.trim() || !form.email.trim()) {
      setError("Please provide your name and email!");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Enter a valid email address!");
      return false;
    }
    setError("");
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault ();
    
    if (!validate()) return;//abort if validation fails
    setSubmitting(true);
    try {
      //Endpoint to be updated
      const response = await fetch("/api/certificate-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }).catch(() => null);

      //Simulating success
      if (response && !response.ok) {
        const json = await response.json().catch(() => null);
        throw new Error(json.message || "Server error");
      }

      //Navigate to verified page with form data
      navigate("/certificate-verified", {state: { ...form}});
    } catch (err) {
      //Displays error message
      setError(err?.message || "Request failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="cr-page">
      <div className="cr-card">
        <h1 className="cr-header">Certificate Request Portal</h1>

        {error && <div className="cr-error">{error}</div>}

        <form onSubmit={handleSubmit} className="cr-form">
          <div className="form-group">
            <label>Full name</label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Kindly input your registered techyjaunt name"
              className="cr-input"
              required
            />
          </div>

          <div className="form-group">
            <label>E-mail</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Kindly input your registered techyjaunt e-mail"
              className="cr-input"
              required
            />
          </div>

          <div className="cr-grid">
            <div className="form-group">
              <label>Cohort</label>
              <input
                name="cohort"
                value={form.cohort}
                onChange={handleChange}
                placeholder="Kindly input your techyjaunt cohort"
                className="cr-input"
              />
            </div>

            <div className="form-group">
              <label>Track</label>
              <input
                name="track"
                value={form.track}
                onChange={handleChange}
                placeholder="Kindly input your track"
                className="cr-input"
              />
            </div>
          </div>

          <div className="cr-actions">
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>                             
  );
};

export default CertificateRequest;
