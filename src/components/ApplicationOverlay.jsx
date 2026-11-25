import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveLead } from "../leads.js";

export default function ApplicationOverlay({ open, onClose }) {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [leadData, setLeadData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [brandData, setBrandData] = useState({
    brand: "Personal brand",
    role: "Founder",
    profession: "",
    social: "",
  });

  const [applicationData, setApplicationData] = useState({
    expectations: "",
    revenue: "",
    budget: "",
  });

  // Lock background scrolling
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Reset when opening a fresh application
  useEffect(() => {
    if (open) {
      setStep(1);
      setError("");

      setLeadData({
        name: "",
        phone: "",
        email: "",
      });

      setBrandData({
        brand: "Personal brand",
        role: "Founder",
        profession: "",
        social: "",
      });

      setApplicationData({
        expectations: "",
        revenue: "",
        budget: "",
      });
      setIsSubmitting(false);
    }
  }, [open]);

  if (!open) return null;

  // STEP 1: CONTACT DETAILS
  function nextStep(event) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").replace(/\D/g, "");
    const email = String(data.get("email") || "").trim();

    if (!name) {
      return setError("Please enter your name.");
    }

    if (phone.length !== 10) {
      return setError("Please enter a valid 10-digit WhatsApp number.");
    }

    // Correct email validation
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return setError("Please enter a valid email.");
    }

    setLeadData({
      name,
      phone,
      email,
    });

    setError("");
    setStep(2);
  }

  // STEP 2: BRAND DETAILS
  function nextBrandStep(event) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const profession = String(data.get("profession") || "").trim();

    if (!profession) {
      return setError("Please tell us what profession or business you are in.");
    }

    setBrandData({
      brand: data.get("brand") || "Personal brand",
      role: data.get("role") || "Founder",
      profession,
      social: String(data.get("social") || "").trim(),
    });

    setError("");
    setStep(3);
  }

  // STEP 3: FINAL SUBMISSION
  async function submit(event) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const expectations = String(data.get("expectations") || "");

    const revenue = String(data.get("revenue") || "");

    const budget = String(data.get("budget") || "");

    if (!brandData.profession.trim()) {
      setStep(2);
      return setError("Please tell us what profession or business you are in.");
    }

    if (!expectations) {
      return setError(
        "Please select your primary expectation from our services.",
      );
    }

    if (brandData.brand === "Company brand" && !revenue) {
      return setError("Please select your monthly revenue range.");
    }

    if (!budget) {
      return setError("Please answer the package investment question.");
    }

    // Combine all form data
    const finalApplicationData = {
      ...leadData,
      ...brandData,
      expectations,
      revenue,
      budget,
    };

    setIsSubmitting(true);
    try {
      await saveLead(finalApplicationData);
    } catch (submissionError) {
      setError(
        submissionError.message ||
          "We couldn't submit your application. Please check your connection and try again.",
      );
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setError("");

    // Google Analytics tracking
    if (typeof window.gtag === "function") {
      window.gtag("event", "generate_lead", {
        event_category: "Application",
        event_label: brandData.brand,
        value: 1,
      });
    }

    // Meta Pixel tracking
    if (typeof window.fbq === "function") {
      window.fbq("track", "Lead");
    }

    // Redirect to separate Thank You page
    navigate("/thank-you", {
      state: {
        application: finalApplicationData,
      },
    });

    onClose();
  }

  return (
    <div
      className="application-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="application-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="application-modal">
        {/* CLOSE BUTTON */}
        <button
          className="application-close"
          type="button"
          onClick={onClose}
          aria-label="Close application"
        >
          ×
        </button>

        {/* HEADER */}
        <div className="application-modal-header">
          <span className="application-kicker">Socialdaa application</span>

          <h2 id="application-title">
            {step === 1
              ? "Reserve My Free Session"
              : "Tell us about your brand"}
          </h2>

          <p>
            {step === 1
              ? "Fill out the short form. Join your one-on-one session."
              : "A few details to understand your brand and goals."}
          </p>

          {/* PROGRESS INDICATOR */}
          <div className="application-progress">
            {[1, 2, 3].map((number) => (
              <span className={step === number ? "active" : ""} key={number}>
                {number}
              </span>
            ))}
          </div>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <form className="application-form" onSubmit={nextStep} noValidate>
            <label>Full name</label>

            <input
              name="name"
              autoComplete="name"
              placeholder="Dr. Your name"
              defaultValue={leadData.name}
            />

            <label>WhatsApp number</label>

            <div className="application-phone-field">
              <span>+91</span>

              <input
                name="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                placeholder="98765 43210"
                defaultValue={leadData.phone}
              />
            </div>

            <label>Email</label>

            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@clinic.com"
              defaultValue={leadData.email}
            />

            <div className="form-error">{error}</div>

            <button
              className="btn form-submit application-primary-action"
              type="submit"
            >
              Continue <span>→</span>
            </button>

            <p className="application-assurance">No fee. No hidden charges.</p>
          </form>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <form
            className="application-form application-form-step-two"
            onSubmit={nextBrandStep}
            noValidate
          >
            <label>What brand do you want to build?</label>

            <select name="brand" defaultValue={brandData.brand}>
              <option value="Personal brand">Personal brand</option>

              <option value="Company brand">Business Branding</option>
            </select>

            <label>I am a…</label>

            <select name="role" defaultValue={brandData.role}>
              <option>Founder</option>
              <option>MD / CEO</option>
              <option>CXO</option>
              <option>Coach / Consultant</option>
              <option>Professional / Expert</option>
              <option>Creator</option>
              <option>Fashion / Lifestyle</option>
            </select>

            <label>What profession or business are you in?</label>

            <input
              name="profession"
              placeholder="Example: Dermatologist, Interior Designer, Startup"
              defaultValue={brandData.profession}
            />

            <label>Instagram / LinkedIn</label>

            <input
              name="social"
              placeholder="@handle or profile link"
              defaultValue={brandData.social}
            />

            <div className="form-error">{error}</div>

            <button
              className="application-back-step"
              type="button"
              onClick={() => {
                setError("");
                setStep(1);
              }}
            >
              ← Edit your details
            </button>

            <button
              className="btn form-submit application-primary-action"
              type="submit"
            >
              Continue <span>→</span>
            </button>
          </form>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <form
            className="application-form application-form-step-two"
            onSubmit={submit}
            noValidate
          >
            <label>What are your primary expectations from our services?</label>

            <select
              name="expectations"
              value={applicationData.expectations}
              onChange={(event) =>
                setApplicationData((prev) => ({
                  ...prev,
                  expectations: event.target.value,
                }))
              }
            >
              <option value="">Select your primary expectation</option>

              <option value="Visibility">Visibility</option>
              <option value="Authority">Authority</option>
              <option value="Sales Growth">Sales Growth</option>
              <option value="All of the above">All of the above</option>
            </select>

            <label>
              Monthly revenue{" "}
              <span className="optional">
                (select if applying with a company)
              </span>
            </label>

            <select
              name="revenue"
              value={applicationData.revenue}
              onChange={(event) =>
                setApplicationData((prev) => ({
                  ...prev,
                  revenue: event.target.value,
                }))
              }
            >
              <option value="">Select a range</option>

              <option>₹10 lakh – ₹20 lakhs</option>
              <option>₹20 lakh – ₹30 lakhs</option>
              <option>₹30 lakh – ₹40 lakhs</option>
              <option>₹40 lakh – ₹50 lakhs</option>
              <option>₹50 lakh – ₹1 crore</option>
            </select>

            <label>
              Are you comfortable investing ₹1 lakh + GST in personal branding?
            </label>

            <select
              name="budget"
              value={applicationData.budget}
              onChange={(event) =>
                setApplicationData((prev) => ({
                  ...prev,
                  budget: event.target.value,
                }))
              }
            >
              <option value="">Select an option</option>

              <option>Yes, ₹1 lakh + GST is within my budget</option>

              <option>I am open to discussing the right package</option>

              <option>Not at this stage</option>
            </select>

            <div className="form-error">{error}</div>

            <button
              className="application-back-step"
              type="button"
              onClick={() => {
                setError("");
                setStep(2);
              }}
            >
              ← Edit brand details
            </button>

            <button
              className="btn form-submit application-primary-action"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}{" "}
              {!isSubmitting && <span>→</span>}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
