import Navbar from "../Navbar";
import React, { useState, useEffect, useRef } from "react";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";

const sections = [
  {
    id: "introduction",
    title: "1. Introduction",
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
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    content: `Welcome to MessBee, India's Digital Business Operating System. These Terms & Conditions govern your access to and use of the MessBee website, applications, software, platform, APIs and related services. MessBee is operated by: MessBee.

By registering for, accessing or using MessBee, you agree to these Terms and the policies referenced in them. If you do not agree with these Terms, you must not access or use MessBee. If you are using MessBee on behalf of a company, organization or other legal entity, you represent that you have the authority to bind that entity to these Terms.`,
  },
  {
    id: "about-messbee",
    title: "2. About MessBee",
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
        <polygon points="12 8 8 12 12 16 16 12 12 8" />
      </svg>
    ),
    content: `MessBee is a cloud-based digital business platform designed to help businesses manage customer communication, CRM, WhatsApp Business communication and commerce, digital storefronts, AI-assisted customer engagement, marketing automation, lead management, orders, payments, inventory, loyalty, analytics, Business Library, team management, multi-location operations and other digital business workflows.

MessBee may support integrations with third-party services, including the WhatsApp Business Platform provided by Meta, email services, SMS providers, payment gateways, cloud infrastructure providers, analytics services and other supported technologies.

The availability of particular features may depend on:
• Your subscription plan;
• Business configuration;
• Technical availability;
• Third-party services;
• Applicable laws;
• Platform policies; and
• Product changes.`,
  },
  {
    id: "eligibility",
    title: "3. Eligibility",
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
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <polyline points="16 11 18 13 22 9" />
      </svg>
    ),
    content: `To use MessBee, you must:
• Be legally capable of entering into a binding agreement under applicable law;
• Provide accurate and current information;
• Have authority to use MessBee on behalf of your organization, where applicable;
• Use the platform for lawful purposes; and
• Comply with these Terms and all applicable policies.

If you are using MessBee on behalf of an organization, you are responsible for ensuring that you have the necessary authority to do so.`,
  },
  {
    id: "account-registration",
    title: "4. Account Registration",
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
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    content: `Certain MessBee features require an account. When creating an account, you agree to provide information that is accurate, complete and current. You are responsible for:

• Maintaining the confidentiality of your login credentials;
• Protecting account access;
• Maintaining accurate account information;
• Controlling access by your employees and authorized users;
• Monitoring activity under your account; and
• Immediately notifying MessBee of suspected unauthorized access.

You are responsible for activities performed through your account unless caused by circumstances for which you are not legally responsible. MessBee may restrict or suspend an account containing false, misleading, fraudulent or materially incomplete information.`,
  },
  {
    id: "business-users",
    title: "5. Business Users & Administrators",
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
    content: `Business Customers may allow employees, representatives or other authorized users to access MessBee. The Business Customer is responsible for:

• Assigning appropriate users;
• Managing roles and permissions;
• Maintaining account security;
• Removing former or unauthorized users;
• Ensuring authorized use of the platform; and
• Ensuring that users comply with these Terms.

Actions performed by authorized users may be treated as actions of the Business Customer.`,
  },
  {
    id: "messbee-services",
    title: "6. MessBee Services",
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
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
    content: `Subject to your applicable plan and agreement, MessBee may provide functionality including:

• Customer Relationship Management (CRM);
• WhatsApp Business communication;
• WhatsApp Commerce;
• Digital storefronts;
• AI-assisted customer engagement;
• Marketing automation;
• Lead management;
• Customer journeys;
• Orders;
• Payment-related workflows;
• Inventory;
• Loyalty programs;
• Analytics;
• Business Library;
• Team management;
• Multi-location management;
• API integrations;
• No-code automation; and
• Other features introduced by MessBee.

Not every feature is necessarily available to every user, plan, region or account. MessBee may introduce, modify, replace or discontinue features from time to time.`,
  },
  {
    id: "saas-model",
    title: "7. SaaS Service Model",
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
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    ),
    content: `MessBee is generally provided as a Software-as-a-Service ("SaaS") platform. Unless expressly agreed otherwise in writing:

• You receive a limited right to access the service during your applicable subscription period;
• You do not acquire ownership of MessBee software;
• You may not resell or redistribute MessBee services without authorization;
• Access may depend on payment of applicable fees; and
• Service availability may depend on third-party platforms and infrastructure.`,
  },
  {
    id: "customer-data",
    title: "8. Customer Data",
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
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    content: `Business Customers may submit information to MessBee in connection with their use of the platform. This may include:

• Customer information;
• Contact details;
• Messages;
• Conversation history;
• Leads;
• Orders;
• Product information;
• Business information;
• Documents;
• Images;
• Videos;
• Marketing content;
• Customer preferences; and
• Other business data.

The Business Customer remains responsible for ensuring that it has the necessary rights, authority, lawful basis, notices and permissions to collect, use and provide such information to MessBee. MessBee's processing of personal data is additionally governed by the MessBee Privacy Policy and, where applicable, a Data Processing Agreement (DPA).`,
  },
  {
    id: "communication-permissions",
    title: "9. Customer Consent & Communication Permissions",
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
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    content: `If you use MessBee to communicate with customers, you are responsible for obtaining and maintaining any required:

• Consent;
• Opt-in;
• Authorization;
• Notice;
• Preference; or
• Other lawful basis required under applicable law and platform policies.

You must respect customer requests to stop or modify communications. You must not use MessBee to send communications to individuals where you do not have the necessary legal or platform authorization.`,
  },
  {
    id: "whatsapp-compliance",
    title: "10. WhatsApp & Meta Compliance",
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
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
    content: `MessBee may provide access to or integration with the WhatsApp Business Platform and other Meta services. Your use of WhatsApp-related functionality is subject to:

• These Terms;
• MessBee policies;
• Meta terms;
• WhatsApp Business Platform requirements;
• Applicable messaging policies;
• Applicable commerce policies; and
• Applicable Indian laws and regulations.

You agree not to use MessBee to:
• Send spam;
• Send unsolicited communications;
• Circumvent WhatsApp or Meta controls;
• Mislead customers;
• Engage in fraud;
• Distribute prohibited content;
• Abuse messaging systems;
• Attempt unauthorized access;
• Manipulate platform systems; or
• Violate applicable Meta policies.

Meta may independently impose restrictions, limits, suspension or termination on WhatsApp or other Meta services. MessBee does not control Meta's independent decisions. MessBee's integration with Meta or WhatsApp does not by itself mean that Meta endorses, sponsors or certifies MessBee. Any specific Meta partnership, technology-provider or authorization status will be represented only according to the applicable official Meta documentation or agreement.`,
  },
  {
    id: "messaging-responsibility",
    title: "11. Messaging Responsibility",
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
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
    content: `MessBee provides technology for business communication. MessBee does not determine:
• Who you contact;
• What you communicate;
• What products or services you promote;
• Whether a customer has provided valid consent;
• Whether your content is legally compliant; or
• Whether your business practices comply with sector-specific regulations.

You remain responsible for your communications and campaigns. You must comply with all applicable laws relating to advertising, consumer protection, privacy, telecommunications, marketing and electronic communication.`,
  },
  {
    id: "prohibited-uses",
    title: "12. Prohibited Uses",
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
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      </svg>
    ),
    content: `You must not use MessBee to:

Illegal Activities:
• Violate applicable law;
• Facilitate criminal activity;
• Promote unlawful transactions;
• Evade regulatory requirements.

Spam & Abuse:
• Send unsolicited bulk messages;
• Send repeated unwanted communications;
• Circumvent opt-out mechanisms;
• Use purchased or unlawfully obtained contact lists.

Fraud & Deception:
• Impersonate another person or organization;
• Conduct scams;
• Misrepresent products or services;
• Engage in deceptive marketing;
• Phishing or credential theft.

Security Abuse:
• Attempt unauthorized access;
• Introduce malware;
• Attack or disrupt systems;
• Probe or bypass security controls;
• Reverse engineer security mechanisms.

Intellectual Property Abuse:
• Upload infringing material;
• Use trademarks without authorization;
• Distribute copyrighted material unlawfully;
• Violate third-party intellectual-property rights.

Harmful Content:
You must not use MessBee to distribute content that is unlawful, fraudulent, threatening, abusive, exploitative or otherwise prohibited by applicable law or MessBee policies.`,
  },
  {
    id: "uploaded-content",
    title: "13. Business Library & Uploaded Content",
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
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
    content: `MessBee may provide a Business Library for storing and organizing supported digital assets. You may upload content such as:

• Product images;
• Videos;
• Brochures;
• Documents;
• Catalogues;
• Marketing creatives;
• Price lists;
• Menus;
• Training material; and
• Other supported files.

You are responsible for ensuring that you have the necessary rights to upload and use such content. You must not upload content that:
• Infringes intellectual-property rights;
• Violates privacy rights;
• Contains unlawful material;
• Violates confidentiality obligations;
• Contains malicious software; or
• Violates MessBee or third-party policies.

MessBee may remove or restrict access to content where reasonably necessary to comply with law, security requirements or applicable policies.`,
  },
  {
    id: "ai-features",
    title: "14. AI Features",
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
        <path d="M12 2v9" />
        <path d="M8 5h8" />
      </svg>
    ),
    content: `MessBee may provide AI-assisted functionality. AI features may assist with:

• Customer enquiries;
• FAQs;
• Product recommendations;
• Service information;
• Lead assistance;
• Customer support;
• Business workflows;
• Content-related tasks;
• Reports and summaries; and
• Other supported activities.

AI-generated outputs may be incomplete, inaccurate or inappropriate in some circumstances. You are responsible for reviewing AI-generated outputs before relying on them for material business decisions. MessBee's AI features should not be treated as a substitute for qualified legal, medical, financial, accounting or other professional advice.`,
  },
  {
    id: "automated-workflows",
    title: "15. Automated Workflows",
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
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
      </svg>
    ),
    content: `MessBee may allow users to create automated workflows. These may include:

• Lead follow-ups;
• Customer notifications;
• Appointment reminders;
• Order updates;
• Marketing campaigns;
• Customer re-engagement;
• Loyalty communications;
• Internal notifications;
• Support escalation; and
• Other business workflows.

You are responsible for configuring automation appropriately. You must ensure that automated communications comply with applicable law, customer permissions and platform policies. MessBee is not responsible for consequences caused by incorrectly configured user workflows, inaccurate business information or unauthorized automation.`,
  },
  {
    id: "digital-store",
    title: "16. Digital Store & Commerce",
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
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    content: `MessBee may provide digital storefront and commerce functionality. Business Customers are solely responsible for:

• Product descriptions;
• Product pricing;
• Availability;
• Taxes;
• Shipping;
• Returns;
• Refunds;
• Warranties;
• Customer service;
• Product legality; and
• Compliance with applicable consumer and e-commerce laws.

MessBee does not become the seller of products or services merely because it provides technology for displaying or processing business information. Unless expressly agreed otherwise, the contract for sale of a product or service is between the Business Customer and its customer.`,
  },
  {
    id: "orders-payments",
    title: "17. Orders & Payments",
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
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    content: `MessBee may provide functionality for order and payment-related workflows. Payment processing may be provided through third-party payment gateways. MessBee does not necessarily process or hold customer funds unless expressly stated for a particular service.

Business Customers remain responsible for:
• Correct pricing;
• Applicable taxes;
• Invoices;
• Refunds;
• Order fulfilment;
• Customer disputes;
• Payment-related obligations; and
• Compliance with applicable laws.

Third-party payment providers may impose their own terms, fees, restrictions and requirements.`,
  },
  {
    id: "subscription-plans",
    title: "18. Subscription Plans & Fees",
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
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    content: `MessBee may offer:
• Subscription plans;
• Prepaid services;
• Usage-based services;
• Add-ons;
• Platform fees;
• Communication charges; and
• Other paid features.

Applicable pricing will be displayed or communicated before purchase or activation, subject to applicable terms. Fees may include third-party charges, such as charges imposed by Meta, communication providers, payment providers or other integrated services.

Applicable taxes, including GST where applicable, may be charged in addition to listed prices unless otherwise stated.`,
  },
  {
    id: "billing",
    title: "19. Billing",
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
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    content: `Depending on your selected plan, billing may be:
• Monthly;
• Annual;
• Prepaid;
• Usage-based; or
• Otherwise specified at purchase.

You authorize MessBee or its authorized payment provider to process applicable charges according to the selected billing arrangement. You are responsible for providing accurate billing information. Failure to make payment may result in suspension or restriction of paid services.`,
  },
  {
    id: "refunds-cancellations",
    title: "20. Refunds & Cancellations",
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
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    ),
    content: `Refunds, cancellations, credits and related matters are governed by the MessBee Refund & Cancellation Policy. Unless expressly stated in that policy or required by applicable law, fees already paid may not be refundable.

Third-party communication or platform charges may be subject to separate rules and may not be refundable.`,
  },
  {
    id: "third-party",
    title: "21. Third-Party Services",
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
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
    content: `MessBee may integrate with third-party services, including:
• Meta and WhatsApp Business Platform;
• Email providers;
• SMS providers;
• Payment gateways;
• Cloud infrastructure;
• Analytics providers;
• Authentication services;
• Other APIs and software services.

Third-party services are independently operated. MessBee does not control third-party:
• Availability;
• Policies;
• Pricing;
• Features;
• API changes;
• Account decisions;
• Message delivery;
• Service restrictions; or
• Security practices.

Your use of third-party services may be subject to separate terms.`,
  },
  {
    id: "whatsapp-delivery",
    title: "22. WhatsApp Message Delivery",
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
        <path d="M22 2L11 13" />
        <polyline points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
    ),
    content: `MessBee does not guarantee delivery of every WhatsApp message or communication. Delivery may be affected by:
• Meta systems;
• WhatsApp policies;
• Customer availability;
• Customer settings;
• Template approval;
• Quality or messaging limits;
• Network conditions;
• Business account restrictions;
• Platform outages; or
• Other technical factors.

MessBee is not responsible for delivery failures caused by third-party platforms or circumstances outside MessBee's reasonable control.`,
  },
  {
    id: "platform-availability",
    title: "23. Platform Availability",
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
    content: `MessBee aims to provide reliable services but does not guarantee uninterrupted or error-free availability. Service may be temporarily unavailable due to:

• Maintenance;
• Upgrades;
• Security measures;
• Technical failures;
• Network issues;
• Infrastructure problems;
• Third-party outages;
• Cybersecurity incidents;
• Regulatory requirements; or
• Events beyond our reasonable control.

Where reasonably practicable, MessBee may provide advance notice of planned maintenance.`,
  },
  {
    id: "changes-to-services",
    title: "24. Changes to Services",
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
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    content: `MessBee may modify, improve, add, remove or discontinue features. Changes may be made to:
• Functionality;
• User interfaces;
• APIs;
• Integrations;
• Pricing;
• Plans;
• Technical requirements; or
• Service availability.

Where a material change substantially affects a paid service, MessBee may provide reasonable notice where appropriate.`,
  },
  {
    id: "intellectual-property",
    title: "25. Intellectual Property",
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
    content: `MessBee and its licensors retain all rights, title and interest in:
• MessBee software;
• Website;
• Applications;
• Platform technology;
• Source code;
• Interfaces;
• Designs;
• Logos;
• Trademarks;
• Documentation;
• Branding;
• Platform content; and
• Other proprietary materials.

Nothing in these Terms transfers ownership of MessBee intellectual property to you.`,
  },
  {
    id: "limited-license",
    title: "26. Limited License to Use MessBee",
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
    content: `Subject to these Terms and payment of applicable fees, MessBee grants you a limited, non-exclusive, non-transferable and revocable right to access and use the services for your internal business purposes. You must not:

• Copy MessBee software;
• Resell MessBee without authorization;
• Lease or sublicense the service;
• Reverse engineer the platform except where expressly permitted by applicable law;
• Attempt to extract source code;
• Remove proprietary notices;
• Build unauthorized competing services using MessBee proprietary materials; or
• Use MessBee intellectual property without authorization.`,
  },
  {
    id: "your-content",
    title: "27. Your Content",
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
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    content: `You retain your rights in content and business information that you lawfully submit to MessBee. You grant MessBee the limited rights necessary to host, process, transmit, display and otherwise use such content solely to provide and operate the services, subject to the applicable agreement and Privacy Policy.

You represent that you have the necessary rights and permissions for content you submit.`,
  },
  {
    id: "feedback",
    title: "28. Feedback",
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
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
    content: `If you provide suggestions, ideas, recommendations or feedback regarding MessBee, you agree that MessBee may use such feedback to improve its products and services without creating an obligation to compensate you, unless otherwise agreed in writing.`,
  },
  {
    id: "confidentiality",
    title: "29. Confidentiality",
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
    content: `Each party may receive confidential information from the other. The receiving party shall use reasonable care to protect confidential information and shall not disclose it except:
• To authorized personnel or service providers who need it;
• As required to provide the services;
• Where required by law; or
• Where otherwise authorized.

Confidentiality obligations do not apply to information that is publicly available through no fault of the receiving party, independently developed, lawfully received from another source, or required to be disclosed by law. Business Customers requiring additional confidentiality protections may enter into a separate agreement where applicable.`,
  },
  {
    id: "privacy-protection",
    title: "30. Privacy & Data Protection",
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
    content: `Use of MessBee is also governed by the MessBee Privacy Policy. Where applicable, the Privacy Policy explains how MessBee collects, uses, stores, shares and protects personal data.

Business Customers may also be required to enter into a Data Processing Agreement (DPA) depending on the services used and the nature of the processing.`,
  },
  {
    id: "security",
    title: "31. Security",
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
    content: `Users must not attempt to compromise the security of MessBee. Prohibited activities include:
• Unauthorized penetration testing;
• Vulnerability exploitation without authorization;
• Credential attacks;
• Malware distribution;
• Denial-of-service attacks;
• Unauthorized system access; and
• Circumvention of security controls.

If you identify a security vulnerability, you should report it through the appropriate MessBee security contact or support channel.`,
  },
  {
    id: "suspension-restriction",
    title: "32. Suspension & Restriction",
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
        <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    content: `MessBee may suspend, restrict or limit access to an account where reasonably necessary, including where:

• These Terms are violated;
• A MessBee policy is violated;
• Spam is detected;
• Fraud is suspected;
• Illegal activity is suspected;
• Account security is at risk;
• Payment obligations are overdue;
• Third-party platform requirements are violated;
• Meta or another provider restricts the relevant service;
• Required by law or regulatory authority; or
• Continued access presents a security or operational risk.

Where reasonably practicable and legally permitted, MessBee may provide notice and an opportunity to resolve the issue. Immediate action may be taken where necessary to protect users, systems, third parties or comply with legal/platform requirements.`,
  },
  {
    id: "termination",
    title: "33. Termination",
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
    content: `You may terminate your MessBee account according to the applicable subscription and cancellation process. MessBee may terminate or suspend access where permitted under these Terms.

Upon termination:
• Your right to use the service ends;
• Outstanding fees may remain payable;
• Certain provisions intended to survive termination will continue;
• Data may be handled according to the Privacy Policy, DPA and applicable retention requirements.`,
  },
  {
    id: "effect-of-termination",
    title: "34. Effect of Termination",
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
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    content: `Termination does not automatically release either party from obligations accrued before termination. Sections concerning:

• Intellectual property;
• Confidentiality;
• Payment obligations;
• Indemnification;
• Limitation of liability;
• Dispute resolution;
• Governing law; and
• Other provisions that by their nature should survive will continue after termination to the extent legally applicable.`,
  },
  {
    id: "disclaimer",
    title: "35. Disclaimer of Warranties",
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
    content: `To the maximum extent permitted by applicable law, MessBee services are provided on an "as available" and, where applicable, "as is" basis. MessBee does not guarantee that:

• The platform will always be available;
• Services will be error-free;
• Every message will be delivered;
• Third-party integrations will remain available;
• AI-generated content will always be accurate;
• Business results will increase;
• Leads or sales will be generated;
• The service will meet every specific business requirement; or
• Third-party platforms will maintain their current features, policies or pricing.

Nothing in these Terms excludes warranties or rights that cannot legally be excluded under applicable law.`,
  },
  {
    id: "business-results",
    title: "36. Business Results",
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
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
    content: `MessBee provides technology and tools. MessBee does not guarantee:
• A specific number of leads;
• Sales;
• Revenue;
• Customer retention;
• Marketing performance;
• Conversion rates;
• Advertising results; or
• Return on investment.

Business outcomes depend on factors including customer demand, pricing, content, business operations, market conditions and third-party platforms.`,
  },
  {
    id: "limitation-of-liability",
    title: "37. Limitation of Liability",
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
        <rect x="2" y="5" width="20" height="14" rx="2" ry="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
    content: `To the maximum extent permitted by applicable law, MessBee shall not be liable for indirect, incidental, special, consequential or punitive damages arising from or relating to use of the services. This may include, where legally permissible:

• Loss of profits;
• Loss of revenue;
• Loss of business opportunities;
• Loss of goodwill;
• Business interruption;
• Third-party platform failures;
• Messaging failures;
• Data-related losses; or
• Consequential damages.

Where liability cannot legally be excluded, it will be limited to the extent permitted by applicable law. Subject to applicable law, the aggregate liability of MessBee arising from a paid service will not exceed the amount actually paid by the relevant customer to MessBee for that service during the twelve months immediately preceding the event giving rise to the claim. Nothing in these Terms excludes liability that cannot lawfully be excluded or limited.`,
  },
  {
    id: "indemnification",
    title: "38. Indemnification",
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
    content: `To the extent permitted by applicable law, you agree to defend, indemnify and hold harmless MessBee, and their respective officers, employees and representatives from claims, losses, liabilities, damages and reasonable expenses arising from:

• Your misuse of MessBee;
• Your violation of these Terms;
• Your violation of applicable laws;
• Your violation of Meta or third-party platform policies;
• Your unauthorized communications;
• Your infringement of third-party rights;
• Your products or services;
• Your customer disputes; or
• Content submitted by you.

This provision does not apply to the extent a claim results from MessBee's own breach, negligence or misconduct, where such limitation is not permitted by law.`,
  },
  {
    id: "force-majeure",
    title: "39. Force Majeure",
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
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    ),
    content: `MessBee will not be responsible for delay or failure caused by circumstances beyond its reasonable control, including:

• Natural disasters;
• Floods;
• Fire;
• Earthquakes;
• War;
• Terrorism;
• Government action;
• Regulatory restrictions;
• Internet failures;
• Telecommunications failures;
• Cloud infrastructure failures;
• Cybersecurity incidents;
• Power failures;
• Third-party platform outages; or
• Other events beyond reasonable control.`,
  },
  {
    id: "notices",
    title: "40. Notices",
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
    content: `MessBee may provide notices through:
• Email;
• Platform notifications;
• Account dashboards;
• Website notices; or
• Other reasonable electronic methods.

You are responsible for keeping your contact information current.`,
  },
  {
    id: "changes-to-terms",
    title: "41. Changes to These Terms",
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
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    content: `MessBee may update these Terms from time to time. Changes may be made to reflect:
• New services;
• Changes in technology;
• Legal requirements;
• Regulatory requirements;
• Third-party platform changes;
• Pricing or business changes; or
• Improvements to MessBee.

The updated Terms will include a revised effective date. Where required, material changes may be communicated through appropriate channels.

Continued use of MessBee after the effective date of updated Terms may constitute acceptance of the revised Terms, to the extent permitted by applicable law. If you do not agree to material changes, you should discontinue use of the affected service.`,
  },
  {
    id: "governing-law",
    title: "42. Governing Law",
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
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    ),
    content: `These Terms are governed by the laws of India. Subject to applicable law, disputes arising from or relating to these Terms or the services shall be subject to the jurisdiction of the competent courts in Ghaziabad, Uttar Pradesh, India.

Nothing in this clause prevents a party from seeking urgent or legally available interim relief from a competent court.`,
  },
  {
    id: "grievance-support",
    title: "43. Grievance & Support",
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
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <line x1="9" y1="10" x2="15" y2="10" />
        <line x1="9" y1="14" x2="13" y2="14" />
      </svg>
    ),
    content: `For questions, complaints or concerns regarding MessBee services or these Terms, contact:

MessBee Support & Grievance Team
Email: support@messbee.com
Address: 510A, Devika Tower, Chander Nagar, Ghaziabad, Uttar Pradesh – 201011, India

For legal or compliance matters, please mention:
Subject: Legal / Compliance Request – MessBee`,
  },
  {
    id: "entire-agreement",
    title: "44. Entire Agreement",
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
    content: `These Terms, together with the applicable:
• Privacy Policy;
• Refund & Cancellation Policy;
• Data Processing Agreement;
• Acceptable Use Policy;
• Anti-Spam Policy;
• WhatsApp Business Messaging Policy;
• Cookie Policy;
• Order Forms;
• Subscription terms; and
• Other agreements expressly incorporated by reference constitute the applicable agreement governing your use of MessBee.

If there is a conflict between these Terms and a separately executed written agreement, the separately executed agreement will govern to the extent of the conflict.`,
  },
  {
    id: "severability",
    title: "45. Severability",
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
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    ),
    content: `If any provision of these Terms is found to be invalid, unlawful or unenforceable, that provision will be interpreted or modified to the minimum extent necessary to make it enforceable, where legally permitted. The remaining provisions will continue in full force and effect.`,
  },
  {
    id: "no-waiver",
    title: "46. No Waiver",
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
        <line x1="4" y1="4" x2="20" y2="20" />
      </svg>
    ),
    content: `Failure by MessBee to enforce any provision of these Terms does not constitute a waiver of its right to enforce that provision later.`,
  },
  {
    id: "assignment",
    title: "47. Assignment",
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
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M17 11l2 2 4-4" />
      </svg>
    ),
    content: `You may not transfer or assign your rights or obligations under these Terms without MessBee's prior written consent, except where permitted by applicable law.

MessBee may assign or transfer its rights and obligations in connection with a merger, acquisition, restructuring, corporate transaction or transfer of the relevant business, subject to applicable law.`,
  },
  {
    id: "relationship",
    title: "48. Relationship Between the Parties",
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
    content: `These Terms do not create a partnership, joint venture, employment relationship, agency relationship or franchise between you and MessBee.

MessBee provides technology services and does not become the agent, seller, employer or representative of a Business Customer unless expressly agreed in writing.`,
  },
  {
    id: "compliance-statement",
    title: "49. Compliance Statement",
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
        <polyline points="9 11 11 13 15 9" />
      </svg>
    ),
    content: `MessBee is committed to responsible technology and lawful digital communication. MessBee does not support or promote:
• Spam;
• Unsolicited messaging;
• Fraud;
• Deceptive business practices;
• Unauthorized use of personal data;
• Circumvention of Meta or WhatsApp controls;
• Unauthorized access; or
• Activities prohibited by applicable law.

Business Customers remain responsible for their own business practices, communications, content, customer relationships and compliance obligations.`,
  },
  {
    id: "acceptance",
    title: "50. Acceptance",
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
    content: `By clicking "I Agree", registering for an account, purchasing a subscription, accessing or using MessBee services, you acknowledge that:

1. You have read these Terms;
2. You understand these Terms;
3. You agree to be legally bound by these Terms;
4. You have authority to accept these Terms where acting for an organization; and
5. You agree to comply with applicable MessBee policies and applicable laws.

If you do not agree, you must not use MessBee.`,
  },
];

