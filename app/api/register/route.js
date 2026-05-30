import bcrypt from "bcryptjs";
import { sql } from "@/lib/db";

export async function POST(req) {
  try {
    const { username, email, password } = await req.json();

    // 1. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. Insert into database
    const user = await sql`
      INSERT INTO users (username, email, password)
      VALUES (${username}, ${email}, ${hashedPassword})
      RETURNING id, username, email, created_at
    `;

    return Response.json({
      message: "User created successfully",
      user: user[0],
    });
  } catch (err) {
    return Response.json(
      { error: "User already exists or invalid data" },
      { status: 400 }
    );
  }
}