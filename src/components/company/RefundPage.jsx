import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

/* ══════════════════════════════════════════════════════
   MessBee — Refund & Cancellation Policy Page
   34 sections — same design system as TermsPage
   ══════════════════════════════════════════════════════ */

const sections = [
  {
    id: "introduction",
    title: "1. Introduction",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>,
    content: `This Refund & Cancellation Policy ("Refund Policy") explains the terms applicable to cancellations, refunds, credits and payment-related disputes for MessBee services. MessBee is a cloud-based SaaS platform providing digital business communication, CRM, automation, marketing, commerce and related technology services.

By purchasing, subscribing to or using any paid MessBee service, you acknowledge that you have read and understood this Refund Policy. This Policy should be read together with the:
• MessBee Terms & Conditions;
• Privacy Policy;
• Data Processing Agreement, where applicable;
• Acceptable Use Policy;
• Anti-Spam Policy;
• WhatsApp Business Messaging Policy; and
• Other applicable service-specific terms.

Where applicable law provides a mandatory consumer right or remedy that cannot legally be excluded, that right will prevail over any inconsistent provision of this Policy.`,
  },
  {
    id: "nature-of-services",
    title: "2. Nature of MessBee Services",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></svg>,
    content: `MessBee provides digital and SaaS-based services that may include:
• CRM;
• WhatsApp Business communication;
• WhatsApp Business Platform integrations;
• Email communication;
• SMS services;
• Marketing automation;
• Customer engagement;
• Lead management;
• Digital storefronts;
• Business Library;
• AI-assisted features;
• Analytics;
• APIs and integrations;
• Automation workflows; and
• Other digital business services.

Certain services may be subscription-based, prepaid, usage-based or based on a combination of subscription and usage charges. Because MessBee services are primarily digital and may involve immediate activation, resource allocation and third-party platform charges, refunds are subject to the conditions described below.`,
  },
  {
    id: "subscription-payment-model",
    title: "3. Subscription & Payment Model",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>,
    content: `Depending on the service or plan selected, MessBee may offer:
• Monthly subscriptions;
• Annual subscriptions;
• Prepaid services;
• Usage-based services;
• Add-ons;
• Communication credits;
• Platform fees; and
• Other paid services.

Unless otherwise stated at the time of purchase, applicable charges must be paid in advance. The total amount payable may include:
• MessBee subscription fees;
• Usage charges;
• Communication charges;
• Third-party platform charges;
• Applicable taxes, including GST; and
• Other clearly disclosed charges.

The applicable price will be presented before the relevant purchase or subscription is completed.`,
  },
  {
    id: "subscription-activation",
    title: "4. Subscription Activation",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
    content: `Once payment is successfully received, the applicable MessBee service may be activated according to the selected plan. Depending on the service, activation may require:
• Account verification;
• Business verification;
• Meta/WhatsApp approval;
• Third-party account connection;
• Payment-provider verification;
• Technical configuration; or
• Other onboarding requirements.

Where activation depends on a third-party platform, MessBee cannot guarantee the approval or activation timeline of that third party.`,
  },
  {
    id: "cancellation-by-customer",
    title: "5. Cancellation by Customer",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>,
    content: `Customers may request cancellation of their MessBee subscription in accordance with the applicable subscription process. Unless otherwise specified for a particular plan:
• Cancellation will stop renewal of the subscription;
• The current paid subscription period will continue until its scheduled end date;
• Cancellation will normally take effect from the next billing cycle; and
• Cancellation does not automatically create an entitlement to a refund for the unused portion of the current billing period.

Example: If a monthly subscription is purchased on 1 August and cancelled on 15 August, the subscription may remain active until the end of the applicable billing period. The cancellation will generally prevent the next renewal but will not result in a pro-rata refund for the remaining days.`,
  },
  {
    id: "no-prorata-refunds",
    title: "6. No Pro-Rata Refunds",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" /></svg>,
    content: `Unless required by applicable law or expressly approved by MessBee, partial or pro-rata refunds will generally not be provided for:
• Unused subscription days;
• Partial use of a subscription;
• Failure to use available features;
• Unused account capacity;
• Unused communication credits; or
• Cancellation after the billing period has started.

Customers are encouraged to select a plan based on their expected usage and business requirements.`,
  },
  {
    id: "eligible-refund-situations",
    title: "7. Eligible Refund Situations",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
    content: `A refund may be considered where one of the following verified circumstances occurs:

7.1 Duplicate Payment
Where the same transaction has been successfully charged more than once due to a genuine payment or technical error.

7.2 Payment Completed but Service Not Activated
Where:
• Payment was successfully received;
• The applicable service was not activated; and
• The issue is attributable to MessBee rather than the customer's configuration or a third-party service.

7.3 Verified Technical Failure
Where a material technical issue attributable to MessBee results in failure to deliver the paid service and the issue cannot reasonably be resolved within an appropriate period.

7.4 Other Legally Required Refunds
MessBee will process refunds or remedies where required under applicable Indian law or an applicable payment-provider requirement.`,
  },
  {
    id: "non-refundable-situations",
    title: "8. Non-Refundable Situations",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>,
    content: `Subject to applicable law, refunds will generally not be provided for:
• Change of mind after purchase;
• Failure to use the service;
• Partial use of the service;
• Unused subscription time;
• Unused credits or balances;
• Unused messaging capacity;
• Campaigns already processed;
• Messages already submitted for delivery;
• Services already consumed;
• Third-party charges;
• Account suspension resulting from the customer's violation of applicable policies;
• Customer's failure to complete required onboarding;
• Customer's failure to provide required information;
• Customer configuration errors;
• Customer's failure to connect or maintain a required third-party account; or
• Service restrictions imposed by third-party platforms for reasons attributable to the customer.`,
  },
  {
    id: "third-party-charges",
    title: "9. Third-Party Platform & Communication Charges",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>,
    content: `MessBee may rely on third-party providers for certain services. These may include:
• Meta / WhatsApp Business Platform;
• SMS gateway providers;
• Email service providers;
• Payment gateways;
• Cloud infrastructure providers; and
• Other technology providers.

Charges imposed by third-party providers may be passed through to the customer where applicable. Examples include:
• WhatsApp conversation or messaging charges;
• SMS charges;
• Email delivery charges;
• Payment gateway charges; and
• Other usage-based third-party charges.

Where such charges have already been incurred or consumed, they are generally non-refundable, except where a refund is required by applicable law or the relevant provider.`,
  },
  {
    id: "whatsapp-meta-refunds",
    title: "10. WhatsApp & Meta Related Refunds",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>,
    content: `MessBee may provide WhatsApp Business Platform functionality through Meta. MessBee does not control:
• Meta approval;
• WhatsApp account restrictions;
• Template approval;
• Messaging limits;
• Conversation categorization;
• Message delivery;
• Meta pricing;
• Meta policy enforcement; or
• Meta service availability.

Accordingly, a customer will generally not be entitled to a refund merely because:
• Meta rejected an application;
• A WhatsApp template was rejected;
• A WhatsApp Business account was restricted;
• A message was not delivered;
• A customer did not respond;
• Messaging limits were imposed; or
• Meta changed its policies or pricing,

where the relevant event was caused by Meta or by the customer's own account, content, configuration or policy compliance. Any specific Meta-related credit or refund will be handled according to the applicable Meta rules and the relevant MessBee service arrangement.`,
  },
  {
    id: "account-suspension-refunds",
    title: "11. Account Suspension & Refunds",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>,
    content: `If an account is suspended or restricted because of:
• Spam;
• Unsolicited messaging;
• Fraud;
• Misrepresentation;
• Policy violations;
• Illegal activity;
• Unauthorized use;
• Meta/WhatsApp policy violations; or
• Other prohibited activity,

the customer will generally not be entitled to a refund for the affected subscription or consumed usage, subject to applicable law. MessBee may investigate the matter and determine whether any unused prepaid amount is eligible for credit or refund.`,
  },
  {
    id: "failed-payments",
    title: "12. Failed or Reversed Payments",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>,
    content: `A payment may sometimes appear successful at the bank or payment-provider level but fail to reach MessBee. In such cases:
• Service activation may be delayed;
• The payment may be automatically reversed by the payment provider; or
• Additional verification may be required.

Customers should not make repeated payments until the status of the original transaction is confirmed where duplicate charging is a concern.`,
  },
  {
    id: "payment-gateway-charges",
    title: "13. Payment Gateway Charges",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
    content: `Payments may be processed through third-party payment gateways. Depending on the transaction and payment provider, certain processing fees may be non-refundable. Where a refund is approved, the amount returned may be subject to the applicable payment-provider rules.

MessBee will not intentionally deduct charges that are legally required to be refunded to the customer.`,
  },
  {
    id: "refund-request-process",
    title: "14. Refund Request Process",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
    content: `To request a refund, the customer should contact:

MessBee Billing Support
Email: support@messbee.com

The request should include, where available:
• Registered account email;
• Business name;
• Invoice or transaction number;
• Transaction date;
• Amount charged;
• Payment reference/UTR/transaction ID;
• Reason for the refund request; and
• Supporting information or screenshots where relevant.

Providing complete transaction information helps MessBee investigate the request efficiently.`,
  },
  {
    id: "refund-timeline",
    title: "15. Refund Request Timeline",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
    content: `For payment disputes or suspected billing errors, customers should contact MessBee within 7 days of the relevant transaction wherever reasonably possible.

Requests received after this period may still be reviewed where required by applicable law or where the circumstances reasonably justify an investigation. The 7-day period does not override any mandatory statutory rights available to a customer.`,
  },
  {
    id: "refund-investigation",
    title: "16. Refund Investigation",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
    content: `Upon receiving a refund request, MessBee may review:
• Payment records;
• Account activity;
• Service activation status;
• Usage records;
• Communication logs;
• Subscription records;
• Third-party transaction information;
• Technical logs; and
• Other information reasonably necessary to determine the validity of the claim.

MessBee may contact the customer for additional information.`,
  },
  {
    id: "refund-approval",
    title: "17. Refund Approval",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
    content: `If a refund is approved:
• The refund will generally be initiated within 7–10 business days after approval;
• The refund will normally be made to the original payment method; and
• The final crediting time may depend on the customer's bank, card issuer, UPI provider or payment gateway.

The 7–10 business-day period refers to MessBee's processing timeline and does not necessarily represent the time required by the customer's bank or payment provider.`,
  },
  {
    id: "credits-instead-of-refunds",
    title: "18. Credits Instead of Refunds",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>,
    content: `Where appropriate, MessBee may offer an account credit instead of a monetary refund. An account credit may be offered where:
• The customer agrees;
• The issue relates to future service usage; or
• A credit provides a practical resolution.

Credits are generally non-transferable and may be subject to an expiry or other applicable conditions communicated at the time of issuance.`,
  },
  {
    id: "addons-usage",
    title: "19. Cancellation of Add-Ons & Usage Services",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></svg>,
    content: `Certain add-ons and usage-based services may have separate cancellation rules. Once usage has been consumed, processed or submitted to a third-party provider, the related charges may not be reversible.

Customers should review applicable pricing and usage terms before activating paid add-ons or high-volume services.`,
  },
  {
    id: "promotional-offers",
    title: "20. Promotional Offers & Discounts",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>,
    content: `Promotional subscriptions, discounts, coupons, credits, scholarships, trial offers or special pricing may have additional terms. Unless expressly stated otherwise:
• Promotional benefits are not exchangeable for cash;
• Discounts cannot be retroactively applied to completed purchases;
• Promotional credits may have an expiry date; and
• Promotional pricing may not be combined with other offers.

Any special refund condition applicable to a promotional offer will be communicated at the time of purchase.`,
  },
  {
    id: "free-trials",
    title: "21. Free Trials",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
    content: `Where MessBee offers a free trial:
• The trial may be limited by duration, features or usage;
• Certain third-party charges may not be included;
• The trial may require verification;
• Abuse of trial benefits may result in restriction; and
• Paid subscription terms may apply after the trial where clearly disclosed and accepted.

If automatic conversion to a paid subscription applies, the applicable billing terms will be disclosed before or during activation as required.`,
  },
  {
    id: "taxes",
    title: "22. Taxes",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
    content: `Applicable taxes, including Goods and Services Tax (GST), may be charged according to applicable Indian law. Refunds of taxes will be handled according to the applicable tax and invoicing requirements.

Where a tax invoice has already been issued, MessBee may need to process appropriate accounting or tax adjustments before completing the refund.`,
  },
  {
    id: "disputed-transactions",
    title: "23. Disputed Transactions",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
    content: `If you believe that a transaction was incorrectly charged, contact MessBee Billing Support before initiating a payment dispute wherever reasonably possible.

MessBee will investigate genuine billing disputes fairly. Customers should provide the relevant transaction details to help resolve the matter.

Nothing in this section prevents a customer from exercising any rights available under applicable law or applicable payment-system rules.`,
  },
  {
    id: "chargebacks",
    title: "24. Chargebacks",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>,
    content: `Unauthorized or fraudulent transactions should be reported to MessBee and the relevant payment provider immediately.

Where a customer initiates a chargeback without first providing reasonable opportunity to resolve a genuine billing issue, MessBee may provide transaction records and relevant information to the payment provider or financial institution as permitted by law.

Fraudulent or abusive chargeback activity may result in account restriction or termination, subject to applicable law.`,
  },
  {
    id: "service-credits",
    title: "25. Service Credits",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
    content: `In limited circumstances, MessBee may provide service credits instead of a monetary refund. Any service credit will be:
• Applied to the relevant MessBee account;
• Non-transferable unless expressly stated otherwise; and
• Subject to the conditions communicated when the credit is issued.

Service credits do not automatically create a general right to future refunds.`,
  },
  {
    id: "enterprise-agreements",
    title: "26. Enterprise & Custom Agreements",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    content: `Enterprise customers or customers under a separately executed written agreement may be subject to customized:
• Billing terms;
• Cancellation terms;
• Minimum commitments;
• Refund provisions;
• Service credits; or
• Payment conditions.

Where a signed agreement expressly provides different refund or cancellation terms, those contractual terms will govern to the extent of the conflict.`,
  },
  {
    id: "service-disruptions",
    title: "27. Service Disruptions",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /></svg>,
    content: `MessBee aims to provide reliable services but cannot guarantee uninterrupted availability. Temporary service interruptions may occur due to:
• Maintenance;
• Technical failures;
• Cloud infrastructure issues;
• Internet or telecommunications failures;
• Cybersecurity incidents;
• Third-party platform outages;
• Meta or WhatsApp service issues;
• Government or regulatory actions; or
• Events beyond MessBee's reasonable control.

A temporary service interruption caused by circumstances outside MessBee's reasonable control does not automatically create a refund entitlement. Where MessBee determines that a material service failure attributable to MessBee has occurred, an appropriate remedy may be considered based on the circumstances and applicable agreement.`,
  },
  {
    id: "data-after-cancellation",
    title: "28. Data & Account Deletion After Cancellation",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>,
    content: `Cancellation of a subscription does not necessarily result in immediate deletion of account information. Data may be retained, deleted or anonymized according to:
• MessBee Privacy Policy;
• Applicable Data Processing Agreement;
• Legal requirements;
• Security requirements;
• Accounting requirements;
• Fraud-prevention requirements; and
• Applicable retention obligations.

Customers should review the MessBee Privacy Policy for additional information.`,
  },
  {
    id: "policy-violations",
    title: "29. Policy Violations",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" /></svg>,
    content: `No refund is generally due for losses or unused subscription periods resulting from account suspension or termination caused by the customer's violation of:
• MessBee Terms & Conditions;
• Acceptable Use Policy;
• Anti-Spam Policy;
• WhatsApp/Meta policies;
• Applicable law; or
• Other applicable platform rules.

This provision remains subject to mandatory rights available under applicable law.`,
  },
  {
    id: "changes-to-policy",
    title: "30. Changes to This Refund Policy",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>,
    content: `MessBee may update this Refund & Cancellation Policy from time to time to reflect:
• Changes in services;
• Changes in pricing;
• Changes in payment systems;
• Changes in third-party platforms;
• Changes in applicable laws;
• Regulatory requirements; or
• Improvements to our billing practices.

The updated Policy will display a revised Effective Date or Last Updated date. Material changes may be communicated through appropriate channels where required.`,
  },
  {
    id: "governing-law",
    title: "31. Governing Law",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>,
    content: `This Refund & Cancellation Policy is governed by the laws applicable in India. Subject to applicable law, disputes relating to this Policy shall be subject to the jurisdiction of the competent courts in Ghaziabad, Uttar Pradesh, India.

Nothing in this clause prevents a customer from exercising any mandatory statutory rights or remedies available under applicable law.`,
  },
  {
    id: "contact-information",
    title: "32. Contact Information",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
    content: `MessBee Billing Support
Email: support@messbee.com
Address: 510A, Devika Tower, Chander Nagar, Ghaziabad, Uttar Pradesh – 201011, India

For Refund Requests — Subject: Refund Request – MessBee

Please include your:
• Registered email;
• Business name;
• Invoice/transaction number;
• Payment reference;
• Transaction date;
• Amount; and
• Reason for the request.`,
  },
  {
    id: "transparent-billing",
    title: "33. Transparent Billing Commitment",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 11 11 13 15 9" /></svg>,
    content: `MessBee is committed to maintaining a transparent billing process. Before completing a paid transaction, customers should be provided with applicable information concerning:
• Subscription price;
• Billing frequency;
• Applicable taxes;
• Usage charges;
• Third-party charges, where applicable;
• Renewal terms;
• Cancellation conditions; and
• Other material payment conditions.

MessBee aims to ensure that customers understand the applicable charges before completing a purchase.`,
  },
  {
    id: "final-acceptance",
    title: "34. Final Acceptance",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
    content: `By purchasing or subscribing to MessBee services, you acknowledge that you have reviewed:
• The applicable subscription price;
• Billing frequency;
• Cancellation terms;
• Refund conditions;
• Usage charges, where applicable; and
• This Refund & Cancellation Policy.

You agree to be bound by this Policy together with the applicable MessBee Terms & Conditions.`,
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

const RefundPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("introduction");
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);
  const mobileTocRef = useRef(null);

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
      const offset = isMobileTocVisible ? 130 : 95;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="refund-page-wrapper" style={{ fontFamily: "'Inter', sans-serif", background: "#FFFFFF", color: "#0F172A", overflowX: "clip", minHeight: "100vh" }}>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none !important; }
        .no-scrollbar { -ms-overflow-style: none !important; scrollbar-width: none !important; }
        .refund-container { display: flex; gap: 60px; align-items: flex-start; }
        .refund-sidebar {
          width: 350px; flex-shrink: 0;
          position: sticky; top: 95px; z-index: 10;
          background: #F8FAFC; border: 1px solid #E5E7EB;
          border-radius: 16px; padding: 20px;
          max-height: calc(100vh - 130px); overflow-y: auto;
        }
        .toc-item {
          font-size: 13px; font-weight: 500; color: #475569;
          cursor: pointer; transition: all 0.2s ease-in-out;
          display: block; padding: 6px 12px; line-height: 1.4;
          border-left: 2px solid transparent;
          border-radius: 0 6px 6px 0; margin-bottom: 2px; text-align: left;
        }
        .toc-item:hover {
          color: #16A34A; background: rgba(22,163,74,0.04);
          border-left-color: rgba(22,163,74,0.3); padding-left: 16px;
        }
        .toc-item.active {
          font-weight: 700; color: #16A34A;
          background: rgba(22,163,74,0.08);
          border-left-color: #16A34A; padding-left: 16px;
        }
        .mobile-toc-wrapper { display: none !important; }
        /* ── STANDARDIZED RESPONSIVE TYPOGRAPHY & PADDING ── */
        @media (max-width: 1366px) {
          .refund-container {
            gap: 32px !important;
          }
          .refund-sidebar {
            width: 270px !important;
            padding: 16px !important;
            max-height: calc(100vh - 120px) !important;
          }
          .refund-page-wrapper section {
            padding-left: 5% !important;
            padding-right: 5% !important;
          }
          .refund-page-wrapper h1 {
            font-size: clamp(24px, 2.8vw, 38px) !important;
          }
          .refund-page-wrapper h2 {
            font-size: clamp(20px, 2.4vw, 28px) !important;
          }
          .refund-page-wrapper h3 {
            font-size: 15px !important;
          }
          .refund-page-wrapper p {
            font-size: 13.5px !important;
            line-height: 1.65 !important;
          }
        }
        @media (max-width: 1299px) {
          .refund-page-wrapper section {
            padding-left: 4% !important;
            padding-right: 4% !important;
          }
          .refund-page-wrapper h1 {
            font-size: clamp(22px, 2.6vw, 34px) !important;
          }
          .refund-page-wrapper h2 {
            font-size: clamp(18px, 2.2vw, 25px) !important;
          }
          .refund-page-wrapper h3 {
            font-size: 14.5px !important;
          }
          .refund-page-wrapper p {
            font-size: 13px !important;
            line-height: 1.6 !important;
          }
        }
        @media (max-width: 768px) {
          .refund-page-wrapper section:first-of-type {
            padding-top: 100px !important;
            padding-bottom: 20px !important;
          }
          .refund-page-wrapper section:nth-of-type(2) {
            padding-top: 20px !important;
            padding-bottom: 30px !important;
          }
          .refund-sidebar { display: none !important; }
          .refund-container { gap: 0; }
          .mobile-toc-wrapper {
            display: block !important;
            position: sticky !important;
            top: 63px !important;
            z-index: 100 !important;
            margin-top: 0 !important;
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
            box-shadow: 0 4px 12px rgba(0,0,0,0.05) !important;
          }
          .refund-page-wrapper article > div:first-child {
            margin-bottom: 16px !important;
          }
          .refund-page-wrapper article > div[id] {
            scroll-margin-top: 130px !important;
            padding: 20px 16px !important;
            margin-bottom: 14px !important;
          }
          .refund-page-wrapper section {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
          .refund-page-wrapper h1 {
            font-size: clamp(24px, 6vw, 36px) !important;
            letter-spacing: -0.5px !important;
            line-height: 1.25 !important;
            word-spacing: 2px !important;
            margin-bottom: 12px !important;
          }
          .refund-page-wrapper h2 {
            font-size: clamp(17px, 2vw, 22px) !important;
          }
          .refund-page-wrapper h3 {
            font-size: 13.5px !important;
          }
          .refund-page-wrapper p {
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
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#16A34A"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" fill="none" /></svg>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#16A34A", letterSpacing: "0.3px" }}>Billing &amp; Refunds</span>
          </div>

          {/* Heading */}
          <h1 style={{ fontSize: "clamp(35px, 2.9vw, 62px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-2px", lineHeight: 1.08, marginBottom: 20 }}>
            Refund &amp; <span style={{ color: "#16A34A" }}>Cancellation</span> Policy
          </h1>

          {/* Green accent divider */}
          <div style={{ width: 48, height: 4, background: "linear-gradient(90deg, #16A34A, #4ADE80)", borderRadius: 4, marginBottom: 24 }} />

          {/* Description */}
          <p style={{ fontSize: 17, color: "#475569", lineHeight: 1.75, maxWidth: 860, margin: 0 }}>
            Understand how billing, refunds, and cancellations work on the MessBee platform. We believe in transparent and fair billing practices.
          </p>
        </div>
      </section>

      {/* ═══ MAIN CONTENT ═══ */}
      <section style={{ padding: "50px 6%", background: "#FFFFFF" }}>
        <div className="refund-container" style={{ maxWidth: 1280, margin: "0 auto" }}>

          {/* ── Sticky Sidebar ── */}
          <aside className="refund-sidebar no-scrollbar">
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

            <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid #E5E7EB" }}>
              <div style={{ background: "linear-gradient(135deg, #F0FDF4, #ECFDF5)", border: "1px solid #D1FAE5", borderRadius: 10, padding: "14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#16A34A"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#065F46" }}>Need Help?</span>
                </div>
                <p style={{ fontSize: 11, color: "#047857", lineHeight: 1.5, margin: 0 }}>
                  Contact support@messbee.com for billing & refund queries.
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
              marginBottom: 40,
            }}>
              <p style={{ fontSize: 14, color: "#065F46", lineHeight: 1.7, fontWeight: 500, margin: 0 }}>
                <strong>In plain language:</strong> This policy outlines MessBee&apos;s refund and cancellation rules. Services are generally prepaid and non-refundable, but we issue full refunds for duplicate billing, system errors, or verified eligible requests submitted within 7 days to{" "}
                <span style={{ color: "#16A34A", fontWeight: 700 }}>support@messbee.com</span>.
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

            {sections.map((s) => (
              <div
                key={s.id}
                id={s.id}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: 16,
                  padding: 28,
                  marginBottom: 26,
                  boxShadow: "0 4px 12px rgba(15,23,42,0.01)",
                  scrollMarginTop: "95px",
                }}
                onMouseEnter={() => setActiveSection(s.id)}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(22,163,74,0.08)", color: "#16A34A", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                  {s.icon}
                </div>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 16, letterSpacing: "-0.3px", fontFamily: "'Inter', sans-serif" }}>
                  {s.title}
                </h2>
                <div style={{ fontSize: 14, color: "#4B5563", lineHeight: 1.6, margin: 0, fontFamily: "'Inter', sans-serif" }}>
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

export default RefundPage;
