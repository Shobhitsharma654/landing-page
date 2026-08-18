import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const DOCS = {
  api: {
    label: "API Documentation",
    icon: "📄",
    color: "#0284C7",
    bg: "#E0F2FE",
    pages: 142,
    sections: [
      {
        title: "Getting Started",
        articles: [
          {
            title: "Introduction to MessBee API",
            body: [
              { type: "p", text: "The MessBee REST API allows you to programmatically access and manage your MessBee account. You can send messages, manage contacts, create campaigns, retrieve analytics, and much more." },
              { type: "h3", text: "Base URL" },
              { type: "code", text: "https://api.messbee.com/v1" },
              { type: "h3", text: "Authentication" },
              { type: "p", text: "All API requests must include your API key in the Authorization header:" },
              { type: "code", text: "Authorization: Bearer YOUR_API_KEY" },
              { type: "p", text: "You can generate and manage API keys from your MessBee dashboard under Settings → API Keys." },
            ]
          },
          {
            title: "Authentication & API Keys",
            body: [
              { type: "p", text: "MessBee uses Bearer Token authentication for all API requests." },
              { type: "h3", text: "Generating an API Key" },
              { type: "ol", items: ["Go to Dashboard → Settings → API Keys", "Click \"Generate New Key\"", "Name your key (e.g., \"Production Server\")", "Copy and store it securely — it is shown only once"] },
              { type: "h3", text: "Using your API Key" },
              { type: "code", text: "GET /v1/contacts HTTP/1.1\nHost: api.messbee.com\nAuthorization: Bearer mb_live_xxxxxxxxxxxxxxxx\nContent-Type: application/json" },
              { type: "h3", text: "Security Tips" },
              { type: "ul", items: ["Never expose API keys in frontend code", "Rotate keys every 90 days", "Use environment variables to store keys"] },
            ]
          },
          {
            title: "Rate Limits",
            body: [
              { type: "p", text: "MessBee API enforces rate limits to ensure platform stability." },
              { type: "table", headers: ["Plan", "Requests/minute", "Requests/day"], rows: [["Starter", "60", "10,000"], ["Growth", "300", "100,000"], ["Enterprise", "1,000", "Unlimited"]] },
              { type: "h3", text: "Rate Limit Headers" },
              { type: "p", text: "Every response includes these headers:" },
              { type: "code", text: "X-RateLimit-Limit: 300\nX-RateLimit-Remaining: 287\nX-RateLimit-Reset: 1720000000" },
              { type: "p", text: "When you exceed the rate limit, the API returns a 429 status. Implement exponential backoff and retry after the reset timestamp." },
            ]
          },
        ]
      },
      {
        title: "Messaging API",
        articles: [
          {
            title: "Send a Text Message",
            body: [
              { type: "p", text: "Send a plain text WhatsApp message to a contact." },
              { type: "h3", text: "Endpoint" },
              { type: "code", text: "POST /v1/messages/send" },
              { type: "h3", text: "Request Body" },
              { type: "code", text: '{\n  "to": "919876543210",\n  "type": "text",\n  "text": {\n    "body": "Hello! Your order #1234 has been shipped."\n  }\n}' },
              { type: "h3", text: "Response" },
              { type: "code", text: '{\n  "success": true,\n  "message_id": "msg_abc123",\n  "status": "sent",\n  "timestamp": "2026-07-30T08:00:00Z"\n}' },
            ]
          },
          {
            title: "Send a Template Message",
            body: [
              { type: "p", text: "Send pre-approved WhatsApp Business template messages." },
              { type: "h3", text: "Endpoint" },
              { type: "code", text: "POST /v1/messages/template" },
              { type: "h3", text: "Request Body" },
              { type: "code", text: '{\n  "to": "919876543210",\n  "template": {\n    "name": "order_confirmation",\n    "language": "en",\n    "components": [\n      {\n        "type": "body",\n        "parameters": [\n          { "type": "text", "text": "Rahul" },\n          { "type": "text", "text": "#1234" }\n        ]\n      }\n    ]\n  }\n}' },
            ]
          },
        ]
      },
      {
        title: "Contacts API",
        articles: [
          {
            title: "List Contacts",
            body: [
              { type: "p", text: "Retrieve a paginated list of all your contacts." },
              { type: "h3", text: "Endpoint" },
              { type: "code", text: "GET /v1/contacts" },
              { type: "h3", text: "Query Parameters" },
              { type: "table", headers: ["Parameter", "Type", "Description"], rows: [["page", "integer", "Page number (default: 1)"], ["limit", "integer", "Results per page (max: 100)"], ["search", "string", "Search by name or phone"]] },
              { type: "h3", text: "Response" },
              { type: "code", text: '{\n  "contacts": [\n    {\n      "id": "cnt_abc123",\n      "name": "Rahul Sharma",\n      "phone": "919876543210",\n      "tags": ["vip", "mumbai"],\n      "created_at": "2026-01-15T10:00:00Z"\n    }\n  ],\n  "total": 1250,\n  "page": 1,\n  "pages": 13\n}' },
            ]
          },
          {
            title: "Create a Contact",
            body: [
              { type: "p", text: "Add a new contact to your MessBee account." },
              { type: "h3", text: "Endpoint" },
              { type: "code", text: "POST /v1/contacts" },
              { type: "h3", text: "Request Body" },
              { type: "code", text: '{\n  "name": "Priya Patel",\n  "phone": "919812345678",\n  "email": "priya@example.com",\n  "tags": ["customer", "jaipur"],\n  "custom_fields": {\n    "city": "Jaipur",\n    "plan": "Gold"\n  }\n}' },
            ]
          },
        ]
      }
    ]
  },
  whatsapp: {
    label: "WhatsApp Business API",
    icon: "💬",
    color: "#16A34A",
    bg: "#DCFCE7",
    pages: 68,
    sections: [
      {
        title: "Setup & Configuration",
        articles: [
          {
            title: "Connect Your WhatsApp Business Account",
            body: [
              { type: "p", text: "MessBee uses the official Meta WhatsApp Business API. Follow these steps to connect your account." },
              { type: "h3", text: "Prerequisites" },
              { type: "ul", items: ["A Facebook Business Manager account", "A verified phone number (not used on WhatsApp personally)", "An approved WhatsApp Business API application"] },
              { type: "h3", text: "Steps" },
              { type: "ol", items: ["Go to Settings → WhatsApp Integration", "Click \"Connect WhatsApp\"", "Log in with your Facebook Business Manager", "Select your WhatsApp Business Account", "Choose the phone number to connect", "Complete the verification"] },
              { type: "p", text: "Once connected, you'll see your WABA ID and Phone Number ID in the dashboard." },
            ]
          },
          {
            title: "Phone Number Verification",
            body: [
              { type: "h3", text: "Verification Steps" },
              { type: "ol", items: ["Navigate to Settings → WhatsApp → Phone Numbers", "Click \"Verify Number\"", "Choose SMS or Voice call for the OTP", "Enter the 6-digit OTP received", "Your number will show as \"Verified\""] },
              { type: "h3", text: "Important Notes" },
              { type: "ul", items: ["The number cannot be active on personal WhatsApp", "If verification fails, wait 24 hours before retrying", "Use a dedicated business SIM for best results"] },
            ]
          },
        ]
      },
      {
        title: "Message Templates",
        articles: [
          {
            title: "Creating Message Templates",
            body: [
              { type: "p", text: "WhatsApp requires pre-approved templates for outbound messages to new contacts." },
              { type: "h3", text: "Template Categories" },
              { type: "ul", items: ["Utility: Order confirmations, alerts, account updates", "Authentication: OTP and verification messages", "Marketing: Promotions, offers, announcements"] },
              { type: "h3", text: "Creating a Template" },
              { type: "ol", items: ["Go to WhatsApp → Templates → Create New", "Choose a category", "Write your template with variables: {{1}}, {{2}}", "Add header (optional), body, footer, and buttons", "Submit for Meta approval"] },
              { type: "h3", text: "Approval Timeline" },
              { type: "p", text: "Templates are typically approved within 24–48 hours. Marketing templates may take longer." },
            ]
          },
          {
            title: "Template Variables & Buttons",
            body: [
              { type: "h3", text: "Variables" },
              { type: "p", text: "Use {{1}}, {{2}}, etc. as placeholders in your message body." },
              { type: "code", text: "Hello {{1}}, your order {{2}} is ready for pickup!" },
              { type: "h3", text: "Button Types" },
              { type: "ul", items: ["Call to Action: Phone call or URL redirect", "Quick Reply: Pre-set reply options (up to 3)"] },
              { type: "h3", text: "Example" },
              { type: "code", text: "Body: Your appointment is confirmed for {{1}} at {{2}}.\n\nButtons:\n[Call Us]       → tel:+91XXXXXXXXXX\n[Get Directions] → https://maps.google.com/...\n[Reschedule]    → Quick Reply" },
            ]
          },
        ]
      },
      {
        title: "Webhooks",
        articles: [
          {
            title: "Setting Up Webhooks",
            body: [
              { type: "p", text: "Webhooks allow MessBee to notify your server when events occur (messages received, status updates, etc.)." },
              { type: "h3", text: "Configure Webhook URL" },
              { type: "ol", items: ["Go to Settings → Webhooks", "Enter your server's HTTPS endpoint", "Select which events to subscribe to", "Click \"Verify & Save\""] },
              { type: "h3", text: "Webhook Events" },
              { type: "table", headers: ["Event", "Description"], rows: [["message.received", "Incoming message from a contact"], ["message.sent", "Your message was sent"], ["message.delivered", "Message delivered to device"], ["message.read", "Message was read"], ["message.failed", "Message delivery failed"]] },
              { type: "h3", text: "Payload Example" },
              { type: "code", text: '{\n  "event": "message.received",\n  "from": "919876543210",\n  "text": "Hello, I need help!",\n  "timestamp": "2026-07-30T09:00:00Z"\n}' },
            ]
          },
        ]
      }
    ]
  },
  crm: {
    label: "CRM Documentation",
    icon: "👥",
    color: "#2563EB",
    bg: "#EFF6FF",
    pages: 94,
    sections: [
      {
        title: "Contacts & Leads",
        articles: [
          {
            title: "Managing Contacts",
            body: [
              { type: "p", text: "MessBee's CRM lets you store and manage all your customer contacts in one place." },
              { type: "h3", text: "Contact Fields" },
              { type: "ul", items: ["Name, phone, email", "Tags (up to 20 per contact)", "Custom fields (unlimited)", "Conversation history", "Notes and activity log"] },
              { type: "h3", text: "Importing Contacts" },
              { type: "ol", items: ["Go to CRM → Contacts → Import", "Download the CSV template", "Fill in your contact data", "Upload the file", "Map columns to MessBee fields", "Click Import"] },
              { type: "h3", text: "Bulk Actions" },
              { type: "ul", items: ["Send broadcast to selected contacts", "Add/remove tags in bulk", "Export to CSV", "Delete contacts"] },
            ]
          },
          {
            title: "Contact Segments & Tags",
            body: [
              { type: "h3", text: "Tags" },
              { type: "p", text: "Tags are simple labels you add to contacts. Examples: vip, mumbai, trial, churned." },
              { type: "h3", text: "Creating Segments" },
              { type: "ol", items: ["Go to CRM → Segments → New Segment", "Set filter conditions", "Save the segment", "Use it in campaigns for targeted broadcasts"] },
              { type: "h3", text: "Dynamic Segments" },
              { type: "p", text: "Dynamic segments auto-update when contacts match or unmatch the conditions — no manual refresh needed." },
            ]
          },
        ]
      },
      {
        title: "Pipelines & Tasks",
        articles: [
          {
            title: "Sales Pipelines",
            body: [
              { type: "h3", text: "Setting Up a Pipeline" },
              { type: "ol", items: ["Go to CRM → Pipelines → New Pipeline", "Name your pipeline (e.g., \"Sales 2026\")", "Add stages: Lead → Qualified → Demo → Proposal → Won/Lost", "Set probability % per stage"] },
              { type: "h3", text: "Pipeline Automation" },
              { type: "p", text: "You can trigger WhatsApp messages automatically when a contact enters a new stage:" },
              { type: "ul", items: ["Enter \"Demo Booked\" → Send confirmation message", "Enter \"Won\" → Send onboarding message"] },
            ]
          },
        ]
      },
    ]
  },
  integrations: {
    label: "Integrations",
    icon: "🧩",
    color: "#D97706",
    bg: "#FEF3C7",
    pages: 56,
    sections: [
      {
        title: "E-commerce",
        articles: [
          {
            title: "Shopify Integration",
            body: [
              { type: "p", text: "Connect your Shopify store to automatically send WhatsApp notifications for orders, shipping, and abandoned carts." },
              { type: "h3", text: "Setup Steps" },
              { type: "ol", items: ["Go to Integrations → Shopify", "Click \"Connect Shopify\"", "Enter your Shopify store URL", "Authorize the MessBee app", "Select which events to enable"] },
              { type: "h3", text: "Abandoned Cart Recovery" },
              { type: "ul", items: ["Trigger: Cart abandoned for 1 hour", "Message: Send template with cart link", "Follow-up: After 24 hours if no purchase"] },
            ]
          },
          {
            title: "Razorpay Integration",
            body: [
              { type: "h3", text: "Setup" },
              { type: "ol", items: ["Go to Integrations → Razorpay", "Enter your Razorpay Key ID and Secret", "MessBee will auto-configure webhooks"] },
              { type: "h3", text: "Supported Events" },
              { type: "ul", items: ["Payment Successful → Send receipt", "Payment Failed → Send retry link", "Refund Initiated → Send confirmation", "Subscription Renewed → Send acknowledgment"] },
            ]
          },
        ]
      },
      {
        title: "Automation Tools",
        articles: [
          {
            title: "Zapier Integration",
            body: [
              { type: "h3", text: "Getting Started" },
              { type: "ol", items: ["Create a free Zapier account at zapier.com", "Search for \"MessBee\" in the app directory", "Connect your MessBee API key"] },
              { type: "h3", text: "Popular Zaps" },
              { type: "ul", items: ["Google Forms → MessBee: Send WhatsApp when a form is submitted", "Calendly → MessBee: Send appointment reminders", "Google Sheets → MessBee: Send messages from spreadsheet data", "HubSpot → MessBee: Notify sales team of new CRM leads"] },
            ]
          },
          {
            title: "Custom Webhooks",
            body: [
              { type: "h3", text: "Incoming Webhook (Your Server → MessBee)" },
              { type: "code", text: 'POST https://api.messbee.com/v1/webhooks/trigger\n{\n  "event": "send_message",\n  "to": "919876543210",\n  "message": "Your OTP is 482910"\n}' },
              { type: "h3", text: "Webhook Security" },
              { type: "p", text: "All webhooks include an HMAC-SHA256 signature in the X-MessBee-Signature header. Always verify this before processing." },
            ]
          },
        ]
      },
    ]
  },
  automation: {
    label: "Automation",
    icon: "⚡",
    color: "#9333EA",
    bg: "#F3E8FF",
    pages: 78,
    sections: [
      {
        title: "Workflows",
        articles: [
          {
            title: "Building Your First Workflow",
            body: [
              { type: "h3", text: "Workflow Building Blocks" },
              { type: "ul", items: ["Trigger: What starts the workflow (new contact, keyword received)", "Condition: Filter based on contact data", "Action: What to do (send message, add tag, webhook)", "Delay: Wait X hours/days before the next step"] },
              { type: "h3", text: "Example: New Lead Nurture Workflow" },
              { type: "ol", items: ["Trigger: Contact added with tag \"lead\"", "Action: Send welcome message immediately", "Delay: Wait 1 day", "Action: Send product brochure", "Delay: Wait 2 days", "Condition: If no reply → send follow-up", "Action: Add tag \"cold-lead\" if still no reply"] },
            ]
          },
          {
            title: "Triggers & Conditions",
            body: [
              { type: "h3", text: "Trigger Types" },
              { type: "table", headers: ["Trigger", "Description"], rows: [["Contact Created", "New contact added to CRM"], ["Keyword Received", "Contact sends a specific word"], ["Tag Added", "Tag is applied to a contact"], ["Pipeline Stage Change", "Contact moves to new stage"], ["Date-based", "Birthday, anniversary, or custom date"], ["Webhook", "External system triggers workflow"]] },
              { type: "h3", text: "Conditions" },
              { type: "ul", items: ["Contact tag equals \"premium\"", "Phone number starts with \"+91\"", "Custom field \"city\" equals \"Mumbai\"", "Last message was more than 7 days ago"] },
            ]
          },
        ]
      },
      {
        title: "Chatbots",
        articles: [
          {
            title: "Building a WhatsApp Chatbot",
            body: [
              { type: "h3", text: "Chatbot Flow Builder" },
              { type: "ol", items: ["Go to Automation → Chatbots → New Bot", "Set a trigger keyword (e.g., \"Hi\", \"Hello\", \"Start\")", "Design the conversation flow", "Test your bot", "Go live"] },
              { type: "h3", text: "Example Menu Bot" },
              { type: "code", text: "BOT: Hi! How can I help you today?\n[1] Track My Order\n[2] Book a Demo\n[3] Talk to Support\n\nCustomer: 1\nBOT: Please share your order number:\nCustomer: #1234\nBOT: Your order #1234 is out for delivery! ETA: 5 PM." },
              { type: "h3", text: "Handoff to Human Agent" },
              { type: "p", text: "When the bot cannot answer, it automatically transfers to a live agent with full conversation context." },
            ]
          },
        ]
      },
    ]
  },
  security: {
    label: "Security & Compliance",
    icon: "🛡️",
    color: "#DC2626",
    bg: "#FEE2E2",
    pages: 34,
    sections: [
      {
        title: "Data Security",
        articles: [
          {
            title: "Data Encryption",
            body: [
              { type: "h3", text: "Encryption Standards" },
              { type: "ul", items: ["In Transit: TLS 1.3 for all API and web traffic", "At Rest: AES-256 encryption for all stored data", "Database: Encrypted at the storage level", "Backups: Encrypted and stored in multiple regions"] },
              { type: "h3", text: "Message Retention" },
              { type: "p", text: "WhatsApp messages are stored encrypted for 90 days by default. You can configure retention policies:" },
              { type: "ul", items: ["Go to Settings → Security → Message Retention", "Set retention period: 30, 60, 90, or 365 days", "Or enable \"No Storage\" for maximum privacy"] },
            ]
          },
          {
            title: "GDPR Compliance",
            body: [
              { type: "h3", text: "Your Responsibilities" },
              { type: "ul", items: ["Obtain explicit consent before messaging contacts", "Honor opt-out requests within 72 hours", "Provide data export on request", "Delete data on request (Right to Erasure)"] },
              { type: "h3", text: "MessBee's GDPR Features" },
              { type: "ul", items: ["Consent Tracking: Log when and how consent was obtained", "Opt-out Handling: Auto-unsubscribe on \"STOP\" keyword", "Data Export: Export all contact data as JSON or CSV", "Data Deletion: One-click delete contact and all associated data"] },
            ]
          },
        ]
      },
      {
        title: "Access Control",
        articles: [
          {
            title: "User Roles & Permissions",
            body: [
              { type: "h3", text: "Built-in Roles" },
              { type: "table", headers: ["Role", "Description"], rows: [["Owner", "Full access to everything including billing"], ["Admin", "Full access except billing and owner settings"], ["Agent", "Chat, contacts, and campaigns"], ["Viewer", "Read-only access to reports"]] },
              { type: "h3", text: "Audit Logs" },
              { type: "p", text: "All admin actions are logged with user ID, timestamp, and IP address. Go to Settings → Audit Logs to review." },
            ]
          },
          {
            title: "Two-Factor Authentication (2FA)",
            body: [
              { type: "h3", text: "Enabling 2FA" },
              { type: "ol", items: ["Go to Settings → Security → Two-Factor Authentication", "Toggle \"Require 2FA for all users\"", "Users will be prompted to set up 2FA on next login"] },
              { type: "h3", text: "Supported 2FA Methods" },
              { type: "ul", items: ["Authenticator App: Google Authenticator, Authy, 1Password", "SMS OTP: Sent to registered phone number"] },
              { type: "h3", text: "Recovery" },
              { type: "ol", items: ["Admin can go to Users → select user → Reset 2FA", "User will receive a recovery link via email", "They must re-enroll 2FA within 24 hours"] },
            ]
          },
        ]
      },
    ]
  }
};

