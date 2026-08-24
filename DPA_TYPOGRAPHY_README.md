# MessBee DPA Page — Typography & Design Guide

This file documents the exact typography specs, styling rules, and layout system implemented on the **Data Processing Agreement (DPA)** page ([DpaPage.jsx](file:///c:/Users/ACER/Desktop/landing page/landing page/src/components/company/DpaPage.jsx)).

---

## 1. Scope

All overrides are scoped under the `.dpa-page-wrapper` class applied to the outermost `<div>` of the component. This prevents style leakage into Navbar, Footer, or other pages.

---

## 2. Typography Tokens

| Element | Description / Use Case | Sizing / Rules | Font Weight |
| :--- | :--- | :--- | :--- |
| **Main Headings** | Page title (`h1`) & section headers (`h2`) | `clamp(20px, 2.5vw, 32px)` | `900` (letter-spacing: `-0.5px`) |
| **Subheadings & Card Titles** | Standard card titles (`h3`, `h4`) | `12px` | `800` |
| **Body Paragraphs** | Standard description paragraphs & agreement text (`p`) | `12px` | `400` (line-height: `1.7`) |
| **ToC Sidebar Items** | Table of Contents navigation items (`.toc-item`) | `12px` | `500` / `700` (active) |

> ⚠️ **Constraint Reminder**: No text colors are altered. Only layout, font sizing, weights, and paddings are overridden to maintain dark/light contrast integrity.

---

*Last Updated: 2026-08-24*
