import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import defaultLogo from "../assets/logo.jpeg";
import messbeeText from "../assets/messbee_text.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
    { label: "Products", path: "/#features" },
    { label: "Solutions", path: "/solutions" },
    { label: "Pricing", path: "/pricing" },
    { label: "Resources", path: "/resources" },
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
          <div style={{ width: 32, height: 32, borderRadius: 8, overflow: "hidden" }}>
            <img src={defaultLogo} alt="MessBee" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          <img src={messbeeText} alt="MessBee Text" style={{ height: 16, objectFit: "contain" }} />
        </div>

        {/* Nav links */}
        <div className="desktop-nav">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path === "/#features" && location.pathname === "/" && location.hash === "#features");
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
