# 💸 Wealth AI Finance Platform

A smart personal finance management web app built using **Next.js**, **Clerk**, **Supabase**, and **Prisma**. It allows users to track transactions, manage accounts, set budgets, and visualize financial goals – with a focus on simplicity, security, and performance.

---

## 🚀 Features

- 🔐 User Authentication (Clerk)
- 🧾 Manage Transactions
- 🏦 Manage Accounts (View, Create, Set Default)
- 🎯 Set Budgets
- 📊 Dashboard with real-time financial overview
- 🧠 Dynamic Account Page with transaction history
- 🌱 Seeded dummy transactions for development
- ☁️ Supabase PostgreSQL as the database
- ✨ Backend powered by Prisma ORM

---

## 🛠️ Tech Stack

| Tech         | Description                              |
|--------------|------------------------------------------|
| Next.js      | React framework for fullstack web apps   |
| Clerk        | User auth (sign in, sign up, user button)|
| Prisma       | Type-safe ORM for database operations    |
| Supabase     | PostgreSQL database + API hosting        |
| Tailwind CSS | Utility-first styling                    |
| Lucide Icons | Beautiful open-source icons              |
| Shadcn UI    | Modern UI components with Radix + Tailwind |

---

### 🔄 Updates
- Integrated recurring column in the transaction table
- Populated transaction and recurring data from Supabase
- Used shadcnUI `Badge` and `Clock` components for better UI indicators

## ⚡ New Features

### 📊 Budget Alert Automation
- Implemented **cron jobs** using Inngest to monitor budget usage in real-time.
- Automatically checks if a user’s spending approaches or exceeds their set budget limits.
- Sends **automated email notifications** to alert users when they reach a critical spending threshold, helping them take timely action.

### ✉️ Email Notifications
- Integrated email notification system to send actionable budget alerts.
- Ensures users stay informed about their budget status without needing to constantly check the dashboard.
- Powered by a serverless function that triggers when the budget limit condition is met.


## 🗃️ Database Models (Prisma)

```prisma
model User {
  id            String    @id @default(uuid())
  clerkUserId   String    @unique
  email         String    @unique
  name          String?
  imageurl      String?
  transactions  Transaction[]
  accounts      Account[]
  budgets       Budget[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  @@map("users")
}

```
# Get Started
## 1. Clone the repo
```bash
git clone https://github.com/yusiuuu/Wealth-AI-Finance-Platform.git
cd Wealth-AI-Finance-Platform
```
## 2. Install dependencies
```bash
npm install
```
## 3. Setup environment
### create .env file:
```env
DATABASE_URL=your_supabase_postgresql_url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
```
## 4. Push prisma schema to Supabase
```bash
npx prisma db push
```
## 5. Run the development server
```bash
npm run dev
```
