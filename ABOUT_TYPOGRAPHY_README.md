# MessBee About Page — Typography & Design Guide

This file documents the exact typography specs, styling rules, and layout system implemented on the **About** page ([AboutPage.jsx](file:///c:/Users/ACER/Desktop/landing page/landing page/src/components/company/AboutPage.jsx)).

---

## 1. Core Design Tokens & Rules

All elements across every section on the page adhere to the following unified scaling system:

| Element | Description / Use Case | Desktop Size | Mobile Size | Font Weight | Color Code | Line Height |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Main Section Headings** | Section titles (e.g. *What Is MessBee?*) | `36px` (`2.25rem`) | `26px` | `800 / 900` (Extra Bold) | `#0F172A` / `#0B192C` | `1.2` |
| **Main Description Body** | Standard paragraphs explaining services | `15.5px` (`0.95rem`) | `14px` | `400 / 500` (Regular/Medium) | `#475569` / `#64748B` | `1.65` |
| **Left Side Card Heading** | Big bold cards (e.g. *Built for the Way...*) | `25px` (`1.50rem`) | `20px` | `800` (Extra Bold) | `#0F172A` | `1.25` |
| **Left Side Subdescription** | Under big card headings | `13.5px` (`0.85rem`) | `12px` | `400` (Regular) | `#64748B` | `1.5` |
| **Card Title (Standard)** | Headers for steps, timeline, chooses, vision, FAQs | `12px` | `12px` | `800` (Extra Bold) | `#0F172A` | `1.45` |
| **Card Description (Standard)** | Text details inside timelines, chooses, vision, FAQs, tenets | `12px` | `12px` | `400` (Regular) | `#64748B` | `1.45` |
| **Action Buttons (Primary)** | Primary action buttons (Hero, Core, Bottom) | `12.5px` | `12.5px` | `700` (Bold) | `#FFFFFF` (padding: `8px 18px`) | Standard |
| **Action Buttons (Secondary)** | Secondary action buttons (Hero, Bottom) | `12.5px` | `12.5px` | `600` (Medium) | dynamic (padding: `10px 20px`) | Standard |
| **Action Buttons (Small)** | Card/Minor actions (Manifesto) | `12px` | `11.5px` | `700` (Bold) | dynamic | Standard |

---

## 2. Section-wise Typography Implementations

### A. Hero Section (India's Digital Business Operating System)
*   **Main Headline**: `clamp(20px, 2.5vw, 32px)` (line-height: `1.2`)
*   **Description**: `fontSize: 12`
*   **Sublead / Highlight Texts**: `fontSize: 12`
*   **Buttons**: `fontSize: 12.5` (Primary padding: `8px 18px`, Secondary padding: `10px 20px`, `fontWeight: 700 / 600`)

### B. What Is MessBee? Section
*   **Section Header**: `clamp(20px, 2.5vw, 32px)` (line-height: `1.2`)
*   **Sub-lead Statement**: `fontSize: 12` (line-height: `1.45`, `fontWeight: 800`)
*   **Section Body**: `fontSize: 12` (line-height: `1.45`)
*   **Objective Callout**: `fontSize: 12` (line-height: `1.45`)
*   **Capability Pills**: `fontSize: 13` (line-height: `1.35`, `fontWeight: 600`, padding: `8px 18px`, gap: `8`)
*   **Buttons**: `fontSize: 12.5` (padding: `8px 18px`, `fontWeight: 700`)

### C. Built for the Way Indian Businesses Operate
*   **Section Header**: `clamp(20px, 2.5vw, 32px)` (line-height: `1.2`)
*   **Lead Subheading**: `fontSize: 12` (line-height: `1.45`, `fontWeight: 800`)
*   **Section Body**: `fontSize: 12` (line-height: `1.45`)
*   **Sub-Section Heading**: `clamp(20px, 2.5vw, 32px)` (line-height: `1.2`)
*   **Spacing**: Top padding reduced to `40px` and margin-top reset to `0px` to shift the section upward.

### D. Growth Step Cards (Vertical Timeline)
*   **Card Title**: `fontSize: 12` (line-height: `1.45`, `fontWeight: 800`)
*   **Card Text**: `fontSize: 12` (line-height: `1.45`)

### E. Everything Your Business Needs, Connected (Slider Carousel)
*   **Section Header**: `clamp(28px, 3.5vw, 42px)` (line-height: `1.18`)
*   **Section Body / Description**: `fontSize: 16` (line-height: `1.6`)
*   **Slider Carousel Card**:
    *   *Card Dimensions*: `width: 360px`, `height: 440px` (decreased by 50px for a more compact vertical layout)
    *   *Card Title*: `fontSize: 12` (line-height: `1.45`, `fontWeight: 800`)
    *   *Card Text*: `fontSize: 12` (line-height: `1.45`)

### F. API Connectivity & Integration Section
*   **Section Header**: `clamp(20px, 2.5vw, 32px)` (line-height: `1.2`)
*   **Highlight Callout**: `fontSize: 12` (line-height: `1.45`, `fontWeight: 800`)
*   **Technology Tag Pills**: `fontSize: 12`
*   **Section Body**: `fontSize: 12` (line-height: `1.45`)

### G. Built for Different Industries (Carousel Grid)
*   **Section Header**: `clamp(20px, 2.5vw, 32px)` (line-height: `1.2`)
*   **Filter Tab Buttons**: `fontSize: 12`
*   **Industry Cards**:
    *   *Card Title*: `fontSize: 12` (line-height: `1.45`, `fontWeight: 800`)
    *   *Card Text*: `fontSize: 12` (line-height: `1.45`)

### H. Why Businesses Choose MessBee
*   **Section Header**: `clamp(20px, 2.5vw, 32px)` (line-height: `1.2`)
*   **Choose Cards**:
    *   *Card Title*: `fontSize: 12` (line-height: `1.45`, `fontWeight: 800`)
    *   *Card Text*: `fontSize: 12` (line-height: `1.45`)

### I. Beyond Messaging (Customer Journey Flow Pills)
*   **Section Header**: `clamp(20px, 2.5vw, 32px)` (line-height: `1.2`)
*   **Journey Pills / Descriptions**:
    *   *Pill Title*: `fontSize: 12` (line-height: `1.45`, `fontWeight: 800`)
    *   *Description Body*: `fontSize: 12` (line-height: `1.45`)

### J. Our Philosophy (Manifesto & Pillars)
*   **Section Header**: `clamp(20px, 2.5vw, 32px)` (line-height: `1.2`)
*   **Principle Callout Title**: `fontSize: 12` (line-height: `1.45`, `fontWeight: 800`)
*   **Principle Callout Body**: `fontSize: 12` (line-height: `1.45`)
*   **Pillars Cards**:
    *   *Pillar Title*: `fontSize: 12` (line-height: `1.45`, `fontWeight: 800`)
    *   *Pillar Text*: `fontSize: 12` (line-height: `1.45`)
*   **Buttons**: `fontSize: 12` (padding: `8px 18px`, `fontWeight: 700`)

### K. Designed to Grow (Scalable Growth Columns)
*   **Section Header**: `clamp(20px, 2.5vw, 32px)` (line-height: `1.2`)
*   **Subheadings**: `fontSize: 12` (line-height: `1.45`, `fontWeight: 800`)
*   **Growth Phase Pills**: `fontSize: 12` (line-height: `1.45`)
*   **Bottom Statement Callout**: `fontSize: 12` (line-height: `1.45`)

### L. Security, Privacy & Responsible Tech
*   **Section Header**: `clamp(20px, 2.5vw, 32px)` (line-height: `1.2`)
*   **Highlight Callouts / Headers**: `fontSize: 12` (line-height: `1.45`, `fontWeight: 800`)
*   **Pill items**: `fontSize: 12` (line-height: `1.45`)
*   **Left Shift**: Shipped upward slightly using `transform: "translateY(-20px)"` for visual balance next to the security grid.

### M. Our Mission Section
*   **Section Header**: `clamp(20px, 2.5vw, 32px)` (line-height: `1.2`)
*   **Aim Grid items**: `fontSize: 12` (line-height: `1.45`)
*   **Left Shift**: Shipped upward slightly using `transform: "translateY(-20px)"` for visual balance next to the mission objectives grid.

### N. Our Vision Section
*   **Section Header**: `clamp(20px, 2.5vw, 32px)` (line-height: `1.2`)
*   **Vision Cards**:
    *   *Card Title*: `fontSize: 12` (line-height: `1.45`, `fontWeight: 800`)
    *   *Vision Banner / Text*: `fontSize: 12` (line-height: `1.45`)

### O. Our Leadership (Corporate Structure)
*   **Section Header**: `clamp(20px, 2.5vw, 32px)` (line-height: `1.2`)
*   **Highlight Statements / Bio**: `fontSize: 12` (line-height: `1.45`, `fontWeight: 800`)
*   **Leadership Tenets Cards**:
    *   *Tenet Title*: `fontSize: 12` (line-height: `1.45`, `fontWeight: 800`)
*   **Left Shift**: Shipped upward slightly using `transform: "translateY(-20px)"` for visual balance next to the leadership tenets card grid.

### P. Frequently Asked Questions (FAQ)
*   **Section Header**: `clamp(20px, 2.5vw, 32px)` (line-height: `1.2`)
*   **Faq Question Trigger**: `fontSize: 14.5` (line-height: `1.45`, `fontWeight: 700`)
*   **Faq Answer Text**: `fontSize: 12` (line-height: `1.45`)

### Q. The MessBee Promise
*   **Section Header**: `clamp(20px, 2.5vw, 32px)` (line-height: `1.2`)
*   **Promise Card Background**: `linear-gradient(135deg, #16A34A 0%, #15803D 100%)` (vibrant brand green)
*   **Promise Texts / Verbs / Editorial Quotes**:
    *   *Headings / Quotes*: `fontSize: 12` (line-height: `1.45`, `fontWeight: 800`)
    *   *Main Body*: `fontSize: 12` (line-height: `1.45`)

### R. Bottom CTA Section
*   **Section Header**: `clamp(20px, 2.5vw, 32px)` (line-height: `1.2`)
*   **CTA Paragraph Details**: `fontSize: 12` (line-height: `1.45`)
*   **Buttons**: `fontSize: 12.5` (Primary padding: `8px 18px` for Get Started, Secondary padding: `10px 20px` for Contact Support)
