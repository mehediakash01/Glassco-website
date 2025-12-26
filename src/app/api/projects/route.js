// app/api/projects/page.js
import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { ApiResponse } from '@/lib/utils/apiResponse';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let query = 'SELECT * FROM projects';
    const values = [];

    if (category && category !== 'all') {
      query += ' WHERE category = $1';
      values.push(category);
    }

    query += ' ORDER BY created_at DESC';

    const { rows } = await pool.query(query, values);

    return NextResponse.json(ApiResponse.success(rows, 'Projects fetched successfully'));
  } catch (error) {
    console.error('GET /projects error:', error);
    return NextResponse.json(ApiResponse.error('Failed to fetch projects', 500), { status: 500 });
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();

    const title = formData.get('title');
    const category = formData.get('category');
    const location = formData.get('location');
    const year = parseInt(formData.get('year'), 10);
    const service = formData.get('service');
    const description = formData.get('description');
    const client_type = formData.get('client_type');

    // Image upload (if provided as File)
    let image = formData.get('image');
    let imageUrl = null;

    if (image && image.size > 0) {
      // Use your existing cloudinary upload function
      const { uploadToCloudinary } = await import('@/lib/cloudinary');
      imageUrl = await uploadToCloudinary(image);
    }

    const query = `
      INSERT INTO projects
      (title, category, location, year, service, image, description, client_type)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *
    `;

    const values = [title, category, location, year, service, imageUrl, description, client_type];
    const { rows } = await pool.query(query, values);

    return NextResponse.json(ApiResponse.success(rows[0], 'Project created successfully'), { status: 201 });
  } catch (error) {
    console.error('POST /projects error:', error);
    return NextResponse.json(ApiResponse.error('Failed to create project', 500), { status: 500 });
  }
}
