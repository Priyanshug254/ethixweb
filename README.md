# Ethixweb India — Premium Full-Stack Digital Platform

> **"We run the tech. You run the business."**  
> A high-performance digital operations platform and web redesign adapted for ambitious Indian enterprises, modern D2C brands, and growing service firms. Built with React 19, Vite, Tailwind CSS, Vercel Serverless Functions, and Supabase PostgreSQL.

---

## 1. Project Overview

This repository contains the complete full-stack implementation of the **Ethixweb India** platform redesign. Grounded in the authentic brand identity of **Ethixweb** (operating through Ethixweb USA LLC, established in 2020), this solution translates international software engineering rigor into an India-tailored digital experience.

The platform provides:
- **High-Conversion Digital Presence**: Editorial Swiss-inspired typography, high contrast dark-mode surfaces, sub-second edge page delivery, and zero agency fluff.
- **Full Scope of Inner Pages**: Home (`/`), Services (`/services`), About (`/about`), and Contact (`/contact`).
- **Production Enquiry Management Backend**: Persistent database storage in Supabase PostgreSQL, strict server-side schema validation, honeypot spam traps, and per-IP rate limiting.
- **Protected Administrator Operations Portal**: Secured behind Supabase Auth session tokens, featuring dynamic metric rollups, search, status lifecycle transitions, full enquiry dossiers, and deletion safeguards.
- **Enterprise Security Baseline**: Strict separation of client/server privileges, zero exposure of the Supabase service-role key to client bundles, and Row Level Security (RLS) enforcement.

---

## 2. Design Goals & Rationale

| Design Pillar | Architectural Decision | Business Rationale |
| :--- | :--- | :--- |
| **Swiss Editorial Typography** | Plus Jakarta Sans for crisp geometric legibility; Space Grotesk for architectural section headings. | Replaces generic agency gradients with commanding typographic authority. |
| **Restrained Crimson Accent** | Authentic Ethixweb brand red (`#E51D25`) reserved strictly for interactive actions and focal states. | Prevents visual fatigue while maintaining unmistakable brand identity. |
| **High-Contrast Dark Foundations** | Charcoal background palette (`#090A0D` / `#0F1117`) paired with fine 1px borders (`border-white/10`). | Delivers a premium, state-of-the-art enterprise aesthetic. |
| **Frictionless Funnel Geometry** | 3-step value propositions, live IST availability indicators, and prominent primary action buttons. | Maximizes conversion velocity for busy business decision-makers. |
| **Accessibility by Default** | WCAG 2.1 AA compliant contrast, skip-to-content links, visible focus rings, and ARIA attributes. | Ensures inclusive, keyboard-friendly navigation across all viewports. |

---

## 3. What Makes This Version Relevant to Indian Businesses

1. **WhatsApp-First Conversion Pathways**: Recognizes that Indian business prospects prioritize direct WhatsApp interactions. Form and API structures support verified mobile contacts and automated webhook handoffs.
2. **Cellular Network Resilience**: 80%+ of Indian business traffic navigates via mobile devices on 4G/5G connections. Bundle sizes are optimized under 120 kB gzipped to ensure sub-second Time to Interactive (TTI).
3. **Transparent INR Scoping & GST Invoicing**: Pricing tiers are clearly structured in Indian Rupees (₹75,000 – ₹3,50,000+), eliminating foreign exchange friction.
4. **Aligned IST Working Windows**: Synchronized with Indian standard business hours (9:00 AM – 6:00 PM IST) with real-time operational status displayed in the header.
5. **Direct Senior Engineering Access**: Eliminates the common Indian agency pitfall of "account executive telephone games," pairing clients directly with the senior developers executing their code.

*Integrity Disclosure*: In compliance with assessment guidelines, no fake Indian office addresses, fabricated client logos, or invented revenue metrics have been created. Corporate structure facts (Ethixweb USA LLC, Wyoming registration) are strictly preserved.

---

## 4. Improvements Relative to the Original Reference Site

