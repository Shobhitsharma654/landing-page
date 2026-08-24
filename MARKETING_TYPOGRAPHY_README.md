# MessBee Marketing Automation Page — Typography & Design Guide

This file documents the exact typography specs, styling rules, and layout system implemented on the **Marketing Automation** page ([MarketingPage.jsx](file:///c:/Users/ACER/Desktop/landing page/landing page/src/components/product/MarketingPage.jsx)).

---

## 1. Scope

All overrides are scoped under the `.marketing-automation-page-wrapper` class applied to the outermost `<div>` of the component. This prevents style leakage into Navbar, Footer, or other pages.

---

## 2. Typography Tokens

| Element | Description / Use Case | Sizing / Rules | Font Weight |
| :--- | :--- | :--- | :--- |
| **Main Headings** | Page title (`h1`) & section headers (`h2`) | `clamp(20px, 2.5vw, 32px)` | `900` (letter-spacing: `-0.5px`) |
| **Subheadings & Card Titles** | Standard card titles (`h3`, `h4`) | `12px` | `800` |
| **Body Paragraphs** | Standard description paragraphs (`p`) | `12px` | `400` (line-height: `1.7`) |
| **FAQ Trigger / Question** | Accordion trigger titles (`.fqt`) | `14.5px` | `700` |
| **FAQ Answer Body** | Accordion expanded answer text (`.mkt-faq-answer`) | `12px` | `400` (line-height: `1.8`) |

> ⚠️ **Constraint Reminder**: No text colors are altered. Only layout, font sizing, weights, and paddings are overridden to maintain dark/light contrast integrity.

---

## 3. Button Sizing

| Button Type | Target Selector | Font Size | Font Weight | Padding |
| :--- | :--- | :--- | :--- | :--- |
| **Primary Button** | `.gbtn` | `12.5px` | `700` | `8px 18px` |
| **Secondary Button** | `.dbtn` | `12.5px` | `600` | `10px 20px` |

---

*Last Updated: 2026-08-24*
