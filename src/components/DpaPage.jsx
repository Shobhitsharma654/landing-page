import Navbar from "./Navbar";
import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const sections = [
  {
    id: "purpose",
    title: "1. Purpose of this DPA",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
      </svg>
    ),
    content: `The purpose of this DPA is to establish the rights and responsibilities of the parties regarding the processing and protection of personal data processed through MessBee.\n\nThis DPA applies where MessBee processes personal data on behalf of the Customer as part of providing its services.\n\nThe parties agree to comply with applicable data-protection and privacy laws relevant to the processing.`,
  },
  {
    id: "definitions",
    title: "2. Definitions",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20M4 19.5V3.5A2.5 2.5 0 0 1 6.5 1H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5z" />
      </svg>
    ),
    definitions: [
      {
        term: "Personal Data",
        definition:
          "Information relating to an identified or identifiable individual, as defined under applicable law.",
      },
      {
        term: "Processing",
        definition:
          "Includes collecting, recording, organizing, storing, retrieving, using, disclosing, transmitting, modifying or deleting personal data.",
      },
      {
        term: "Controller",
        definition:
          "The party that determines the purposes and means of processing personal data.",
      },
      {
        term: "Processor",
        definition:
          "The party that processes personal data on behalf of the Controller.",
      },
      {
        term: "Data Subject",
        definition: "The individual to whom personal data relates.",
      },
      {
        term: "Security Incident",
        definition:
          "A confirmed unauthorized access to, disclosure of, alteration of, loss of or destruction of personal data processed under this DPA.",
      },
    ],
  },
  {
    id: "roles",
    title: "3. Roles of the Parties",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    content: `For customer data processed through MessBee on the Customer's behalf:\n\n• The Customer generally acts as the Controller or equivalent data fiduciary/data principal-facing entity, depending on the applicable law and processing arrangement.\n• MessBee generally acts as the Processor or equivalent service provider/data processor.\n• The Customer remains responsible for determining the lawful purpose and means of processing its customer data.\n• MessBee processes such data only as necessary to provide the contracted services and according to the Customer's documented instructions, subject to applicable law.\n\nWhere MessBee processes information for its own independent purposes, the relevant processing may be governed separately by the MessBee Privacy Policy and applicable law.`,
  },
  {
    id: "customer-responsibilities",
    title: "4. Customer Responsibilities",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    bullets: [
      "Ensuring that it has a lawful basis for collecting and processing personal data.",
      "Providing appropriate privacy notices to individuals where required.",
      "Obtaining consent where consent is legally required.",
      "Ensuring that instructions provided to MessBee are lawful.",
      "Using MessBee in accordance with applicable laws and platform policies.",
      "Maintaining appropriate access controls for its users.",
      "Protecting account credentials and authentication information.",
      "Responding to data-subject requests where the Customer is responsible for doing so.",
      "Ensuring that marketing and messaging activities comply with applicable laws and platform requirements.",
    ],
  },
  {
    id: "messbee-responsibilities",
    title: "5. MessBee Responsibilities",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    bullets: [
      "Process Customer Personal Data only for legitimate service-related purposes and documented instructions, subject to applicable law.",
      "Maintain appropriate technical and organizational security measures.",
      "Restrict access to Personal Data to authorized personnel who require access for their responsibilities.",
      "Require appropriate confidentiality obligations for personnel who have access to Personal Data.",
      "Provide reasonable assistance with applicable data-protection obligations where required under the agreement.",
      "Notify the Customer of certain confirmed Security Incidents as required under this DPA and applicable law.",
      "Delete or return Personal Data as required by the agreement and applicable law, subject to legitimate retention requirements.",
    ],
  },
  {
    id: "security-measures",
    title: "6. Security Measures",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    intro:
      "MessBee will maintain reasonable technical and organizational measures designed to protect Personal Data against unauthorized or unlawful processing and accidental loss, destruction, alteration or disclosure.\n\nDepending on the service and applicable environment, measures may include:",
    measures: [
      "Access controls",
      "Authentication mechanisms",
      "Role-based permissions",
      "Data protection measures",
      "Logging and monitoring",
      "Secure development practices",
      "Backup and recovery processes",
      "Security testing and vulnerability management",
      "Personnel confidentiality controls",
      "Incident management procedures",
    ],
    outro: "No security measure can guarantee absolute security.",
  },
  {
    id: "confidentiality",
    title: "7. Confidentiality",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    content: `MessBee will keep Customer Personal Data confidential and will not disclose it except:\n\n• To authorized personnel or service providers who need it to provide the services;\n• As instructed or authorized by the Customer;\n• Where required by applicable law or a lawful governmental or regulatory request; or\n• As otherwise permitted under the applicable agreement.\n\nWhere legally permitted, MessBee will use reasonable efforts to provide appropriate notice of legally compelled disclosures.`,
  },
  {
    id: "sub-processors",
    title: "8. Sub-Processors",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    ),
    content: `MessBee may use third-party service providers to support infrastructure, hosting, communications, analytics, security, payment processing or other service functions.\n\nWhere such providers process Personal Data on MessBee's behalf, MessBee will take reasonable steps to require appropriate contractual privacy and security obligations.\n\nWhere required by applicable law or the Customer's agreement, MessBee may provide information about relevant Sub-Processors and applicable change-notification mechanisms.`,
  },
  {
    id: "requests",
    title: "9. Data Subject Requests",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
      </svg>
    ),
    content: `Where reasonably necessary and legally permitted, MessBee will provide reasonable assistance to the Customer in responding to requests concerning Personal Data processed through the services.\n\nSuch requests may include:\n• Access\n• Correction\n• Deletion\n• Restriction\n• Data portability\n• Objection\n• Withdrawal of consent, where applicable\n\nThe Customer remains responsible for determining whether a request is valid and for responding to the Data Subject where the Customer is the responsible entity.`,
  },
  {
    id: "security-incidents",
    title: "10. Security Incidents",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    content: `If MessBee becomes aware of a confirmed Security Incident involving Customer Personal Data, MessBee will notify the Customer without undue delay as required by applicable law and the parties' agreement.\n\nWhere reasonably available, the notification may include:\n• Nature of the incident\n• Categories of affected data\n• Known or reasonably suspected impact\n• Measures taken or proposed\n• Relevant contact information\n\nMessBee will take reasonable steps to investigate, contain and mitigate the incident.`,
  },
  {
    id: "retention",
    title: "11. Data Retention and Deletion",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
      </svg>
    ),
    content: `MessBee will retain Customer Personal Data for the period necessary to provide the applicable services or as otherwise agreed.\n\nFollowing termination or expiry of the applicable services, MessBee will delete or return Customer Personal Data in accordance with the applicable agreement and applicable law, unless retention is required by law.\n\nData retained for legal, security, backup or compliance purposes may remain subject to applicable retention periods and security controls.`,
  },
  {
    id: "transfers",
    title: "12. International Data Transfers",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    content: `Where Personal Data is transferred or accessed across jurisdictions, the parties will comply with applicable legal requirements governing such transfers.\n\nWhere required, appropriate contractual, technical or organizational safeguards will be implemented.\n\nThe availability and location of specific infrastructure or service providers may depend on the MessBee service and applicable configuration.`,
  },
  {
    id: "government-requests",
    title: "13. Government and Legal Requests",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    content: `MessBee may disclose Personal Data where required to comply with applicable law, court orders, regulatory requirements or lawful governmental requests.\n\nWhere legally permitted, MessBee will use reasonable efforts to notify the Customer before making such disclosure.`,
  },
  {
    id: "audit",
    title: "14. Audit and Compliance Assistance",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    content: `Where required by applicable law and subject to reasonable confidentiality and security requirements, MessBee may provide appropriate information demonstrating compliance with its obligations under this DPA.\n\nAny audit or assessment must:\n• Be reasonably related to the services;\n• Avoid unnecessary disruption to MessBee's operations;\n• Protect confidential information and security-sensitive information;\n• Be subject to reasonable advance notice; and\n• Not compromise the security or confidentiality of other customers.`,
  },
  {
    id: "contact",
    title: "15. Data Protection Contact",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    content: `For privacy or data-protection enquiries relating to MessBee services:\n\nFor general support:\nEmail: support@messbee.com`,
  },
  {
    id: "relationship",
    title: "16. Relationship With Other Agreements",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    content: `This DPA supplements the applicable MessBee Terms & Conditions, Privacy Policy and other agreements governing the Customer's use of MessBee.\n\nIf there is a conflict between this DPA and another agreement regarding the processing of Personal Data, the provisions specifically addressing data processing will generally take precedence to the extent of the conflict, subject to the applicable contractual terms.`,
  },
  {
    id: "changes",
    title: "17. Changes to This DPA",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="23 4 23 10 17 10" />
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
      </svg>
    ),
    content: `MessBee may update this DPA when reasonably necessary to reflect changes in its services, applicable law, security practices or regulatory requirements.\n\nWhere a material change is required, MessBee will provide notice where required by the applicable agreement or law.`,
  },
  {
    id: "governing-law",
    title: "18. Governing Law",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
      </svg>
    ),
    content: `This DPA will be governed by the applicable governing-law and jurisdiction provisions contained in the principal agreement between MessBee and the Customer, unless otherwise required by applicable law.`,
  },
  {
    id: "acceptance",
    title: "19. Acceptance",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    content: `By entering into an agreement for applicable MessBee services, signing an applicable order or contract, or otherwise accepting the applicable MessBee terms where this DPA is incorporated by reference, the Customer agrees to be bound by this DPA to the extent applicable.`,
  },
];