const renderFormattedContent = (content) => {
  if (!content) return null;
  const lines = content.split('\n');
  return lines.map((line, index) => {
    const match = line.match(/^([A-Z0-9][A-Za-z0-9\s&.–-]{1,50}:)(.*)$/);
    if (match) {
      return (
        <React.Fragment key={index}>
          <strong style={{ color: "#0F172A", fontWeight: 700, display: "inline-block", marginTop: index === 0 ? "0px" : "3px" }}>
            {match[1]}
          </strong>
          {match[2]}
          {index < lines.length - 1 && <br />}
        </React.Fragment>
      );
    }
    return (
      <React.Fragment key={index}>
        {line}
        {index < lines.length - 1 && <br />}
      </React.Fragment>
    );
  });
};

const TermsPage = () => {
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
    <div
      className="terms-page-wrapper"
      style={{
        fontFamily: "'Inter', sans-serif",
        background: "#FFFFFF",
        color: "#0F172A",
        overflowX: "clip",
        minHeight: "100vh",
      }}
    >
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none !important;
        }
        .no-scrollbar {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
        .terms-container {
          display: flex;
          gap: 60px;
          align-items: flex-start;
        }
        .terms-sidebar {
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
          .terms-container {
            gap: 32px !important;
          }
          .terms-sidebar {
            width: 270px !important;
            padding: 16px !important;
            max-height: calc(100vh - 120px) !important;
          }
          .terms-page-wrapper section {
            padding-left: 5% !important;
            padding-right: 5% !important;
          }
          .terms-page-wrapper h1 {
            font-size: clamp(24px, 2.8vw, 38px) !important;
          }
          .terms-page-wrapper h2 {
            font-size: clamp(20px, 2.4vw, 28px) !important;
          }
          .terms-page-wrapper h3 {
            font-size: 15px !important;
          }
          .terms-page-wrapper p {
            font-size: 13.5px !important;
            line-height: 1.65 !important;
          }
        }
        @media (max-width: 1299px) {
          .terms-page-wrapper section {
            padding-left: 4% !important;
            padding-right: 4% !important;
          }
          .terms-page-wrapper h1 {
            font-size: clamp(22px, 2.6vw, 34px) !important;
          }
          .terms-page-wrapper h2 {
            font-size: clamp(18px, 2.2vw, 25px) !important;
          }
          .terms-page-wrapper h3 {
            font-size: 14.5px !important;
          }
          .terms-page-wrapper p {
            font-size: 13px !important;
            line-height: 1.6 !important;
          }
        }
        @media (max-width: 1024px) {
          .terms-sidebar {
            display: none !important;
          }
          .terms-container {
            gap: 0 !important;
          }
        }
        @media (max-width: 768px) {
          .terms-page-wrapper section:first-of-type {
            padding-top: 100px !important;
            padding-bottom: 20px !important;
          }
          .terms-page-wrapper section:nth-of-type(2) {
            padding-top: 20px !important;
            padding-bottom: 30px !important;
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
          .terms-page-wrapper article > div:first-child {
            margin-bottom: 16px !important;
          }
          .terms-page-wrapper article > div[id] {
            scroll-margin-top: 485px !important;
            padding: 20px 16px !important;
            margin-bottom: 14px !important;
          }
          .terms-page-wrapper section {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
          .terms-page-wrapper h1 {
            font-size: clamp(24px, 6vw, 36px) !important;
            letter-spacing: -0.5px !important;
            line-height: 1.25 !important;
            word-spacing: 2px !important;
            margin-bottom: 12px !important;
          }
          .terms-page-wrapper h2 {
            font-size: clamp(17px, 2vw, 22px) !important;
          }
          .terms-page-wrapper h3 {
            font-size: 13.5px !important;
          }
          .terms-page-wrapper p {
            font-size: 12.5px !important;
          }
        }
      `}</style>

      {/* ═══ NAVBAR ═══ */}
      <Navbar />

      {/* ═══ HERO BANNER ═══ */}
      <section
        style={{
          background: "#FFFFFF",
          paddingTop: 130,
          paddingBottom: 35,
          paddingLeft: "6%",
          paddingRight: "6%",
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid #F1F5F9",
        }}
      >
        {/* Subtle green radial glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 18% 55%, rgba(22,163,74,0.06) 0%, transparent 50%), radial-gradient(circle at 82% 20%, rgba(22,163,74,0.04) 0%, transparent 40%)",
            pointerEvents: "none",
          }}
        />
        {/* Fine dot grid */}
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
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#16A34A">
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
              Governing Rules &amp; Terms
            </span>
          </div>

          {/* Heading */}
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
            Terms &amp;{" "}<span style={{ color: "#16A34A" }}>Conditions</span>
          </h1>

          {/* Green accent divider */}
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
              maxWidth: 860,
              margin: 0,
            }}
          >
            Please read these terms carefully before accessing MessBee. By
            utilizing our services, you agree to comply with this governing
            agreement.
          </p>
        </div>
      </section>

      {/* ═══ MAIN CONTENT ═══ */}
      <section style={{ padding: "40px 6%", background: "#FFFFFF" }}>
        <div
          className="terms-container"
          style={{ maxWidth: 1380, margin: "0 auto" }}
        >
          {/* ── Sticky Table of Contents ── */}
          <aside className="terms-sidebar no-scrollbar">
            <div
              style={{
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
              }}
            >
              Table of Contents
            </div>
            <nav style={{ display: "flex", flexDirection: "column" }}>
              {sections.map((s) => (
                <span
                  key={s.id}
                  className={`toc-item${activeSection === s.id ? " active" : ""}`}
                  onClick={() => scrollToSection(s.id)}
                >
                  {s.title}
                </span>
              ))}
            </nav>


          </aside>

          {/* ── Article Body ── */}
          <article style={{ flex: 1, minWidth: 0 }}>
            {/* Quick summary highlight */}
            <div
              style={{
                background: "linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 100%)",
                border: "1px solid #D1FAE5",
                borderLeft: "4px solid #16A34A",
                borderRadius: 12,
                padding: "20px 24px",
                marginBottom: 35,
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
                <strong>In plain language:</strong> These terms constitute a
                legal agreement between you and MessBee governing your
                subscription, account conduct, Meta WhatsApp integrations, and
                billing. Please review the 50 clauses below for complete
                details.
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
                            padding: "8px 12px",
                            borderRadius: 8,
                            background: isActive ? "#F0FDF4" : "transparent",
                            color: isActive ? "#16A34A" : "#334155",
                            fontWeight: isActive ? 700 : 500,
                            fontSize: 13,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            transition: "all 0.15s ease",
                          }}
                        >
                          <span style={{
                            display: "inline-block",
                            width: 22,
                            fontSize: 11,
                            fontWeight: 700,
                            color: isActive ? "#16A34A" : "#94A3B8",
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
                  padding: 28,
                  marginBottom: 26,
                  boxShadow: "0 4px 12px rgba(15, 23, 42, 0.01)",
                  textAlign: "left",
                  scrollMarginTop: "95px",
                }}
                onMouseEnter={() => setActiveSection(s.id)}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "rgba(22, 163, 74, 0.08)",
                    color: "#16A34A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                  }}
                >
                  {s.icon}
                </div>
                <h2
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    color: "#111827",
                    marginBottom: 16,
                    letterSpacing: "-0.3px",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {s.title}
                </h2>
                <div
                  style={{
                    fontSize: 14,
                    color: "#4B5563",
                    lineHeight: 1.6,
                    margin: 0,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {renderFormattedContent(s.content)}
                </div>
              </div>
            ))}
          </article>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <Footer />
    </div>
  );
};

export default TermsPage;
