import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { query } from "@/lib/queries";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, password } = body;

    // 1. Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // 2. Check if user exists
    const existingUser = await query(
      `
      SELECT id FROM users WHERE email = $1
      `,
      [email],
    );

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 },
      );
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Insert user into DB
    const result = await query(
      `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, name, email, created_at
      `,
      [name, email, hashedPassword],
    );

    return NextResponse.json(
      {
        message: "User created successfully",
        user: result.rows[0],
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
