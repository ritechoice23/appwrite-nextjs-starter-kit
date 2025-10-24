import Link from "next/link";
import { Button } from "@/components/ui/button";
import { authRoutes } from "@/routes/auth";
import {
  CheckCircle2,
  FileCode2,
  RefreshCw,
  Target,
  Undo2,
  Bug,
  Sparkles,
  BookOpen
} from "lucide-react";

export default function LandingPage() {
  const features = [
    {
      category: "Authentication",
      items: [
        "Email & Password Authentication",
        "Google OAuth Login",
        "Email Verification Flow",
        "Password Recovery & Reset",
        "Logout (Single & All Devices)",
      ]
    },
    {
      category: "Account Management",
      items: [
        "Update Profile Name",
        "Update Email Address",
        "Change Password",
        "Account Settings Page",
      ]
    },
    {
      category: "Database Migrations",
      highlight: true,
      items: [
        "Code-First Database Migrations",
        "Version Control Your Schema",
        "Automatic Migration Tracking",
        "Rollback Support",
        "Run Migrations: npm run db:migrate",
      ]
    },
    {
      category: "UI Components",
      items: [
        "Pre-built Auth Forms (Login, Signup, Forgot Password)",
        "Responsive Layout with Top Navbar",
        "shadcn/ui Components",
        "Toast Notifications",
        "Loading States",
      ]
    },
    {
      category: "Developer Experience",
      items: [
        "TypeScript Support",
        "Form Validation with Zod",
        "React Hook Form Integration",
        "Middleware-based Auth Protection",
        "Zustand State Management",
        "Optimized Auth Caching (No Re-fetch)",
        "Clean Code Architecture",
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between mx-auto px-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-primary to-primary/80 text-primary-foreground font-bold shadow-sm">
                R
              </div>
              <span className="font-semibold text-lg hidden sm:inline-block">ritchoice23</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="#migrations" className="text-muted-foreground hover:text-foreground transition-colors">
                Migrations
              </Link>
              <Link href="#contribute" className="text-muted-foreground hover:text-foreground transition-colors">
                Contribute
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm" className="hidden sm:flex">
              <Link href={authRoutes.login.path}>Log In</Link>
            </Button>
            <Button asChild size="sm" className="shadow-sm">
              <Link href={authRoutes.signup.path}>Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto container py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
            Welcome to ritchoice23
            <br />
            <span className="text-primary">Next.js + Appwrite</span>
            <br />
            Starter Kit
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Skip the auth boilerplate and start building your product. A complete authentication system built with Next.js 16, Appwrite, and TypeScript.
          </p>
          <p className="text-base text-muted-foreground mb-8 italic">
            I built this for myself, but I think it will be useful for other people too.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href={authRoutes.signup.path}>Start Building Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={authRoutes.login.path}>View Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Unique Feature Highlight */}
      <section id="migrations" className="mx-auto container py-16 md:py-24 bg-primary/5">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <span className="inline-block text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full mb-4">
              Game Changer
            </span>
            <h2 className="text-3xl font-bold mb-4">
              Database Migrations, Done Right
            </h2>
            <p className="text-lg text-muted-foreground">
              Manage your Appwrite database schema like a pro developer. Version control, track changes, and deploy with confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-lg border bg-card p-6">
              <div className="flex items-center gap-2 mb-3">
                <FileCode2 className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Write Migrations in Code</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-3">
                Generate migration files with a single command. Define your database schema changes in TypeScript with helpful boilerplate and examples included.
              </p>
              <code className="block bg-muted p-3 rounded text-xs font-mono mb-2">
                npm run db:make-migration create-posts
              </code>
              <code className="block bg-muted p-3 rounded text-xs font-mono">
                npm run db:migrate
              </code>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <div className="flex items-center gap-2 mb-3">
                <RefreshCw className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Automatic Tracking</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                The system automatically tracks which migrations have been executed. Run the same command on dev, staging, and production without worrying about duplicates.
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <div className="flex items-center gap-2 mb-3">
                <Target className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Version Control Ready</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Commit your migrations to Git alongside your code. Your entire team stays in sync, and you can review database changes in pull requests.
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <div className="flex items-center gap-2 mb-3">
                <Undo2 className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Forward-Only Changes</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Need to fix something? Simply create a new migration file with the corrective changes. This keeps a clear audit trail of all database modifications.
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 rounded-lg bg-muted/50 border border-primary/20">
            <p className="text-sm text-center text-muted-foreground">
              <strong className="text-foreground">Why this matters:</strong> Most Appwrite projects manage their database through the console. This makes it hard to track changes, collaborate with teams, or deploy reliably. This starter kit solves that with a code-first migration system built specifically for Appwrite.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="mx-auto container py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-4">
            Everything You Need to Kickstart Your Product
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Don&apos;t waste time building authentication from scratch. This starter kit includes all the essential features you need to launch faster.
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.category}
                className={`rounded-lg border p-6 ${feature.highlight
                  ? 'bg-primary/5 border-primary/20 ring-1 ring-primary/10'
                  : 'bg-card'
                  }`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-xl font-semibold">{feature.category}</h3>
                  {feature.highlight && (
                    <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                      Unique Feature
                    </span>
                  )}
                </div>
                <ul className="space-y-3">
                  {feature.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span className={feature.highlight ? "text-foreground font-medium" : "text-muted-foreground"}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="mx-auto container py-16 md:py-24 bg-muted/30">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">Built with Modern Tools</h2>
          <p className="text-muted-foreground mb-8">
            Leveraging the best technologies for performance, security, and developer experience.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { name: "Next.js 16", desc: "App Router + Turbopack" },
              { name: "Appwrite", desc: "Backend as a Service" },
              { name: "TypeScript", desc: "Type Safety" },
              { name: "Zustand", desc: "State Management" },
              { name: "shadcn/ui", desc: "Beautiful Components" },
              { name: "React Hook Form", desc: "Form Handling" },
            ].map((tech) => (
              <div key={tech.name} className="rounded-lg border bg-card p-4">
                <p className="font-semibold">{tech.name}</p>
                <p className="text-sm text-muted-foreground mt-1">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto container py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build?</h2>
          <p className="text-muted-foreground mb-8">
            Stop building auth flows and start building features that matter.
          </p>
          <Button asChild size="lg">
            <Link href={authRoutes.signup.path}>Get Started Free</Link>
          </Button>
        </div>
      </section>

      {/* Contribution Section */}
      <section id="contribute" className="mx-auto container py-16 md:py-24 bg-muted/30">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Help Make It Better</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              This is an open-source project that thrives on community contributions. Your expertise can help make this starter kit more robust and stable for everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="rounded-lg border bg-card p-6 text-center">
              <Bug className="h-12 w-12 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Report Bugs</h3>
              <p className="text-sm text-muted-foreground">
                Found an issue? Report it on GitHub and help improve stability.
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6 text-center">
              <Sparkles className="h-12 w-12 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Add Features</h3>
              <p className="text-sm text-muted-foreground">
                Got ideas for new features? Submit a pull request and enhance the kit.
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6 text-center">
              <BookOpen className="h-12 w-12 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Improve Docs</h3>
              <p className="text-sm text-muted-foreground">
                Help others by improving documentation and examples.
              </p>
            </div>
          </div>

          <div className="rounded-lg border bg-primary/5 border-primary/20 p-6 text-center">
            <p className="text-muted-foreground mb-4">
              Whether you&apos;re fixing typos, adding tests, or building new features - every contribution counts and makes this starter kit better for the entire community.
            </p>
            <Button asChild variant="outline" className="gap-2">
              <a href="https://github.com/ritchoice23/appwrite-nextjs-starter-kit" target="_blank" rel="noopener noreferrer">
                Contribute on GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="mx-auto container text-center text-sm text-muted-foreground">
          <p>Built by ritchoice23 • Made with Next.js and Appwrite</p>
        </div>
      </footer>
    </div>
  );
}
