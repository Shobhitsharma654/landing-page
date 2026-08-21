import Navbar from "../Navbar";
import React, { useState, useEffect, useRef } from "react";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";

/* ══════════════════════════════════════════════════════
   MessBee — Privacy Policy Page
   Color palette mirrors LandingPage:
     Navbar : #18181B dark
     Accent : #16A34A green
     Body   : #FFFFFF white
   ══════════════════════════════════════════════════════ */

const sections = [
  {
    id: "introduction",
    title: "1. Introduction",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    content: `Welcome to MessBee, India's Digital Business Operating System. MessBee is a digital business platform operated in India. MessBee provides businesses with technology for customer communication, CRM, WhatsApp Business communication and commerce, digital storefronts, AI-assisted customer engagement, marketing automation, lead management, orders, payments, inventory, loyalty, analytics, business content management, automation and other digital business workflows.

We respect the privacy of individuals whose personal data is processed through our website, applications, platform and services. This Privacy Policy explains how MessBee may collect, receive, use, disclose, store, retain and otherwise process personal data in connection with our services.

By accessing or using MessBee, you acknowledge that you have read this Privacy Policy. Where applicable law requires consent for a particular processing activity, MessBee will seek the required consent through an appropriate mechanism. This Privacy Policy should be read together with MessBee's applicable Terms of Service, Data Processing Agreement, Cookie Policy, Acceptable Use Policy, WhatsApp Business Messaging Policy, Anti-Spam Policy, Refund Policy and other applicable policies or agreements.`,
  },
  {
    id: "legal-framework",
    title: "2. Applicable Legal & Regulatory Framework",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    content: `MessBee seeks to handle personal data in accordance with applicable laws and regulations of India, including, where applicable:

• The Digital Personal Data Protection Act, 2023;
• Rules, notifications and directions issued under applicable Indian data-protection law, to the extent applicable and in force;
• The Information Technology Act, 2000 and applicable rules;
• Applicable cybersecurity, consumer protection, electronic commerce and telecommunications requirements;
• Applicable contractual obligations; and
• Applicable policies and requirements of third-party platforms and service providers, including Meta and the WhatsApp Business Platform.

The applicable legal requirements may vary depending on the nature of the data, service, business, processing activity and jurisdiction involved.`,
  },
  {
    id: "scope",
    title: "3. Scope",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M22 12h-4" /><path d="M6 12H2" /><path d="M12 6V2" /><path d="M12 22v-4" />
      </svg>
    ),
    content: `This Privacy Policy applies to personal data processed in connection with:

• MessBee website;
• MessBee web applications;
• MessBee mobile applications, where applicable;
• MessBee business accounts;
• User accounts;
• CRM services;
• WhatsApp Business integrations;
• Digital storefronts;
• AI-assisted features;
• Marketing and automation services;
• Business Library;
• Orders and commerce workflows;
• Analytics and reporting;
• Customer support;
• APIs and integrations; and
• Other MessBee services that link to this Privacy Policy.

This Privacy Policy does not govern independent third-party websites, applications or services that are not operated or controlled by MessBee.`,
  },
  {
    id: "definitions",
    title: "4. Important Definitions",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
    content: `Personal Data:
Personal data means information relating to an identifiable individual, to the extent defined under applicable law.

Data Principal:
Data Principal means the individual to whom personal data relates, as recognized under applicable Indian data-protection law.

Business Customer:
Business Customer means the business, organization or legal entity that subscribes to or uses MessBee.

Business User:
Business User means an employee, representative, administrator or other authorized person using MessBee on behalf of a Business Customer.

Customer Data:
Customer Data means information submitted to MessBee by or on behalf of a Business Customer through the use of MessBee services.

Processing:
Processing includes collection, storage, use, disclosure, sharing, analysis, transmission, modification, deletion or other handling of personal data as permitted under applicable law.`,
  },
  {
    id: "info-collect",
    title: "5. Information We Collect",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    content: `The information collected by MessBee depends on how you use our services.

5.1 Account & Business Information:
We may collect:
• Name;
• Email address;
• Mobile number;
• Business name;
• Business address;
• Business category;
• Website or application information;
• Account information;
• Authentication information;
• Organization information;
• Authorized representative information;
• Billing and subscription information;
• GST or tax-related information where required; and
• Other information necessary to provide the requested service.`,
  },
  {
    id: "customer-info",
    title: "6. Customer & Communication Information",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    content: `When a Business Customer uses MessBee to communicate with its customers, MessBee may process information contained in those interactions. Depending on the services used, this may include:

• Customer name;
• Mobile number;
• Email address;
• Messages;
• Conversation history;
• Customer enquiries;
• Product or service enquiries;
• Order-related information;
• Appointment-related information;
• Customer preferences;
• Campaign interaction information;
• Support requests;
• Feedback; and
• Other information submitted by or on behalf of the Business Customer.

Business Customers are responsible for ensuring that they have the appropriate lawful basis, authorization, notice or consent required to collect and provide such information to MessBee.`,
  },
  {
    id: "whatsapp-data",
    title: "7. WhatsApp & Meta Data",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
    content: `MessBee may integrate with the WhatsApp Business Platform and other Meta services. Depending on the integration, information processed through such services may include:

• WhatsApp Business account information;
• Business phone numbers;
• Customer phone numbers;
• Message content;
• Message metadata;
• Conversation information;
• Delivery and engagement information;
• Message templates;
• Media or files;
• Business account identifiers;
• Integration credentials or tokens; and
• Other information required for the applicable integration.

Information processed through Meta services may also be subject to Meta's applicable terms, policies and privacy practices. The respective responsibilities of MessBee, the Business Customer and Meta may differ depending on the particular service, integration and processing activity.`,
  },
  {
    id: "whatsapp-compliance",
    title: "8. Meta & WhatsApp Business Platform Compliance",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    content: `MessBee may provide functionality that uses the WhatsApp Business Platform and other Meta services. Business Customers using these services are responsible for:

• Obtaining required customer opt-ins or permissions;
• Providing appropriate privacy notices;
• Using approved messaging templates where required;
• Respecting customer communication preferences;
• Honouring opt-outs;
• Avoiding spam and deceptive communications;
• Following applicable WhatsApp and Meta policies;
• Following applicable Indian laws and regulations; and
• Using messaging functionality only for lawful business purposes.

MessBee does not support or encourage unsolicited messaging, spam, fraudulent communications or attempts to circumvent Meta's platform controls. MessBee may restrict or suspend functionality where reasonably necessary to address violations of law, contractual requirements, platform policies or MessBee policies.

MessBee does not claim Meta endorsement, certification or ownership merely because it integrates with Meta or WhatsApp services. Any specific partner or technology-provider designation will be represented only in accordance with applicable Meta documentation or agreement.`,
  },
  {
    id: "customer-responsibilities",
    title: "9. Business Customer Responsibilities",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" />
      </svg>
    ),
    content: `MessBee provides technology and infrastructure to help businesses manage their digital operations. Where a Business Customer provides personal data to MessBee, the Business Customer is responsible for:

• Having the required rights and authority to provide the information;
• Providing appropriate privacy notices;
• Obtaining consent where required;
• Using an appropriate lawful basis for processing;
• Respecting customer requests and communication preferences;
• Complying with applicable data-protection laws;
• Complying with WhatsApp and Meta policies where applicable; and
• Not using MessBee for unlawful, fraudulent, deceptive or prohibited activities.`,
  },
  {
    id: "technical-usage",
    title: "10. Technical & Usage Information",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
    content: `We may automatically collect certain technical information, including:

• IP address;
• Browser information;
• Device information;
• Operating system;
• Application information;
• Log information;
• Session information;
• Feature usage;
• Interaction data;
• Error and diagnostic information;
• Security information; and
• Platform performance information.

This information may be used for security, troubleshooting, analytics, service delivery and platform improvement.`,
  },
  {
    id: "cookies",
    title: "11. Cookies & Similar Technologies",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><circle cx="8" cy="9" r="1" /><circle cx="15" cy="9" r="1" /><circle cx="10" cy="14" r="1" /><circle cx="15" cy="14" r="1" />
      </svg>
    ),
    content: `MessBee may use cookies and similar technologies to:

• Maintain user sessions;
• Remember preferences;
• Improve website and application functionality;
• Understand usage patterns;
• Analyze platform performance;
• Improve user experience;
• Detect fraud and abuse;
• Maintain security; and
• Measure marketing performance where applicable.

Where applicable law requires consent for non-essential cookies or similar technologies, MessBee will seek appropriate consent. Users may manage certain cookies through browser or device settings. Disabling certain cookies may affect the availability or functionality of some features.`,
  },
  {
    id: "data-usage",
    title: "12. How We Use Personal Data",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    content: `Depending on the applicable service and legal basis, MessBee may use personal data to:

• Create and manage accounts;
• Provide services;
• Authenticate users;
• Operate communication services;
• Provide CRM functionality;
• Facilitate WhatsApp Business integrations;
• Operate digital storefronts;
• Provide AI-assisted functionality;
• Provide marketing automation;
• Manage orders and business workflows;
• Provide analytics and reporting;
• Process subscriptions and billing;
• Provide customer support;
• Send service-related communications;
• Maintain platform security;
• Detect and prevent fraud or abuse;
• Troubleshoot technical issues;
• Improve products and services;
• Maintain business records;
• Comply with legal obligations;
• Respond to lawful requests; and
• Protect the rights and security of MessBee, users and other persons.`,
  },
  {
    id: "marketing-comms",
    title: "13. Marketing Communications",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
    content: `MessBee may send communications necessary to operate your account and services. These may include:

• Account notifications;
• Security alerts;
• Billing notifications;
• Service updates;
• Technical notices;
• Policy updates; and
• Other essential service communications.

Where promotional communications require consent or another lawful basis, MessBee will use the applicable legal mechanism. You may opt out of promotional communications through available unsubscribe or preference mechanisms. Opting out of marketing communications will not necessarily stop essential transactional or service-related communications.`,
  },
  {
    id: "consent-withdrawal",
    title: "14. Consent & Withdrawal",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
      </svg>
    ),
    content: `Where processing is based on consent, MessBee will seek consent through an appropriate mechanism as required by applicable law.

Where legally applicable, you may withdraw consent. Withdrawal of consent will not affect the lawfulness of processing performed before withdrawal. MessBee may continue processing information where another lawful basis or legal obligation permits or requires such processing.`,
  },
  {
    id: "principal-rights",
    title: "15. Data Principal Rights",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
      </svg>
    ),
    content: `Subject to applicable law and relevant conditions, Data Principals may have rights relating to their personal data, including:

• Access to information about processing;
• Correction of inaccurate or incomplete information;
• Erasure of personal data where applicable;
• Withdrawal of consent where applicable;
• Grievance redressal; and
• Other rights available under applicable law.

Where MessBee processes customer information on behalf of a Business Customer, certain requests may need to be directed to the relevant Business Customer.`,
  },
  {
    id: "privacy-requests",
    title: "16. Privacy Requests",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2L11 13" /><polyline points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
    ),
    content: `Privacy requests may include:

• Access requests;
• Correction requests;
• Deletion requests;
• Consent withdrawal;
• Marketing opt-out;
• Privacy complaints; and
• Questions concerning personal-data processing.

MessBee may request reasonable information to verify identity or authority before fulfilling a request. This is intended to protect personal data from unauthorized disclosure.`,
  },
  {
    id: "customer-requests",
    title: "17. Business Customer Data Requests",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M16 12a4 4 0 0 1-8 0" />
      </svg>
    ),
    content: `Where MessBee processes Customer Data on behalf of a Business Customer, the Business Customer may be responsible for responding to requests from its customers or Data Principals.

MessBee may provide reasonable assistance to Business Customers where required by applicable law or contract. Where appropriate, individuals may be directed to the relevant Business Customer for requests relating to data controlled by that business.`,
  },
  {
    id: "data-sharing",
    title: "18. Data Sharing",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    ),
    content: `MessBee does not sell personal data as a business model. We may share or disclose information where reasonably necessary to provide services, comply with applicable law or protect legitimate interests. This may include:

Service Providers:
Cloud, hosting, security, analytics, communications, customer support and other technology providers.

Meta:
Where required for WhatsApp Business Platform or other Meta-related functionality.

Payment Providers:
Where necessary to process payments and subscriptions.

Professional Advisors:
Lawyers, accountants, auditors and other professional advisors where reasonably necessary.

Government & Law Enforcement:
Where required by applicable law, legal process, court order or lawful government request.

Corporate Transactions:
Where reasonably necessary in connection with a merger, acquisition, restructuring, financing, sale of assets or similar transaction, subject to applicable law.`,
  },
  {
    id: "service-providers",
    title: "19. Third-Party Service Providers",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    content: `MessBee may use third-party service providers for:

• Cloud infrastructure;
• Hosting;
• Storage;
• Authentication;
• Analytics;
• Email;
• SMS;
• WhatsApp/Meta integrations;
• Payment processing;
• Security;
• Monitoring;
• Customer support;
• Backup and disaster recovery; and
• Other required services.

Such providers may process information only to the extent reasonably necessary for their services and subject to applicable contractual and legal requirements. Third-party services may have separate privacy policies and terms.`,
  },
  {
    id: "payment-info",
    title: "20. Payment Information",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    content: `MessBee may use third-party payment gateways for subscriptions and other payments. Where payment processing is performed by a third party:

• Payment information may be transmitted directly to the payment provider;
• MessBee does not intentionally store complete payment-card information unless required and lawfully permitted;
• Payment providers may maintain their own security and compliance controls; and
• Users should review the applicable payment provider's privacy policy.

Any reference to PCI-DSS or other payment-security standards applies only to the extent relevant to the actual payment architecture and applicable provider.`,
  },
  {
    id: "data-security",
    title: "21. Data Security",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    content: `MessBee implements reasonable technical and organizational safeguards designed to protect personal data. Depending on the service and technical architecture, these may include:

• Access controls;
• Authentication;
• Role-based permissions;
• Secure data transmission;
• Encryption where appropriate;
• Logging and monitoring;
• Security testing;
• Backup controls;
• Incident management; and
• Infrastructure security measures.

No internet-based service can guarantee absolute security. Users are responsible for protecting their account credentials and must notify MessBee promptly if they suspect unauthorized access.`,
  },
  {
    id: "data-breach",
    title: "22. Personal Data Breach",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    content: `MessBee maintains processes designed to identify, assess, respond to and mitigate security incidents involving personal data. Where a personal-data breach occurs, MessBee will take appropriate measures required under applicable law and contractual obligations, which may include:

• Investigating the incident;
• Containing the incident;
• Mitigating potential harm;
• Implementing corrective measures;
• Maintaining relevant records;
• Notifying affected parties where required; and
• Making required notifications to competent authorities or regulators where legally required.

The timing and scope of notification will depend on applicable legal requirements and the circumstances of the incident.`,
  },
  {
    id: "retention-rules",
    title: "23. Data Retention",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    content: `MessBee retains personal data only for as long as reasonably necessary for the relevant purpose, including:

• Providing services;
• Maintaining accounts;
• Fulfilling contractual obligations;
• Resolving disputes;
• Maintaining business records;
• Preventing fraud and abuse;
• Maintaining security;
• Complying with legal requirements; and
• Enforcing applicable agreements.

Retention periods may differ depending on the nature of the information and applicable requirements. When information is no longer required, MessBee may delete, anonymize or securely dispose of it, subject to applicable law and legitimate retention requirements.`,
  },
  {
    id: "closure-deletion",
    title: "24. Account Closure & Deletion",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" />
      </svg>
    ),
    content: `When a MessBee account is closed, personal data may be deleted or anonymized subject to:

• Legal retention requirements;
• Contractual obligations;
• Security requirements;
• Fraud prevention;
• Dispute resolution;
• Business records;
• Backup systems; and
• Other lawful retention requirements.

Backup copies may remain temporarily before being overwritten in accordance with applicable backup procedures.`,
  },
  {
    id: "children-data",
    title: "25. Children's Personal Data",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M19 8v6" /><path d="M22 11h-6" />
      </svg>
    ),
    content: `MessBee's business services are primarily intended for businesses and authorized users who are legally capable of using the services. MessBee does not knowingly seek to collect children's personal data except where such processing is lawfully required and appropriately authorized.

Where a Business Customer processes children's personal data through MessBee, that Business Customer is responsible for complying with applicable legal requirements concerning children, including any required parental consent or authorization. MessBee may take appropriate action where it becomes aware of unlawful or unauthorized processing involving children's personal data.`,
  },
  {
    id: "regulated-info",
    title: "26. Sensitive or Regulated Information",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    content: `Business Customers should not upload sensitive, highly confidential or regulated personal information unless:

• The relevant MessBee service supports such processing;
• The Business Customer has the necessary legal basis and authorization;
• Applicable legal requirements are satisfied; and
• Appropriate contractual and technical safeguards are in place.

Businesses operating in healthcare, financial services, education or other regulated sectors remain responsible for identifying and meeting sector-specific requirements.`,
  },
  {
    id: "ai-processing",
    title: "27. AI & Automated Processing",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M12 2v9" /><path d="M8 5h8" />
      </svg>
    ),
    content: `MessBee may provide AI-assisted functionality for:

• Customer enquiries;
• FAQs;
• Product and service information;
• Recommendations;
• Lead assistance;
• Customer support;
• Workflow automation;
• Summaries;
• Business insights; and
• Other supported business activities.

AI-generated information may not always be accurate, complete or suitable for a particular situation. Businesses should apply appropriate human review where decisions may have legal, medical, financial, employment, safety or other significant consequences. MessBee's AI functionality should not be treated as a substitute for qualified professional advice.`,
  },
  {
    id: "uploaded-content",
    title: "28. Business Library & Uploaded Content",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
    content: `MessBee may provide a Business Library through which users can upload and organize supported digital content such as:

• Images;
• Videos;
• Documents;
• Product catalogues;
• Brochures;
• Marketing creatives;
• Price lists;
• Menus;
• Business resources;
• Training material; and
• Other supported files.

Users are responsible for ensuring that uploaded content:
• Is lawfully obtained;
• Does not violate privacy rights;
• Does not infringe intellectual-property rights;
• Does not violate confidentiality obligations;
• Does not contain prohibited content; and
• Complies with applicable laws and MessBee policies.

MessBee may process uploaded content as necessary to provide the relevant service and functionality.`,
  },
  {
    id: "cross-border",
    title: "29. International & Cross-Border Processing",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    content: `MessBee may use cloud infrastructure and service providers located in India or other jurisdictions. Where personal data is transferred, stored or processed outside India, MessBee will seek to do so in accordance with applicable Indian law, contractual requirements and applicable regulatory requirements.

International processing may also be subject to the privacy and security practices of the relevant service providers.`,
  },
  {
    id: "dpa",
    title: "30. Data Processing Agreement",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    content: `Business Customers requiring contractual data-processing terms may enter into a separate Data Processing Agreement (DPA) with MessBee where applicable. A DPA may address:

• Processing instructions;
• Purpose and duration;
• Categories of personal data;
• Categories of Data Principals;
• Security measures;
• Confidentiality;
• Sub-processors;
• Data deletion or return;
• Incident assistance;
• Compliance cooperation; and
• Other applicable data-processing obligations.

Where a valid DPA specifically addresses a processing matter differently from this Privacy Policy, the DPA may govern that matter to the extent of the applicable contractual relationship.`,
  },
  {
    id: "grievance",
    title: "31. Grievance Redressal",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><line x1="9" y1="10" x2="15" y2="10" /><line x1="9" y1="14" x2="13" y2="14" />
      </svg>
    ),
    content: `If you have a privacy concern, complaint or request relating to your personal data, you may contact the MessBee Privacy & Grievance Team using the contact details below. We will review and address applicable grievances in accordance with applicable law and within the timelines required by applicable law.

Where a complaint concerns data controlled by a Business Customer, MessBee may direct the individual to that Business Customer where appropriate.`,
  },
  {
    id: "acc-security",
    title: "32. Account Security",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    content: `Users are responsible for:
• Keeping passwords and authentication credentials confidential;
• Using appropriate security practices;
• Not sharing unauthorized credentials;
• Notifying MessBee of suspected unauthorized access;
• Using authorized integrations; and
• Following applicable security instructions.

MessBee is not responsible for unauthorized access resulting from a user's failure to maintain reasonable account security.`,
  },
  {
    id: "lawful-disclosure",
    title: "33. Lawful Disclosure",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    content: `MessBee may disclose information where reasonably necessary to:

• Comply with applicable law;
• Respond to lawful government requests;
• Comply with court orders;
• Prevent fraud;
• Investigate security incidents;
• Protect users;
• Enforce agreements; or
• Protect MessBee's legal rights and interests.

Where legally permitted, MessBee will seek to limit disclosure to information reasonably necessary for the relevant purpose.`,
  },
  {
    id: "data-accuracy",
    title: "34. Data Accuracy",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    content: `MessBee seeks to maintain accurate information where it controls the relevant data. Where a Business Customer provides customer information to MessBee, that Business Customer is responsible for ensuring that such information is accurate and appropriately maintained.

Users may request correction of inaccurate information where applicable.`,
  },
  {
    id: "third-party",
    title: "35. Third-Party Websites & Services",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
    content: `MessBee may provide links to or integrations with third-party websites, platforms and services. Third-party services operate independently and may have their own terms and privacy policies.

MessBee is not responsible for the privacy practices of independent third parties. Users should review the applicable third-party policies before providing personal information.`,
  },
  {
    id: "policy-updates",
    title: "36. Changes to This Privacy Policy",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
      </svg>
    ),
    content: `MessBee may update this Privacy Policy from time to time due to:
• Changes in services;
• Changes in technology;
• Changes in applicable law;
• Changes in regulatory requirements;
• Changes in third-party integrations; or
• Changes in our privacy practices.

Where material changes are made, MessBee may provide appropriate notice through its website, application, email or other reasonable means where required. The updated Policy will indicate the revised effective date.`,
  },
  {
    id: "governing-law",
    title: "37. Governing Law",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    ),
    content: `This Privacy Policy is governed by the laws applicable in India. Subject to applicable law, disputes relating to this Privacy Policy shall be subject to the jurisdiction of the competent courts in India.`,
  },
  {
    id: "contact-info",
    title: "38. Contact Information",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 18z" />
      </svg>
    ),
    content: `MessBee Privacy & Grievance Team
MessBee 
Email: support@MessBee.com
Address: 510A, Devika Tower, Chander Nagar, Ghaziabad, Uttar Pradesh – 201011, India

For privacy-related requests, please mention:
Subject: Privacy Request – MessBee

For customer-data requests relating to a business using MessBee, please provide the relevant business/account information where possible.`,
  },
  {
    id: "responsible-messaging",
    title: "39. Responsible Messaging Statement",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.5 12H16c-.07-.44-.22-.88-.47-1.27l3.07-3.07a8.5 8.5 0 0 0-7.07-7.07l-3.07 3.07a5 5 0 0 0-1.27-.47V1.5a8.5 8.5 0 0 0-7.07 7.07l3.07 3.07c-.25.39-.4.83-.47 1.27H1.5a8.5 8.5 0 0 0 7.07 7.07l3.07-3.07c.39.25.83.4 1.27.47v4.5a8.5 8.5 0 0 0 7.07-7.07l-3.07-3.07c.25-.39.4-.83.47-1.27h5.5z" />
      </svg>
    ),
    content: `MessBee is committed to supporting responsible digital business communication. MessBee does not support or encourage:

• Spam;
• Unsolicited messaging;
• Fraudulent communications;
• Deceptive business practices;
• Unauthorized use of customer data;
• Unauthorized access to accounts or systems;
• Circumvention of Meta or WhatsApp controls; or
• Activities prohibited by applicable law or platform policies.

Business Customers are responsible for ensuring that their use of MessBee, including messaging, marketing and automation, complies with applicable laws, customer permissions, contractual obligations and relevant platform policies.`,
  },
  {
    id: "meta-relationship",
    title: "40. Meta & WhatsApp Relationship",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
    content: `MessBee may integrate with products and services provided by Meta, including the WhatsApp Business Platform. Meta's services are governed by Meta's own terms, policies and privacy practices.

This Privacy Policy does not replace, modify or override Meta's policies. Where applicable, Business Customers should also review the relevant Meta and WhatsApp Business documentation. The legal and operational responsibilities of MessBee, Meta and the Business Customer may differ depending on the applicable integration and processing activity.

Any specific statement regarding MessBee's status as a Meta partner, technology provider or other authorized provider will be made only in accordance with the applicable Meta agreement, documentation or official designation.`,
  },
  {
    id: "privacy-commitment",
    title: "41. Our Privacy Commitment",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    content: `MessBee believes that digital growth should be supported by responsible data practices. Our approach is built around:

• Transparency
• Responsible Data Use
• Security
• Customer Choice
• Privacy Compliance
• Responsible Technology

We aim to help businesses build stronger digital relationships while respecting applicable privacy requirements and the rights of individuals.`,
  },
];

const PrivacyPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("introduction");
  const [scrolled, setScrolled] = useState(false);
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);
  const mobileTocRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileTocRef.current && !mobileTocRef.current.contains(e.target)) {
        setIsMobileTocOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const mobileTocEl = document.querySelector(".mobile-toc-wrapper");
      const isMobileTocVisible = mobileTocEl && window.getComputedStyle(mobileTocEl).display !== "none";
      const offset = isMobileTocVisible ? 485 : 95;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="privacy-page-wrapper" style={{ fontFamily: "'Inter', sans-serif", background: "#FFFFFF", color: "#0F172A", overflowX: "clip", minHeight: "100vh" }}>
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none !important;
        }
        .no-scrollbar {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
        .privacy-container {
          display: flex;
          gap: 60px;
          align-items: flex-start;
        }
        .privacy-sidebar {
          width: 320px;
          flex-shrink: 0;
          position: sticky;
          top: 95px;
          z-index: 10;
          background: #F8FAFC;
          border: 1px solid #E5E7EB;
          border-radius: 16px;
          padding: 20px;
          max-height: calc(100vh - 130px);
          overflow-y: auto;
        }
        .toc-item {
          font-size: 13px;
          font-weight: 500;
          color: #475569;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
          display: block;
          padding: 6px 12px;
          line-height: 1.4;
          border-left: 2px solid transparent;
          border-radius: 0 6px 6px 0;
          margin-bottom: 2px;
          text-align: left;
        }
        .toc-item:hover {
          color: #16A34A;
          background: rgba(22, 163, 74, 0.04);
          border-left-color: rgba(22, 163, 74, 0.3);
          padding-left: 16px;
        }
        .toc-item.active {
          font-weight: 700;
          color: #16A34A;
          background: rgba(22, 163, 74, 0.08);
          border-left-color: #16A34A;
          padding-left: 16px;
        }
        .mobile-toc-wrapper {
          display: none !important;
        }
        /* ── STANDARDIZED RESPONSIVE TYPOGRAPHY & PADDING ── */
        @media (max-width: 1366px) {
          .privacy-container {
            gap: 32px !important;
          }
          .privacy-sidebar {
            width: 270px !important;
            padding: 16px !important;
            max-height: calc(100vh - 120px) !important;
          }
          .privacy-page-wrapper section {
            padding-left: 5% !important;
            padding-right: 5% !important;
          }
          .privacy-page-wrapper h1 {
            font-size: clamp(24px, 2.8vw, 38px) !important;
          }
          .privacy-page-wrapper h2 {
            font-size: clamp(20px, 2.4vw, 28px) !important;
          }
          .privacy-page-wrapper h3 {
            font-size: 15px !important;
          }
          .privacy-page-wrapper p {
            font-size: 13.5px !important;
            line-height: 1.65 !important;
          }
        }
        @media (max-width: 1299px) {
          .privacy-page-wrapper section {
            padding-left: 4% !important;
            padding-right: 4% !important;
          }
          .privacy-page-wrapper h1 {
            font-size: clamp(22px, 2.6vw, 34px) !important;
          }
          .privacy-page-wrapper h2 {
            font-size: clamp(18px, 2.2vw, 25px) !important;
          }
          .privacy-page-wrapper h3 {
            font-size: 14.5px !important;
          }
          .privacy-page-wrapper p {
            font-size: 13px !important;
            line-height: 1.6 !important;
          }
        }
        @media (max-width: 768px) {
          .privacy-page-wrapper section:first-of-type {
            padding-top: 100px !important;
            padding-bottom: 20px !important;
          }
          .privacy-page-wrapper section:nth-of-type(2) {
            padding-top: 20px !important;
            padding-bottom: 30px !important;
          }
          .privacy-sidebar {
            display: none !important;
          }
          .privacy-container {
            gap: 0 !important;
          }
          .mobile-toc-wrapper {
            display: block !important;
            position: sticky;
            top: 70px;
            z-index: 25;
            margin-bottom: 16px !important;
            width: calc(100% + 32px) !important;
            margin-left: -16px !important;
            margin-right: -16px !important;
          }
          .mobile-toc-wrapper > div {
            border: 1px solid #E2E8F0 !important;
            border-left: none !important;
            border-right: none !important;
            border-radius: 0 !important;
          }
          .privacy-page-wrapper article > div:first-child {
            margin-bottom: 16px !important;
          }
          .privacy-page-wrapper article > div[id] {
            scroll-margin-top: 165px !important;
            padding: 20px 16px !important;
            margin-bottom: 14px !important;
          }
          .privacy-page-wrapper section {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
          .privacy-page-wrapper h1 {
            font-size: clamp(24px, 6vw, 36px) !important;
            letter-spacing: -0.5px !important;
            line-height: 1.25 !important;
            word-spacing: 2px !important;
            margin-bottom: 12px !important;
          }
          .privacy-page-wrapper h2 {
            font-size: clamp(17px, 2vw, 22px) !important;
          }
          .privacy-page-wrapper h3 {
            font-size: 13.5px !important;
          }
          .privacy-page-wrapper p {
            font-size: 12.5px !important;
          }
        }
      `}</style>
      {/* ═══ NAVBAR ═══ */}
      <Navbar />

      {/* ═══ HERO BANNER ═══ */}
      <section style={{
        background: "#FFFFFF",
        paddingTop: 130,
        paddingBottom: 35,
        paddingLeft: "6%",
        paddingRight: "6%",
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid #F1F5F9",
      }}>
        {/* Subtle green radial glow */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle at 18% 55%, rgba(22,163,74,0.06) 0%, transparent 50%), radial-gradient(circle at 82% 20%, rgba(22,163,74,0.04) 0%, transparent 40%)",
          pointerEvents: "none",
        }} />
        {/* Fine dot grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle, #CBD5E1 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.4,
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 40, padding: "6px 16px", marginBottom: 24 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#16A34A"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#16A34A", letterSpacing: "0.3px" }}>Your Data. Our Responsibility.</span>
          </div>

          {/* Heading */}
          <h1 style={{ fontSize: "clamp(35px, 2.9vw, 62px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-2px", lineHeight: 1.08, marginBottom: 20 }}>
            Privacy <span style={{ color: "#16A34A" }}>Policy</span>
          </h1>

          {/* Green accent divider */}
          <div style={{ width: 48, height: 4, background: "linear-gradient(90deg, #16A34A, #4ADE80)", borderRadius: 4, marginBottom: 24 }} />

          {/* Description */}
          <p style={{ fontSize: 17, color: "#475569", lineHeight: 1.75, maxWidth: 1060, margin: 0 }}>
            We take your privacy seriously. Learn how MessBee collects, uses and protects your personal information to keep your data safe.
          </p>
        </div>
      </section>

      {/* ═══ MAIN CONTENT ═══ */}
      <section style={{ padding: "50px 6%", background: "#FFFFFF" }}>
        <div className="privacy-container" style={{ maxWidth: 1380, margin: "0 auto" }}>

          {/* ── Sticky Table of Contents ── */}
          <aside className="privacy-sidebar no-scrollbar">
            <div style={{
              position: "sticky",
              top: -20,
              marginTop: -20,
              marginLeft: -20,
              marginRight: -20,
              padding: "16px 20px 12px 20px",
              background: "#F8FAFC",
              borderBottom: "1px solid #E2E8F0",
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              zIndex: 10,
              fontSize: 11,
              fontWeight: 800,
              color: "#16A34A",
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginBottom: 10,
            }}>
              Table of Contents
            </div>
            <nav style={{ display: "flex", flexDirection: "column" }}>
              {sections.map((s) => (
                <span key={s.id}
                  className={`toc-item${activeSection === s.id ? " active" : ""}`}
                  onClick={() => scrollToSection(s.id)}>
                  {s.title}
                </span>
              ))}
            </nav>

            {/* Data safety badge */}
            <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid #E5E7EB" }}>
              <div style={{ background: "linear-gradient(135deg, #F0FDF4, #ECFDF5)", border: "1px solid #D1FAE5", borderRadius: 10, padding: "14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#16A34A"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#065F46" }}>Data Protection</span>
                </div>
                <p style={{ fontSize: 11, color: "#047857", lineHeight: 1.5, margin: 0 }}>
                  DPDP Act 2023 · Indian servers · Encryption at rest
                </p>
              </div>
            </div>
          </aside>

          {/* ── Article Body ── */}
          <article style={{ flex: 1, minWidth: 0 }}>
            {/* Quick summary highlight */}
            <div style={{
              background: "linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 100%)",
              border: "1px solid #D1FAE5",
              borderLeft: "4px solid #16A34A",
              borderRadius: 12,
              padding: "20px 24px",
              marginBottom: 28,
            }}>
              <p style={{ fontSize: 14, color: "#065F46", lineHeight: 1.7, fontWeight: 500, margin: 0 }}>
                <strong>In plain language:</strong> We collect only what we need to run MessBee. We don&apos;t sell your data. We secure your information in compliance with Indian laws, including the Digital Personal Data Protection (DPDP) Act, 2023. This policy explains everything in full detail below.
              </p>
            </div>

            {/* ── Mobile Table of Contents Menu (Custom Responsive Selector) ── */}
            <div className="mobile-toc-wrapper" ref={mobileTocRef}>
              <div style={{
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: 16,
                padding: "12px 16px",
                boxShadow: "0 4px 18px rgba(15, 23, 42, 0.06)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                transition: "none",
              }}>
                {/* Header / Current selection row */}
                <div
                  onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0, flex: 1 }}>
                    <div style={{
                      width: 32,
                      height: 32,
                      borderRadius: 10,
                      background: "rgba(22, 163, 74, 0.12)",
                      color: "#16A34A",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
                      </svg>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", minWidth: 0, flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 10, fontWeight: 800, color: "#16A34A", textTransform: "uppercase", letterSpacing: "0.8px" }}>
                          Table of Contents
                        </span>
                        <span style={{ fontSize: 10, fontWeight: 700, color: "#15803D", background: "#DCFCE7", padding: "1px 7px", borderRadius: 10 }}>
                          {sections.findIndex(s => s.id === activeSection) + 1} of {sections.length}
                        </span>
                      </div>
                      <span style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#0F172A",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        marginTop: 1,
                        fontFamily: "'Inter', sans-serif"
                      }}>
                        {sections.find(s => s.id === activeSection)?.title || sections[0].title}
                      </span>
                    </div>
                  </div>

                  <div style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    background: isMobileTocOpen ? "#F0FDF4" : "#F1F5F9",
                    color: isMobileTocOpen ? "#16A34A" : "#64748B",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginLeft: 8,
                    transition: "transform 0.25s ease, background 0.2s ease",
                    transform: isMobileTocOpen ? "rotate(180deg)" : "rotate(0deg)"
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>

                {/* Dropdown Options List */}
                {isMobileTocOpen && (
                  <div style={{
                    marginTop: 12,
                    paddingTop: 12,
                    borderTop: "1px solid #E2E8F0",
                    maxHeight: "340px",
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                  }}
                  className="no-scrollbar"
                  >
                    {sections.map((s, idx) => {
                      const isActive = activeSection === s.id;
                      return (
                        <div
                          key={s.id}
                          onClick={() => {
                            scrollToSection(s.id);
                            setIsMobileTocOpen(false);
                          }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "10px 12px",
                            borderRadius: 10,
                            background: isActive ? "rgba(22, 163, 74, 0.1)" : "transparent",
                            color: isActive ? "#16A34A" : "#334155",
                            fontWeight: isActive ? 700 : 500,
                            fontSize: 13.5,
                            cursor: "pointer",
                            transition: "all 0.15s ease",
                            borderLeft: isActive ? "3px solid #16A34A" : "3px solid transparent"
                          }}
                        >
                          <span style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: isActive ? "#16A34A" : "#94A3B8",
                            width: 22,
                            textAlign: "right",
                            flexShrink: 0
                          }}>
                            {idx + 1}.
                          </span>
                          <span style={{ flex: 1, lineHeight: 1.35 }}>
                            {s.title.replace(/^\d+\.\s*/, '')}
                          </span>
                          {isActive && (
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {sections.map((s, i) => (
              <div
                key={s.id}
                id={s.id}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: 16,
                  padding: 32,
                  marginBottom: 26,
                  boxShadow: "0 4px 12px rgba(15, 23, 42, 0.01)",
                  textAlign: "left",
                  scrollMarginTop: "95px"
                }}
                onMouseEnter={() => setActiveSection(s.id)}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "rgba(22, 163, 74, 0.08)",
                  color: "#16A34A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20
                }}>{s.icon}</div>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 16, letterSpacing: "-0.3px", fontFamily: "'Inter', sans-serif" }}>
                  {s.title}
                </h2>
                <p style={{ fontSize: 14.5, color: "#4B5563", lineHeight: 1.85, whiteSpace: "pre-line", margin: 0, fontFamily: "'Inter', sans-serif" }}>
                  {s.content}
                </p>
              </div>
            ))}

            {/* CTA box */}

          </article>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <Footer />

    </div>
  );
};

export default PrivacyPage;
