# MessBee Contact Support Page — Typography & Design Guide

This file documents the exact typography specs, styling rules, and layout system implemented on the **Contact Support** page ([ContactPage.jsx](file:///c:/Users/ACER/Desktop/landing page/landing page/src/components/resources/ContactPage.jsx)).

---

## 1. Scope

All overrides are scoped under the `.contact-support-page-wrapper` class applied to the outermost `<div>` of the component. This prevents style leakage into Navbar, Footer, or other pages.

---

## 2. Typography Tokens

| Element | Description / Use Case | Sizing / Rules | Font Weight |
| :--- | :--- | :--- | :--- |
| **Main Headings** | Page title (`h1`) & section headers (`h2`) | `clamp(20px, 2.5vw, 32px)` | `900` (letter-spacing: `-0.5px`) |
| **Subheadings & Card Titles** | Standard card titles (`h3`, `h4`) | `12px` | `800` |
| **Body Paragraphs** | Standard description paragraphs (`p`) | `12px` | `400` (line-height: `1.7`) |
| **Form Fields** | Input boxes, dropdowns & textareas (`input`, `select`, `textarea`) | `12px` | `400` |

> ⚠️ **Constraint Reminder**: No text colors are altered. Only layout, font sizing, weights, and paddings are overridden to maintain dark/light contrast integrity.

---

## 3. Button Sizing

| Button Type | Target Selector | Font Size | Font Weight | Padding |
| :--- | :--- | :--- | :--- | :--- |
| **Primary Button** | `.contact-btn-primary` | `12.5px` | `700` | `8px 18px` |
| **Secondary Button** | `.contact-btn-secondary` | `12.5px` | `600` | `10px 20px` |

---

*Last Updated: 2026-08-24*
