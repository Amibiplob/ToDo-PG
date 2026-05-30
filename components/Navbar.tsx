import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ListTodo } from "lucide-react";

export default function Navbar() {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <ListTodo className="h-6 w-6 text-primary" />
          <Link href="/" className="text-xl font-bold">Todo PG</Link>
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
      </div>
    </header>
  );
}
