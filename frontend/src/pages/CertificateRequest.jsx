import React, { useState } from "react";
import { useNavigate } from "react-router";

const CertificateRequest = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    cohort: "",
    track: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;
    setSubmitting(true);
    navigate("/alumni-certificate-download");
    // try {
    //   const response = await fetch("/api/certificate-requests", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(form),
    //   }).catch(() => null);

    //   if (response && !response.ok) {
    //     const json = await response.json().catch(() => null);
    //     throw new Error(json?.message || "Server error");
    //   }

    //   navigate("/certificate-verified", { state: { ...form } });
    // } catch (err) {
    //   setError(err?.message || "Request failed. Please try again.");
    // } finally {
    //   setSubmitting(false);
    // }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fffefe] px-4 py-8">
      <div className="w-full max-w-md sm:max-w-2xl lg:max-w-3xl bg-white rounded-lg p-6 sm:p-8 lg:p-12 shadow-md border border-(--color-normal-hover) font-sans">
        {/* Header */}
        <h1 className="text-center text-(--color-primary-500) font-bold text-lg sm:text-2xl lg:text-3xl mb-12">
          Certificate Request Portal
        </h1>

        {/* Error message */}
        {error && (
          <div className="text-center text-red-600 text-sm mb-4">{error}</div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full name */}
          <div>
            <label className="block text-sm text-gray-800 mb-1">
              Full name
            </label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Kindly input your registered techyjaunt name"
              className="w-full border border-gray-400/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-(--color-primary-500) transition"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-800 mb-1">E-mail</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Kindly input your registered techyjaunt e-mail"
              className="w-full border border-gray-400/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-(--color-primary-500) transition"
              required
            />
          </div>

          {/* Cohort + Track */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-800 mb-1">Cohort</label>
              <input
                name="cohort"
                value={form.cohort}
                onChange={handleChange}
                placeholder="Kindly input your techyjaunt cohort"
                className="w-full border border-gray-400/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-(--color-primary-500) transition"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-800 mb-1">Track</label>
              <input
                name="track"
                value={form.track}
                onChange={handleChange}
                placeholder="Kindly input your track"
                className="w-full border border-gray-400/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-(--color-primary-500) transition"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="px-8 py-2 rounded-lg bg-(--color-primary-500) text-white text-sm font-medium shadow-lg hover:shadow-xl hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CertificateRequest;
