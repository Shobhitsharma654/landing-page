import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import defaultLogo from "../assets/logo.jpeg";
import messbeeText from "../assets/messbee_text.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const productDropdownRef = useRef(null);
  const solutionsDropdownRef = useRef(null);
  const resourcesDropdownRef = useRef(null);
  const companyDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (productDropdownRef.current && !productDropdownRef.current.contains(event.target)) {
        setProductDropdownOpen(false);
      }
      if (solutionsDropdownRef.current && !solutionsDropdownRef.current.contains(event.target)) {
        setSolutionsDropdownOpen(false);
      }
      if (resourcesDropdownRef.current && !resourcesDropdownRef.current.contains(event.target)) {
        setResourcesDropdownOpen(false);
      }
      if (companyDropdownRef.current && !companyDropdownRef.current.contains(event.target)) {
        setCompanyDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigation = (path) => {
    if (path === "/#features") {
      if (location.pathname === "/") {
        document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = "/#features";
      }
    } else {
      navigate(path);
      window.scrollTo(0, 0);
    }
  };

  const navLinks = [
    { label: "Products" },
    { label: "Solutions" },
    { label: "QR & Connect", path: "/qr-connect" },
    { label: "Pricing", path: "/pricing" },
    { label: "Resources" },
    { label: "Company" },
  ];

  const productLinks = [
    { label: "CRM", path: "/crm" },
    { label: "WhatsApp Business", path: "/whatsapp-business" },
    { label: "Marketing Automation", path: "/marketing-automation" },
    { label: "AI & Automation", path: "/ai-automation" },
    { label: "Digital Store", path: "/digital-store" },
  ];

  const solutionsLinks = [
    { label: "Small & Medium Businesses", path: "/solutions/small-medium-businesses" },
    { label: "Retail & Local Businesses", path: "/solutions/retail-local-businesses" },
    { label: "E-commerce", path: "/solutions/e-commerce" },
    { label: "Service Businesses", path: "/solutions/service-businesses" },
  ];

  const resourcesLinks = [
    { label: "QR & Connect", path: "/qr-connect" },
    { label: "WhatsApp QR Generator", path: "/whatsapp-qr-generator" },
    { label: "Business Library", path: "/resources/business-library" },
    { label: "Help Center", path: "/resources/help-center" },
    { label: "Blog", path: "/resources/blog" },
    { label: "FAQs", path: "/resources/faqs" },
    { label: "Contact Support", path: "/contact-support" },
  ];

  const companyLinks = [
    { label: "About MessBee",       path: "/about" },
    { label: "Careers",             path: "/careers" },
    { label: "Contact Us",          path: "/contact" },
    { label: "Privacy Policy",      path: "/privacy" },
    { label: "Terms & Conditions",  path: "/terms" },
    { label: "Refund & Cancellation", path: "/refundpolicy" },
    { label: "DPA",                 path: "/dpa" },
    { label: "Cookie Policy",       path: "/cookies" },
  ];

  return (
    <>
      <style>{`
        .nav-btn-login { background: none; border: none; cursor: pointer; font-size: 12px; font-weight: 600; color: #111827; font-family: inherit; padding: 8px 16px; border-radius: 8px; transition: background 0.2s; }
        .nav-btn-login:hover { background: rgba(0,0,0,0.05); }
        
        .nav-btn-register { background: rgba(0,0,0,0.02); border: 1px solid rgba(0,0,0,0.1); cursor: pointer; font-size: 12px; font-weight: 600; color: #111827; font-family: inherit; padding: 8px 20px; border-radius: 8px; transition: background 0.2s; }
        .nav-btn-register:hover { background: rgba(0,0,0,0.06); }
        
        .nav-btn-start { background: #16A34A; border: none; color: #FFFFFF; padding: 10px 24px; font-size: 14px; font-weight: 700; border-radius: 8px; cursor: pointer; font-family: inherit; transition: background 0.2s; }
        .nav-btn-start:hover { background: #00B248; }
        
        .desktop-nav { display: flex; align-items: center; gap: 32px; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: "#FFFFFF",
        borderBottom: "none",
        boxShadow: "0 10px 40px -10px rgba(0,0,0,0.3)",
        padding: "0 6%",
        height: 70,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "all 0.3s"
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => handleNavigation("/")}>
          <div style={{ width: 32, height: 32, borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>
            <img src={defaultLogo} alt="MessBee" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          <span style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.6px", fontFamily: "'Inter', sans-serif", display: "inline-flex", alignItems: "center" }}>
            <span style={{ color: "#15803D" }}>Mess</span>
            <span style={{ color: "#4ADE80" }}>Bee</span>
          </span>
        </div>

        {/* Nav links */}
        <div className="desktop-nav">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path === "/#features" && location.pathname === "/" && location.hash === "#features");
            
            if (link.label === "Products" || link.label === "Solutions" || link.label === "Resources" || link.label === "Company") {
              const isProduct = link.label === "Products";
              const isSolutions = link.label === "Solutions";
              const isResources = link.label === "Resources";
              const isOpen = isProduct ? productDropdownOpen : isSolutions ? solutionsDropdownOpen : isResources ? resourcesDropdownOpen : companyDropdownOpen;
              const setOpen = isProduct ? setProductDropdownOpen : isSolutions ? setSolutionsDropdownOpen : isResources ? setResourcesDropdownOpen : setCompanyDropdownOpen;
              const linksList = isProduct ? productLinks : isSolutions ? solutionsLinks : isResources ? resourcesLinks : companyLinks;
              const dropdownRef = isProduct ? productDropdownRef : isSolutions ? solutionsDropdownRef : isResources ? resourcesDropdownRef : companyDropdownRef;

              return (
                <div key={link.label} style={{ position: "relative" }} ref={dropdownRef}>
                  <span style={{ display: "flex", alignItems: "center", gap: 4, color: isOpen ? "#16A34A" : "#4B5563", fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "color 0.2s" }}
                    onClick={() => {
                      if (isProduct) { setSolutionsDropdownOpen(false); setResourcesDropdownOpen(false); setCompanyDropdownOpen(false); } 
                      else if (isSolutions) { setProductDropdownOpen(false); setResourcesDropdownOpen(false); setCompanyDropdownOpen(false); }
                      else if (isResources) { setProductDropdownOpen(false); setSolutionsDropdownOpen(false); setCompanyDropdownOpen(false); }
                      else { setProductDropdownOpen(false); setSolutionsDropdownOpen(false); setResourcesDropdownOpen(false); }
                      setOpen(!isOpen);
                    }}
                    onMouseEnter={e => { if (!isOpen) e.currentTarget.style.color = "#111827"; }}
                    onMouseLeave={e => { if (!isOpen) e.currentTarget.style.color = "#4B5563"; }}>
                    {link.label}
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>

                  {isOpen && (
                    <div style={{
                      position: "absolute",
                      top: "100%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      marginTop: "16px",
                      background: "#FFFFFF",
                      border: "1px solid #E2E8F0",
                      borderRadius: "0px",
                      boxShadow: "0 10px 40px -10px rgba(0,0,0,0.1)",
                      padding: "8px 0",
                      width: "200px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0px",
                      zIndex: 1000,
                    }}>
                      {/* Arrow */}
                      <div style={{ position: "absolute", top: "-6px", left: "50%", transform: "translateX(-50%) rotate(45deg)", width: "12px", height: "12px", background: "#FFFFFF", borderLeft: "1px solid #E2E8F0", borderTop: "1px solid #E2E8F0" }} />
                      
                      {linksList.map(pLink => {
                        const isSubActive = location.pathname === pLink.path;
                        return (
                          <div
                            key={pLink.label}
                            style={{
                              position: "relative",
                              zIndex: 2,
                              padding: "10px 16px",
                              fontSize: 12,
                              fontWeight: 500,
                              color: isSubActive ? "#16A34A" : "#334155",
                              background: isSubActive ? "#F0FDF4" : "transparent",
                              cursor: "pointer",
                              borderRadius: "0px",
                              transition: "all 0.2s",
                            }}
                            onMouseEnter={e => {
                              if (!isSubActive) {
                                e.currentTarget.style.background = "#F8FAFC";
                                e.currentTarget.style.color = "#16A34A";
                              }
                            }}
                            onMouseLeave={e => {
                              if (!isSubActive) {
                                e.currentTarget.style.background = "transparent";
                                e.currentTarget.style.color = "#334155";
                              }
                            }}
                            onClick={() => {
                              setOpen(false);
                              handleNavigation(pLink.path);
                            }}
                          >
                            {pLink.label}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <span key={link.label} style={{ color: isActive ? "#16A34A" : "#4B5563", fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "color 0.2s" }}
                onClick={() => handleNavigation(link.path)}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = "#111827"; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = "#4B5563"; }}>
                {link.label}
              </span>
            );
          })}
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button className="nav-btn-login" onClick={() => window.open((import.meta.env.VITE_ADMIN_URL || "http://localhost:5174") + "/login", "_blank")}>
            Login
          </button>
          <button className="nav-btn-register" onClick={() => window.open((import.meta.env.VITE_ADMIN_URL || "http://localhost:5174") + "/signup", "_blank")}>
            Register
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
