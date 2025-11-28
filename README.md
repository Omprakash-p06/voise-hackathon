# SafeMaternity Frontend

A mobile‑first maternal health dashboard UI for **ASHA workers in rural India** to identify, prioritize, and manage high‑risk pregnancies using simple, rule‑based logic inspired by WHO and Government of India PMSMA guidelines.[web:136][web:138]

---

## Overview

This repository contains **only the frontend** for SafeMaternity. It is designed to:

- Demonstrate the full user flow for ASHAs using **dummy data in the browser** (no backend required).
- Be easily wired later to a Flask + SQLite backend and an optional ML risk model without changing the UX.
- Run on **low‑end Android phones** in rural settings with a simple, high‑contrast interface.

The frontend simulates how the system will behave once connected to real APIs: triage, risk calculation, follow‑up scheduling, adherence tracking, and vitals trend visualization.

---

## How the frontend works (demo mode)

In the current demo:

- All **patients, visits, vitals, risk scores, adherence records, and follow‑ups are hardcoded** in JavaScript objects/arrays inside the page.
- **No network calls** are made; every interaction is handled entirely in the browser.
- When you open the page, it:
  - Renders a **triage dashboard** of pregnant women with color‑coded risk levels.
  - Allows selecting a patient to see detailed info, risk result, and charts.
  - Lets you tick medication/diet checkboxes for “today” and see a simple adherence summary.
  - Updates the UI instantly when you interact (add visit, change selection, mark adherence).

This mode is ideal for hackathon demos and for validating UX flows before integrating a real backend.

---

## How it will work with the backend (intended behavior)

When wired to the Flask backend in the future, the same frontend will:

- Load patients, visits, and follow‑ups from API endpoints instead of dummy arrays.
- Send new visits to the backend, where:
  - The **rule‑based risk engine** (and optional ML model) computes risk level.
  - The backend schedules the next follow‑up and stores everything in SQLite.
- Receive back:
  - Updated risk category and score.
  - Text recommendations.
  - Next follow‑up date.
  - Trend data for Chart.js.
- Use the **same UI components**; only the data source (dummy vs API) changes.

The goal is: **no UX changes when moving from demo mode to production mode**—only the data layer is swapped.

---

## Frontend features

All of the following are implemented in the frontend:

### 1. Triage Dashboard

- Table/list of patients with:
  - Name, village, age.
  - Last visit date.
  - **Risk category** (Low/Moderate/High) shown as green/yellow/red badges.
  - Next follow‑up date.
  - Follow‑up status: Pending, Overdue, or Completed.
- Filter buttons:
  - Show **All**, **High Risk only**, or **Overdue only**.
- Clicking a patient row selects that patient and updates all detail panels.

### 2. Patient Details & Risk Result

- Details card for the selected patient:
  - Demographics and contact info (patient + ASHA + family contact).
  - Most recent visit: hemoglobin, systolic/diastolic BP, weight, symptoms.
- Risk calculation done **in JavaScript** using fixed rules:
  - Points added for risk factors (age outside safe range, low Hb, high BP, specific symptoms).
  - Mapped to LOW / MODERATE / HIGH risk and color‑coded.
- Recommendations section:
  - Bullet points such as “Take iron tablets twice daily”, “Eat high‑protein food”, “Visit PHC within 7/14 days”, “Recheck Hb on next visit”.
- Next follow‑up date displayed based on risk category.

### 3. Emergency Banner

- If risk is **HIGH**, a red emergency banner appears:
  - Message: “🚨 HIGH RISK – Refer immediately”.
  - Buttons with `tel:` links:
    - Call **108** (Ambulance).
    - Call **PHC** (dummy/demo number).
    - Call **Family** (taken from patient data).

### 4. Add Patient & Visit (Demo)

- Form to simulate adding/updating:
  - Patient info: name, age, phone, village, ASHA name, family contact.
  - Visit info: date, hemoglobin, systolic/diastolic BP, weight, symptoms.
- Submit button:
  - In demo mode, pushes new data into in‑memory arrays.
  - Recalculates risk and refreshes the dashboard and charts.
- Voice input button (optional demo):
  - Uses the Web Speech API (if supported) to **simulate** capturing vitals/symptoms from speech and prefill fields.

### 5. Follow‑up Scheduling

- After each visit, the frontend:
  - Simulates scheduling a next follow‑up (e.g., 14 days for high, 28 for moderate, 56 for low).
  - Compares follow‑up date to “today” to mark records as Pending or Overdue.
- Dashboard highlights overdue cases so ASHAs can prioritize them.

### 6. Medication & Dietary Adherence

- For the selected patient:
  - Checklist for **today**:
    - Iron – Morning.
    - Iron – Evening.
    - High‑protein food.
    - Rest.
  - When boxes are toggled:
    - The state is stored in memory.
    - A simple **7‑day adherence %** is recalculated for display.
- Visual representation:
  - Textual percentage.
  - Simple bar/pill UI to show overall adherence quality.

### 7. Vitals Trend Charts

- Two responsive **Chart.js** line charts for the selected patient:
  - **Hemoglobin over time** (visit dates on x‑axis).
  - **BP over time** (systolic and diastolic lines on a shared chart).
- Data points come from dummy visit history arrays in demo mode.
- When another patient is selected:
  - Charts are updated with that patient’s series.

### 8. Rural‑friendly UI / UX

- Mobile‑first layout, works in a browser on a low‑end Android phone.
- High‑contrast colors, large tap targets, simple English with optional Hindi hints.
- No heavy assets, no complex animations—kept light for performance and offline usage.

---

## Tech stack (frontend only)

- **HTML5** – structure and semantic layout.
- **CSS3** – inline `<style>` or separate `style.css` for styling.
- **Vanilla JavaScript** – all logic (risk scoring, filtering, charts, dummy state).
- **Bootstrap 5 (CDN)** – grid and basic components.
- **Chart.js (CDN)** – vitals trend charts.
- **Web Speech API (optional)** – demo of voice‑assisted data entry (no server side).

---

## Project structure (example)

If using a three‑file structure:

