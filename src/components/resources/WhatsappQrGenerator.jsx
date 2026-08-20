import React, { useState, useRef, useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { QRCodeSVG } from "qrcode.react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WhatsappQrGenerator = () => {
  const [countryCode, setCountryCode] = useState("91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [generatedDeepLink, setGeneratedDeepLink] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const qrRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const generateQRCode = async () => {
    if (!phoneNumber) {
      toast.error("Please enter a WhatsApp number.");
      return;
    }

    // Clean phone number (remove spaces, +, -, etc.)
    let cleanedNumber = phoneNumber.replace(/[^0-9]/g, "");
    
    // Remove all leading zeros (e.g. if they typed 0091...)
    cleanedNumber = cleanedNumber.replace(/^0+/, "");
    
    // Prevent double country code if they typed it manually
    if (cleanedNumber.startsWith(countryCode) && cleanedNumber.length > 10) {
      cleanedNumber = cleanedNumber.substring(countryCode.length);
    }
    
    let link = `https://wa.me/${countryCode}${cleanedNumber}`;
    if (message.trim()) {
      const encodedMsg = encodeURIComponent(message.trim());
      link += `?text=${encodedMsg}`;
    }

    setGeneratedLink(link);
    setGeneratedDeepLink(link); // Use plain link to restore the "Open" button in the scanner
    setIsGenerating(true);

    // Silent lead capture to backend
    try {
      const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000";
      await fetch(`${apiBase}/api/qr-generator`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: `+${countryCode}${cleanedNumber}`,
          message: message.trim(),
          source: "WhatsApp QR Generator Tool",
          generatedAt: new Date().toISOString()
        })
      }).catch(() => null); // Silent fallback
    } catch (err) {
      // Do nothing on error
    }

    setTimeout(() => {
      setIsGenerating(false);
      toast.success("QR Code Generated Successfully!");
    }, 600);
  };

  const downloadQRCode = () => {
    if (!qrRef.current) return;
    const svg = qrRef.current.querySelector("svg");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      // Add padding and white background
      canvas.width = img.width + 40;
      canvas.height = img.height + 40;
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 20, 20);
      
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `WhatsApp-QR-${phoneNumber}.png`;
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#F8FAFC", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <ToastContainer position="bottom-right" />

      <main style={{ flex: 1, paddingTop: 90, paddingBottom: 60, paddingLeft: "5%", paddingRight: "5%" }}>
        <div style={{ maxWidth: 850, margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#ECFDF5", borderRadius: 40, padding: "6px 12px", marginBottom: 12, border: "1px solid #A7F3D0" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981" }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: "#047857" }}>Free Business Tool</span>
            </div>
            <h1 style={{ fontSize: 32, fontWeight: 800, color: "#0F172A", marginBottom: 12, letterSpacing: "-0.5px", lineHeight: 1.2 }}>
              Free WhatsApp <span style={{ color: "#16A34A" }}>QR Code Generator</span>
            </h1>
            <p style={{ fontSize: 14, color: "#64748B", maxWidth: 500, margin: "0 auto", lineHeight: 1.5 }}>
              Create a scannable QR code for your WhatsApp number. When customers scan it, a chat opens instantly with a pre-filled message.
            </p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 24, background: "#FFFFFF", borderRadius: 20, padding: 24, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.05)", border: "1px solid #E2E8F0" }}>
            
            {/* Left Side: Form */}
            <div style={{ flex: "1 1 300px" }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", marginBottom: 16 }}>Enter Your Details</h3>
              
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#334155", marginBottom: 6 }}>
                  WhatsApp Number
                </label>
                <div style={{ display: "flex", gap: 10 }}>
                  <select 
                    value={countryCode} 
                    onChange={(e) => setCountryCode(e.target.value)}
                    style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #CBD5E1", fontSize: 14, background: "#F8FAFC", outline: "none", transition: "border 0.2s", cursor: "pointer", maxWidth: 105 }}
                    onFocus={(e) => e.target.style.border = "1px solid #16A34A"}
                    onBlur={(e) => e.target.style.border = "1px solid #CBD5E1"}
                  >
                    <option value="91">🇮🇳 +91</option>
                    <option value="1">🇺🇸 +1</option>
                    <option value="44">🇬🇧 +44</option>
                    <option value="61">🇦🇺 +61</option>
                    <option value="971">🇦🇪 +971</option>
                    <option value="65">🇸🇬 +65</option>
                  </select>
                  <input 
                    type="text" 
                    placeholder="e.g. 9876543210" 
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: "1px solid #CBD5E1", fontSize: 14, background: "#F8FAFC", outline: "none", transition: "border 0.2s" }}
                    onFocus={(e) => e.target.style.border = "1px solid #16A34A"}
                    onBlur={(e) => e.target.style.border = "1px solid #CBD5E1"}
                  />
                </div>
                <p style={{ fontSize: 11, color: "#94A3B8", marginTop: 4 }}>Don't use +, -, or brackets. Just the digits.</p>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#334155", marginBottom: 6 }}>
                  Pre-filled Message (Optional)
                </label>
                <textarea 
                  placeholder="e.g. Hi! I want to know more about your services." 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows="3"
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #CBD5E1", fontSize: 14, background: "#F8FAFC", outline: "none", transition: "border 0.2s", resize: "none" }}
                  onFocus={(e) => e.target.style.border = "1px solid #16A34A"}
                  onBlur={(e) => e.target.style.border = "1px solid #CBD5E1"}
                />
                <p style={{ fontSize: 11, color: "#94A3B8", marginTop: 4 }}>Message will automatically appear in user's chat.</p>
              </div>

              <button 
                onClick={generateQRCode}
                disabled={isGenerating}
                style={{
                  width: "100%", background: "#16A34A", color: "#FFFFFF", border: "none", borderRadius: 10, padding: "10px", fontSize: 14, fontWeight: 700, cursor: isGenerating ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "background 0.2s"
                }}
                onMouseEnter={(e) => !isGenerating && (e.currentTarget.style.background = "#15803D")}
                onMouseLeave={(e) => !isGenerating && (e.currentTarget.style.background = "#16A34A")}
              >
                {isGenerating ? "Generating..." : "Generate QR Code"}
                {!isGenerating && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                )}
              </button>
            </div>

            {/* Right Side: QR Preview */}
            <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#F1F5F9", borderRadius: 12, padding: 24, border: "1px dashed #CBD5E1" }}>
              {generatedLink ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, width: "100%" }}>
                  <div ref={qrRef} style={{ background: "#FFFFFF", padding: 16, borderRadius: 12, boxShadow: "0 8px 20px rgba(0,0,0,0.05)" }}>
                    <QRCodeSVG 
                      value={generatedDeepLink} 
                      size={160}
                      level={"Q"}
                      fgColor={"#0F172A"}
                      bgColor={"#FFFFFF"}
                    />
                  </div>
                  
                  <div style={{ display: "flex", gap: 8, width: "100%", justifyContent: "center", flexWrap: "wrap" }}>
                    <button 
                      onClick={downloadQRCode}
                      style={{ background: "#0F172A", color: "#FFFFFF", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, transition: "background 0.2s" }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "#1E293B"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "#0F172A"}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                      Download
                    </button>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(generatedLink);
                        toast.success("Link Copied!");
                      }}
                      style={{ background: "#FFFFFF", color: "#0F172A", border: "1px solid #CBD5E1", borderRadius: 8, padding: "8px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, transition: "background 0.2s" }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "#F8FAFC"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "#FFFFFF"}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                      Copy Link
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: "center", color: "#94A3B8" }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 16 }}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><rect x="7" y="7" width="3" height="3"/><rect x="14" y="7" width="3" height="3"/><rect x="7" y="14" width="3" height="3"/><rect x="14" y="14" width="3" height="3"/></svg>
                  <p style={{ fontSize: 15, fontWeight: 500 }}>Your QR Code will appear here.</p>
                </div>
              )}
            </div>
            
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WhatsappQrGenerator;