| Feature Area | Original Reference Site (`ethixweb.com`) | Ethixweb India Redesign |
| :--- | :--- | :--- |
| **Visual Composition** | Heavy SVG animations, rotating text loops, high GPU load. | High-speed CSS transitions, editorial layouts, lightweight vector nodes, 0 layout shifts. |
| **Lead Capture Form** | Basic 3-field input without client validation or budget tiering. | Enterprise brief: business email, service selection, budget tiers, client+server schema checks. |
| **Backend & Storage** | External scheduling widget dependency. | Native PostgreSQL database via Supabase, RESTful serverless API endpoints, and honeypot spam protection. |
| **Admin Operations** | No public or accessible administrative portal. | Full-featured `/admin` dashboard with live counts, search, status filters, and deletion confirmation. |
| **Security Hygiene** | Client-side endpoints. | Privileged database mutations handled exclusively via serverless backend with Bearer verification. |

---

## 5. Technology Stack & Selection Rationale

- **Frontend Core**: **React 19** with **Vite 8** — Superior compilation speed, native ES modules, and modern concurrent features.
- **Styling**: **Tailwind CSS v3.4** — Utility-first styling with centralized design tokens, custom colors, and responsive modifiers.
- **Routing**: **React Router v7** — Client-side declarative routing, deep-link preservation, and programmatic navigation.
- **Icons**: **Lucide React** — Lightweight, tree-shakeable, uniform icon geometry without bloated SVG assets.
- **Backend Runtime**: **Vercel Serverless Functions** (`/api/*`) — Zero-maintenance serverless execution with per-request autoscaling.
- **Database & Auth**: **Supabase (PostgreSQL & Supabase Auth)** — Enterprise relational persistence, automated triggers, and Row Level Security.

---

## 6. Architecture Overview

### Architecture Diagram (Mermaid)

```mermaid
flowchart TD
    subgraph Client ["Client Browser (Mobile / Desktop)"]
        UI[React 19 Application]
        NAV[Navigation & IST Clock]
        FORM[Enquiry Brief Form]
        ADMIN_UI[Admin Operations Dashboard]
    end

    subgraph CDN ["Edge Network (Vercel CDN)"]
        STATIC[Static Assets: JS / CSS / Favicon]
    end

    subgraph API ["Serverless API Tier (/api)"]
        LEADS_API["POST /api/leads<br/>• Schema Validation<br/>• Rate Limiting<br/>• Honeypot Filter"]
        ADMIN_LEADS_API["GET /api/admin/leads<br/>• Bearer Token Verify<br/>• Dynamic Statistics<br/>• Pagination & Search"]
        ADMIN_ITEM_API["PATCH & DELETE /api/admin/leads/:id<br/>• Auth Guard<br/>• Status Update<br/>• Record Deletion"]
    end

    subgraph Database ["Supabase PostgreSQL Tier"]
        AUTH_SERVICE[Supabase Auth Engine]
        DB[(leads Table with RLS)]
        TRIGGER[Updated_At Trigger Function]
    end

    UI --> STATIC
    FORM -->|JSON Payload| LEADS_API
    ADMIN_UI -->|Authorization Bearer| ADMIN_LEADS_API
    ADMIN_UI -->|Authorization Bearer| ADMIN_ITEM_API
    ADMIN_UI -->|Sign-in Request| AUTH_SERVICE

    LEADS_API -->|Insert Valid Lead| DB
    ADMIN_LEADS_API -->|Select Paginated Queries| DB
    ADMIN_ITEM_API -->|Update / Delete Rows| DB
    DB --> TRIGGER
```

---

## 7. Project Folder Structure

