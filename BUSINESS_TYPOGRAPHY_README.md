# MessBee Business Directory Page — Typography & Design Guide

This file documents the exact typography specs, styling rules, and layout system implemented on the **Business Directory** page ([BusinessPage.jsx](file:///c:/Users/ACER/Desktop/landing page/landing page/src/components/BusinessPage.jsx)).

---

## 1. Core Design Tokens & Rules

All elements across every section on the page adhere to the following unified scaling system:

| Element | Description / Use Case | Desktop Size | Mobile Size | Font Weight | Color Code | Line Height |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Main Section Headings** | Section titles (e.g. *Discover businesses*) | `32px` (`2.00rem`) | `24px` | `900` (Extra Bold) | `#FFFFFF` (Hero / CTA) | `1.2` |
| **Main Description Body** | Standard paragraphs / subtitles | `12px` | `12.5px` | `400` (Regular) | `#64748B` / `#9CA3AF` | `1.45` |
| **Card / Item Title** | Headers for listed business cards (`.biz-card-title`) | `12px` | `12px` | `800` (Extra Bold) | `#111827` | `1.45` |
| **Card / Item Description** | Text details inside business cards | `12px` | `12px` | `400` (Regular) | `#64748B` | `1.45` |
| **Action Buttons (Primary)** | Primary action buttons (Search, List Business) | `12.5px` | `12.5px` | `700` (Bold) | `#FFFFFF` (padding: `8px 18px`) | Standard |
| **Action Buttons (Secondary)** | Secondary action buttons (Learn About Us) | `12.5px` | `12.5px` | `600` (Medium) | `#E4E4E7` (padding: `10px 20px`) | Standard |
| **Category Pill / Badge** | Category button filters (`.cat-pill`) | `12px` | `12px` | `600` (Semi Bold) | dynamic | Standard |

---

## 2. Section-wise Typography Implementations

### A. Hero Section (Discover businesses powered by MessBee)
*   **Main Headline**: `clamp(20px, 2.5vw, 32px)` (line-height: `1.2`)
*   **Description**: `fontSize: 12` (color: `#9CA3AF`)
*   **Search Input Button**: `fontSize: 12.5` (Primary padding: `8px 18px`, `fontWeight: 700`)

### B. Business Listing Directory Section
*   **Category Filter Pills**: `fontSize: 12` (line-height: `1.45`, `fontWeight: 600`)
*   **Listed Business Cards**:
    *   *Card Title*: `fontSize: 12` (line-height: `1.45`, `fontWeight: 800`)
    *   *Card Text*: `fontSize: 12` (line-height: `1.45`)
    *   *Category & Location Badge*: `fontSize: 11`

### C. List Your Business Section (CTA)
*   **Section Header**: `clamp(20px, 2.5vw, 32px)` (line-height: `1.2`)
*   **Section Body / Description**: `fontSize: 12` (line-height: `1.45`, color: `#9CA3AF`)
*   **Buttons**: `fontSize: 12.5` (Primary padding: `8px 18px`, Secondary padding: `10px 20px`, `fontWeight: 700 / 600`)
