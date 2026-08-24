# MessBee Privacy Page — Typography & Design Guide

This file documents the exact typography specs, styling rules, and layout system implemented on the **Privacy Policy** page ([PrivacyPage.jsx](file:///c:/Users/ACER/Desktop/landing page/landing page/src/components/company/PrivacyPage.jsx)).

---

## 1. Scope

All overrides are scoped under the `.privacy-page-wrapper` class applied to the outermost `<div>` of the component. This prevents style leakage into Navbar, Footer, or other pages.

---

## 2. Typography Tokens

| Element | Description / Use Case | Sizing / Rules | Font Weight |
| :--- | :--- | :--- | :--- |
| **Main Headings** | Page title (`h1`) & section headers (`h2`) | `clamp(20px, 2.5vw, 32px)` | `900` (letter-spacing: `-0.5px`) |
| **Subheadings & Card Titles** | Standard card titles (`h3`, `h4`) | `12px` | `800` |
| **Body Paragraphs** | Standard description paragraphs & policy text (`p`) | `12px` | `400` (line-height: `1.7`) |
| **ToC Sidebar Items** | Table of Contents navigation items (`.toc-item`) | `12px` | `500` / `700` (active) |

> ⚠️ **Constraint Reminder**: No text colors are altered. Only layout, font sizing, weights, and paddings are overridden to maintain dark/light contrast integrity.

---

*Last Updated: 2026-08-24*
