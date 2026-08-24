# MessBee E-commerce Page — Typography & Design Guide

This file documents the exact typography specs, styling rules, and layout system implemented on the **E-commerce Solutions** page ([EcommercePage.jsx](file:///c:/Users/ACER/Desktop/landing page/landing page/src/components/solutions/EcommercePage.jsx)).

---

## 1. Core Design Tokens & Rules

All elements across every section on the page adhere to the following unified scaling system:

| Element | Description / Use Case | Desktop Size | Mobile Size | Font Weight | Color Code | Line Height |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Main Section Headings** | Section titles (e.g. *Connected Customer Journey*) | `32px` (`2.00rem`) | `24px` | `900` (Extra Bold) | `#0F172A` | `1.2` |
| **Main Description Body** | Standard paragraphs explaining e-commerce flows | `12px` | `12.5px` | `400` (Regular) | `#475569` | `1.45` |
| **Card / Item Title** | Headers for workflow tools, reason cards | `12px` | `12px` | `800` (Extra Bold) | `#0F172A` | `1.45` |
| **Card / Item Description** | Text details inside features, reason cards | `12px` | `12px` | `400` (Regular) | `#64748B` | `1.45` |
| **Action Buttons (Primary)** | Primary action buttons (Hero, CTA) | `12.5px` | `12.5px` | `700` (Bold) | `#FFFFFF` (padding: `8px 18px`) | Standard |
| **Action Buttons (Secondary)** | Secondary action buttons (Explore MessBee) | `12.5px` | `12.5px` | `600` (Medium) | `#0F172A` (padding: `10px 20px`) | Standard |
| **Faq Question Trigger** | Accordion FAQ question trigger button | `14.5px` | `14px` | `700` (Bold) | `#0F172A` | `1.45` |

---

## 2. Section-wise Typography Implementations

### A. Hero Section (E-commerce Solutions to Manage...)
*   **Main Headline**: `clamp(20px, 2.5vw, 32px)` (line-height: `1.2`)
*   **Sublead / Highlight Texts**: `fontSize: 12`
*   **Description**: `fontSize: 12`
*   **Buttons**: `fontSize: 12.5` (Primary padding: `8px 18px`, Secondary padding: `10px 20px`, `fontWeight: 700 / 600`)

### B. Connected Customer Journey Section
*   **Section Header**: `clamp(20px, 2.5vw, 32px)` (line-height: `1.2`)
*   **Journey Step Cards**:
    *   *Step Title*: `fontSize: 12` (line-height: `1.45`, `fontWeight: 800`)
    *   *Step Text*: `fontSize: 12` (line-height: `1.45`)

### C. Tools for Your E-commerce Workflow Section
*   **Section Header**: `clamp(20px, 2.5vw, 32px)` (line-height: `1.2`)
*   **Workflow Cards**:
    *   *Card Title*: `fontSize: 12` (line-height: `1.45`, `fontWeight: 800`)
    *   *Card Text*: `fontSize: 12` (line-height: `1.45`)

### D. Why E-commerce Businesses Choose MessBee Section
*   **Section Header**: `clamp(20px, 2.5vw, 32px)` (line-height: `1.2`)
*   **Reason Cards**:
    *   *Card Title*: `fontSize: 12` (line-height: `1.45`, `fontWeight: 800`)
    *   *Card Text*: `fontSize: 12` (line-height: `1.45`)

### E. Built With Indian Businesses in Mind Section (Ghaziabad Office / SME info)
*   **Section Header**: `clamp(20px, 2.5vw, 32px)` (line-height: `1.2`, color: `#FFFFFF`)
*   **Section Body / Descriptions**: `fontSize: 12` (line-height: `1.45`, color: `#94A3B8`)
*   **CTA / Bottom Line highlight**: `fontSize: 12` (fontWeight: `700`, color: `#4ADE80`)

### F. Frequently Asked Questions (FAQ)
*   **Section Header**: `clamp(20px, 2.5vw, 32px)` (line-height: `1.2`)
*   **Faq Question Trigger**: `fontSize: 14.5` (line-height: `1.45`, `fontWeight: 700`)
*   **Faq Answer Text**: `fontSize: 12` (line-height: `1.45`)

### G. Final CTA Section (The tools you use...)
*   **Section Header**: `clamp(20px, 2.5vw, 32px)` (line-height: `1.2`)
*   **Section Body**: `fontSize: 12` (line-height: `1.45`)
*   **Buttons**: `fontSize: 12.5` (Primary padding: `8px 18px`, `fontWeight: 700`)
