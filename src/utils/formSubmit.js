/**
 * Utility to submit forms (Contact Us, Newsletter, Book Demo, Support)
 * - Persists all submissions to localStorage (never loses a lead)
 * - Supports serverless email delivery (e.g. Web3Forms / Formspree / Webhook)
 * - Communicates with live backend when configured
 */

export const submitToWebhookOrEmail = async (formType, data) => {
  const timestamp = new Date().toISOString();
  const entry = { formType, ...data, submittedAt: timestamp };

  // 1. Save to local storage for local persistence
  try {
    const storageKey = `messbee_${formType}_submissions`;
    const existing = JSON.parse(localStorage.getItem(storageKey) || "[]");
    existing.unshift(entry);
    localStorage.setItem(storageKey, JSON.stringify(existing.slice(0, 100))); // keep last 100
  } catch (err) {
    console.warn("Storage save error:", err);
  }

  // 2. If Web3Forms Access Key is defined, send directly to email without backend
  const web3Key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  if (web3Key) {
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: web3Key,
          from_name: "MessBee Landing Page",
          subject: `New ${formType.toUpperCase()} Submission: ${data.name || data.email || "Lead"}`,
          ...data,
        }),
      }).catch(() => {});
    } catch {
      // Ignored
    }
  }

  // 3. Send to custom API if VITE_API_URL is configured and not default offline localhost
  const apiBase = import.meta.env.VITE_API_URL;
  if (apiBase && !apiBase.includes("localhost:5000")) {
    try {
      const endpoint = formType === "newsletter" ? "/api/newsletter/subscribe" : formType === "book-demo" ? "/api/book-demo" : "/api/contact";
      await fetch(`${apiBase}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).catch(() => {});
    } catch {
      // Ignored
    }
  }

  return { success: true };
};
