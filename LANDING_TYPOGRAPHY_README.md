# MessBee Landing Page — Typography & Design Guide

This file documents the exact typography specs, styling rules, and layout system implemented on the **Landing Page** ([LandingPage.jsx](file:///c:/Users/ACER/Desktop/landing page/landing page/src/components/LandingPage.jsx)).

---

## 1. Scope

All overrides are scoped under the `.landing-page-wrapper` class applied to the outermost `<div>` of the component. This prevents style leakage into Navbar, Footer, or other pages.

---

## 2. Typography Tokens

| Element | Description / Use Case | Sizing / Rules | Font Weight |
| :--- | :--- | :--- | :--- |
| **Main Headings** | Page title (`h1`) & section headers (`h2`) | `clamp(20px, 2.5vw, 32px)` | `900` (letter-spacing: `-0.5px`) |
| **Subheadings & Card Titles** | Standard card titles (`h3`, `h4`) | `12px` | `800` |
| **Body Paragraphs** | Standard description paragraphs (`p`) | `12px` | `400` (line-height: `1.7`) |

> ⚠️ **Constraint Reminder**: No text colors are altered. Only layout, font sizing, weights, and paddings are overridden to maintain dark/light contrast integrity.

---

## 3. Button Sizing

| Button Type / Area | Target Selector | Font Size | Font Weight | Padding |
| :--- | :--- | :--- | :--- | :--- |
| **All Action Buttons** | Hero, Newsletter, Razerpay, Pricing & CTA buttons | `12.5px` | `700` | `8px 18px` |

---

*Last Updated: 2026-08-24*
