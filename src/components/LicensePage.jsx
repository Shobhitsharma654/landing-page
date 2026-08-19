import Navbar from "./Navbar";
import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import defaultLogo from "../assets/logo.jpeg";
import messbeeText from "../assets/messbee_text.png";

/* ══════════════════════════════════════════════════════
   MessBee — License Agreement Page
   Palette mirrors LandingPage: #18181B · #16A34A · #FFF
   ══════════════════════════════════════════════════════ */

const sections = [
  {
    id: "grant",
    title: "1. License Grant",
    content: `Subject to the terms of this Agreement and payment of applicable subscription fees, MessBee Technologies Pvt. Ltd. ("Licensor") grants you ("Licensee") a limited, non-exclusive, non-transferable, revocable license to access and use the MessBee software-as-a-service platform solely for your internal business operations during the subscription term.

This license does not include the right to sublicense, resell, or commercially exploit the Service in any way not expressly authorized by this Agreement. All rights not expressly granted herein are reserved by the Licensor.`,
  },
  {
    id: "restrictions",
    title: "2. License Restrictions",
    content: `You may not, and shall not permit any third party to:

• Copy, modify, adapt, translate, or create derivative works of the Service or any component thereof.
• Reverse engineer, disassemble, decompile, or attempt to derive the source code of the Service.
• Remove, alter, or obscure any proprietary notices, labels, or marks on the Service.
• Use the Service to build a competing product or service.
• Transfer, sublicense, lease, lend, rent, or otherwise make the Service available to any third party, except as expressly permitted.
• Use the Service in violation of any applicable law or regulation.
• Circumvent any technical measures implemented to limit use of the Service.`,
  },
  {
    id: "ownership",
    title: "3. Ownership & Intellectual Property",
    content: `The Service, including all software, algorithms, designs, user interface elements, text, graphics, logos, and documentation, is and shall remain the exclusive property of MessBee Technologies Pvt. Ltd. and its licensors. This Agreement does not convey to you any ownership interest in or to the Service.

Your data that you input into the platform remains your property. You grant MessBee a limited, non-exclusive, royalty-free license to use your data solely to provide and improve the Service as described in our Privacy Policy.

All feedback, suggestions, or ideas you provide regarding the Service may be used by MessBee without restriction or compensation to you.`,
  },
  {
    id: "saas",
    title: "4. SaaS Terms & Delivery",
    content: `The Service is provided as a hosted, cloud-based software-as-a-service ("SaaS") offering. MessBee will:

• Make the Service available via the internet at the URL provided after account creation.
• Provide access credentials (username and password / API keys) upon successful onboarding.
• Use commercially reasonable efforts to maintain 99.9% uptime, excluding scheduled maintenance.
• Notify you at least 24 hours in advance of any planned maintenance windows.

You are responsible for procuring and maintaining adequate internet connectivity required to access the Service.`,
  },
  {
    id: "updates",
    title: "5. Updates & Modifications",
    content: `MessBee reserves the right to update, modify, enhance, or discontinue any aspect of the Service at any time. We will provide reasonable advance notice for significant changes that materially affect your use of the Service.

Feature updates and bug fixes will be deployed automatically. Major version upgrades may require acknowledgment of updated terms. Continued use of the Service after updates constitutes acceptance of any modified terms.

MessBee does not guarantee that any specific feature or functionality will be available in future versions of the Service.`,
  },
  {
    id: "term",
    title: "6. Term & Termination",
    content: `This License Agreement commences on the date you first access the Service and continues for the duration of your active subscription.

Termination by Licensor:
MessBee may terminate this license immediately and without notice if you:
• Breach any material provision of this Agreement.
• Engage in fraudulent, illegal, or abusive activity.
• Fail to pay applicable subscription fees within the grace period.

Termination by Licensee:
You may terminate this Agreement at any time by cancelling your subscription through the platform settings. No refunds will be provided for unused portions of a billing period unless required by applicable law.

Upon Termination:
• Your access to the Service will be immediately revoked.
• Your data will be retained for 30 days, after which it will be permanently deleted.
• You must immediately cease all use of the Service.`,
  },
  {
    id: "warranty",
    title: "7. Warranty Disclaimer",
    content: `THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, MESSBEE DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO:

• Warranties of merchantability, fitness for a particular purpose, or non-infringement.
• Warranties that the Service will be uninterrupted, error-free, or free of viruses.
• Warranties regarding the accuracy, reliability, or completeness of any content.

Some jurisdictions do not allow the exclusion of implied warranties, so the above exclusion may not apply to you.`,
  },
  {
    id: "liability",
    title: "8. Limitation of Liability",
    content: `TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL MESSBEE BE LIABLE FOR:

• Any indirect, incidental, special, consequential, punitive, or exemplary damages.
• Loss of profits, revenue, data, goodwill, or business opportunities.
• Damages arising from unauthorized access to or alteration of your data.
• Any damages exceeding the total subscription fees paid by you in the 3 months preceding the claim.

This limitation applies regardless of the theory of liability (contract, tort, negligence, strict liability, or otherwise) and even if MessBee has been advised of the possibility of such damages.`,
  },
  {
    id: "indemnification",
    title: "9. Indemnification",
    content: `You agree to indemnify, defend, and hold harmless MessBee Technologies Pvt. Ltd., its officers, directors, employees, agents, and licensors from and against any claims, liabilities, damages, losses, costs, and expenses (including reasonable legal fees) arising from:

• Your use of or access to the Service.
• Your violation of this Agreement.
• Your violation of any rights of a third party.
• Your breach of applicable laws or regulations.
• Content or data you upload, transmit, or make available through the Service.`,
  },
  {
    id: "confidentiality",
    title: "10. Confidentiality",
    content: `Each party agrees to keep confidential all non-public information disclosed by the other party that is designated as confidential or that reasonably should be understood to be confidential ("Confidential Information").

Confidential Information does not include information that:
• Is or becomes publicly available through no fault of the receiving party.
• Was already known to the receiving party prior to disclosure.
• Is independently developed without reference to the Confidential Information.

Confidentiality obligations shall survive termination of this Agreement for a period of 3 years.`,
  },
  {
    id: "governing",
    title: "11. Governing Law & Disputes",
    content: `This Agreement shall be governed by the laws of India, without regard to conflict of law principles. Any dispute, claim, or controversy arising from this Agreement shall be resolved through:

1. Good-Faith Negotiation: The parties shall first attempt to resolve any dispute informally within 30 days.
2. Mediation: If negotiation fails, the parties agree to submit to mediation in Bangalore, Karnataka.
3. Arbitration: Unresolved disputes shall be submitted to binding arbitration under the Arbitration and Conciliation Act, 1996, with proceedings conducted in English in Bangalore, India.

Nothing in this section prevents either party from seeking injunctive or other equitable relief in any court of competent jurisdiction.`,
  },
  {
    id: "general",
    title: "12. General Provisions",
    content: `Entire Agreement: This Agreement, together with our Terms & Conditions and Privacy Policy, constitutes the entire agreement between you and MessBee regarding the Service.

Severability: If any provision of this Agreement is found unenforceable, the remaining provisions will remain in full force.

Waiver: Failure by MessBee to enforce any provision shall not be deemed a waiver of future enforcement.

Assignment: You may not assign this Agreement without MessBee's prior written consent. MessBee may assign this Agreement in connection with a merger, acquisition, or sale of assets.

Contact: For licensing inquiries, contact legal@messbee.com.`,
  },
];

