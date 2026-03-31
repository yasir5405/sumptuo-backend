# Sumptuo — Product Specification \& Technical Blueprint

### Version 1.0 | Solo Founder Edition | PERN Stack

\---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem \& Market Opportunity](#2-problem--market-opportunity)
3. [Product Vision \& Positioning](#3-product-vision--positioning)
4. [User Personas](#4-user-personas)
5. [Feature Specification](#5-feature-specification)
6. [UX \& Screen Flow](#6-ux--screen-flow)
7. [Technical Architecture](#7-technical-architecture)
8. [Database Design](#8-database-design)
9. [API Design](#9-api-design)
10. [AI Coaching System](#10-ai-coaching-system)
11. [Forecasting Engine](#11-forecasting-engine)
12. [CSV Import Pipeline](#12-csv-import-pipeline)
13. [Security \& Privacy Model](#13-security--privacy-model)
14. [Monetization Strategy](#14-monetization-strategy)
15. [MVP Roadmap](#15-mvp-roadmap)
16. [Launch Strategy](#16-launch-strategy)
17. [Success Metrics](#17-success-metrics)

\---

## 1\. Executive Summary

**Sumptuo** is a privacy-first, AI-powered personal finance tracker that helps everyday users understand their money, stick to budgets, and plan for the future — without handing over their bank credentials or paying $99/year.

Most finance apps fall into one of two traps: they're either free but monetize your data aggressively (Mint, now dead; Empower), or they're expensive, complex, and built for power users (YNAB, Monarch Money). The space between — clean, affordable, private, and genuinely intelligent — is wide open.

Sumptuo fills that gap with a web-first application built on the PERN stack, deployed at a price that respects users, and powered by an AI coaching layer that tells users not just what they spent, but what they should do next.

**Core value proposition:**

> \*"Know where your money went. Know where it's going. Know what to do about it."\*

\---

## 2\. Problem \& Market Opportunity

### 2.1 The Mint Vacuum

Mint, once the most popular free finance app with 3.6 million active users, shut down in January 2024. The migration triggered the largest user shuffle the personal finance SaaS space has seen. Users scattered across Monarch Money, YNAB, Rocket Money, and Copilot — but every migration wave came with the same complaints on Reddit and Twitter:

* "YNAB is too complicated and too expensive"
* "Monarch is buggy and still $99/year"
* "Rocket Money keeps pushing me to cancel subscriptions I want"
* "I just want something simple that doesn't sell my data"

This isn't just anecdotal. The r/personalfinance subreddit (18M+ members) has had dozens of threads since Mint's shutdown with thousands of upvotes on posts titled "What are you using instead of Mint?" — and no clear winner has emerged. The vacuum is real, the demand is active, and the timing is now.

### 2.2 Market Size

* The global personal finance software market is valued at **$1.57 billion in 2024** and projected to reach **$3.2 billion by 2030** (CAGR \~12.5%).
* In India specifically, the UPI-driven financial awareness boom has created millions of first-time budgeters who have no English-centric app designed for them (INR, Indian spending categories, salary structures).
* The target addressable audience for a solo indie SaaS product: even **10,000 paying users at $4/month = $480,000/year ARR**.

### 2.3 Why Current Solutions Fail

|App|Price|Privacy|Ease|AI|Verdict|
|-|-|-|-|-|-|
|YNAB|$99/yr|Good|Hard|None|Too complex, too expensive|
|Monarch Money|$99/yr|OK|Medium|Basic|Buggy, overpriced|
|Empower|Free|Bad|Easy|None|Sells data, pushes wealth mgmt|
|Rocket Money|$48–96/yr|Bad|Easy|None|Pushy upsells|
|Copilot|$95/yr|OK|Good|Basic|iOS only, US only|
|GnuCash|Free|Great|Hard|None|Desktop only, 1990s UX|
|**Sumptuo**|**$29/yr**|**Excellent**|**Easy**|**Strong**|**The gap**|

\---

## 3\. Product Vision \& Positioning

### 3.1 Vision Statement

Build the personal finance tool that treats users like intelligent adults — not data sources, not upsell targets, not subscription cash cows. Give them clarity on their money, coach them forward with AI, and charge them a fair price for it.

### 3.2 Design Principles

**1. Privacy by default, not by feature**
No bank credentials. No Plaid. No selling transaction data. Users enter transactions manually or import via CSV. What's on your account stays on your account.

**2. Simplicity over completeness**
The dashboard should make sense in 10 seconds. No onboarding wizard. No 47-step setup. New users should feel oriented immediately.

**3. Forward-looking, not just backward-reporting**
Most apps show you what you already know (you spent too much last month). Sumptuo tells you what's coming, what to adjust, and how to hit your goals.

**4. Honest pricing**
One free tier. One pro tier. No upsells. No dark patterns. The price is on the homepage.

**5. Built for India first, global by design**
INR as default currency. Indian spending categories (rent, EMI, petrol, mobile recharge, UPI). But multi-currency support so it works globally.

### 3.3 Brand Positioning

Sumptuo is not a bank app. It's not an investment tracker. It's not a subscription canceller. It's a **thinking tool for your money** — calm, clear, and honest.

Aesthetic direction: Clean dark/light mode. No flashy animations. Data-first layout. Think Vercel dashboard meets a finance app.

\---

## 4\. User Personas

### Persona 1 — Arjun, 24, Software Engineer, Bengaluru

**Situation:** Just started his first job. Salary hits account, disappears by month end. He has no idea where it goes. Uses UPI for everything so there's no cash trail.
**Goals:** Understand his spending. Start saving for a bike downpayment. Avoid lifestyle inflation.
**Frustrations:** YNAB is confusing. He doesn't want to connect his bank. Just wants to manually log things.
**How Sumptuo helps:** Manual + CSV import. Clean mobile-friendly UI. AI tells him his top 3 spending leaks. Goal tracker for the bike.

### Persona 2 — Priya, 31, Freelancer, Remote

**Situation:** Variable income month to month. Has clients in USD and INR. Struggles to budget when income is unpredictable. Existing apps break when income isn't a fixed salary.
**Goals:** Know how much she can safely spend. Build a 6-month emergency fund. File taxes more easily.
**Frustrations:** Most apps assume a fixed monthly salary. No multi-currency support in affordable apps.
**How Sumptuo helps:** Income variability mode in forecasting. Multi-currency transactions. Category breakdown useful for tax prep.

### Persona 3 — Rahul \& Sneha, 29/27, Couple, Pune

**Situation:** Married, managing household finances together. Want to track shared expenses without sharing login.
**Goals:** Shared budget visibility. Track joint savings goal (house down payment).
**Frustrations:** Every app is single-user. Notion spreadsheets break.
**How Sumptuo helps:** (Phase 2 feature) Household mode — shared budgets, individual transaction views, joint goals.

\---

## 5\. Feature Specification

### 5.1 Free Tier Features

#### F1 — Manual Transaction Entry

* Add income or expense transactions
* Fields: amount, type (income/expense), category, date, optional note
* Inline editing on transaction list
* Soft delete (recoverable within 30 days)
* Limit: last 3 months of history visible

#### F2 — Preset Categories

* Expense: Food \& Dining, Transport, Rent, Utilities, Entertainment, Shopping, Health, Education, EMI/Loan, Petrol, Mobile Recharge, Other
* Income: Salary, Freelance, Business, Investment Return, Gift, Other
* Users can rename categories but not add new ones on free tier

#### F3 — Monthly Summary Dashboard

* Total income, total expenses, net savings for current month
* Top 3 spending categories (bar chart)
* Daily spending sparkline
* Remaining budget across active budget categories

#### F4 — Basic Budget Setting

* Set a monthly limit per category
* Visual progress bar: spent / limit
* Red highlight when over budget
* Limit: up to 5 budget categories on free tier

#### F5 — Basic Charts

* Monthly spending by category (pie chart)
* Income vs expense trend (last 3 months bar chart)

\---

### 5.2 Pro Tier Features ($4/month or $29/year)

#### P1 — Unlimited History

* All transactions and charts accessible beyond 3 months
* Year-over-year comparisons

#### P2 — CSV Import

* Upload bank statement in CSV format
* Smart column mapper: user assigns which column = date, amount, description, type
* Preview before import (shows first 10 rows with parsed values)
* Duplicate detection: flags transactions that appear to already exist (same date + amount)
* Batch import up to 500 transactions at once
* Support for common Indian bank formats (HDFC, ICICI, SBI, Axis, Kotak)

#### P3 — AI Coaching Panel

* Appears on dashboard as a collapsible panel
* Generates 3–5 personalized insights based on last 30 days of data
* Refresh button (max 3 refreshes/day to control API cost)
* Examples of insights:

  * "Your food spending is 34% of income this month — 12% above your average. The spike seems to be weekends. Consider setting a weekend food budget."
  * "At your current savings rate, you'll have ₹47,000 saved by March. That's enough for your 'Bike' goal if you increase savings by ₹3,000/month."
  * "You've had 3 months of consistent rent + EMI payments. Your fixed obligations are 42% of income — healthy range is under 50%."

#### P4 — Forecasting Engine

* 30 / 60 / 90 day projected balance
* Toggle between scenarios: "same as last month", "10% more careful", "big expense month"
* Recurring transaction detection and inclusion in forecast
* Projected savings goal achievement dates
* Line chart showing projected balance curve

#### P5 — Goals Tracker

* Create savings goals with name, target amount, optional deadline
* Manually log contributions toward goals
* AI calculates required monthly savings to hit goal on time
* Visual progress ring per goal

#### P6 — Unlimited Budget Categories

* No limit on number of budget categories
* Budget rollover option (unused budget carries to next month)
* Budget templates (e.g., "50/30/20 rule" auto-configures budgets)

#### P7 — Multi-Currency Support

* Set a home currency
* Log transactions in any currency
* Auto-conversion using stored exchange rate at time of entry
* Manual override of exchange rate

#### P8 — Data Export

* Export all transactions as CSV
* Export charts as PNG
* Full data export as JSON (for portability)

#### P9 — Advanced Charts

* Category trends over 6/12 months
* Income stability score (variance visualization)
* Savings rate trend line

\---

### 5.3 Phase 2 Features (Post-Launch, Not MVP)

* Recurring transaction templates (auto-suggest entry for regular expenses)
* Bill reminders (push notification before EMI/subscription due)
* Household/couple mode (shared budgets)
* Mobile app (React Native + Expo)
* Receipt scanning via camera (OCR → auto-fill transaction)
* Tax category tagging for freelancers

\---

## 6\. UX \& Screen Flow

### 6.1 Page Map

```
/                        → Landing page (public)
/login                   → Login
/register                → Register
/dashboard               → Main dashboard (protected)
/transactions            → All transactions, filters, add
/budgets                 → Budget management
/goals                   → Goals tracker (Pro)
/forecast                → Forecasting view (Pro)
/import                  → CSV import (Pro)
/settings                → Account, currency, preferences
/settings/billing        → Upgrade to Pro, manage subscription
```

### 6.2 Dashboard Layout

```
┌──────────────────────────────────────────────────────┐
│  NAVBAR: Logo | Dashboard | Transactions | Budgets   │
│          Goals | Forecast | \[Pro Badge] | Avatar     │
├──────────┬───────────────────────────────────────────┤
│          │  ┌─────────┐ ┌─────────┐ ┌─────────┐    │
│ SIDEBAR  │  │ Income  │ │Expenses │ │  Saved  │    │
│ (mobile  │  │ ₹52,000 │ │ ₹31,200 │ │ ₹20,800 │    │
│ hidden)  │  └─────────┘ └─────────┘ └─────────┘    │
│          │                                           │
│ Quick    │  ┌─────────────────┐ ┌─────────────────┐ │
│ Actions: │  │ Spending by     │ │ Budget Progress │ │
│ + Add    │  │ Category        │ │                 │ │
│ Txn      │  │ \[PIE CHART]     │ │ Food    ██░ 74% │ │
│          │  │                 │ │ Transport █░ 50%│ │
│ ↑ Import │  └─────────────────┘ │ Rent    ███ 99% │ │
│ CSV      │                      └─────────────────┘ │
│          │  ┌───────────────────────────────────────┐│
│ 🤖 AI    │  │ AI Insights (Pro)                     ││
│ Insights │  │ ✦ Your food spend is trending 20%...  ││
│          │  │ ✦ At this rate, goal achieved by...   ││
│          │  │ ✦ Fixed expenses are healthy at 41%   ││
│          │  └───────────────────────────────────────┘│
│          │                                           │
│          │  Recent Transactions                      │
│          │  Jan 15  Swiggy          -₹450   Food    │
│          │  Jan 15  Salary          +₹52,000 Income │
│          │  Jan 14  Petrol          -₹2,000 Transport│
└──────────┴───────────────────────────────────────────┘
```

### 6.3 Key UX Decisions

**No onboarding wizard.** Users land on an empty dashboard with a single CTA: "Add your first transaction." The UI is self-explanatory. No 5-step setup, no forced category configuration.

**Transaction entry is a slide-over panel, not a new page.** Clicking "+ Add Transaction" slides in a panel from the right. Users never lose context of what they were looking at.

**Soft deletes everywhere.** Nothing is permanently deleted for 30 days. Users can undo any delete from a toast notification for 5 seconds, and from the trash view for 30 days.

**Pro features are visible but locked.** Free users can see the Forecast page and AI panel — they're just blurred with an "Upgrade to Pro" overlay. This creates natural upgrade motivation without being annoying.

**Mobile-first responsive.** The sidebar collapses to a bottom navigation bar on mobile. All charts resize gracefully. Transaction entry form is fully thumb-friendly.

\---

## 7\. Technical Architecture

### 7.1 System Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                             │
│                                                              │
│   React 18 + TypeScript + Vite                               │
│   React Router v6 | Tailwind CSS | shadcn/ui                 │
│   Recharts | React Hook Form + Zod | Axios | PapaParse       │
│                                                              │
│   Deployed: Vercel (CDN edge, auto SSL, preview deploys)     │
└──────────────────────┬───────────────────────────────────────┘
                       │ HTTPS REST API
                       │ JWT Bearer Token (Authorization header)
┌──────────────────────▼───────────────────────────────────────┐
│                     SERVER LAYER                             │
│                                                              │
│   Node.js + Express + TypeScript                             │
│   Prisma ORM | Zod validation | bcrypt | Multer              │
│   csv-parse | @anthropic-ai/sdk                              │
│                                                              │
│   Deployed: Railway (auto-deploy from GitHub, $5/mo)         │
└──────┬─────────────────────────────────────┬─────────────────┘
       │                                     │
┌──────▼──────────────┐         ┌────────────▼────────────────┐
│  PostgreSQL          │         │   Anthropic Claude API       │
│  (Supabase)          │         │                             │
│                      │         │   Model: claude-sonnet-4-6  │
│  Users               │         │   Used for: AI coaching     │
│  Transactions        │         │   insights + forecast       │
│  Budgets             │         │   summaries                 │
│  Goals               │         │                             │
│  RefreshTokens       │         │   \~$0.003 per insight call  │
│  ImportLogs          │         │                             │
│                      │         └─────────────────────────────┘
│  Supabase free:      │
│  500MB, 2 projects   │
└──────────────────────┘
```

### 7.2 Frontend Stack — Detailed

|Concern|Library|Version|Notes|
|-|-|-|-|
|Framework|React|18.x|Concurrent features, Suspense|
|Language|TypeScript|5.x|Strict mode enabled|
|Build tool|Vite|5.x|Fast HMR, ESM-native|
|Routing|React Router|v6.x|Nested routes, loaders|
|Styling|Tailwind CSS|v4.x|JIT, dark mode via class|
|Components|shadcn/ui|latest|Radix UI primitives|
|Charts|Recharts|2.x|Composable, responsive|
|Forms|React Hook Form|7.x|+ Zod resolver|
|Validation|Zod|3.x|Shared with backend|
|HTTP|Axios|1.x|Interceptors for token refresh|
|CSV parsing|PapaParse|5.x|Client-side, streaming|
|Dates|date-fns|3.x|Tree-shakeable|
|State|Context + useReducer|—|No Redux needed at this scale|
|Notifications|sonner|latest|Toast via shadcn/ui|

**Environment variables (frontend):**

```
VITE\_API\_BASE\_URL=https://api.Sumptuo.app
```

### 7.3 Backend Stack — Detailed

|Concern|Library|Notes|
|-|-|-|
|Runtime|Node.js 20 LTS|—|
|Framework|Express 4.x|Minimal, flexible|
|Language|TypeScript 5.x|Strict mode|
|ORM|Prisma 5.x|Type-safe queries, migrations|
|Auth|jsonwebtoken|Access + refresh token pair|
|Password|bcrypt|12 salt rounds|
|Validation|Zod|Same schemas as frontend (shared package possible)|
|File upload|Multer|Memory storage for CSV (max 5MB)|
|CSV parsing|csv-parse|Streaming, async|
|AI|@anthropic-ai/sdk|Official Anthropic SDK|
|Rate limiting|express-rate-limit|Per-IP + per-user limits|
|CORS|cors|Whitelist frontend origin|
|Logging|pino|Structured JSON logs|
|Error handling|Custom middleware|Zod errors → 400, Auth → 401, etc.|

**Environment variables (backend):**

```
DATABASE\_URL=postgresql://...
JWT\_ACCESS\_SECRET=...
JWT\_REFRESH\_SECRET=...
ANTHROPIC\_API\_KEY=...
FRONTEND\_URL=https://Sumptuo.app
PORT=3000
NODE\_ENV=production
```

### 7.4 Frontend Folder Structure

```
src/
├── components/
│   ├── ui/                    # shadcn/ui auto-generated
│   ├── layout/
│   │   ├── AppLayout.tsx      # Sidebar + topnav wrapper
│   │   ├── Sidebar.tsx
│   │   ├── Navbar.tsx
│   │   └── MobileNav.tsx
│   ├── transactions/
│   │   ├── TransactionTable.tsx
│   │   ├── TransactionFilters.tsx
│   │   ├── AddTransactionPanel.tsx   # Slide-over
│   │   └── EditTransactionPanel.tsx
│   ├── budgets/
│   │   ├── BudgetCard.tsx
│   │   ├── BudgetProgressBar.tsx
│   │   └── CreateBudgetModal.tsx
│   ├── charts/
│   │   ├── SpendingPieChart.tsx
│   │   ├── IncomeExpenseBarChart.tsx
│   │   ├── ForecastLineChart.tsx
│   │   └── CategoryTrendChart.tsx
│   ├── ai/
│   │   ├── InsightsPanel.tsx
│   │   └── InsightCard.tsx
│   ├── goals/
│   │   ├── GoalCard.tsx
│   │   └── CreateGoalModal.tsx
│   └── common/
│       ├── ProGate.tsx        # Blurred overlay for pro features
│       ├── EmptyState.tsx
│       ├── LoadingSkeleton.tsx
│       └── ConfirmDialog.tsx
├── pages/
│   ├── Landing.tsx
│   ├── Dashboard.tsx
│   ├── Transactions.tsx
│   ├── Budgets.tsx
│   ├── Goals.tsx              # Pro
│   ├── Forecast.tsx           # Pro
│   ├── Import.tsx             # Pro
│   ├── Settings.tsx
│   └── auth/
│       ├── Login.tsx
│       └── Register.tsx
├── hooks/
│   ├── useTransactions.ts     # CRUD + filters
│   ├── useBudgets.ts
│   ├── useGoals.ts
│   ├── useAIInsights.ts       # Trigger + poll insights
│   ├── useForecast.ts
│   └── useAuth.ts
├── context/
│   ├── AuthContext.tsx        # User, tokens, logout
│   └── ThemeContext.tsx       # Dark/light mode
├── lib/
│   ├── axios.ts               # Axios instance + interceptors
│   ├── formatters.ts          # Currency, date formatting
│   ├── categories.ts          # Category constants + icons
│   └── utils.ts               # cn() helper, misc
├── types/
│   ├── transaction.ts
│   ├── budget.ts
│   ├── goal.ts
│   ├── forecast.ts
│   └── user.ts
└── services/
    ├── transaction.service.ts # API call wrappers
    ├── budget.service.ts
    ├── ai.service.ts
    └── auth.service.ts
```

### 7.5 Backend Folder Structure

```
src/
├── routes/
│   ├── auth.routes.ts
│   ├── transaction.routes.ts
│   ├── budget.routes.ts
│   ├── goal.routes.ts
│   ├── ai.routes.ts
│   ├── forecast.routes.ts
│   └── import.routes.ts
├── controllers/
│   ├── auth.controller.ts
│   ├── transaction.controller.ts
│   ├── budget.controller.ts
│   ├── goal.controller.ts
│   ├── ai.controller.ts
│   ├── forecast.controller.ts
│   └── import.controller.ts
├── services/
│   ├── auth.service.ts        # JWT generation, validation
│   ├── transaction.service.ts # Business logic
│   ├── budget.service.ts
│   ├── goal.service.ts
│   ├── ai.service.ts          # Claude API call logic
│   ├── forecast.service.ts    # Projection algorithm
│   └── csv.service.ts         # Parsing + mapping logic
├── middleware/
│   ├── auth.middleware.ts     # Verify JWT, attach user
│   ├── pro.middleware.ts      # Check isPro, return 403 if not
│   ├── rateLimit.middleware.ts
│   └── error.middleware.ts    # Global error handler
├── lib/
│   ├── prisma.ts              # Prisma client singleton
│   ├── anthropic.ts           # Anthropic client singleton
│   └── constants.ts           # Category lists, limits
├── schemas/
│   ├── transaction.schema.ts  # Zod schemas
│   ├── budget.schema.ts
│   └── auth.schema.ts
└── prisma/
    ├── schema.prisma
    └── migrations/
```

\---

## 8\. Database Design

### 8.1 Full Prisma Schema

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE\_URL")
}

// ─────────────────────────────────────────
// USERS
// ─────────────────────────────────────────
model User {
  id            String         @id @default(uuid())
  email         String         @unique
  passwordHash  String
  name          String?
  currency      String         @default("INR")
  isPro         Boolean        @default(false)
  proExpiresAt  DateTime?
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt

  transactions  Transaction\[]
  budgets       Budget\[]
  goals         Goal\[]
  refreshTokens RefreshToken\[]
  importLogs    ImportLog\[]
  aiUsage       AIUsageLog\[]
}

// ─────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────
model RefreshToken {
  id        String   @id @default(uuid())
  token     String   @unique
  userId    String
  user      User     @relation(fields: \[userId], references: \[id], onDelete: Cascade)
  expiresAt DateTime
  createdAt DateTime @default(now())
  revokedAt DateTime?  // null = still valid
}

// ─────────────────────────────────────────
// TRANSACTIONS
// ─────────────────────────────────────────
model Transaction {
  id          String      @id @default(uuid())
  userId      String
  user        User        @relation(fields: \[userId], references: \[id], onDelete: Cascade)
  amount      Decimal     @db.Decimal(12, 2)  // supports up to 9,999,999,999.99
  type        TxnType
  category    String      // matches Category.key
  description String?     @db.VarChar(255)
  date        DateTime    @db.Date
  currency    String      @default("INR")
  convertedAmount Decimal? @db.Decimal(12, 2)  // amount in home currency if different
  importId    String?     // links to ImportLog if imported via CSV
  deletedAt   DateTime?   // soft delete
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt

  @@index(\[userId, date])
  @@index(\[userId, category])
  @@index(\[userId, type])
}

enum TxnType {
  INCOME
  EXPENSE
}

// ─────────────────────────────────────────
// BUDGETS
// ─────────────────────────────────────────
model Budget {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: \[userId], references: \[id], onDelete: Cascade)
  category  String
  limitAmount Decimal @db.Decimal(12, 2)
  month     Int      // 1–12
  year      Int
  rollover  Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique(\[userId, category, month, year])
  @@index(\[userId, year, month])
}

// ─────────────────────────────────────────
// GOALS
// ─────────────────────────────────────────
model Goal {
  id            String      @id @default(uuid())
  userId        String
  user          User        @relation(fields: \[userId], references: \[id], onDelete: Cascade)
  name          String      @db.VarChar(100)
  targetAmount  Decimal     @db.Decimal(12, 2)
  savedAmount   Decimal     @db.Decimal(12, 2) @default(0)
  deadline      DateTime?   @db.Date
  isCompleted   Boolean     @default(false)
  completedAt   DateTime?
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt

  contributions GoalContribution\[]
}

model GoalContribution {
  id        String   @id @default(uuid())
  goalId    String
  goal      Goal     @relation(fields: \[goalId], references: \[id], onDelete: Cascade)
  amount    Decimal  @db.Decimal(12, 2)
  date      DateTime @db.Date
  note      String?
  createdAt DateTime @default(now())
}

// ─────────────────────────────────────────
// AI USAGE TRACKING
// ─────────────────────────────────────────
model AIUsageLog {
  id          String   @id @default(uuid())
  userId      String
  user        User     @relation(fields: \[userId], references: \[id], onDelete: Cascade)
  type        String   // "insights" | "forecast\_summary"
  tokensUsed  Int
  date        DateTime @db.Date
  createdAt   DateTime @default(now())

  @@index(\[userId, date])
}

// ─────────────────────────────────────────
// CSV IMPORT TRACKING
// ─────────────────────────────────────────
model ImportLog {
  id              String   @id @default(uuid())
  userId          String
  user            User     @relation(fields: \[userId], references: \[id], onDelete: Cascade)
  filename        String
  rowsTotal       Int
  rowsImported    Int
  rowsSkipped     Int
  rowsDuplicate   Int
  status          String   // "success" | "partial" | "failed"
  errorMessage    String?
  createdAt       DateTime @default(now())
}
```

### 8.2 Key Index Strategy

* `(userId, date)` on transactions — most queries filter by user + date range
* `(userId, category)` on transactions — category breakdown queries
* `(userId, year, month)` on budgets — monthly budget lookup
* `(userId, date)` on AIUsageLog — daily rate limit checks
* All soft-deleted transactions include `deletedAt` — queries always add `WHERE deletedAt IS NULL`

\---

## 9\. API Design

### 9.1 Base URL \& Conventions

```
Base URL: https://api.Sumptuo.app/api/v1

Authentication: Bearer token in Authorization header
  Authorization: Bearer <accessToken>

Content-Type: application/json (all requests/responses)

Errors follow this shape:
{
  "success": false,
  "error": {
    "code": "VALIDATION\_ERROR",
    "message": "Human-readable message",
    "details": \[...]  // optional, Zod errors
  }
}

Success follows this shape:
{
  "success": true,
  "data": { ... }
}
```

### 9.2 Auth Routes

```
POST /auth/register
Body: { email, password, name? }
Response: { user: { id, email, name }, accessToken, refreshToken }

POST /auth/login
Body: { email, password }
Response: { user: { id, email, name, isPro }, accessToken, refreshToken }

POST /auth/refresh
Body: { refreshToken }
Response: { accessToken, refreshToken }

POST /auth/logout
Body: { refreshToken }
Response: { message: "Logged out" }

GET /auth/me
Auth: required
Response: { user: { id, email, name, isPro, currency, createdAt } }

PATCH /auth/me
Auth: required
Body: { name?, currency? }
Response: { user: { ... } }
```

### 9.3 Transaction Routes

```
GET /transactions
Auth: required
Query params:
  - startDate: ISO date string (default: start of current month)
  - endDate:   ISO date string (default: today)
  - category:  string (optional filter)
  - type:      "INCOME" | "EXPENSE" (optional)
  - page:      number (default: 1)
  - limit:     number (default: 50, max: 100)
Response: {
  data: Transaction\[],
  pagination: { page, limit, total, totalPages }
}

POST /transactions
Auth: required
Body: { amount, type, category, date, description?, currency? }
Response: { data: Transaction }

PUT /transactions/:id
Auth: required
Body: { amount?, type?, category?, date?, description? }
Response: { data: Transaction }

DELETE /transactions/:id
Auth: required
Response: { message: "Transaction deleted" }
// Soft delete: sets deletedAt timestamp

GET /transactions/summary
Auth: required
Query: { month, year }
Response: {
  data: {
    totalIncome: number,
    totalExpenses: number,
    netSavings: number,
    byCategory: { category: string, total: number, count: number }\[]
  }
}
```

### 9.4 Budget Routes

```
GET /budgets
Auth: required
Query: { month?, year? } (defaults to current month/year)
Response: {
  data: {
    budget: Budget,
    spent: number,
    remaining: number,
    percentUsed: number
  }\[]
}

POST /budgets
Auth: required
Body: { category, limitAmount, month, year, rollover? }
Response: { data: Budget }

PUT /budgets/:id
Auth: required
Body: { limitAmount?, rollover? }
Response: { data: Budget }

DELETE /budgets/:id
Auth: required
Response: { message: "Budget deleted" }
```

### 9.5 AI Routes

```
POST /ai/insights
Auth: required | Pro required
Body: { lookbackDays?: number }  // default: 30
Rate limit: 3 requests per user per day
Response: {
  data: {
    insights: {
      type: "warning" | "positive" | "tip",
      title: string,
      body: string
    }\[],
    generatedAt: string
  }
}

POST /ai/forecast-summary
Auth: required | Pro required
Body: { days: 30 | 60 | 90 }
Rate limit: shared with insights (3/day total)
Response: { data: { summary: string } }
```

### 9.6 Forecast Routes

```
GET /forecast
Auth: required | Pro required
Query: { days: 30 | 60 | 90 }
Response: {
  data: {
    currentBalance: number,        // user-reported or calculated
    projectedBalance: number,
    projectedSavings: number,
    dailyProjections: {
      date: string,
      projectedBalance: number,
      projectedExpenses: number
    }\[],
    recurringTransactions: {
      description: string,
      amount: number,
      frequency: string,
      nextExpected: string
    }\[],
    assumptions: string\[]          // human-readable list of what was assumed
  }
}
```

### 9.7 CSV Import Routes

```
POST /import/preview
Auth: required | Pro required
Content-Type: multipart/form-data
Body: file (CSV, max 5MB)
Response: {
  data: {
    importId: string,              // temporary session ID
    headers: string\[],             // detected CSV headers
    sampleRows: object\[],          // first 5 rows as parsed
    suggestedMapping: {            // auto-detected column mapping
      date?: string,
      amount?: string,
      description?: string,
      type?: string
    }
  }
}

POST /import/confirm
Auth: required | Pro required
Body: {
  importId: string,
  mapping: {
    date: string,                  // column name for date
    amount: string,                // column name for amount
    description?: string,
    type?: string,                 // if present, column for INCOME/EXPENSE
    defaultType?: "INCOME" | "EXPENSE"  // if no type column
  },
  dateFormat: string               // e.g. "DD/MM/YYYY", "YYYY-MM-DD"
}
Response: {
  data: {
    imported: number,
    skipped: number,
    duplicates: number,
    importLogId: string
  }
}
```

\---

## 10\. AI Coaching System

### 10.1 Architecture

The AI coaching system is deliberately simple — no vector databases, no fine-tuning, no embeddings. It sends a structured prompt to Claude with the user's recent spending data and asks for plain-language coaching insights.

```
User clicks "Get Insights"
         ↓
Frontend → POST /ai/insights
         ↓
Backend checks rate limit (3/day per user)
         ↓
Backend queries last 30 days of transactions from DB
         ↓
Backend aggregates data (by category, income, savings rate)
         ↓
Backend builds prompt (see below)
         ↓
Backend calls Claude API (claude-sonnet-4-6)
         ↓
Backend parses response, stores AIUsageLog
         ↓
Returns structured insights to frontend
         ↓
Frontend renders InsightsPanel with 3–5 cards
```

### 10.2 Prompt Design

```
SYSTEM PROMPT:
You are a calm, non-judgmental personal finance coach.
Your job is to look at a user's recent spending data and give 3 to 5
short, actionable insights. Be specific with numbers. Be encouraging,
not preachy. Do not give generic advice like "spend less on dining out"
— instead, say something specific based on the actual numbers.

Respond ONLY with a valid JSON array. No markdown. No preamble.
Each insight has these fields:
- type: "warning" | "positive" | "tip"
- title: short title (under 8 words)
- body: the insight (under 50 words, specific to this user's numbers)

USER PROMPT:
Currency: {currency}
Current month: {monthYear}
Total income this month: {totalIncome}
Total expenses this month: {totalExpenses}
Net savings this month: {netSavings}
Savings rate: {savingsRate}%

Spending by category this month:
{categoryBreakdown}

Spending by category last month (for comparison):
{lastMonthCategoryBreakdown}

Active budgets and status:
{budgetStatus}

Top 5 largest transactions this month:
{topTransactions}

Goals:
{goalsSummary}
```

### 10.3 Cost Control

Each insights call costs approximately:

* Input tokens: \~600 (prompt + data) → \~$0.0009
* Output tokens: \~200 (5 insights) → \~$0.0006
* **Total per call: \~$0.0015**

At 3 calls/day per Pro user, max cost = $0.0045/day = **$1.64/year per Pro user**.
Pro users pay $29/year. AI cost is under 6% of revenue per user.

To protect against abuse:

* Hard rate limit: 3 AI calls per user per calendar day (enforced at DB level)
* If user hits limit, show last cached insights with timestamp
* Cache last AI response in memory (Redis in future, in-memory map for MVP)

### 10.4 Sample Output

```json
\[
  {
    "type": "warning",
    "title": "Food spending up 28% from last month",
    "body": "You spent ₹8,400 on food this month vs ₹6,550 last month. The increase seems to be in the Food \& Dining category. If you're ordering in more, setting a ₹7,000 budget could save ₹1,400/month."
  },
  {
    "type": "positive",
    "title": "Savings rate is strong at 40%",
    "body": "You saved ₹20,800 of ₹52,000 income this month — well above the recommended 20%. At this rate you'll hit your Bike goal 2 months ahead of schedule."
  },
  {
    "type": "tip",
    "title": "Fixed costs are at a healthy level",
    "body": "Rent + EMI total ₹18,000 — that's 34% of your income. Financial advisors recommend keeping fixed costs under 50%, so you have room for flexibility."
  }
]
```

\---

## 11\. Forecasting Engine

### 11.1 Algorithm (No ML Required)

The forecasting engine uses a deterministic projection model based on historical averages and detected recurring transactions. It's intentionally transparent — users can see the "assumptions" the forecast is based on.

**Step 1: Detect recurring transactions**

```
- Group transactions by (description, amount) with ±10% amount tolerance
- If a group appears in 2+ of the last 3 months within 5 days of same date → mark as recurring
- Assign frequency: monthly
- Predict next occurrence: same day next month
```

**Step 2: Calculate base monthly averages**

```
- avgMonthlyIncome = average income across last 3 complete months
- avgMonthlyExpenseByCategory = average expense per category, last 3 months
- Exclude outliers (values > 3x average for that category → flag as one-time)
```

**Step 3: Build daily projection**

```
For each day in forecast window (30/60/90):
  startingBalance = user's stated current balance (or sum of all transactions)
  
  For each day D:
    income today = sum of recurring incomes due on day D
    expenses today = (avgMonthlyExpense / 30) + sum of recurring expenses due on day D
    projectedBalance\[D] = projectedBalance\[D-1] + income today - expenses today
```

**Step 4: Scenario adjustments**

```
"Same as last month" → multiplier = 1.0
"10% more careful" → expense multiplier = 0.9
"Big expense month" → expense multiplier = 1.25
```

**Step 5: Goal projection**

```
For each active goal:
  required monthly savings = (targetAmount - savedAmount) / monthsUntilDeadline
  current monthly savings rate = netSavings / totalIncome
  
  if current rate covers required savings → "On track, goal by {date}"
  else → "Need ₹{X} more/month to hit goal by deadline"
```

### 11.2 Assumptions Display

The forecast always shows its assumptions to the user. Example:

```
Forecast assumptions:
• Based on average income of ₹52,000/month (last 3 months)
• Food \& Dining averaged ₹7,200/month
• Recurring: Rent ₹15,000 on 1st, EMI ₹8,500 on 5th
• One-time items excluded: Flight ticket ₹12,000 (Dec)
```

This builds trust. Users understand where the numbers come from.

\---

## 12\. CSV Import Pipeline

### 12.1 Supported Formats

Phase 1 supports any generic CSV. Phase 2 adds auto-detection for:

|Bank|Format Notes|
|-|-|
|HDFC|Date as "DD/MM/YY", debit/credit in separate columns|
|ICICI|Date as "DD-MMM-YYYY", single amount column with Dr/Cr suffix|
|SBI|Date as "DD MMM YYYY", "Debit" and "Credit" columns|
|Axis|Date as "DD-MM-YYYY", "Debit Amount" / "Credit Amount"|
|Kotak|Date as "DD-MM-YYYY", signed amount (negative = debit)|

### 12.2 Import Flow (Detailed)

```
1. User uploads CSV file (max 5MB, max 5,000 rows)
2. Server receives file via Multer (memory storage, never written to disk)
3. csv-parse reads file, extracts headers + first 5 rows as preview
4. Auto-detection: check if headers match known bank patterns
5. Return preview to frontend with suggested column mapping
6. User confirms mapping (or adjusts)
7. Server processes full file:
   a. Parse each row using confirmed column mapping
   b. Validate: amount must be numeric, date must be parseable
   c. Check for duplicates: query DB for (userId, date ±1 day, amount ±0.01)
   d. Batch insert valid rows in chunks of 100
   e. Return import summary
```

### 12.3 Duplicate Detection Logic

```typescript
// A transaction is a probable duplicate if:
// - Same userId
// - Amount within ±1% of an existing transaction
// - Date within ±1 day of an existing transaction
// - Category is the same OR description similarity > 80%

const isDuplicate = await prisma.transaction.findFirst({
  where: {
    userId,
    deletedAt: null,
    amount: { gte: amount \* 0.99, lte: amount \* 1.01 },
    date: { gte: subDays(date, 1), lte: addDays(date, 1) }
  }
});
```

Duplicates are flagged (not blocked). User sees: "14 possible duplicates detected — import anyway or skip them?"

\---

## 13\. Security \& Privacy Model

### 13.1 Auth Security

* **Access tokens:** 15-minute expiry, signed with HS256, stored in memory (not localStorage)
* **Refresh tokens:** 30-day expiry, stored in httpOnly cookie, rotated on each use
* **Token rotation:** Each refresh invalidates the old refresh token (stored in DB)
* **Logout:** Revokes refresh token in DB. All devices can be logged out by revoking all tokens.
* **Password:** bcrypt with 12 salt rounds (\~300ms hash time — slow enough to resist brute force)
* **Rate limiting:** 10 login attempts per IP per 15 minutes, then 1-hour lockout

### 13.2 Data Privacy

This is a core differentiator. The privacy model must be explicit:

|Data|What we store|What we don't store|
|-|-|-|
|Transactions|Amount, category, date, description, type|Bank account numbers, merchant IDs, location|
|Auth|Email (hashed with bcrypt), hashed password|Plain text password, bank credentials|
|AI calls|Token count for rate limiting|Transaction data sent to Claude is not logged|
|Analytics|None|No usage analytics, no third-party trackers|

**No Plaid. No bank linking. No Open Banking APIs.** This is a deliberate product decision, not a technical limitation. It's a feature — we literally cannot see your bank account, which means we literally cannot sell that data.

### 13.3 GDPR / Data Portability

* Users can export all their data (transactions, budgets, goals) as JSON at any time from Settings
* Users can delete their account (purges all data after 30-day recovery window)
* No data is shared with third parties except Anthropic (for AI features), and only anonymized spending aggregates are sent — never email, name, or account details

### 13.4 Transport \& Infrastructure Security

* All traffic over HTTPS (enforced by Vercel and Railway)
* Database credentials never in frontend code
* Environment variables never committed to git
* Supabase Row Level Security enabled as backup (even if Prisma query is wrong, DB enforces userId isolation)

\---

## 14\. Monetization Strategy

### 14.1 Pricing Tiers

**Free Tier — Always Free**

* Manual transaction entry (unlimited)
* Basic budget categories (up to 5)
* 3 months of transaction history
* Monthly summary charts
* No CSV import, no AI, no forecasting

**Pro Tier — ₹249/month or ₹1,999/year (\~$29/year)**

* Everything in Free
* Unlimited transaction history
* CSV import (up to 500 rows per import)
* AI coaching insights (3 refreshes/day)
* Forecasting engine (30/60/90 day)
* Goals tracker
* Unlimited budget categories
* Budget rollover
* Multi-currency support
* Full data export
* Priority support

**Why this pricing:**

* ₹1,999/year = ₹167/month — less than one restaurant meal
* Priced for India (YNAB at $99/year = \~₹8,300/year is 4x more expensive)
* Annual plan has \~80% margin after infra + API costs
* Goal: 500 paying users = ₹9,95,000/year ARR as a solo project

### 14.2 Free-to-Pro Upgrade Triggers

These are the moments where free users will feel the most pressure to upgrade (naturally, without dark patterns):

1. **When they hit the 3-month history limit** — they see a blurred chart with "Unlock full history with Pro"
2. **When they try to upload a CSV** — they see the import UI locked with a clear upgrade CTA
3. **When they view the Forecast page** — they see a blurred projection chart
4. **After 2–3 months of use** — they're invested in the product; a well-timed in-app banner converts well
5. **Year-end tax season** — "Export your full year's transactions for ₹1,999"

### 14.3 Payment Implementation

**MVP:** Manual payment via Razorpay (India) or Stripe (global). User pays → webhook fires → backend sets `isPro = true` and `proExpiresAt = now + 1 year`.

**Not needed at launch:** Subscription management portal, dunning, automatic renewal reminders. Do these manually at first.

\---

## 15\. MVP Roadmap

### Timeline: 8 Weeks (Part-Time, \~2–3 Hours/Day)

\---

### Phase 1 — Foundation (Week 1–2)

**Goal: Working auth + empty dashboard deployed live**

**Backend (Week 1)**

* \[ ] Initialize Node.js + Express + TypeScript project
* \[ ] Set up Prisma with Supabase PostgreSQL connection
* \[ ] Run first migration (User + RefreshToken models)
* \[ ] Implement `POST /auth/register` — hash password, create user, return tokens
* \[ ] Implement `POST /auth/login` — validate credentials, return tokens
* \[ ] Implement `POST /auth/refresh` — rotate refresh token
* \[ ] Implement `POST /auth/logout` — revoke refresh token
* \[ ] Implement `GET /auth/me` — return user profile
* \[ ] Auth middleware (verify access token, attach `req.user`)
* \[ ] Global error handling middleware
* \[ ] Deploy to Railway with environment variables set

**Frontend (Week 2)**

* \[ ] Initialize Vite + React + TypeScript project
* \[ ] Configure Tailwind CSS v4 + shadcn/ui (you know this setup well)
* \[ ] Set up React Router v6 with protected route wrapper
* \[ ] Build Login page
* \[ ] Build Register page
* \[ ] Set up Axios instance with base URL
* \[ ] Implement interceptors: auto-attach access token, auto-refresh on 401
* \[ ] Build AuthContext (user state, login/logout functions)
* \[ ] Build AppLayout (sidebar + navbar shell, empty content area)
* \[ ] Deploy to Vercel

**✅ Week 2 Deliverable:** Register → Login → See empty dashboard. Auth works end-to-end.

\---

### Phase 2 — Core Product (Week 3–4)

**Goal: A fully functional manual finance tracker**

**Transactions (Week 3)**

* \[ ] Add Transaction model to Prisma + migrate
* \[ ] `GET /transactions` — with date range + category filters + pagination
* \[ ] `POST /transactions` — create, validate with Zod
* \[ ] `PUT /transactions/:id` — update (ownership check)
* \[ ] `DELETE /transactions/:id` — soft delete
* \[ ] `GET /transactions/summary` — aggregated by category
* \[ ] Transactions page: filterable table with pagination
* \[ ] AddTransactionPanel: slide-over with form (React Hook Form + Zod)
* \[ ] EditTransactionPanel: same form, pre-populated
* \[ ] Delete with undo toast (5 second window)
* \[ ] Category icons and color coding

**Budgets + Dashboard (Week 4)**

* \[ ] Add Budget model to Prisma + migrate
* \[ ] Budget CRUD routes
* \[ ] Budget page: progress cards per category
* \[ ] Over-budget visual indicators (red progress bars)
* \[ ] Dashboard: income/expense/savings summary cards
* \[ ] Spending pie chart (Recharts)
* \[ ] Income vs expense bar chart (last 3 months)
* \[ ] Recent transactions widget

**✅ Week 4 Deliverable:** A fully working manual finance tracker. Shareable to beta users at this point.

\---

### Phase 3 — Pro Features (Week 5–6)

**Goal: The features that justify paying**

**CSV Import (Week 5)**

* \[ ] Add ImportLog model + migrate
* \[ ] Multer setup for CSV file uploads
* \[ ] `POST /import/preview` — parse CSV, auto-detect columns
* \[ ] `POST /import/confirm` — full import with duplicate detection
* \[ ] Import UI: drag-and-drop file zone
* \[ ] Column mapper UI
* \[ ] Preview table (first 10 rows)
* \[ ] Import results screen (imported / skipped / duplicates)
* \[ ] Pro gate on import page (blurred overlay for free users)

**AI Insights (Week 5–6)**

* \[ ] Add AIUsageLog model + migrate
* \[ ] Anthropic SDK setup
* \[ ] `POST /ai/insights` — rate limited, calls Claude API
* \[ ] Build prompt aggregation logic (pull 30-day data, format for prompt)
* \[ ] Parse Claude JSON response into typed InsightCard\[] array
* \[ ] InsightsPanel component on dashboard
* \[ ] Loading state + skeleton
* \[ ] Refresh button with daily limit indicator ("2 refreshes remaining today")
* \[ ] Pro gate on insights panel

**Forecasting (Week 6)**

* \[ ] `GET /forecast` — full projection algorithm
* \[ ] Recurring transaction detector
* \[ ] ForecastLineChart (Recharts LineChart)
* \[ ] 30/60/90 day toggle
* \[ ] Scenario selector
* \[ ] Assumptions display section
* \[ ] Goals tracker page + API
* \[ ] GoalCard with progress ring
* \[ ] AI forecast summary call

**✅ Week 6 Deliverable:** Full Pro feature set working end-to-end.

\---

### Phase 4 — Polish \& Launch (Week 7–8)

**Goal: Production-ready, launched to real users**

**Polish (Week 7)**

* \[ ] Mobile responsive: test every page on 375px width
* \[ ] Dark/light mode toggle (shadcn/ui built-in)
* \[ ] All empty states designed (no transactions, no budgets, new user)
* \[ ] Loading skeletons on all data-fetching pages
* \[ ] Settings page: name, currency, change password, export data
* \[ ] Billing page: upgrade CTA + Razorpay integration
* \[ ] Delete account flow (with 30-day recovery warning)
* \[ ] Error boundaries (graceful crash handling)
* \[ ] Fix all console warnings and TypeScript errors

**Launch (Week 8)**

* \[ ] Custom domain setup (Sumptuo.app or similar)
* \[ ] Landing page: hero, problem statement, feature list, pricing, FAQ
* \[ ] SEO: meta tags, og:image, sitemap
* \[ ] Create 3–5 demo screenshots / screen recording
* \[ ] Write launch post for r/personalfinance (be genuine, not spammy)
* \[ ] Write launch post for r/SideProject and r/startups
* \[ ] Product Hunt launch (prepare assets: logo, tagline, screenshots, video)
* \[ ] Tweet the launch with screenshots

**✅ Week 8 Deliverable:** Live product with real users and first paying customers.

\---

### Feature Priority Matrix

|Feature|Build Effort|User Impact|Revenue Impact|Phase|
|-|-|-|-|-|
|Auth (register/login)|Medium|Critical|Enables everything|1|
|Manual transactions|Low-Medium|Critical|Foundation|2|
|Budgets + progress|Low|High|Retention driver|2|
|Dashboard charts|Low|High|"Wow" moment|2|
|CSV import|Medium|High|Top Pro feature|3|
|AI coaching insights|Low-Medium|Very High|#1 upgrade trigger|3|
|Forecasting|Medium|High|Strong Pro feature|3|
|Goals tracker|Low|Medium|Retention|3|
|Mobile responsive|Medium|High|Widens audience|4|
|Stripe/Razorpay|Medium|Medium|Revenue unlock|4|
|Recurring templates|Medium|Medium|Convenience|Phase 2|
|Mobile app (Expo)|High|High|2x audience|Phase 2|
|Bill reminders|Medium|Medium|Retention|Phase 2|
|Household mode|High|Medium|New segment|Phase 2|

\---

## 16\. Launch Strategy

### 16.1 Beta Launch (End of Week 6)

Before the public launch, recruit 20–50 beta users:

* Post in WhatsApp/Telegram groups of college friends and engineers
* Share in college placement/alumni groups
* Offer lifetime Pro for free to the first 20 users who give genuine feedback

Run beta for 2 weeks. Collect feedback on: confusing UI, missing features, bugs, pricing reaction.

### 16.2 Public Launch Channels

**Reddit (highest ROI for indie SaaS)**

* r/personalfinance (18M members) — frame it as "I built a free alternative to Mint after it shut down"
* r/India (10M members) — frame it as "built a budgeting app for INR / UPI users"
* r/SideProject — for the builder community
* r/startups — for feedback from founders

**Product Hunt**

* Launch on a Tuesday or Wednesday (highest traffic days)
* Prepare: logo, tagline (under 60 chars), 3 screenshots, optional demo video
* Get 5–10 friends to upvote and leave genuine comments on launch day

**Twitter/X**

* Build in public thread: "I'm building a privacy-first finance tracker because Mint died. Here's week 1..."
* Post weekly updates. Devs and indie hackers share these.

**Hacker News**

* Post under "Show HN: I built a privacy-first alternative to Mint"
* Be ready to answer technical questions in the comments

### 16.3 Conversion Funnel

```
Visitor lands on landing page
         ↓
Signs up for free (no credit card)
         ↓
Adds first transaction (immediate value)
         ↓
Uses for 2–4 weeks (habit formation)
         ↓
Hits 3-month history limit OR tries CSV import OR wants AI
         ↓
Sees Pro upgrade CTA at natural friction point
         ↓
Converts to Pro (₹1,999/year)
```

Target conversion rate: 5% of active free users → Pro within 90 days.

\---

## 17\. Success Metrics

### 17.1 North Star Metric

**Weekly Active Users (WAU)** — Finance is a weekly habit. If users come back weekly, the product is working.

### 17.2 Metrics Dashboard

|Metric|Target at 3 Months|Target at 6 Months|
|-|-|-|
|Registered users|500|2,000|
|Weekly Active Users|200|800|
|Pro subscribers|25|150|
|MRR|₹4,975|₹29,850|
|Avg transactions/user/week|>5|>5|
|D30 retention|>30%|>40%|
|Pro conversion rate|5%|7%|

### 17.3 Leading Indicators

These signal whether Sumptuo will succeed before the revenue metrics show it:

* **Transaction add rate in first 7 days:** If a new user adds >10 transactions in week 1, they're very likely to stay
* **Return visit in 48 hours:** Users who return within 2 days of registering have 3x the 30-day retention rate
* **AI insights click rate:** If >60% of Pro users click "Get Insights" in their first week, the feature is resonating
* **Reddit post engagement:** Upvotes + genuine comments (not "cool project!") on launch posts

\---

*Document version 1.0 — Sumptuo Solo Build
Stack: PostgreSQL + Express + React + Node.js (PERN)
Deployment: Vercel + Railway + Supabase
Author: Yasir Naseem*

