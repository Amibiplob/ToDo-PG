import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Cloud, Pencil, ListTodo } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <ListTodo className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Todo PG</span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>

            <Button asChild>
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-4 inline-flex rounded-full border px-3 py-1 text-sm">
              ✨ Start instantly, no signup required
            </div>

            <h1 className="mb-6 text-5xl font-bold tracking-tight lg:text-6xl">
              Organize your tasks.
              <span className="block text-primary">
                Stay productive every day.
              </span>
            </h1>

            <p className="mb-8 max-w-xl text-lg text-muted-foreground">
              Create, update, and manage your todos effortlessly. Use guest
              mode with local storage or sign in to sync your tasks securely
              across devices.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/register">Get Started</Link>
              </Button>

              <Button size="lg" variant="outline" asChild>
                <Link href="/dashboard">Continue as Guest</Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-col gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                No signup required
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Local storage for guest users
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Cloud sync for authenticated users
              </div>
            </div>
          </div>

          {/* Demo Card */}
          <div className="flex justify-center">
            <Card className="w-full max-w-md shadow-xl">
              <CardContent className="p-6">
                <h3 className="mb-6 text-lg font-semibold">
                  Today's Tasks
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" checked readOnly />
                    <span className="line-through text-muted-foreground">
                      Setup Neon Database
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <input type="checkbox" />
                    <span>Build Todo API</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <input type="checkbox" />
                    <span>Design Dashboard</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <input type="checkbox" checked readOnly />
                    <span className="line-through text-muted-foreground">
                      Configure Authentication
                    </span>
                  </div>
                </div>

                <Button className="mt-6 w-full">
                  Add New Task
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold">
              Everything you need to stay organized
            </h2>

            <p className="mt-3 text-muted-foreground">
              Simple, fast, and built for productivity.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <Pencil className="mb-4 h-8 w-8 text-primary" />
                <h3 className="mb-2 text-lg font-semibold">
                  Create & Edit Tasks
                </h3>
                <p className="text-muted-foreground">
                  Quickly add, update, and organize your todos.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <CheckCircle2 className="mb-4 h-8 w-8 text-primary" />
                <h3 className="mb-2 text-lg font-semibold">
                  Track Progress
                </h3>
                <p className="text-muted-foreground">
                  Mark tasks complete and stay focused on priorities.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Cloud className="mb-4 h-8 w-8 text-primary" />
                <h3 className="mb-2 text-lg font-semibold">
                  Cloud Sync
                </h3>
                <p className="text-muted-foreground">
                  Sign in to store tasks securely in PostgreSQL via Neon.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t py-24">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-4xl">
            <CardContent className="flex flex-col items-center p-12 text-center">
              <h2 className="mb-4 text-4xl font-bold">
                Ready to get productive?
              </h2>

              <p className="mb-8 text-muted-foreground">
                Start managing your tasks today. No signup required.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link href="/dashboard">
                    Continue as Guest
                  </Link>
                </Button>

                <Button size="lg" variant="outline" asChild>
                  <Link href="/register">
                    Create Account
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}