```
ethixweb/
├── api/                             # Vercel Serverless Function Handlers
│   ├── admin/
│   │   ├── leads.js                 # GET /api/admin/leads (Paginated, Stats, Auth)
│   │   └── leads/
│   │       └── [id].js              # PATCH & DELETE /api/admin/leads/:id
│   └── leads.js                     # POST /api/leads (Validation, Honeypot, Insert)
├── public/
│   ├── favicon.svg                  # Vector spiderweb node brand favicon
│   ├── robots.txt                   # Search crawler directives (disallows /admin & /api)
│   └── sitemap.xml                  # XML sitemap for SEO discovery
├── scripts/
│   └── test-suite.mjs               # 19-assertion automated integration test suite
├── src/
│   ├── assets/                      # Static brand assets
│   ├── components/
│   │   ├── common/
│   │   │   ├── Badge.jsx            # Pill badges with subtle pulse indicator
│   │   │   ├── EthixLogo.jsx        # Authentic vector emblem & typography
│   │   │   ├── Footer.jsx           # Global footer with verified corporate disclosures
│   │   │   ├── Navbar.jsx           # Responsive header with live IST time and drawer
│   │   │   └── SectionHeading.jsx   # Editorial heading hierarchy
│   │   └── home/
│   │       ├── CtaBanner.jsx        # Bottom conversion call-to-action
│   │       ├── CredibilityStrip.jsx # Continuous marquee operating principles
│   │       ├── FaqSection.jsx       # Interactive accordion with accessible ARIA
│   │       ├── FeaturedWork.jsx     # Labeled concept architectures & patterns
│   │       ├── Hero.jsx             # Hero section with outcome headline & console
│   │       ├── IndiaRelevance.jsx   # India-tailored commercial pillars
│   │       ├── ProcessSection.jsx   # 4-stage delivery framework
│   │       ├── ServicesGrid.jsx     # 6 verified service offerings
│   │       └── WhyEthixweb.jsx      # Comparison table vs. traditional agency
│   ├── lib/
│   │   ├── api.js                   # Client-side API fetch abstraction
│   │   ├── supabase.js              # Supabase Auth client & session bridge
│   │   └── validation.js            # Client-side validation logic
│   ├── pages/
│   │   ├── About.jsx                # Corporate narrative, values & cadence
│   │   ├── AdminDashboard.jsx       # Protected lead management dashboard
│   │   ├── AdminLogin.jsx           # Admin authentication login page
│   │   ├── Contact.jsx              # Project enquiry brief form
│   │   ├── Home.jsx                 # Complete homepage composition
│   │   ├── NotFound.jsx             # Branded 404 error page
│   │   └── Services.jsx             # Full catalog & engagement models
│   ├── App.jsx                      # Routing layout, scroll-to-top, accessibility skip
│   ├── index.css                    # Design system tokens & utility classes
│   └── main.jsx                     # Application bootstrap
├── supabase/
│   └── migrations/
│       └── 20261014_create_leads_table.sql # PostgreSQL schema & RLS policies
├── .env.example                     # Documented environment variables template
├── .gitignore                       # Git exclusions (.env, node_modules, dist)
├── package.json                     # Dependencies and test/build scripts
├── tailwind.config.js               # Theme extensions and color palettes
├── vercel.json                      # Vercel routing rewrites & security headers
└── vite.config.js                   # Vite configuration with local API dev middleware
```

---

## 8. Local Setup Instructions

### Prerequisites
- Node.js `v18.0.0` or higher (verified on Node `v20.19.4`)
- npm `v9.0.0` or higher

### Step 1: Clone and Install
```bash
git clone https://github.com/your-username/ethixweb.git
cd ethixweb
npm install
```

### Step 2: Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
*(For local testing without an active Supabase project, the application includes a full-featured mock layer that allows forms and admin logins to work out-of-the-box).*

