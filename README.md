# 🩸 Blood Donation & Emergency Platform

BloodPulse is an enterprise-grade, responsive full-stack web platform designed to seamlessly manage emergency blood requests, real-time donor connections, and advanced AI-powered clinical triage. Built using the Next.js App Router architecture with a balanced Server and Client component approach, it ensures high performance, secure route handling, and an exceptionally smooth user experience.

## 🌐 Quick Links & Live Demos
- **Live Frontend Application:** [Explore Frontend UI](https://frontend-fullstack-project-assignme-seven.vercel.app)
- **Live Backend API Service:** [Explore Backend API](https://blood-donation-emergency-platform-eosin.vercel.app)
- **Frontend Repository:** [View Client Code](https://github.com/abdulalimax/Frontend-Fullstack-Project-Assignment)
- **Backend Repository:** [View Server Code](https://github.com/abdulalimax/Blood-Donation-Emergency-Platform)
- **API Documentation:** [View Postman Docs](https://documenter.getpostman.com/view/55173835/2sBYHQ2NT6)

## ✨ Core Capabilities & Features
- **AI Clinical Triage Assistant:** Integrated smart hybrid AI engine (supporting both local clinical intelligence and real-time LLM fallback) to provide accurate, multi-language (Bengali/English) answers regarding donor eligibility, hemoglobin levels, and ABO blood group compatibility.
- **Role-Based Architecture:** Distinct role-based navigation and Next.js Middleware route security tailored for 3 user types: Admin, Recipient/User, and Donor/Provider.
- **One-Click Demo Authentication:** Instant 1-click demo login credentials on the login page for quick role-based access verification and testing.
- **Stripe Checkout Pipeline:** Integrated official Stripe test gateway and dedicated success ledger flow to process emergency operational verification fees securely.
- **Data Integrity & Validation:** Seamless real-time client-side error handling powered by React Hook Form and strict Zod schema validation.
- **Data Visualization & Analytics:** Interactive admin dashboard tracking donor availability and emergency distribution metrics using Recharts.
- **Mobile-First UX:** Fully responsive, accessible, and consistent UI design system crafted with Tailwind CSS and shadcn/ui.

## 🛠️ Technology Stack & Ecosystem
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling & UI:** Tailwind CSS, shadcn/ui, Sonner (Toast Notifications)
- **Form & Validation:** React Hook Form, Zod
- **Payments:** Stripe Gateway
- **Data Visualization:** Recharts
- **Deployment & Tooling:** Vercel, Git, GitHub

## 📂 Repository Structure
```text
bloodpulse-platform/
├── app/                  # Next.js App Router pages & layouts
├── components/           # Reusable shadcn/ui and custom components
├── lib/                  # Utility functions and Zod validation schemas
├── public/               # Static assets and images
├── styles/               # Global CSS styles
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
⚙️ Local Installation & Setup
To run this project locally on your machine, follow these steps:

Clone the repository:

Bash
git clone [https://github.com/abdulalimax/Frontend-Fullstack-Project-Assignment.git](https://github.com/abdulalimax/Frontend-Fullstack-Project-Assignment.git)
cd Frontend-Fullstack-Project-Assignment
Install dependencies:

Bash
npm install
Configure environment variables:
Create a .env.local file in the root directory and add your keys:

Code snippet
NEXT_PUBLIC_API_URL=your_backend_or_local_api_url
STRIPE_PUBLIC_KEY=your_stripe_publishable_key
Run the development server:

Bash
npm run dev
Open in browser:
Navigate to http://localhost:3000 to view the application.
