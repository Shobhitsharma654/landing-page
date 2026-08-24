# MessBee QR & Connect — Typography & Design Guide

This file documents the exact typography specs, styling rules, and layout system implemented on the **QR & Connect** landing page ([QrConnectPage.jsx](file:///c:/Users/ACER/Desktop/landing%20page/landing%20page/src/components/QrConnectPage.jsx)).

---

## 1. Core Design Tokens & Rules

All elements across every section on the page adhere to the following unified scaling system:

| Element | Description / Use Case | Desktop Size | Mobile Size | Font Weight | Color Code | Line Height |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Main Section Headings** | Section titles (e.g. *What is QR & Connect?*) | `36px` (`2.25rem`) | `26px` | `800 / 900` (Extra Bold) | `#0F172A` / `#0B192C` | `1.2` |
| **Main Description Body** | Standard paragraphs explaining services | `15.5px` (`0.95rem`) | `14px` | `400 / 500` (Regular/Medium) | `#475569` / `#64748B` | `1.65` |
| **Left Side Card Heading** | Big bold cards (e.g. *One QR Code. Unlimited Possibilities.*) | `25px` (`1.50rem`) | `20px` | `800` (Extra Bold) | `#0F172A` | `1.25` |
| **Left Side Subdescription** | Under big card headings | `13.5px` (`0.85rem`) | `12px` | `400` (Regular) | `#64748B` | `1.5` |
| **Feature Card Sub-Heading** | Title inside individual feature grids | `14.5px` (`0.90rem`) | `13px` | `700` (Bold) | `#0F172A` | `1.3` |
| **Feature Card Description** | Body text inside individual feature grids | `12.5px` (`0.78rem`) | `11.5px` | `400` (Regular) | `#64748B` | `1.4` |

---

## 2. Section-wise Typography Implementations

### A. Hero Section (Every Scan. A New Customer.)
*   **Main Headline**: `clamp(20px, 2.5vw, 32px)` (line-height: `1.2`)
*   **Description**: `fontSize: 12`
*   **Left Shift**: Shipped upward slightly using `transform: "translateY(-20px)"` for visual balance next to the graphic mockup.

### B. What is QR & Connect?
*   **Section Header**: `clamp(20px, 2.5vw, 32px)` (line-height: `1.2`)
*   **Left Card Title**: `fontSize: 18` (line-height: `1.2`)
*   **Left Card Body**: `fontSize: 11` (line-height: `1.4`)
*   **Highlight Cards**:
    *   *Titles*: `fontSize: 12` (line-height: `1.45`, `fontWeight: 800`)
    *   *Details*: `fontSize: 10` (line-height: `1.45`)

### C. All QR & Connect Features
*   **Section Title**: `clamp(20px, 2.5vw, 32px)` (line-height: `1.2`)
*   **Subtitle Description**: `fontSize: 12`
*   **Feature Cards Grids**:
    *   *Card Title*: `fontSize: 12` (line-height: `1.3`, `fontWeight: 800`)
    *   *Card Text*: `fontSize: 10` (line-height: `1.45`)

### D. Why Businesses Love QR & Connect
*   **Section Title**: `clamp(20px, 2.5vw, 32px)`
*   **Love Cards**:
    *   *Card Title*: `fontSize: 12` (`fontWeight: 800`)
    *   *Card Text*: `fontSize: 10` (line-height: `1.45`)

### E. How It Works?
*   **Section Title**: `clamp(20px, 2.5vw, 32px)`
*   **Step Cards**:
    *   *Card Title*: `fontSize: 12` (`fontWeight: 800`)
    *   *Card Text*: `fontSize: 10` (line-height: `1.45`)

### F. CTA Banner (Ready to turn every scan...)
*   **Banner Title**: `clamp(20px, 2.5vw, 32px)` (line-height: `1.2`)
*   **Banner Description**: `fontSize: 10` (line-height: `1.45`)