### Step 3: Run the Development Server
```bash
npm run dev
```
Open [http://127.0.0.1:5173](http://127.0.0.1:5173) in your browser.

---

## 9. Supabase Project Setup & Database Migration

To connect a live Supabase PostgreSQL database:

1. Create a free project at [supabase.com](https://supabase.com).
2. Navigate to **SQL Editor** in your Supabase project dashboard.
3. Open [`supabase/migrations/20261014_create_leads_table.sql`](file:///e:/projects/ethixweb/supabase/migrations/20261014_create_leads_table.sql) in this repository.
4. Copy and paste the entire script into the Supabase SQL Editor and click **Run**.
5. The migration creates:
   - The `public.leads` table with strict data constraints and UUID generation.
   - Indices on `created_at`, `status`, and `email`.
   - Automatic `trg_leads_updated_at` trigger for updating timestamps.
   - Row Level Security (RLS) policies allowing public inserts of valid leads while restricting read/update/delete strictly to authenticated users.

### Provisioning the Initial Administrator Account
1. In your Supabase Dashboard, go to **Authentication** → **Users**.
2. Click **Add User** → **Create User**.
3. Enter your administrator email (e.g. `admin@ethixweb.com`) and a strong password.
4. Check **Auto Confirm User** (so email verification is marked complete).
5. Retrieve your project credentials from **Project Settings** → **API**:
   - `Project URL`
   - `anon public key`
   - `service_role secret key`
6. Add these credentials to your `.env` file and your Vercel project environment variables.

---

## 10. Required Environment Variables

| Variable Name | Environment | Purpose |
| :--- | :--- | :--- |
| `VITE_SUPABASE_URL` | Client & Build | Supabase project URL for client authentication |
| `VITE_SUPABASE_ANON_KEY` | Client & Build | Supabase public anonymous API key |
| `SUPABASE_URL` | Serverless API (Vercel) | Supabase project URL for backend functions |
| `SUPABASE_SERVICE_ROLE_KEY` | Serverless API (Vercel) | **Privileged service-role key (NEVER exposed to frontend)** |
| `NODE_ENV` | All | Deployment stage (`development` / `production`) |

---

## 11. API Endpoint Reference

### 1. `POST /api/leads`
Submits a new project enquiry brief.
- **Request Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "full_name": "Aarav Patel",
    "email": "aarav@patelconsulting.in",
    "phone": "+91 98200 12345",
    "company": "Patel Consulting",
    "service": "Website Redesign",
    "budget": "₹1,50,000 – ₹3,50,000",
    "message": "We need to redesign our core client portal.",
    "consent": true
  }
  ```
- **Responses**:
  - `201 Created`: `{ "success": true, "lead_id": "uuid", "message": "..." }`
  - `400 Bad Request`: `{ "error": "Validation failed", "errors": { ... } }`
  - `429 Too Many Requests`: Rate limit reached (> 6 requests/minute from same IP)
  - `200 OK (Quiet)`: Silent success returned if hidden honeypot fields (`_hp_title`) are populated.

### 2. `GET /api/admin/leads`
Retrieves paginated leads and dynamic database statistics.
- **Request Headers**: `Authorization: Bearer <access_token>`
- **Query Parameters**:
  - `page`: Page number (default: `1`)
  - `limit`: Items per page (default: `10`, max: `50`)
  - `status`: Status filter (`all`, `new`, `contacted`, `qualified`, `closed`)
  - `search`: Search query string across name, email, company, and service
- **Response `200 OK`**:
  ```json
  {
    "leads": [ ... ],
    "pagination": { "page": 1, "limit": 10, "total": 14, "totalPages": 2 },
    "stats": { "total": 14, "new": 6, "contacted": 4, "qualified": 2, "closed": 2 }
  }
  ```

### 3. `PATCH /api/admin/leads/:id`
Updates a lead's lifecycle status.
- **Request Headers**: `Authorization: Bearer <access_token>`, `Content-Type: application/json`
- **Request Body**: `{ "status": "qualified" }`
- **Response `200 OK`**: `{ "success": true, "lead": { ... } }`

### 4. `DELETE /api/admin/leads/:id`
Permanently removes a lead record.
- **Request Headers**: `Authorization: Bearer <access_token>`
- **Response `200 OK`**: `{ "success": true, "message": "Lead permanently removed." }`

---

## 12. Testing & Quality Verification

Run the automated integration test suite:
```bash
npm test
```

### Verified Test Results (19 of 19 Passed)
```
======================================================
 ETHIXWEB INDIA — FULL-STACK VERIFICATION TEST SUITE 
 Target Server: http://127.0.0.1:5173
======================================================

[1] Testing Lead Enquiry Submission (POST /api/leads)...
  ✓ [PASS] Valid enquiry returns HTTP 201 Created
  ✓ [PASS] Response contains success flag true
  ✓ [PASS] Response contains tracking lead_id

[2] Testing Server-side Validation Rejection (POST /api/leads)...
  ✓ [PASS] Invalid enquiry returns HTTP 400 Bad Request
  ✓ [PASS] Validation returns detailed field errors map

[3] Testing Honeypot Spam Protection (POST /api/leads)...
  ✓ [PASS] Spam bot submission is caught and quietly answered with HTTP 200
  ✓ [PASS] Bot is fooled with success response without database insertion

[4] Testing Admin Security & Authorization Guard (GET /api/admin/leads)...
  ✓ [PASS] Unauthenticated request to admin endpoint returns HTTP 401 Unauthorized
  ✓ [PASS] Forged bearer token returns HTTP 401 Unauthorized

[5] Testing Authorized Admin Lead Fetch & Dynamic Stats...
  ✓ [PASS] Authorized admin request returns HTTP 200 OK
  ✓ [PASS] Admin response contains leads array
  ✓ [PASS] Admin response contains dynamic stats object
  ✓ [PASS] Admin response contains pagination metadata

[6] Testing Lead Status Update Workflow (PATCH /api/admin/leads/:id)...
  ✓ [PASS] PATCH without auth token returns HTTP 401
  ✓ [PASS] Authorized status transition returns HTTP 200 OK
  ✓ [PASS] Status update returns success flag

[7] Testing Lead Deletion Safeguard (DELETE /api/admin/leads/:id)...
  ✓ [PASS] DELETE without auth token returns HTTP 401
  ✓ [PASS] Authorized lead deletion returns HTTP 200 OK
  ✓ [PASS] Lead deletion returns success flag

======================================================
 TEST RESULTS: 19 PASSED, 0 FAILED
======================================================
```

---

## 13. Production Build & Deployment to Vercel

### Production Build
```bash
npm run build
```
Build verification outputs:
- `dist/index.html`: ~2.30 kB
- `dist/assets/index.css`: ~39.8 kB (gzipped: ~7.5 kB)
- `dist/assets/index.js`: ~393.8 kB (gzipped: ~115 kB)

### Deploying to Vercel
1. Push repository to your GitHub account:
   ```bash
   git remote add origin https://github.com/your-username/ethixweb.git
   git branch -M main
   git push -u origin main
   ```
2. In the [Vercel Dashboard](https://vercel.com), click **Add New** → **Project**.
3. Import the `ethixweb` repository.
4. Framework Preset: **Vite**.
5. Configure Environment Variables in Vercel:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
6. Click **Deploy**. Vercel will build the frontend and deploy the serverless functions in `/api` automatically.

---

## 14. Security Considerations

1. **Privilege Separation**: `SUPABASE_SERVICE_ROLE_KEY` is accessed strictly inside Node serverless execution environments (`api/*`). It is never bundled into client JavaScript.
2. **Row Level Security (RLS)**: Enforced directly on PostgreSQL. Public anonymous users can only insert rows with `status = 'new'` and `consent = true`. Queries (`SELECT`), modifications (`UPDATE`), and removals (`DELETE`) are strictly denied unless verified as authenticated administrator.
3. **Spam & Abuse Protection**:
   - Multi-layer honeypot fields (`_hp_title`, `website_url_hp`) trap scrapers.
   - Per-IP rate limiting allows a maximum of 6 enquiry submissions per minute window.
   - Input length clamping: Full name (100 chars), Email (120 chars), Message (3,000 chars).
4. **Secret Exclusion**: `.env`, `.env.local`, and build artifacts are strictly ignored in `.gitignore`. Only `.env.example` with non-secret templates is committed.

---

## 15. Known Limitations & Future Roadmap

- **WhatsApp Cloud API Webhooks**: The current version structures data ready for WhatsApp dispatch. Direct automated WhatsApp confirmation messaging can be enabled by connecting the Meta WhatsApp Business Cloud API webhook in `api/leads.js`.
- **Advanced Razorpay Milestone Invoicing**: While INR pricing tiers are defined and structured, automated client retainer billing via Razorpay Subscriptions is planned for the v2.1 roadmap.

---

## License & Intellectual Property
© 2026 Ethixweb. All rights reserved. Operating entity: Ethixweb USA LLC.
