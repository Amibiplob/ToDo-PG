import Link from "next/link";
import { getServerSession } from "next-auth";

import {
ArrowRight,
CheckCircle2,
Database,
Shield,
ListTodo,
Zap,
} from "lucide-react";


import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default async function HomePage() {
const session = true

return ( <main className="min-h-screen overflow-hidden bg-background">
{/* Background */} <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-background to-background" />


  {/* Hero */}
  <section className="container mx-auto px-4 py-24">
    <div className="mx-auto max-w-5xl text-center">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
        <Zap className="h-4 w-4" />
        Built with Next.js 15 & PostgreSQL
      </div>

      <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
        Manage Tasks
        <span className="block text-primary">
          Like a Pro
        </span>
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
        A secure, modern Todo application powered by
        PostgreSQL, Neon Database, NextAuth, and
        Server Actions.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        {session?.user ? (
          <>
            <Button size="lg" asChild>
              <Link href="/todos">
                Open Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </>
        ) : (
          <>
            <Button size="lg" asChild>
              <Link href="/register">
                Get Started Free
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              asChild
            >
              <Link href="/login">
                Login
              </Link>
            </Button>
          </>
        )}
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          Secure Authentication
        </div>

        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          PostgreSQL Storage
        </div>

        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          User-specific Todos
        </div>
      </div>
    </div>
  </section>

  {/* Demo Dashboard */}
  <section className="container mx-auto px-4 pb-24">
    <Card className="mx-auto max-w-4xl overflow-hidden border shadow-2xl">
      <CardContent className="p-0">
        <div className="border-b bg-muted/40 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>
        </div>

        <div className="p-8">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-semibold">
              My Tasks
            </h3>

            <Button size="sm">
              Add Task
            </Button>
          </div>

          <div className="space-y-4">
            {[
              {
                title: "Connect PostgreSQL Database",
                completed: true,
              },
              {
                title: "Implement Authentication",
                completed: true,
              },
              {
                title: "Build Todo CRUD",
                completed: false,
              },
              {
                title: "Deploy to Production",
                completed: false,
              },
            ].map((task, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    readOnly
                  />

                  <span
                    className={
                      task.completed
                        ? "line-through text-muted-foreground"
                        : ""
                    }
                  >
                    {task.title}
                  </span>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                >
                  Edit
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  </section>

  {/* Features */}
  <section className="border-t bg-muted/20 py-24">
    <div className="container mx-auto px-4">
      <div className="mb-16 text-center">
        <h2 className="text-4xl font-bold">
          Everything You Need
        </h2>

        <p className="mt-4 text-muted-foreground">
          Modern architecture with secure authentication
          and powerful database support.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="p-8 text-center">
            <ListTodo className="mx-auto mb-4 h-10 w-10 text-primary" />

            <h3 className="mb-2 text-xl font-semibold">
              Task Management
            </h3>

            <p className="text-muted-foreground">
              Create, update, complete, and delete
              tasks effortlessly.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-8 text-center">
            <Shield className="mx-auto mb-4 h-10 w-10 text-primary" />

            <h3 className="mb-2 text-xl font-semibold">
              Secure Login
            </h3>

            <p className="text-muted-foreground">
              Password hashing with bcrypt and
              session management using NextAuth.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-8 text-center">
            <Database className="mx-auto mb-4 h-10 w-10 text-primary" />

            <h3 className="mb-2 text-xl font-semibold">
              PostgreSQL
            </h3>

            <p className="text-muted-foreground">
              Store user accounts and todos securely
              in Neon PostgreSQL.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>

  {/* CTA */}
  <section className="py-24">
    <div className="container mx-auto px-4">
      <Card className="mx-auto max-w-4xl bg-primary text-primary-foreground">
        <CardContent className="flex flex-col items-center p-12 text-center">
          <h2 className="mb-4 text-4xl font-bold">
            Ready to Get Productive?
          </h2>

          <p className="mb-8 max-w-xl opacity-90">
            Organize your work, track progress,
            and stay focused with your personal
            todo dashboard.
          </p>

          {session?.user ? (
            <Button
              size="lg"
              variant="secondary"
              asChild
            >
              <Link href="/todos">
                Open My Todos
              </Link>
            </Button>
          ) : (
            <Button
              size="lg"
              variant="secondary"
              asChild
            >
              <Link href="/register">
                Create Free Account
              </Link>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  </section>
</main>


);
}
