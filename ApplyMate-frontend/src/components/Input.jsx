import { useState, useEffect } from "react";
import styles from "./Input.module.css";
import { generateContent } from "../services/api";

export default function Input({ onGenerationComplete }) {
  // Initialize from LocalStorage if available
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("applyMate_formData");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved data", e);
      }
    }
    return {
      domain: "",
      company: "",
      experience: "",
      type: "Cover Letter",
      tone: "Standard",
      description: "",
    };
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Save to LocalStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem("applyMate_formData", JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const validateForm = () => {
    if (!formData.domain.trim()) {
      setError("Domain is required");
      return false;
    }
    if (!formData.company.trim()) {
      setError("Company is required");
      return false;
    }
    if (!formData.experience) {
      setError("Experience is required");
      return false;
    }
    if (!formData.description.trim()) {
      setError("Job Description is required");
      return false;
    }
    return true;
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Create FormData object
      const dataToSend = new FormData();
      dataToSend.append("domain", formData.domain);
      dataToSend.append("company", formData.company);
      dataToSend.append("experience", formData.experience);
      dataToSend.append("type", formData.type);
      dataToSend.append("tone", formData.tone);
      dataToSend.append("description", formData.description);

      if (resumeFile) {
        dataToSend.append("resume", resumeFile);
      }

      console.log("Calling API Service...");
      const data = await generateContent(dataToSend);
      const variations = data.variations || [];

      onGenerationComplete({
        variations: variations,
        domain: formData.domain,
        company: formData.company,
        experience: formData.experience,
        type: formData.type,
      });

      // Reset form
      /* 
         Data is kept in LocalStorage, so we do NOT reset the form here.
         This allows the user to go back and edit their inputs easily.
      */

      // Only reset file input if desired, or keep it. 
      // Typically file inputs are hard to persist, so we clear them.
      setResumeFile(null);

      // Reset file input element explicitly
      const fileInput = document.getElementById("resume");
      if (fileInput) fileInput.value = "";

      setError("");

    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "Failed to generate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.container}>
        {/* ERROR MESSAGE */}
        {error && (
          <div className={styles.errorMessage}>
            ⚠️ {error}
          </div>
        )}

        {/* DOMAIN INPUT */}
        <div className={styles.input}>
          <label className={styles.domain} htmlFor="domain">
            Domain:
          </label>
          <input
            type="text"
            id="domain"
            name="domain"
            value={formData.domain}
            onChange={handleInputChange}
            placeholder="Enter domain"
          />
        </div>

        {/* COMPANY INPUT */}
        <div className={styles.input}>
          <label className={styles.company} htmlFor="company">
            Company:
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            placeholder="Enter company name"
          />
        </div>

        {/* EXPERIENCE SELECT */}
        <div className={styles.input}>
          <label className={styles.experience} htmlFor="experience">
            Experience:
          </label>
          <select
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            className={styles.select}
          >
            <option value="">Select</option>
            <option value="Fresher">Fresher</option>
            <option value="1 Year">1 Year</option>
            <option value="2 Years">2 Years</option>
            <option value="3 Years">3 Years</option>
            <option value="4+ Years">More than 4+ Years</option>
          </select>
        </div>

        {/* RESUME UPLOAD */}
        <div className={styles.input}>
          <label className={styles.experience} htmlFor="resume">
            Resume (PDF): <span style={{ fontSize: '11px', color: '#718096', fontWeight: 'normal' }}>(Optional)</span>
          </label>
          <input
            type="file"
            id="resume"
            name="resume"
            accept="application/pdf"
            onChange={handleFileChange}
            className={styles.fileInput}
            style={{ padding: '8px 0' }}
          />
        </div>

        {/* TONE SELECTOR */}
        <div className={styles.input}>
          <label className={styles.experience} htmlFor="tone">
            Tone / Vibe:
          </label>
          <select
            id="tone"
            name="tone"
            value={formData.tone}
            onChange={handleInputChange}
            className={styles.select}
          >
            <option value="Standard">Standard (Professional)</option>
            <option value="Confident">Confident & Bold</option>
            <option value="Humble">Humble & Eager</option>
            <option value="Casual">Casual & Friendly</option>
            <option value="Formal">Strictly Formal</option>
          </select>
        </div>

        {/* CONTENT TYPE RADIO BUTTONS */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Content Type</label>
          <div className={styles.radioGroup}>
            <label>
              <input
                type="radio"
                name="type"
                value="Cover Letter"
                checked={formData.type === "Cover Letter"}
                onChange={handleInputChange}
              />
              Cover Letter
            </label>
            <label>
              <input
                type="radio"
                name="type"
                value="Cold Email"
                checked={formData.type === "Cold Email"}
                onChange={handleInputChange}
              />
              Cold Email
            </label>
          </div>
        </div>

        {/* JOB DESCRIPTION TEXTAREA */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Job Description</label>
          <textarea
            name="description"
            rows="4"
            className={styles.textarea}
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Paste JD here"
          />
        </div>

        {/* GENERATE BUTTON */}
        <button
          className={styles.button}
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>
    </>
  );
}