const RELATED_POLICIES = [
  { label: "Privacy Policy", path: "/privacy" },
  { label: "Terms & Conditions", path: "/terms" },
  { label: "Cookie Policy", path: "/cookies" },
];

const DpaPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("purpose");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id) => {
    setActiveSection(id);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        background: "#FFFFFF",
        color: "#0F172A",
        overflowX: "clip",
        minHeight: "100vh",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        .dpa-toc-link {
          display: flex; align-items: flex-start; gap: 8px;
          padding: 6px 10px; border-radius: 8px; cursor: pointer;
          font-size: 12.5px; font-weight: 500; color: #64748B;
          line-height: 1.45; transition: background 0.15s, color 0.15s;
          border: 1px solid transparent; margin-bottom: 2px;
        }
        .dpa-toc-link:hover { background: #F1F5F9; color: #0F172A; }
        .dpa-toc-link.active {
          background: #F0FDF4; color: #16A34A; font-weight: 700;
          border-color: #BBF7D0;
        }
        .dpa-section-card {
          background: #FFFFFF; border: 1px solid #E2E8F0;
          border-radius: 16px; padding: 32px; margin-bottom: 20px;
          box-shadow: 0 4px 12px rgba(15,23,42,0.01);
          scroll-margin-top: 100px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .dpa-section-card:hover { border-color: #BBF7D0; box-shadow: 0 4px 20px rgba(22,163,74,0.06); }
        .dpa-container { display: flex; gap: 48px; align-items: flex-start; }
        .dpa-sidebar {
          width: 300px;
          flex-shrink: 0;
          position: sticky;
          top: 90px;
          max-height: calc(100vh - 110px);
          overflow-y: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .dpa-sidebar::-webkit-scrollbar {
          display: none;
        }
        .dpa-article { flex: 1; min-width: 0; }
        
        .policy-hero {
          padding-top: 130px; padding-bottom: 48px;
          padding-left: 6%; padding-right: 6%;
        }
        .policy-content {
          padding: 48px 6%;
        }

        @media (max-width: 1366px) {
          .dpa-container {
            gap: 32px !important;
          }
          .dpa-sidebar {
            width: 270px !important;
            padding: 16px !important;
            max-height: calc(100vh - 120px) !important;
          }
        }
        @media (max-width: 1024px) {
          .dpa-sidebar {
            display: none !important;
          }
          .dpa-container {
            gap: 0 !important;
          }
        }
        @media (max-width: 480px) {
          .policy-hero { padding-top: 110px; padding-bottom: 24px; }
          .dpa-section-card { padding: 20px; }
        }
      `}</style>

      <title>Data Processing Agreement (DPA) | MessBee</title>
      <meta
        name="description"
        content="Review the Data Processing Agreement (DPA) for MessBee. Understand processors, sub-processors, controller responsibilities and compliance safeguards."
      />

      <Navbar />

      {/* ═══ HERO ═══ */}
      <section
        className="policy-hero"
        style={{
          background: "#FFFFFF",
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid #F1F5F9",
        }}
      >
        {/* Dot grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, #CBD5E1 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            opacity: 0.4,
            pointerEvents: "none",
          }}
        />
        {/* Green radial glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 10% 60%, rgba(22,163,74,0.07) 0%, transparent 45%), radial-gradient(circle at 85% 20%, rgba(22,163,74,0.05) 0%, transparent 40%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#F0FDF4",
              border: "1px solid #BBF7D0",
              borderRadius: 40,
              padding: "6px 16px",
              marginBottom: 24,
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#16A34A"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#16A34A",
                letterSpacing: "0.3px",
              }}
            >
              Security &amp; Compliance
            </span>
          </div>

          {/* H1 */}
          <h1
            style={{
              fontSize: "clamp(35px, 2.9vw, 62px)",
              fontWeight: 900,
              color: "#0F172A",
              letterSpacing: "-2px",
              lineHeight: 1.08,
              marginBottom: 20,
            }}
          >
            Data Processing <span style={{ color: "#16A34A" }}>Agreement</span>
          </h1>

          {/* Divider */}
          <div
            style={{
              width: 48,
              height: 4,
              background: "linear-gradient(90deg, #16A34A, #4ADE80)",
              borderRadius: 4,
              marginBottom: 24,
            }}
          />

          {/* Description */}
          <p
            style={{
              fontSize: 17,
              color: "#475569",
              lineHeight: 1.75,
              maxWidth: 1100,
              margin: 0,
            }}
          >
            This Data Processing Agreement (DPA) forms part of the agreement between MessBee and you.<br />
            It governs the processing of personal data by MessBee on behalf of the Customer in connection with applicable MessBee services.
          </p>

          {/* Dates row */}
        </div>
      </section>

      {/* ═══ MAIN CONTENT ═══ */}
      <section className="policy-content" style={{ background: "#FFFFFF" }}>
        <div
          className="dpa-container"
          style={{ maxWidth: 1380, margin: "0 auto" }}
        >
          {/* ── Sidebar TOC ── */}
          <aside className="dpa-sidebar">
            <div
              style={{
                background: "#F8FAFC",
                border: "1px solid #E2E8F0",
                borderRadius: 16,
                padding: "20px 16px",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: "#16A34A",
                  textTransform: "uppercase",
                  letterSpacing: "1.2px",
                  marginBottom: 14,
                  paddingLeft: 4,
                }}
              >
                Table of Contents
              </div>
              <nav>
                {sections.map((s) => (
                  <div
                    key={s.id}
                    className={`dpa-toc-link${activeSection === s.id ? " active" : ""}`}
                    onClick={() => scrollToSection(s.id)}
                  >
                    <span
                      style={{
                        flexShrink: 0,
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background:
                          activeSection === s.id ? "#16A34A" : "#CBD5E1",
                        marginTop: 5,
                      }}
                    />
                    {s.title}
                  </div>
                ))}
              </nav>

              {/* Related Policies */}
              <div
                style={{
                  marginTop: 20,
                  paddingTop: 16,
                  borderTop: "1px solid #E2E8F0",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    color: "#64748B",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    marginBottom: 10,
                    paddingLeft: 4,
                  }}
                >
                  Related Policies
                </div>
                {RELATED_POLICIES.map((p) => (
                  <div
                    key={p.path}
                    onClick={() => navigate(p.path)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "8px 10px",
                      borderRadius: 8,
                      cursor: "pointer",
                      fontSize: 12.5,
                      fontWeight: 600,
                      color: "#16A34A",
                      transition: "background 0.15s",
                      marginBottom: 2,
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#F0FDF4")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#16A34A"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                    {p.label}
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* ── Article ── */}
          <article className="dpa-article">
            {/* Plain language box */}
            <div
              style={{
                background: "#F0FDF4",
                border: "1px solid #D1FAE5",
                borderLeft: "4px solid #16A34A",
                borderRadius: 12,
                padding: "20px 24px",
                marginBottom: 32,
              }}
            >
              <p
                style={{
                  fontSize: 14,
                  color: "#065F46",
                  lineHeight: 1.7,
                  fontWeight: 500,
                  margin: 0,
                }}
              >
                <strong>In plain language:</strong> This DPA applies when
                MessBee processes customer personal data on your behalf. We act
                as the Processor and you act as the Controller, meaning you
                control the data, and we process it only under your
                instructions.
              </p>
            </div>

            {/* Sections */}
            {sections.map((s) => (
              <div
                key={s.id}
                id={s.id}
                className="dpa-section-card"
                onMouseEnter={() => setActiveSection(s.id)}
              >
                {/* Icon + title */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    marginBottom: 20,
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: "rgba(22,163,74,0.08)",
                      color: "#16A34A",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {s.icon}
                  </div>
                  <h2
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: "#0F172A",
                      letterSpacing: "-0.3px",
                      margin: 0,
                    }}
                  >
                    {s.title}
                  </h2>
                </div>

                {/* Content Rendering based on type */}
                {s.definitions ? (
                  /* Definitions Layout */
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(280px, 1fr))",
                      gap: 14,
                    }}
                  >
                    {s.definitions.map((def) => (
                      <div
                        key={def.term}
                        style={{
                          background: "#F8FAFC",
                          border: "1px solid #E2E8F0",
                          borderRadius: 12,
                          padding: "16px 18px",
                        }}
                      >
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 800,
                            color: "#16A34A",
                            marginBottom: 6,
                          }}
                        >
                          {def.term}
                        </div>
                        <p
                          style={{
                            fontSize: 13,
                            color: "#475569",
                            lineHeight: 1.6,
                            margin: 0,
                          }}
                        >
                          {def.definition}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : s.bullets ? (
                  /* Bullet Points List Layout */
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                    }}
                  >
                    {s.bullets.map((b, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          gap: 12,
                          alignItems: "flex-start",
                        }}
                      >
                        <div
                          style={{
                            width: 22,
                            height: 22,
                            borderRadius: "50%",
                            background: "#F0FDF4",
                            border: "1px solid #BBF7D0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            marginTop: 2,
                          }}
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#16A34A"
                            strokeWidth="3"
                            strokeLinecap="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <p
                          style={{
                            fontSize: 14.5,
                            color: "#475569",
                            lineHeight: 1.6,
                            margin: 0,
                          }}
                        >
                          {b}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : s.measures ? (
                  /* Security Measures Grid Layout */
                  <div>
                    {s.intro && (
                      <p
                        style={{
                          fontSize: 15,
                          color: "#475569",
                          lineHeight: 1.85,
                          whiteSpace: "pre-line",
                          marginBottom: 20,
                        }}
                      >
                        {s.intro}
                      </p>
                    )}
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 10,
                        marginBottom: 20,
                      }}
                    >
                      {s.measures.map((m) => (
                        <div
                          key={m}
                          style={{
                            background: "#F8FAFC",
                            border: "1px solid #E2E8F0",
                            borderRadius: 30,
                            padding: "8px 18px",
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#334155",
                          }}
                        >
                          🛡️ {m}
                        </div>
                      ))}
                    </div>
                    {s.outro && (
                      <p
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: "#16A34A",
                          margin: 0,
                        }}
                      >
                        {s.outro}
                      </p>
                    )}
                  </div>
                ) : (
                  /* Standard text layout */
                  <p
                    style={{
                      fontSize: 15,
                      color: "#475569",
                      lineHeight: 1.85,
                      whiteSpace: "pre-line",
                      margin: 0,
                    }}
                  >
                    {s.content}
                  </p>
                )}

                {/* Contact section special rendering */}
                {s.id === "contact" && (
                  <div
                    style={{
                      marginTop: 20,
                      background: "#F8FAFC",
                      border: "1px solid #E2E8F0",
                      borderRadius: 12,
                      padding: "18px 20px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      {[
                        { label: "Operating Brand", value: "MessBee" },
                        { label: "Country", value: "India" },
                        {
                          label: "Privacy Support",
                          value: "support@messbee.com",
                          href: "mailto:support@messbee.com",
                        },
                      ].map((item) => (
                        <div
                          key={item.label}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            fontSize: 14,
                          }}
                        >
                          <span
                            style={{
                              fontWeight: 700,
                              color: "#0F172A",
                              minWidth: 130,
                            }}
                          >
                            {item.label}:
                          </span>
                          {item.href ? (
                            <a
                              href={item.href}
                              style={{
                                color: "#16A34A",
                                fontWeight: 600,
                                textDecoration: "none",
                              }}
                            >
                              {item.value}
                            </a>
                          ) : (
                            <span style={{ color: "#475569" }}>
                              {item.value}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </article>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DpaPage;
