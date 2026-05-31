"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ListTodo } from "lucide-react";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <ListTodo className="h-6 w-6 text-primary" />
          <Link href="/" className="text-xl font-bold">
            Todo PG
          </Link>
        </div>

        {/* Links */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>

          <Button asChild>
            <Link href="/register">Sign Up</Link>
          </Button>
        </div>
        <div className="flex items-center gap-4">
          {status === "loading" ? (
            <span className="text-sm text-gray-400">Loading...</span>
          ) : session?.user ? (
            <>
              <span className="text-sm font-medium text-gray-700">
                👋 {session.user.name}
              </span>
              <button className="text-sm text-red-500 hover:underline">
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm hover:underline">
                Login
              </Link>
              <Link
                href="/register"
                className="text-sm bg-black text-white px-4 py-1.5 rounded-md hover:bg-gray-800"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
