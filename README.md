# Appwrite + Next.js Starter Kit

A production-ready Next.js 16 starter kit with **complete authentication** and **database migrations, done right**. Stop building auth flows from scratch and start building features that matter.

## Features

### Complete Authentication System

- **Email & Password** - Traditional authentication with email verification
- **OAuth Integration** - Google login (easily extensible to other providers)
- **Password Recovery** - Secure forgot/reset password flow
- **Account Management** - Update name, email, and password
- **Session Management** - Logout from current or all devices
- **Protected Routes** - Middleware-based route protection

### Database Migrations, Done Right

- **Code-First Migrations** - Define schema changes in TypeScript
- **Automatic Tracking** - Never run the same migration twice
- **Version Control Ready** - Commit migrations alongside your code
- **Forward-Only** - Create new migrations to fix mistakes (clear audit trail)
- **Easy Generation** - `npm run db:make-migration <name>` creates boilerplate

### Beautiful UI

- **shadcn/ui Components** - 40+ pre-built, customizable components
- **Tailwind CSS** - Modern, responsive styling
- **Dark Mode Ready** - Theme support built-in
- **Form Validation** - React Hook Form + Zod schemas

### Performance & DX

- **Zustand State Management** - Smart caching prevents duplicate API calls
- **TypeScript** - Full type safety across the stack
- **Next.js 16** - Latest App Router with Turbopack
- **ESLint** - Code quality enforcement

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- An [Appwrite](https://cloud.appwrite.io) account

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd appwrite-nextjs-starter-kit
npm install
```

### 2. Set Up Appwrite

1. Create a new project at [cloud.appwrite.io](https://cloud.appwrite.io)
2. Go to **Settings** → Copy your **Project ID**
3. Go to **Settings** → **API Keys** → Create a new API key with full permissions
4. Go to **Databases** → Create a new database → Copy the **Database ID**

### 3. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your Appwrite credentials:

```bash
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id

NEXT_APPWRITE_PROJECT_NAME=your_project_name
NEXT_APPWRITE_API_KEY=your_api_key
NEXT_APPWRITE_DATABASE_ID=your_database_id
NEXT_APPWRITE_DATABASE_NAME=your_database_name
```

### 4. Run Database Migrations

```bash
npm run db:migrate
```

This creates the database and migrations tracking table.

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Usage

### Authentication

```typescript
// In any component or page
import { useAuth } from "@/hooks/use-auth";

export default function MyPage() {
  // Middleware: "auth" redirects guests, "guest" redirects authenticated users
  const { user, isAuthenticated, isLoading } = useAuth({ middleware: "auth" });

  if (isLoading) return <Spinner />;

  return <div>Welcome, {user?.name}!</div>;
}
```

### Creating Migrations

```bash
# Generate a new migration file
npm run db:make-migration create-posts-table

# Edit the generated file in appwrite/migrations/
# Then run migrations
npm run db:migrate
```

Example migration:

```typescript
import { tablesDB } from "@/appwrite/server";
import { appwriteConfig } from "@/appwrite/config";
import { ID, Permission } from "node-appwrite";

export async function up() {
  // Create a table
  await tablesDB.createTable({
    databaseId: appwriteConfig.databaseId,
    tableId: ID.unique(),
    name: "posts",
    permissions: [Permission.read("any")],
    enabled: true,
  });

  // Add columns
  await tablesDB.createStringColumn({
    databaseId: appwriteConfig.databaseId,
    tableId: "posts",
    key: "title",
    required: true,
    size: 255,
  });
}
```

## Available Scripts

```bash
# Database Migrations
npm run db:make-migration <name>  # Create new migration
npm run db:migrate                # Run pending migrations
```

## Contributing

Contributions are welcome! Here's how you can help:

- **Report Bugs** - Open a GitHub issue
- **Add Features** - Submit a pull request
- **Improve Docs** - Help others get started faster

## License

MIT License - feel free to use this in your projects!

## Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Appwrite Documentation](https://appwrite.io/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

Built with ❤️ using Next.js 16, Appwrite, TypeScript, and shadcn/ui