const LicensePage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("grant");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#FFFFFF", color: "#0F172A", overflowX: "hidden", minHeight: "100vh" }}>
      {/* ─── NAVBAR ─── */}
      <Navbar />

      {/* ─── HERO ─── */}
      <section style={{
        background: "linear-gradient(135deg, #18181B 0%, #111827 60%, #0F172A 100%)",
        paddingTop: 140, paddingBottom: 80, paddingLeft: "6%", paddingRight: "6%",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", bottom: -60, left: "5%", width: 400, height: 400, background: "radial-gradient(circle, rgba(0,200,83,0.1) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: -40, right: "12%", width: 280, height: 280, background: "radial-gradient(circle, rgba(0,200,83,0.08) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,200,83,0.1)", border: "1px solid rgba(0,200,83,0.2)", borderRadius: 40, padding: "6px 16px", marginBottom: 20 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#16A34A"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" fill="none" stroke="#16A34A" strokeWidth="2" /></svg>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#16A34A" }}>Legal Document · SaaS License</span>
          </div>

          <h1 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900, color: "#FFFFFF", letterSpacing: "-1.5px", lineHeight: 1.1, marginBottom: 20 }}>
            License <span style={{ color: "#16A34A" }}>Agreement</span>
          </h1>
          <p style={{ fontSize: 16, color: "#94A3B8", lineHeight: 1.7, maxWidth: 580, marginBottom: 32 }}>
            This End-User License Agreement ("EULA") governs your use of the MessBee platform. By accessing the Service, you agree to be bound by these terms.
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {[
              { label: "Last Updated", value: "July 1, 2026" },
              { label: "License Type", value: "SaaS / EULA" },
              { label: "Jurisdiction", value: "India" },
              { label: "Version", value: "v3.0" },
            ].map((m) => (
              <div key={m.label} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "10px 18px" }}>
                <div style={{ fontSize: 10, color: "#64748B", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>{m.label}</div>
                <div style={{ fontSize: 13, color: "#E4E4E7", fontWeight: 600 }}>{m.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTENT ─── */}
      <section style={{ padding: "60px 6%", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", gap: 60, alignItems: "flex-start" }}>

          {/* TOC */}
          <aside style={{ width: 260, flexShrink: 0, position: "sticky", top: 90, background: "#F8FAFC", border: "1px solid #E5E7EB", borderRadius: 16, padding: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#16A34A", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 16 }}>
              Table of Contents
            </div>
            <nav>
              {sections.map((s) => (
                <span key={s.id} className={`toc-link${activeSection === s.id ? " active" : ""}`} onClick={() => scrollToSection(s.id)}>
                  {s.title}
                </span>
              ))}
            </nav>

            <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid #E5E7EB" }}>
              <div style={{ background: "#FFF9F0", border: "1px solid #FDE68A", borderRadius: 10, padding: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#92400E", marginBottom: 6 }}>⚖️ Legal Notice</div>
                <p style={{ fontSize: 11, color: "#78350F", lineHeight: 1.5 }}>
                  Using MessBee constitutes acceptance of this license. Contact legal@messbee.com for queries.
                </p>
              </div>
            </div>
          </aside>

          {/* Article */}
          <article style={{ flex: 1, minWidth: 0 }}>
            {/* Intro highlight */}
            <div style={{ background: "linear-gradient(135deg, #F0FDF4, #ECFDF5)", border: "1px solid #D1FAE5", borderLeft: "4px solid #16A34A", borderRadius: 12, padding: "20px 24px", marginBottom: 48 }}>
              <p style={{ fontSize: 14, color: "#065F46", lineHeight: 1.7, fontWeight: 500 }}>
                <strong>Important:</strong> This is a binding legal agreement between you and MessBee Technologies Pvt. Ltd. It grants you the right to use our platform under specific conditions. By clicking "I Agree", creating an account, or using the Service, you accept all terms of this agreement.
              </p>
            </div>

            {/* Key points summary */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 48 }}>
              {[
                { icon: "✅", label: "Permitted", items: ["Internal business use", "API integrations", "Team access (per plan)", "Data import/export"] },
                { icon: "❌", label: "Not Permitted", items: ["Reselling the Service", "Reverse engineering", "Competing product use", "Sublicensing"] },
              ].map((box) => (
                <div key={box.label} style={{ background: "#F8FAFC", borderRadius: 14, padding: "20px", border: "1px solid #E5E7EB" }}>
                  <div style={{ fontSize: 20, marginBottom: 8 }}>{box.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#111827", marginBottom: 12 }}>{box.label}</div>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {box.items.map(item => (
                      <li key={item} style={{ fontSize: 12, color: "#64748B", marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#94A3B8", flexShrink: 0 }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {sections.map((s) => (
              <div key={s.id} id={s.id} className="section-card" onMouseEnter={() => setActiveSection(s.id)}>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 16, letterSpacing: "-0.3px" }}>{s.title}</h2>
                <p style={{ fontSize: 15, color: "#4B5563", lineHeight: 1.8, whiteSpace: "pre-line" }}>{s.content}</p>
              </div>
            ))}

            {/* Acceptance box */}
            <div style={{ marginTop: 48, background: "#18181B", borderRadius: 20, padding: "40px 36px", textAlign: "center" }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: "#16A34A", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: "#FFFFFF", marginBottom: 10 }}>
                Ready to accept and get started?
              </h3>
              <p style={{ fontSize: 14, color: "#94A3B8", lineHeight: 1.7, maxWidth: 420, margin: "0 auto 28px" }}>
                By creating an account, you accept the terms of this License Agreement. Start your free 14-day trial with no credit card required.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <button onClick={() => window.location.href = (import.meta.env.VITE_ADMIN_URL || "http://localhost:5173") + "/login?flow=register"} style={{ background: "#16A34A", color: "#FFF", border: "none", borderRadius: 40, padding: "12px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                  Accept &amp; Start
                </button>
                <button onClick={() => navigate("/terms")} style={{ background: "rgba(255,255,255,0.08)", color: "#E4E4E7", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 40, padding: "12px 28px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                  Read Terms &amp; Conditions
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <Footer />

    </div>
  );
};

export default LicensePage;
