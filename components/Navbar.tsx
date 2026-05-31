import Link from "next/link";

import { signOut } from "next-auth/react";

export default async function Navbar() {
  const session = true;

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-1">
        {/* Left Side */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          Todo App
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {session?.user ? (
            <>
              <Link
                href="/todos"
                className="font-medium text-gray-700 hover:text-blue-600"
              >
                Todos
              </Link>

              <span className="font-medium text-gray-600">
                Hello, {session.user.name}
              </span>

              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="font-medium text-gray-700 hover:text-blue-600"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
