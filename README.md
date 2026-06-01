# ToDo PG

> 🎓 **Learning Project** — Built to practice **PostgreSQL** with Next.js. This is a hands-on experiment exploring raw `pg` queries, Neon cloud database, and NextAuth JWT auth — no ORM, no abstractions, just SQL.

A full-stack **Todo application** built with **Next.js App Router**, **PostgreSQL (Neon)**, **NextAuth v4** (JWT, Credentials), and **Server Actions**. Users can register, log in, and manage their personal todos — all stored securely in a cloud PostgreSQL database.

---

## Why I Built This

I'm learning **PostgreSQL** from scratch and wanted a real project to practice on instead of just following tutorials. This app covers the things I wanted to understand:

- Writing raw SQL queries (no Prisma, no Drizzle)
- Connecting to a cloud PostgreSQL database (Neon)
- Handling user authentication with hashed passwords
- Scoping database records to individual users
- Running server-side logic with Next.js Server Actions

If you're also learning PostgreSQL with Next.js, this project might help you too.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Auth | NextAuth v4 (JWT + Credentials) |
| Database | PostgreSQL via Neon (raw `pg`) |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Toasts | Sonner |
| Password Hashing | bcryptjs |
| Package Manager | pnpm |

---

## Project Structure

```
ToDo-PG/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx          # Login page
│   │   └── register/page.tsx       # Register page
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts  # NextAuth handler
│   │   └── register/route.ts            # User registration API
│   ├── todos/page.tsx              # Protected todos dashboard
│   ├── page.tsx                    # Landing/home page
│   ├── layout.tsx                  # Root layout with Navbar + Providers
│   └── globals.css
├── components/
│   ├── todo/
│   │   ├── todo.actions.ts         # Server Actions (CRUD)
│   │   ├── TodoForm.tsx            # Add todo form
│   │   └── TodoList.tsx            # Todo list with toggle/delete
│   ├── ui/                         # shadcn/ui components
│   ├── LoginForm.tsx
│   ├── RegisterForm.tsx
│   ├── Navbar.tsx
│   ├── providers.tsx               # SessionProvider wrapper
│   └── usersession.ts              # requireUser() server helper
├── lib/
│   ├── auth.ts                     # NextAuth config (authOptions)
│   ├── db.ts                       # PostgreSQL Pool (singleton)
│   ├── queries.ts                  # query() helper
│   ├── session.ts                  # getSession() helper
│   ├── types.ts                    # User & Todo interfaces
│   └── utils.ts                    # cn() Tailwind helper
├── types/
│   └── next-auth.d.ts              # Session type augmentation
└── package.json
```

---

## Database Setup

Run the following SQL in your Neon (or any PostgreSQL) console to create the required tables:

```sql
CREATE TABLE users (
  id         SERIAL PRIMARY KEY,
  name       TEXT NOT NULL,
  email      TEXT UNIQUE NOT NULL,
  password   TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE todos (
  id         SERIAL PRIMARY KEY,
  title      TEXT NOT NULL,
  completed  BOOLEAN DEFAULT FALSE,
  user_id    INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
NEXTAUTH_SECRET=your_random_secret_here
NEXTAUTH_URL=http://localhost:3000
```

> Generate a secret with: `openssl rand -base64 32`

---

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Features

- **Register** — Create an account with name, email, and password (bcrypt-hashed)
- **Login** — Credentials-based auth with JWT session
- **Navbar** — Shows user's name and logout button when logged in
- **Todos Dashboard** — View, add, toggle complete, and delete todos (user-scoped)
- **Server Actions** — CRUD operations run server-side with `revalidatePath`
- **Route Protection** — `requireUser()` redirects unauthenticated users to `/login`

---

## Known Bugs & Issues

> This is a learning project, so known bugs are documented here intentionally — they're part of the learning process.

### Bug 1 — `NEXTAUTH_SECRET` not set → silent JWT failure

**File:** `lib/auth.ts`  
**Severity:** 🔴 Critical

`authOptions` does not define a `secret` property. NextAuth falls back to the `NEXTAUTH_SECRET` environment variable, but if it is missing from `.env.local`, JWT signing silently fails — sessions appear to be created but are immediately invalid on the next request.

**Fix:** Explicitly pass the secret in `authOptions`:

```ts
// lib/auth.ts
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  // ...
};
```

And ensure `.env.local` contains:
```env
NEXTAUTH_SECRET=your_random_secret_here
```

---

### Bug 2 — `/todos` page has no auth guard (unauthenticated users can load the page)

**File:** `app/todos/page.tsx`  
**Severity:** 🔴 Critical

`TodosPage` calls `getTodos()` (a Server Action that internally calls `requireUser()`), which redirects on the server. However, the page itself has no explicit `redirect` or session check at the top level. If `requireUser()` throws instead of redirects in certain edge cases, the page will crash with an unhandled error rather than a clean redirect.

**Fix:** Add an explicit session check at the top of the page:

```ts
// app/todos/page.tsx
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function TodosPage() {
  const session = await getSession();
  if (!session?.user) redirect("/login");

  const todos = await getTodos();
  // ...
}
```

---

### Bug 3 — `TodoList` uses `any[]` type for todos prop

