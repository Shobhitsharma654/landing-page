const fs = require('fs');

const filePath = "c:/Users/Admin/OneDrive/Desktop/landing page/src/components/LandingPage.jsx";

const content = fs.readFileSync(filePath, 'utf-8');

const badChunk = `  const plans = [
    {
      name: "Starter",
            <p style={{ fontSize: 13, color: "#111827", fontWeight: 800, marginBottom: 24 }}>
              Broadcast Smarter. Automate Faster. <span style={{ color: "#00C853" }}>Grow Without Limits.</span>
            </p>`;

const goodChunk = `  const plans = [
    {
      name: "Starter",
      monthly: 999,
      annual: 799,
      color: "#6366F1",
      badge: null,
      features: ["5,000 messages/month", "1 WhatsApp Number", "Basic Analytics", "Email Support", "API Access"],
    },
    {
      name: "Growth",
      monthly: 2999,
      annual: 2399,
      color: "#00C853",
      badge: "Most Popular",
      features: ["50,000 messages/month", "3 WhatsApp Numbers", "Advanced Analytics", "Priority Support", "Team Inbox", "Chatbot Builder", "CRM Integration"],
    },
    {
      name: "Enterprise",
      monthly: 7999,
      annual: 6399,
      color: "#F59E0B",
      badge: "Best Value",
      features: ["Unlimited messages", "10+ WhatsApp Numbers", "Custom Analytics", "Dedicated Manager", "White Label", "Custom Integrations", "SLA Guarantee", "Onboarding Support"],
    },
  ];

  const faqs = [
    { q: "What is MessBee?", a: "MessBee is India's leading WhatsApp Business automation platform that helps businesses sell, market, support, and grow via WhatsApp." },
    { q: "Is there a free trial?", a: "Yes! We offer a 14-day free trial with full access to all features. No credit card required." },
    { q: "How many WhatsApp numbers can I connect?", a: "Depending on your plan, you can connect 1 to 10+ verified WhatsApp Business API numbers." },
    { q: "Do I need technical knowledge?", a: "Not at all. MessBee is designed for non-technical users with a drag-and-drop chatbot builder and no-code integrations." },
    { q: "Is my data secure?", a: "Absolutely. We use enterprise-grade encryption, are GDPR compliant, and store all data on Indian servers." },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#FFFFFF", color: "#0F172A", overflowX: "hidden" }}>
      {/* ═══════════════ NAVBAR ═══════════════ */}
      <Navbar />

      {/* ═══════════════ HERO ═══════════════ */}
      <section style={{ minHeight: "100vh", background: "#FFFFFF", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 6% 80px", overflow: "hidden" }}>
        
        {/* NEW TOP BADGE ROW */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", maxWidth: 1280, margin: "0 auto 16px auto", padding: "0 5% 0 0", flexWrap: "wrap", gap: 16 }}>
           {/* Trusted Pill */}
           <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#F0FDF4", borderRadius: 40, padding: "6px 14px" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00C853" }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: "#00C853" }}>Trusted by 35,000+ businesses across India</span>
           </div>
           
           {/* Meta Badge */}
           <div style={{
              background: "#FFFFFF",
              borderRadius: "40px",
              padding: "8px 16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
              border: "1px solid #E5E7EB",
              whiteSpace: "nowrap"
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#0668E1">
                <path d="M11.968 12l2.67-4.606c1.1-1.898 3.197-2.932 5.378-2.932A5.992 5.992 0 0 1 24 10.457c0 3.31-2.69 5.995-6 5.995-2.18 0-4.278-1.034-5.378-2.932L9.952 8.914c-1.1-1.898-3.197-2.932-5.378-2.932C1.264 5.982 0 8.667 0 11.977c0 3.31 2.69 5.995 6 5.995 2.18 0 4.278-1.034 5.378-2.932l2.67-4.606z" />
              </svg>
              <span style={{ fontSize: "13px", fontWeight: "600", color: "#64748B" }}>
                Meta Tech Partner <span style={{ padding: "0 4px" }}>•</span> Powered by official WhatsApp API
              </span>
              <div style={{ width: 18, height: 18, background: "#00C853", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
            </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: "4vw", width: "100%", maxWidth: 1280, margin: "0 auto" }}>
          {/* Left content */}
          <div style={{ flex: "1 1 500px", minWidth: 300 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
            </div>

            {/* MessBee Logo in Hero */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
              <img src={defaultLogo} alt="MessBee Logo" style={{ width: 18, height: 18, borderRadius: 4, objectFit: "cover" }} />
              <img src={messbeeText} alt="MessBee Text" style={{ height: 12, objectFit: "contain" }} />
            </div>

            <h1 style={{ fontSize: "clamp(20px, 2.7vw, 31px)", fontWeight: 900, lineHeight: 1.2, letterSpacing: "-0.5px", marginBottom: 24, color: "#111827" }}>
              India's Digital<br />
              <span style={{ color: "#00C853" }}>Business Operating</span><br />
              <span style={{ color: "#111827" }}>System</span>
            </h1>

            <p style={{ fontSize: 13, color: "#111827", lineHeight: 1.5, marginBottom: 12, fontWeight: 600 }}>
              Own Your Business. Own Your Customers. <span style={{ fontWeight: 700 }}>Own Your Future.</span>
            </p>
            <p style={{ fontSize: 13, color: "#111827", fontWeight: 800, marginBottom: 24 }}>
              Broadcast Smarter. Automate Faster. <span style={{ color: "#00C853" }}>Grow Without Limits.</span>
            </p>`;

if (content.includes(badChunk)) {
  const newContent = content.replace(badChunk, goodChunk);
  fs.writeFileSync(filePath, newContent, 'utf-8');
  console.log("Fixed file successfully");
} else {
  console.log("Could not find bad chunk! Here is what we searched for:");
  console.log(badChunk);
}
