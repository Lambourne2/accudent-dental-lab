# Product Requirements Document (PRD)

**Project:** Accudent Dental Lab Website Redesign & STL Upload Portal  
**Date:** 2025-06-10  
**Author:** Peyton Lambourne

---

## 1. Executive Summary
Accudent Dental Lab (West Jordan, UT) needs a modern, HIPAA-compliant website that showcases materials (e.max, BruxZir, Noritake, custom abutments), communicates guarantees & turnaround times, and—critically—provides an intuitive digital-upload workflow for STL files with account management, order history, and scanner-specific integration guides.

---

## 2. Background & Goals
- **Business Context:** Transition from analog case submission to a streamlined digital portal, reducing manual errors, improving turnaround, and strengthening customer loyalty.  
- **Primary Goals:**  
  1. **Increase digital submissions**   
  2. **Improve dentist satisfaction** 

---

## 3. Scope
**In-Scope**  
- Responsive website redesign (desktop + tablet + mobile)  
- Materials showcase pages  
- User registration & authentication  
- Multi-step STL upload wizard with metadata capture  
- Dashboard: submission history, status tracking  
- Scanner-specific “Add to Favorites” + “How to Send” guides  
- Contact / support pages + phone callbacks  
- Promotional banners (50% off 1st case, free shipping)
- Lab Slips PDF (downloadable)

**Out-of-Scope**  
- Direct STL-to-production automation (handled internally)  
- Full e-commerce checkout (no payments online)

---

## 4. Stakeholders
| Role                  | Name/Dept                   | Responsibilities                   |
|-----------------------|-----------------------------|------------------------------------|
| Product Owner         | Lab Director                | Vision, sign-off, prioritization   |
| UX/UI Lead            | Design Team                 | Wireframes, user testing           |
| Engineering Lead      | Web Dev Team                | Architecture, delivery             |
| QA Lead               | Quality Assurance           | Test plans, compliance checks      |
| Marketing             | Marketing Dept              | Content, promotions                |
| Customer Support      | Support Team                | FAQs, live chat/phone scripts      |
| End Users (Dentists)  | External customers          | Feedback, testing                  |

---

## 5. User Personas
1. **Dr. Smith, General Dentist**  
   - **Needs:** Fast case turnaround, simple digital uploads, clear pricing.  
   - **Tech Comfort:** Moderate; uses CEREC daily.

2. **Dr. Patel, Specialist Prosthodontist**  
   - **Needs:** Detailed material specs, high-strength zirconia, esthetic layering.  
   - **Tech Comfort:** High; multiple scanner platforms.

3. **Lab Coordinator, Small Dental Group**  
   - **Needs:** Bulk uploads, account management, shipping labels.  
   - **Tech Comfort:** Moderate; values clear workflows.

---

## 6. High-Level User Flows
1. **New Visitor → Learn Materials → Contact Us**  
2. **New Visitor → Register → Upload Case (STL wizard)**  
3. **Returning User → Login → Dashboard → Check Status**  

---

## 7. Functional Requirements

### 7.1. Homepage
- **Hero banner** with value prop: “Send STL. Free Shipping. 5-8 Day Turnaround.”  
- **Primary CTAs:** “Register / Login” and “Print Lab Slips”  
- **Promotional strip:** “50% off first case (up to 3 units) + free shipping”  
- **Quick links:** Materials · Send a Case · Contact Us

### 7.2. Materials Catalog
- **Material overview cards:**  
  - **e.max** – 400 MPa press, 360 MPa CAD; esthetic layering; first-case discount.  
  - **BruxZir Full Strength** – 1300 MPa; lifetime guarantee.  
  - **BruxZir Esthetic** – 870 MPa; anterior esthetics.  
  - **3D Zirconia** – 1050 MPa.  
  - **Translucent Zirconia** – 870 MPa.  
  - **Noritake CZR** – PFM alternative; best chipping resistance.  
  - **Custom Implant Abutments** – Titanium, Zirconia, Hybrid.  
- **Detailed pages** with charts (flexural strength), micrographs, guarantees, clinical notes, pricing table.

### 7.3. Registration & Authentication
- **Sign up / Login** via email + password (with email verification).  
- **Forgot password**, **Two-factor authentication** optional.  

### 7.4. STL Upload Wizard
1. **Step 1: Case Details**  
   - Patient Name (text)  
   - Shade (text)   
2. **Step 2: Material & Product Selection**  
   - Material Type (dropdown)  
   - Product Subtype (bridge, crown, implant abutment)  
   - Bridge selection (unit count)  
3. **Step 3: File Upload**  
   - Drag-&-drop STL only (max 100 MB)  
   - Preview filename + timestamp  
4. **Step 4: Design Comments** (free text, 1000 chars)  
5. **Step 5: Review & Submit**  
   - Auto-fill submission date  
   - “Submit” button → confirmation modal + email notification

### 7.5. User Dashboard
- **Overview:** Pending, In-Production, Completed  
- **Case List:**  
  - Case #, Patient, Material, Submission Date, Status  
  - Quick-actions: “View Details” / “Duplicate Case” / “Download Shipping Label”  
- **Account Settings:** Profile, Notification Preferences

### 7.6. Contact & Support
- **Phone CTA:** “Call us: (801) 231-6161” (footer)  
- **Support form:** Subject, Message, Attachment (optional)  

### 7.7. Promotions & Banners
- **Global banner**: “Free shipping supplies & labels provided”  
- **Turnaround ticker**:  
  - BruxZir & e.max: 5 lab weekdays  
  - Custom abutments & PFM/CZR: 8 lab weekdays  
  - “Does not include transit time.”

---

## 8. Data & Storage Requirements
- **User data** (accounts, profiles): relational DB (PostgreSQL)  
- **STL files**: object storage (S3 or equivalent) with versioning   

---

## 9. Dependencies & Assumptions
- **Dependencies:**  
  - Lab branding assets (logos, images)
