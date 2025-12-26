import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Missing credentials" },
        { status: 400 }
      );
    }

    const { rows } = await pool.query(
      "SELECT * FROM admins WHERE email=$1 AND password=$2",
      [email, password]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { message: "Login failed" },
      { status: 500 }
    );
  }
}
