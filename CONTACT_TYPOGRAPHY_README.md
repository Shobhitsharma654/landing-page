# MessBee Contact Us Page — Typography & Design Guide

This file documents the exact typography specs, styling rules, and layout system implemented on the **Contact Us** page ([ContactUsPage.jsx](file:///c:/Users/ACER/Desktop/landing page/landing page/src/components/company/ContactUsPage.jsx)).

---

## 1. Core Design Tokens & Rules

All elements across every section on the page adhere to the following unified scaling system:

| Element | Description / Use Case | Desktop Size | Mobile Size | Font Weight | Color Code | Line Height |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Main Section Headings** | Section titles (e.g. *How Can We Help?*) | `32px` (`2.00rem`) | `24px` | `900` (Extra Bold) | `#0F172A` | `1.2` |
| **Main Description Body** | Standard paragraphs explaining contact paths | `12px` | `12.5px` | `400` (Regular) | `#475569` | `1.45` |
| **Card / Item Title** | Headers for category cards, info boxes | `12px` | `12px` | `800` (Extra Bold) | `#0F172A` | `1.45` |
| **Card / Item Description** | Text details inside category cards | `12px` | `12px` | `400` (Regular) | `#64748B` | `1.45` |
| **Action Buttons (Primary)** | Primary action buttons (Hero, Send Enquiry) | `12.5px` | `12.5px` | `700` (Bold) | `#FFFFFF` (padding: `8px 18px`) | Standard |
| **Action Buttons (Secondary)** | Secondary action buttons (Get Started, Contact Support) | `12.5px` | `12.5px` | `600` (Medium) | `#0F172A` (padding: `10px 20px`) | Standard |
| **Faq Question Trigger** | Accordion FAQ question trigger button | `14.5px` | `14px` | `700` (Bold) | `#0F172A` | `1.45` |

---

## 2. Section-wise Typography Implementations

### A. Hero Section (Contact MessBee – Let’s Talk About Your Business)
*   **Main Headline**: `clamp(20px, 2.5vw, 32px)` (line-height: `1.2`)
*   **Description**: `fontSize: 12`
*   **Buttons**: `fontSize: 12.5` (Primary padding: `8px 18px`, Secondary padding: `10px 20px`, `fontWeight: 700 / 600`)

### B. How Can We Help? Section (Category Cards)
*   **Section Header**: `clamp(20px, 2.5vw, 32px)` (line-height: `1.2`)
*   **Category Cards**:
    *   *Card Title*: `fontSize: 12` (line-height: `1.45`, `fontWeight: 800`)
    *   *Card Text*: `fontSize: 12` (line-height: `1.45`)
    *   *Buttons*: `fontSize: 12.5` (padding: `10px 20px`, `fontWeight: 600`)

### C. Visit Us, Connect & Enquiry Form Section
*   **Section Header**: `clamp(20px, 2.5vw, 32px)` (line-height: `1.2`)
*   **Section Body**: `fontSize: 12` (line-height: `1.45`)
*   **Office Address / Details**: `fontSize: 12` (line-height: `1.45`)
*   **Form Inputs & Labels**:
    *   *Input labels*: `fontSize: 12` (fontWeight: `700`)
    *   *Inputs / Placeholders*: `fontSize: 12`

### D. Corporate Office Location Details (Ghaziabad)
*   **Section Header**: `clamp(20px, 2.5vw, 32px)` (line-height: `1.2`)
*   **Address / Contact Info**: `fontSize: 12` (line-height: `1.45`)

### E. Frequently Asked Questions (FAQ)
*   **Section Header**: `clamp(20px, 2.5vw, 32px)` (line-height: `1.2`)
*   **Faq Question Trigger**: `fontSize: 14.5` (line-height: `1.45`, `fontWeight: 700`)
*   **Faq Answer Text**: `fontSize: 12` (line-height: `1.45`)

### F. Looking for Product Help? Section (CTA)
*   **Section Header**: `clamp(20px, 2.5vw, 32px)` (line-height: `1.2`)
*   **Section Body**: `fontSize: 12` (line-height: `1.45`)
*   **Buttons**: `fontSize: 12.5` (Primary padding: `8px 18px`, Secondary padding: `10px 20px`, `fontWeight: 700 / 600`)