**File:** `components/todo/TodoList.tsx`  
**Severity:** 🟡 Medium

The `todos` prop is typed as `any[]`, which disables all TypeScript checking on todo properties. A `Todo` interface already exists in `lib/types.ts` but is not used here.

**Fix:**

```tsx
// components/todo/TodoList.tsx
import type { Todo } from "@/lib/types";

export default function TodoList({ todos }: { todos: Todo[] }) {
  // ...
}
```

---

### Bug 4 — `LoginForm` has a dead "Forgot Password?" link

**File:** `components/LoginForm.tsx`  
**Severity:** 🟡 Medium

The login form links to `/forgot-password`, but no such route exists in the project. Clicking it leads to a 404.

**Fix:** Either remove the link until the feature is implemented, or add a placeholder route:

```tsx
// Option A: Remove it
// <Link href="/forgot-password">Forgot Password?</Link>

// Option B: Disable it visually
<span className="text-sm text-muted-foreground cursor-not-allowed opacity-50">
  Forgot Password?
</span>
```

---

### Bug 5 — `RegisterForm` has no password length validation

**File:** `components/RegisterForm.tsx`  
**Severity:** 🟡 Medium

The input placeholder says "Minimum 6 characters" but there is no client-side or server-side validation enforcing this. A user can submit a 1-character password.

**Fix — Client side:**

```tsx
if (form.password.length < 6) {
  toast.error("Password must be at least 6 characters.");
  return;
}
```

**Fix — Server side (`app/api/register/route.ts`):**

```ts
if (password.length < 6) {
  return NextResponse.json(
    { error: "Password must be at least 6 characters" },
    { status: 400 }
  );
}
```

---

### Bug 6 — `error: any` in register API route suppresses type safety

**File:** `app/api/register/route.ts`  
**Severity:** 🟠 Low-Medium

The catch block uses `error: any`, which bypasses TypeScript's error handling safety. This can hide incorrect error access patterns.

**Fix:**

```ts
} catch (error: unknown) {
  console.error(error);
  return NextResponse.json(
    { error: "Internal Server Error" },
    { status: 500 }
  );
}
```

---

### Bug 7 — `Navbar` hardcodes `bg-white` breaking dark mode

**File:** `components/Navbar.tsx`  
**Severity:** 🟠 Low-Medium

The navbar uses `bg-white` and `text-gray-700` inline Tailwind classes instead of semantic color tokens (`bg-background`, `text-foreground`). If a dark mode or custom theme is applied via `next-themes`, the navbar will remain white and break the UI.

**Fix:**

```tsx
<nav className="border-b bg-background">
  <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-1">
    <Link href="/" className="text-xl font-bold text-primary">
      ToDo PG
    </Link>
    {/* ... */}
    <span className="font-medium text-foreground">
      Hello, {session.user.name}
    </span>
```

---

### Bug 8 — `pnpm-workspace.yaml` present but unused

**File:** `pnpm-workspace.yaml`  
**Severity:** 🟢 Low

The project contains a `pnpm-workspace.yaml` file (for monorepo setups) but is a single-package project. This file is harmless but misleading, and may cause unexpected behavior if future tooling auto-detects a monorepo.

**Fix:** Delete `pnpm-workspace.yaml` unless you plan to add a monorepo structure.

---

### Bug 9 — Landing page claims "Next.js 15" but package uses Next.js 16

**File:** `app/page.tsx`, `package.json`  
**Severity:** 🟢 Low

The hero section of the landing page reads *"Built with Next.js 15 & PostgreSQL"*, but `package.json` declares `"next": "16.2.6"`.

**Fix:** Update the badge text in `app/page.tsx`:

```tsx
// Before
Built with Next.js 15 & PostgreSQL

// After
Built with Next.js 16 & PostgreSQL
```

---

## Bug Summary

| # | File | Severity | Description |
|---|---|---|---|
| 1 | `lib/auth.ts` | 🔴 Critical | `NEXTAUTH_SECRET` not explicitly set in authOptions |
| 2 | `app/todos/page.tsx` | 🔴 Critical | No top-level auth guard on the todos page |
| 3 | `components/todo/TodoList.tsx` | 🟡 Medium | `todos` typed as `any[]` instead of `Todo[]` |
| 4 | `components/LoginForm.tsx` | 🟡 Medium | Dead `/forgot-password` link (no route exists) |
| 5 | `components/RegisterForm.tsx` + `api/register/route.ts` | 🟡 Medium | No password length validation (client or server) |
| 6 | `app/api/register/route.ts` | 🟠 Low-Med | `catch (error: any)` bypasses TypeScript error safety |
| 7 | `components/Navbar.tsx` | 🟠 Low-Med | Hardcoded `bg-white` breaks dark mode |
| 8 | `pnpm-workspace.yaml` | 🟢 Low | Unused monorepo config in a single-package project |
| 9 | `app/page.tsx` | 🟢 Low | Version label says "Next.js 15" but project is on 16 |

---

## Deployment (Vercel)

1. Push the repo to GitHub
2. Import on [vercel.com](https://vercel.com)
3. Add environment variables in the Vercel dashboard:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (set to your production URL)
4. Deploy

---

## License

MIT
