# MessBee SMB Solutions Page — Typography & Design Guide

This file documents the exact typography specs, styling rules, and layout system implemented on the **Small & Medium Business Solutions** page ([SmbPage.jsx](file:///c:/Users/ACER/Desktop/landing page/landing page/src/components/solutions/SmbPage.jsx)).

---

## 1. Core Design Tokens & Rules

All elements across every section on the page adhere to the following unified scaling system:

| Element | Description / Use Case | Desktop Size | Mobile Size | Font Weight | Color Code | Line Height |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Main Section Headings** | Section titles (e.g. *Why Businesses Choose*) | `32px` (`2.00rem`) | `24px` | `900` (Extra Bold) | `#0F172A` | `1.2` |
| **Main Description Body** | Standard paragraphs explaining SME benefits | `12px` | `12.5px` | `400` (Regular) | `#475569` | `1.45` |
| **Card / Item Title** | Headers for key capabilities, reason cards | `12px` | `12px` | `800` (Extra Bold) | `#0F172A` | `1.45` |
| **Card / Item Description** | Text details inside features, reason cards | `12px` | `12px` | `400` (Regular) | `#64748B` | `1.45` |
| **Action Buttons (Primary)** | Primary action buttons (Hero, CTA) | `12.5px` | `12.5px` | `700` (Bold) | `#FFFFFF` (padding: `8px 18px`) | Standard |
| **Action Buttons (Secondary)** | Secondary action buttons (Explore MessBee) | `12.5px` | `12.5px` | `600` (Medium) | `#0F172A` (padding: `10px 20px`) | Standard |
| **Faq Question Trigger** | Accordion FAQ question trigger button | `14.5px` | `14px` | `700` (Bold) | `#0F172A` | `1.45` |

---

## 2. Section-wise Typography Implementations

### A. Hero Section (Small & Medium Business Solutions...)
*   **Main Headline**: `clamp(20px, 2.5vw, 32px)` (line-height: `1.2`)
*   **Sublead / Highlight Texts**: `fontSize: 12`
*   **Description**: `fontSize: 12`
*   **Buttons**: `fontSize: 12.5` (Primary padding: `8px 18px`, Secondary padding: `10px 20px`, `fontWeight: 700 / 600`)

### B. What MessBee Can Help You With Section (Feature Cards)
*   **Section Header**: `clamp(20px, 2.5vw, 32px)` (line-height: `1.2`)
*   **Feature Cards**:
    *   *Card Title*: `fontSize: 12` (line-height: `1.45`, `fontWeight: 800`)
    *   *Card Text*: `fontSize: 12` (line-height: `1.45`)

### C. Made for Different Types of Businesses
*   **Section Header**: `clamp(20px, 2.5vw, 32px)` (line-height: `1.2`)
*   **Business Type Cards**:
    *   *Card Title*: `fontSize: 12` (line-height: `1.45`, `fontWeight: 800`)
    *   *Card Text*: `fontSize: 12` (line-height: `1.45`)

### D. Less Switching. More Getting Things Done. Section (Efficiency Flow)
*   **Section Header**: `clamp(20px, 2.5vw, 32px)` (line-height: `1.2`)
*   **Section Body**: `fontSize: 12` (line-height: `1.45`)
*   **Efficiency Cards / Flow Nodes**: `fontSize: 12` (line-height: `1.45`, `fontWeight: 600`)

### E. Why Businesses Choose MessBee Section (Reason Cards)
*   **Section Header**: `clamp(20px, 2.5vw, 32px)` (line-height: `1.2`)
*   **Reason Cards**:
    *   *Card Title*: `fontSize: 12` (line-height: `1.45`, `fontWeight: 800`)
    *   *Card Text*: `fontSize: 12` (line-height: `1.45`)

### F. Built With Indian Businesses in Mind Section (Ghaziabad Office / SME info)
*   **Section Header**: `clamp(20px, 2.5vw, 32px)` (line-height: `1.2`, color: `#FFFFFF`)
*   **Section Body / Descriptions**: `fontSize: 12` (line-height: `1.45`, color: `#94A3B8`)
*   **CTA / Bottom Line highlight**: `fontSize: 12` (fontWeight: `700`, color: `#4ADE80`)

### G. Frequently Asked Questions (FAQ)
*   **Section Header**: `clamp(20px, 2.5vw, 32px)` (line-height: `1.2`)
*   **Faq Question Trigger**: `fontSize: 14.5` (line-height: `1.45`, `fontWeight: 700`)
*   **Faq Answer Text**: `fontSize: 12` (line-height: `1.45`)

### H. Final CTA Section (Your Customers Are Your Business)
*   **Section Header**: `clamp(20px, 2.5vw, 32px)` (line-height: `1.2`)
*   **Section Body**: `fontSize: 12` (line-height: `1.45`)
*   **Buttons**: `fontSize: 12.5` (Primary padding: `8px 18px`, `fontWeight: 700`)