const renderBody = (body, color) => body.map((block, i) => {
  if (block.type === "p") return <p key={i} style={{ color: "#475569", lineHeight: 1.75, marginBottom: 12, fontSize: 15 }}>{block.text}</p>;
  if (block.type === "h3") return <h3 key={i} style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", marginTop: 24, marginBottom: 8 }}>{block.text}</h3>;
  if (block.type === "code") return <pre key={i} style={{ background: "#0F172A", color: "#E2E8F0", padding: "18px 22px", borderRadius: 12, overflowX: "auto", fontSize: 13, lineHeight: 1.7, margin: "12px 0", fontFamily: "monospace" }}>{block.text}</pre>;
  if (block.type === "ul") return <ul key={i} style={{ paddingLeft: 24, marginBottom: 12 }}>{block.items.map((item, j) => <li key={j} style={{ color: "#475569", lineHeight: 1.7, marginBottom: 4, fontSize: 15 }}>{item}</li>)}</ul>;
  if (block.type === "ol") return <ol key={i} style={{ paddingLeft: 24, marginBottom: 12 }}>{block.items.map((item, j) => <li key={j} style={{ color: "#475569", lineHeight: 1.7, marginBottom: 4, fontSize: 15 }}>{item}</li>)}</ol>;
  if (block.type === "table") return (
    <div key={i} style={{ overflowX: "auto", margin: "12px 0 20px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #E5E7EB", borderRadius: 8, overflow: "hidden", fontSize: 14 }}>
        <thead>
          <tr style={{ background: "#F8FAFC" }}>
            {block.headers.map((h, j) => <th key={j} style={{ padding: "10px 16px", textAlign: "left", fontWeight: 700, color: "#374151", borderBottom: "1px solid #E5E7EB" }}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, j) => <tr key={j} style={{ background: j % 2 === 0 ? "white" : "#F8FAFC" }}>{row.map((cell, k) => <td key={k} style={{ padding: "10px 16px", color: "#475569", borderBottom: "1px solid #F1F5F9" }}>{cell}</td>)}</tr>)}
        </tbody>
      </table>
    </div>
  );
  return null;
});

const DocsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultSection = searchParams.get("section") || "api";

  const [activeSection, setActiveSection] = useState(defaultSection);
  const [activeArticle, setActiveArticle] = useState({ sectionIdx: 0, articleIdx: 0 });

  const doc = DOCS[activeSection];
  const currentSection = doc.sections[activeArticle.sectionIdx];
  const currentArticle = currentSection?.articles[activeArticle.articleIdx];

  const totalArticles = doc.sections.reduce((sum, s) => sum + s.articles.length, 0);

  const goNext = () => {
    const sec = doc.sections[activeArticle.sectionIdx];
    if (activeArticle.articleIdx < sec.articles.length - 1) {
      setActiveArticle(a => ({ ...a, articleIdx: a.articleIdx + 1 }));
    } else if (activeArticle.sectionIdx < doc.sections.length - 1) {
      setActiveArticle({ sectionIdx: activeArticle.sectionIdx + 1, articleIdx: 0 });
    }
  };

  const goPrev = () => {
    if (activeArticle.articleIdx > 0) {
      setActiveArticle(a => ({ ...a, articleIdx: a.articleIdx - 1 }));
    } else if (activeArticle.sectionIdx > 0) {
      const prevSec = doc.sections[activeArticle.sectionIdx - 1];
      setActiveArticle({ sectionIdx: activeArticle.sectionIdx - 1, articleIdx: prevSec.articles.length - 1 });
    }
  };

  const hasNext = activeArticle.articleIdx < doc.sections[activeArticle.sectionIdx].articles.length - 1 || activeArticle.sectionIdx < doc.sections.length - 1;
  const hasPrev = activeArticle.articleIdx > 0 || activeArticle.sectionIdx > 0;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#F8FAFC", minHeight: "100vh" }}>
      {/* Top Bar */}
      <div style={{ background: "#FFFFFF", borderBottom: "1px solid #E5E7EB", padding: "0 40px", position: "sticky", top: 0, zIndex: 50, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", gap: 20, height: 64 }}>
          <button onClick={() => navigate("/resources")} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: "#64748B", fontSize: 14, fontWeight: 600, padding: 0 }}>
            ← Back
          </button>
          <span style={{ color: "#E2E8F0" }}>|</span>
          <span style={{ fontSize: 15, color: "#0F172A", fontWeight: 800 }}>📚 MessBee Docs</span>
          <span style={{ background: "#F1F5F9", color: "#64748B", fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 100, marginLeft: 4 }}>{totalArticles} articles</span>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px", display: "flex" }}>
        {/* LEFT SIDEBAR */}
        <div style={{ width: 256, flexShrink: 0, paddingTop: 32, paddingRight: 24, position: "sticky", top: 64, height: "calc(100vh - 64px)", overflowY: "auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 10 }}>Categories</p>
          {Object.entries(DOCS).map(([key, d]) => (
            <button key={key} onClick={() => { setActiveSection(key); setActiveArticle({ sectionIdx: 0, articleIdx: 0 }); }}
              style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: activeSection === key ? d.bg : "transparent", border: activeSection === key ? `1px solid ${d.color}22` : "1px solid transparent", cursor: "pointer", marginBottom: 3, textAlign: "left", transition: "all 0.15s" }}>
              <span style={{ fontSize: 17 }}>{d.icon}</span>
              <span style={{ fontSize: 13, fontWeight: activeSection === key ? 700 : 500, color: activeSection === key ? d.color : "#475569" }}>{d.label}</span>
            </button>
          ))}

          {/* Article list */}
          <div style={{ marginTop: 28, borderTop: "1px solid #E5E7EB", paddingTop: 20 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 12 }}>In this guide</p>
            {doc.sections.map((section, si) => (
              <div key={si} style={{ marginBottom: 18 }}>
                <p style={{ fontSize: 10, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 6, paddingLeft: 10 }}>{section.title}</p>
                {section.articles.map((article, ai) => {
                  const isActive = activeArticle.sectionIdx === si && activeArticle.articleIdx === ai;
                  return (
                    <button key={ai} onClick={() => setActiveArticle({ sectionIdx: si, articleIdx: ai })}
                      style={{ width: "100%", textAlign: "left", padding: "6px 10px", borderRadius: 8, border: "none", cursor: "pointer", background: isActive ? doc.bg : "transparent", marginBottom: 2, borderLeft: isActive ? `3px solid ${doc.color}` : "3px solid transparent", transition: "all 0.15s" }}>
                      <span style={{ fontSize: 13, fontWeight: isActive ? 600 : 400, color: isActive ? doc.color : "#64748B", lineHeight: 1.4, display: "block" }}>{article.title}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex: 1, paddingTop: 32, paddingLeft: 40, borderLeft: "1px solid #E5E7EB", minHeight: "calc(100vh - 64px)" }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 28, fontSize: 13 }}>
            <span style={{ color: "#94A3B8" }}>Docs</span>
            <span style={{ color: "#CBD5E1" }}>›</span>
            <span style={{ color: doc.color, fontWeight: 600 }}>{doc.label}</span>
            <span style={{ color: "#CBD5E1" }}>›</span>
            <span style={{ color: "#64748B" }}>{currentSection?.title}</span>
          </div>

          {/* Article Header */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: doc.bg, border: `1px solid ${doc.color}22`, borderRadius: 100, padding: "5px 14px", marginBottom: 16 }}>
              <span style={{ fontSize: 16 }}>{doc.icon}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: doc.color, textTransform: "uppercase", letterSpacing: "1px" }}>{doc.label}</span>
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 900, color: "#0F172A", letterSpacing: "-0.5px", marginBottom: 10 }}>{currentArticle?.title}</h1>
            <div style={{ display: "flex", gap: 20, fontSize: 13, color: "#94A3B8" }}>
              <span>📖 {doc.pages} pages in this guide</span>
              <span>⏱ ~3 min read</span>
              <span>📂 {currentSection?.title}</span>
            </div>
          </div>

          {/* Article Body */}
          <div style={{ background: "#FFFFFF", borderRadius: 16, padding: "36px 40px", border: "1px solid #E5E7EB", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", marginBottom: 32, maxWidth: 760 }}>
            {currentArticle && renderBody(currentArticle.body, doc.color)}
          </div>

          {/* Prev / Next */}
          <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 60, maxWidth: 760 }}>
            <div>
              {hasPrev && (
                <button onClick={goPrev} style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 20px", border: "1px solid #E5E7EB", borderRadius: 10, background: "white", cursor: "pointer", fontSize: 14, fontWeight: 600, color: "#0F172A" }}>
                  ← Previous
                </button>
              )}
            </div>
            <div>
              {hasNext && (
                <button onClick={goNext} style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 20px", border: `1px solid ${doc.color}`, borderRadius: 10, background: doc.bg, cursor: "pointer", fontSize: 14, fontWeight: 700, color: doc.color }}>
                  Next →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;
