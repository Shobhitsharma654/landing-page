import React, { useState, useRef, useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { QRCodeSVG } from "qrcode.react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import defaultLogo from "../../assets/logo.jpeg";

const WhatsappQrGenerator = () => {
  const [countryCode, setCountryCode] = useState("91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [generatedDeepLink, setGeneratedDeepLink] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  
  // State variables for Standee Poster Layout
  const [businessName, setBusinessName] = useState("");
  const [tagline, setTagline] = useState("We Build. We Innovate. We Deliver.");
  const [logoUrl, setLogoUrl] = useState("");

  const qrRef = useRef(null);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoUrl(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

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
    
    // Remove all leading zeros
    cleanedNumber = cleanedNumber.replace(/^0+/, "");
    
    // Prevent double country code if typed manually
    if (cleanedNumber.startsWith(countryCode) && cleanedNumber.length > 10) {
      cleanedNumber = cleanedNumber.substring(countryCode.length);
    }
    
    let link = `https://wa.me/${countryCode}${cleanedNumber}`;
    if (message.trim()) {
      const encodedMsg = encodeURIComponent(message.trim());
      link += `?text=${encodedMsg}`;
    }

    setGeneratedLink(link);
    setGeneratedDeepLink(link);
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
      }).catch(() => null);
    } catch (err) {
      // Ignore
    }

    setTimeout(() => {
      setIsGenerating(false);
      toast.success("QR Code Generated Successfully!");
    }, 600);
  };

  const downloadQRCode = () => {
    if (!qrRef.current) return;
    const svg = qrRef.current.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    
    // Set high-resolution poster dimensions (800 x 1200)
    canvas.width = 800;
    canvas.height = 1200;
    
    // 1. Background
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 2. Top-Left Navy Corner Accent
    ctx.fillStyle = "#001A36";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(240, 0);
    ctx.bezierCurveTo(140, 0, 0, 140, 0, 240);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = "#16A34A";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(0, 240);
    ctx.bezierCurveTo(0, 130, 130, 0, 240, 0);
    ctx.stroke();

    // 3. Bottom-Right Navy Corner Accent
    ctx.fillStyle = "#001A36";
    ctx.beginPath();
    ctx.moveTo(800, 1200);
    ctx.lineTo(560, 1200);
    ctx.bezierCurveTo(660, 1200, 800, 1060, 800, 960);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = "#16A34A";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(800, 960);
    ctx.bezierCurveTo(800, 1070, 1070, 800, 560, 1200);
    ctx.stroke();

    // 4. Dot Grid Patterns
    ctx.fillStyle = "#CBD5E1";
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        ctx.beginPath();
        ctx.arc(660 + c * 18, 50 + r * 18, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 3; c++) {
        ctx.beginPath();
        ctx.arc(40 + c * 18, 280 + r * 18, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const drawPosterContent = (logoImg) => {
      // 5. Top Circular Badge Shadow & Ring
      ctx.save();
      ctx.beginPath();
      ctx.arc(400, 140, 90, 0, Math.PI * 2);
      ctx.fillStyle = "#FFFFFF";
      ctx.shadowColor = "rgba(0,0,0,0.08)";
      ctx.shadowBlur = 20;
      ctx.fill();
      ctx.restore();

      ctx.strokeStyle = "#F1F5F9";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(400, 140, 90, 0, Math.PI * 2);
      ctx.stroke();

      // Logo inside circle
      if (logoImg) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(400, 140, 80, 0, Math.PI * 2);
        ctx.clip();
        const logoHeight = 120;
        const logoWidth = (logoImg.width / logoImg.height) * logoHeight;
        ctx.drawImage(logoImg, 400 - logoWidth / 2, 140 - logoHeight / 2, logoWidth, logoHeight);
        ctx.restore();
      } else {
        ctx.fillStyle = "#16A34A";
        ctx.font = "bold 44px 'Inter', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("LOGO", 400, 155);
      }

      // 6. Business Name
      ctx.fillStyle = "#001A36";
      ctx.font = "900 52px 'Inter', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText((businessName || "AAS TECH").toUpperCase(), 400, 290);

      // 7. Dynamic Two-Tone Tagline for ANY custom text input
      const currentTagline = tagline || "We Build. We Innovate. We Deliver.";
      const taglineWords = currentTagline.split(" ");
      ctx.font = "600 24px 'Inter', sans-serif";

      const wordWidths = taglineWords.map(w => ctx.measureText(w + " ").width);
      const totalW = wordWidths.reduce((a, b) => a + b, 0);
      let startX = 400 - totalW / 2;

      ctx.textAlign = "left";
      taglineWords.forEach((word, i) => {
        ctx.fillStyle = i % 2 === 0 ? "#001A36" : "#16A34A";
        ctx.fillText(word + " ", startX, 335);
        startX += wordWidths[i];
      });

      // 8. Green Dot Divider Line
      ctx.strokeStyle = "#16A34A";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(320, 365);
      ctx.lineTo(385, 365);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(400, 365, 6, 0, Math.PI * 2);
      ctx.fillStyle = "#16A34A";
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(415, 365);
      ctx.lineTo(480, 365);
      ctx.stroke();

      // 9. Phone Pill Box
      ctx.fillStyle = "#FFFFFF";
      ctx.strokeStyle = "#E2E8F0";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(200, 395, 400, 64, 32);
      ctx.fill();
      ctx.stroke();

      // Green WhatsApp circle inside pill
      ctx.fillStyle = "#16A34A";
      ctx.beginPath();
      ctx.arc(245, 427, 20, 0, Math.PI * 2);
      ctx.fill();

      // Phone Handset Icon inside circle
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 18px 'Inter', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("📞", 245, 433);

      // Phone Number Text
      const displayPhone = phoneNumber ? `+${countryCode} ${phoneNumber}` : "+91 6203459821";
      ctx.fillStyle = "#001A36";
      ctx.font = "900 36px 'Inter', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(displayPhone, 420, 440);

      // 10. Green Border Box around QR
      ctx.strokeStyle = "#16A34A";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.roundRect(200, 490, 400, 400, 24);
      ctx.stroke();

      // 11. Draw QR Code Image
      const qrImg = new Image();
      qrImg.onload = () => {
        const qrSize = 360;
        ctx.drawImage(qrImg, 400 - qrSize / 2, 690 - qrSize / 2, qrSize, qrSize);

        // Center Official WhatsApp Badge on Canvas
        ctx.save();
        ctx.beginPath();
        ctx.arc(400, 690, 42, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.shadowColor = "rgba(0,0,0,0.15)";
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();

        const waSvgImg = new Image();
        waSvgImg.onload = () => {
          ctx.drawImage(waSvgImg, 400 - 36, 690 - 36, 72, 72);

          // Bottom Attached Pill ("Scan & Chat on WhatsApp")
          ctx.fillStyle = "#007A3E";
          ctx.beginPath();
          ctx.roundRect(240, 866, 320, 48, 24);
          ctx.fill();

          // Smartphone Vector Icon on Pill
          ctx.strokeStyle = "#FFFFFF";
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.roundRect(268, 878, 16, 24, 3);
          ctx.stroke();
          ctx.fillStyle = "#16A34A";
          ctx.fillRect(271, 881, 10, 15);
          ctx.fillStyle = "#FFFFFF";
          ctx.beginPath();
          ctx.arc(276, 898, 1.5, 0, Math.PI * 2);
          ctx.fill();

          // Text on Pill
          ctx.fillStyle = "#FFFFFF";
          ctx.font = "bold 20px 'Inter', sans-serif";
          ctx.textAlign = "left";
          ctx.fillText("Scan & Chat on WhatsApp", 295, 898);

          // 12. 4 Feature Badges at Bottom
          const features = [
            { icon: "⚡", label1: "Instant", label2: "Connect" },
            { icon: "🛡️", label1: "Secure &", label2: "Reliable" },
            { icon: "👥", label1: "Trusted by", label2: "Customers" },
            { icon: "⭐", label1: "Fast & Easy", label2: "Communication" }
          ];

          features.forEach((feat, idx) => {
            const cx = 140 + idx * 173;
            const cy = 970;

            // Icon circle
            ctx.beginPath();
            ctx.arc(cx, cy, 26, 0, Math.PI * 2);
            ctx.fillStyle = "#F1F5F9";
            ctx.fill();

            ctx.font = "22px 'Inter', sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(feat.icon, cx, cy + 8);

            ctx.fillStyle = "#334155";
            ctx.font = "bold 17px 'Inter', sans-serif";
            ctx.fillText(feat.label1, cx, cy + 50);
            ctx.fillText(feat.label2, cx, cy + 72);

            // Divider line between columns
            if (idx < 3) {
              ctx.strokeStyle = "#E2E8F0";
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.moveTo(cx + 86, cy - 20);
              ctx.lineTo(cx + 86, cy + 75);
              ctx.stroke();
            }
          });

          // 13. Footer Divider Lines & MessBee Logo
          ctx.strokeStyle = "#16A34A";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(100, 1110);
          ctx.lineTo(260, 1110);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(540, 1110);
          ctx.lineTo(700, 1110);
          ctx.stroke();

          ctx.fillStyle = "#64748B";
          ctx.font = "600 20px 'Inter', sans-serif";
          ctx.textAlign = "right";
          ctx.fillText("Powered By", 370, 1116);

          // MessBee Landing Page Brand Colors: Mess in #15803D, Bee in #4ADE80
          ctx.font = "900 24px 'Inter', sans-serif";
          ctx.textAlign = "left";
          ctx.fillStyle = "#15803D";
          ctx.fillText("Mess", 385, 1117);
          const wMess = ctx.measureText("Mess").width;
          ctx.fillStyle = "#4ADE80";
          ctx.fillText("Bee", 385 + wMess, 1117);

          // 14. Trigger PNG Download
          const pngFile = canvas.toDataURL("image/png");
          const downloadLink = document.createElement("a");
          downloadLink.download = `${businessName || "Poster"}-Standee.png`;
          downloadLink.href = pngFile;
          downloadLink.click();
        };

        const waSvgData = `data:image/svg+xml;base64,` + btoa(`
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="11" fill="#25D366"/>
            <path fill="#FFFFFF" d="M12.04 3.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.87 4.27-2.45 5.85-1.58 1.58-3.65 2.45-5.85 2.45-1.48 0-2.93-.39-4.2-1.13l-.3-.18-3.12.82.83-3.04-.2-.32a8.16 8.16 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24z"/>
            <path fill="#25D366" d="M9.01 7.61c-.2-.44-.41-.45-.6-.46h-.51c-.17 0-.46.07-.7.33-.24.26-.92.9-.92 2.2 0 1.3.95 2.56 1.08 2.74.13.17 1.87 2.85 4.53 4 2.22.96 2.67.77 3.15.72.48-.05 1.55-.63 1.77-1.24.22-.61.22-1.13.15-1.24-.07-.11-.26-.17-.56-.32s-1.77-.87-2.05-.97c-.28-.1-.48-.15-.68.15-.2.3-.77.97-.95 1.17-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.79-1.67-2.09-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.65-1.57-.9-2.16z"/>
          </svg>
        `);
        waSvgImg.src = waSvgData;
      };
      qrImg.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
    };

    if (logoUrl) {
      const clientLogoImg = new Image();
      clientLogoImg.onload = () => drawPosterContent(clientLogoImg);
      clientLogoImg.src = logoUrl;
    } else {
      drawPosterContent(null);
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#F8FAFC", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <ToastContainer position="bottom-right" />

      <main style={{ flex: 1, padding: "90px 16px 60px 16px", width: "100%", maxWidth: "100vw", overflowX: "hidden" }}>
        <div style={{ maxWidth: 850, margin: "0 auto", width: "100%" }}>
          
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#ECFDF5", borderRadius: 40, padding: "6px 12px", marginBottom: 12, border: "1px solid #A7F3D0" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#16A34A" }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: "#047857" }}>Free Business Tool</span>
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: "#0F172A", marginBottom: 12, letterSpacing: "-0.5px", lineHeight: 1.2 }}>
              Free WhatsApp <span style={{ color: "#16A34A" }}>QR Code Generator</span>
            </h1>
            <p style={{ fontSize: 14, color: "#64748B", maxWidth: 500, margin: "0 auto", lineHeight: 1.5 }}>
              Create a scannable QR code for your WhatsApp number. When customers scan it, a chat opens instantly with a pre-filled message.
            </p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 24, background: "#FFFFFF", borderRadius: 20, padding: 24, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.05)", border: "1px solid #E2E8F0", width: "100%" }}>
            
            {/* Left Side: Form */}
            <div style={{ flex: "1 1 300px", minWidth: 0, width: "100%" }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", marginBottom: 16 }}>Enter Your Details</h3>
              
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#334155", marginBottom: 6 }}>
                  Business Name
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. AAS TECH" 
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #CBD5E1", fontSize: 14, background: "#F8FAFC", outline: "none", boxSizing: "border-box" }}
                  onFocus={(e) => e.target.style.border = "1px solid #16A34A"}
                  onBlur={(e) => e.target.style.border = "1px solid #CBD5E1"}
                />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#334155", marginBottom: 6 }}>
                  Business Tagline
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. We Build. We Innovate. We Deliver." 
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #CBD5E1", fontSize: 14, background: "#F8FAFC", outline: "none", boxSizing: "border-box" }}
                  onFocus={(e) => e.target.style.border = "1px solid #16A34A"}
                  onBlur={(e) => e.target.style.border = "1px solid #CBD5E1"}
                />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#334155", marginBottom: 6 }}>
                  Business Logo
                </label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleLogoUpload}
                  style={{ width: "100%", padding: 8, borderRadius: 10, border: "1px dashed #CBD5E1", fontSize: 13, background: "#F8FAFC", outline: "none", cursor: "pointer", boxSizing: "border-box" }}
                  onFocus={(e) => e.target.style.border = "1px dashed #16A34A"}
                  onBlur={(e) => e.target.style.border = "1px dashed #CBD5E1"}
                />
              </div>
              
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#334155", marginBottom: 6 }}>
                  WhatsApp Number
                </label>
                <div style={{ display: "flex", gap: 10, width: "100%" }}>
                  <select 
                    value={countryCode} 
                    onChange={(e) => setCountryCode(e.target.value)}
                    style={{ padding: "10px", borderRadius: 10, border: "1px solid #CBD5E1", fontSize: 14, background: "#F8FAFC", outline: "none", cursor: "pointer", width: 105, flexShrink: 0, boxSizing: "border-box" }}
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
                    style={{ flex: 1, minWidth: 0, width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #CBD5E1", fontSize: 14, background: "#F8FAFC", outline: "none", boxSizing: "border-box" }}
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
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #CBD5E1", fontSize: 14, background: "#F8FAFC", outline: "none", resize: "none", boxSizing: "border-box" }}
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
            <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#F1F5F9", borderRadius: 12, padding: 24, border: "1px dashed #CBD5E1", minWidth: 0, width: "100%" }}>
              {generatedLink ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, width: "100%" }}>
                  
                  {/* Standee Poster Preview Card */}
                  <div style={{ background: "#FFFFFF", borderRadius: 20, overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", width: "100%", maxWidth: 300, border: "1px solid #E2E8F0", position: "relative", padding: "16px 12px 14px 12px" }}>
                    
                    {/* Top Left Curve Accent */}
                    <div style={{ position: "absolute", top: 0, left: 0, width: 75, height: 75, pointerEvents: "none", zIndex: 1 }}>
                      <svg width="75" height="75" viewBox="0 0 100 100" fill="none">
                        <path d="M0 0 H100 C60 0, 0 60, 0 100 Z" fill="#001A36" />
                        <path d="M0 100 C0 55, 55 0, 100 0" stroke="#16A34A" strokeWidth="5" fill="none" />
                      </svg>
                    </div>

                    {/* Bottom Right Curve Accent */}
                    <div style={{ position: "absolute", bottom: 0, right: 0, width: 75, height: 75, pointerEvents: "none", zIndex: 1 }}>
                      <svg width="75" height="75" viewBox="0 0 100 100" fill="none">
                        <path d="M100 100 H0 C40 100, 100 40, 100 0 Z" fill="#001A36" />
                        <path d="M100 0 C100 45, 45 100, 0 100" stroke="#16A34A" strokeWidth="5" fill="none" />
                      </svg>
                    </div>

                    {/* Top-Right Decorative Dots */}
                    <div style={{ position: "absolute", top: 10, right: 10, display: "grid", gridTemplateColumns: "repeat(5, 3px)", gap: 4, opacity: 0.25, pointerEvents: "none" }}>
                      {[...Array(20)].map((_, i) => (
                        <div key={i} style={{ width: 3, height: 3, borderRadius: "50%", background: "#64748B" }} />
                      ))}
                    </div>

                    {/* Top-Left Decorative Dots */}
                    <div style={{ position: "absolute", top: 38, left: 8, display: "grid", gridTemplateColumns: "repeat(3, 3px)", gap: 4, opacity: 0.25, pointerEvents: "none" }}>
                      {[...Array(12)].map((_, i) => (
                        <div key={i} style={{ width: 3, height: 3, borderRadius: "50%", background: "#64748B" }} />
                      ))}
                    </div>

                    {/* Top Circular Logo Badge */}
                    <div style={{ position: "relative", zIndex: 2, margin: "8px auto 6px auto", width: 64, height: 64, borderRadius: "50%", background: "#FFFFFF", boxShadow: "0 6px 16px rgba(0,0,0,0.08)", border: "3px solid #F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", padding: 5 }}>
                      {logoUrl ? (
                        <img src={logoUrl} alt="Logo" style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
                      ) : (
                        <img src={defaultLogo} alt="MessBee" style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
                      )}
                    </div>

                    {/* Business Name */}
                    <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
                      <h2 style={{ fontSize: 17, fontWeight: 900, color: "#001A36", textTransform: "uppercase", letterSpacing: "0.5px", margin: "4px 0 2px 0", lineHeight: 1.1 }}>
                        {businessName || "AAS TECH"}
                      </h2>
                      
                      {/* Tagline with Dynamic Alternating Navy & Green Word Colors */}
                      <p style={{ fontSize: 9.5, fontWeight: 600, margin: 0, textAlign: "center" }}>
                        {(tagline || "We Build. We Innovate. We Deliver.").split(" ").map((word, i) => (
                          <span key={i} style={{ color: i % 2 === 0 ? "#001A36" : "#16A34A" }}>
                            {word}{i < (tagline || "We Build. We Innovate. We Deliver.").split(" ").length - 1 ? " " : ""}
                          </span>
                        ))}
                      </p>

                      {/* Green Dot Divider Line */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5, margin: "6px 0 8px 0" }}>
                        <div style={{ width: 22, height: 1.5, background: "#16A34A" }} />
                        <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#16A34A" }} />
                        <div style={{ width: 22, height: 1.5, background: "#16A34A" }} />
                      </div>

                      {/* Phone Pill Badge */}
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 30, padding: "4px 12px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", marginBottom: 10 }}>
                        <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#16A34A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="#FFF"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 900, color: "#001A36", letterSpacing: "0.2px" }}>
                          {phoneNumber ? `+${countryCode} ${phoneNumber}` : "+91 6203459821"}
                        </span>
                      </div>

                      {/* QR Code Container with Green Border */}
                      <div style={{ position: "relative", display: "inline-block", padding: 8, background: "#FFFFFF", border: "2px solid #16A34A", borderRadius: 14, marginBottom: 14 }}>
                        <div ref={qrRef} style={{ display: "flex", justifyContent: "center" }}>
                          <QRCodeSVG 
                            value={generatedDeepLink} 
                            size={135}
                            level={"Q"}
                            fgColor={"#001A36"}
                            bgColor={"#FFFFFF"}
                          />
                        </div>

                        {/* Official WhatsApp Logo Center Badge */}
                        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 32, height: 32, borderRadius: "50%", background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.18)", padding: 2 }}>
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="11" fill="#25D366"/>
                            <path fill="#FFFFFF" d="M12.04 3.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.87 4.27-2.45 5.85-1.58 1.58-3.65 2.45-5.85 2.45-1.48 0-2.93-.39-4.2-1.13l-.3-.18-3.12.82.83-3.04-.2-.32a8.16 8.16 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24z"/>
                            <path fill="#25D366" d="M9.01 7.61c-.2-.44-.41-.45-.6-.46h-.51c-.17 0-.46.07-.7.33-.24.26-.92.9-.92 2.2 0 1.3.95 2.56 1.08 2.74.13.17 1.87 2.85 4.53 4 2.22.96 2.67.77 3.15.72.48-.05 1.55-.63 1.77-1.24.22-.61.22-1.13.15-1.24-.07-.11-.26-.17-.56-.32s-1.77-.87-2.05-.97c-.28-.1-.48-.15-.68.15-.2.3-.77.97-.95 1.17-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.79-1.67-2.09-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.65-1.57-.9-2.16z"/>
                          </svg>
                        </div>

                        {/* Bottom Attached Pill ("Scan & Chat on WhatsApp") */}
                        <div style={{ position: "absolute", bottom: -11, left: "50%", transform: "translateX(-50%)", background: "#007A3E", color: "#FFFFFF", borderRadius: 20, padding: "3px 12px", fontSize: 8.5, fontWeight: 700, display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap", boxShadow: "0 2px 6px rgba(0,0,0,0.2)" }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" fill="none" stroke="#FFFFFF" />
                            <path d="M12 18h.01" stroke="#FFFFFF" />
                            <path d="M9 7l3 3-3 3" stroke="#FFFFFF" />
                          </svg>
                          Scan & Chat on WhatsApp
                        </div>
                      </div>

                      {/* 4 Feature Badges */}
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2, marginTop: 4, padding: "6px 0 0 0" }}>
                        <div style={{ textAlign: "center", padding: "0 1px" }}>
                          <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2px auto" }}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                          </div>
                          <div style={{ fontSize: 6.5, fontWeight: 700, color: "#334155", lineHeight: 1.1 }}>Instant Connect</div>
                        </div>
                        
                        <div style={{ textAlign: "center", padding: "0 1px", borderLeft: "1px solid #E2E8F0" }}>
                          <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2px auto" }}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
                          </div>
                          <div style={{ fontSize: 6.5, fontWeight: 700, color: "#334155", lineHeight: 1.1 }}>Secure & Reliable</div>
                        </div>

                        <div style={{ textAlign: "center", padding: "0 1px", borderLeft: "1px solid #E2E8F0" }}>
                          <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2px auto" }}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                          </div>
                          <div style={{ fontSize: 6.5, fontWeight: 700, color: "#334155", lineHeight: 1.1 }}>Trusted by Customers</div>
                        </div>

                        <div style={{ textAlign: "center", padding: "0 1px", borderLeft: "1px solid #E2E8F0" }}>
                          <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2px auto" }}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="#16A34A"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                          </div>
                          <div style={{ fontSize: 6.5, fontWeight: 700, color: "#334155", lineHeight: 1.1 }}>Fast & Easy</div>
                        </div>
                      </div>

                      {/* Footer: Powered By MessBee (Exact Landing Page MessBee Brand Colors) */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5, marginTop: 10 }}>
                        <div style={{ flex: 1, height: 1, background: "#16A34A" }} />
                        <span style={{ fontSize: 7.5, color: "#64748B", fontWeight: 600 }}>Powered By</span>
                        <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                          <img src={defaultLogo} alt="MessBee" style={{ height: 10, objectFit: "contain" }} />
                          <span style={{ fontSize: 8.5, fontWeight: 900, fontFamily: "'Inter', sans-serif" }}>
                            <span style={{ color: "#15803D" }}>Mess</span>
                            <span style={{ color: "#4ADE80" }}>Bee</span>
                          </span>
                        </div>
                        <div style={{ flex: 1, height: 1, background: "#16A34A" }} />
                      </div>

                    </div>
                  </div>
                  
                  <div style={{ display: "flex", gap: 8, width: "100%", justifyContent: "center", flexWrap: "wrap", marginTop: 8 }}>
                    <button 
                      onClick={downloadQRCode}
                      style={{ background: "#001A36", color: "#FFFFFF", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, transition: "background 0.2s" }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "#0A294D"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "#001A36"}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                      Download Standee
                    </button>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(generatedLink);
                        toast.success("Link Copied!");
                      }}
                      style={{ background: "#FFFFFF", color: "#001A36", border: "1px solid #CBD5E1", borderRadius: 8, padding: "8px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, transition: "background 0.2s" }}
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
