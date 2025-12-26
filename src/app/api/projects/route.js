import { NextResponse } from "next/server";
import { pool } from "@/config/db";

export async function GET() {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM projects ORDER BY created_at DESC"
    );
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      title,
      category,
      location,
      year,
      service,
      image,
      description,
      client_type
    } = body;

    const query = `
      INSERT INTO projects
      (title, category, location, year, service, image, description, client_type)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *
    `;

    const values = [
      title,
      category,
      location,
      year,
      service,
      image,
      description,
      client_type
    ];

    const { rows } = await pool.query(query, values);

    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create project" },
      { status: 500 }
    );
  }
}
