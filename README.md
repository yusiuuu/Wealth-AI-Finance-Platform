# 💸 Wealth AI Finance Platform

A smart personal finance management web app built using **Next.js**, **Clerk**, **Supabase**, and **Prisma**. It allows users to track transactions, manage accounts, set budgets, and visualize financial goals – with a focus on simplicity, security, and performance.

---

## 🚀 Features

- 🔐 User Authentication (Clerk)
- 🧾 Manage Transactions
- 🏦 Manage Accounts
- 🎯 Set Budgets
- 📊 Dashboard for overview
- ☁️ Supabase PostgreSQL as the database
- 🧠 Backend built using Prisma ORM

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

---

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
