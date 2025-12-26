
import { NextResponse } from 'next/server';
import { pool } from '@/config/db';
import { ApiResponse } from '@/lib/utils/apiResponse';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const { rows } = await pool.query('SELECT * FROM projects WHERE id=$1', [id]);

    if (!rows.length) {
      return NextResponse.json(ApiResponse.error('Project not found', 404), { status: 404 });
    }

    return NextResponse.json(ApiResponse.success(rows[0], 'Project fetched successfully'));
  } catch (error) {
    console.error('GET /projects/[id] error:', error);
    return NextResponse.json(ApiResponse.error('Failed to fetch project', 500), { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const client = await pool.connect();
  try {
    const { id } = params;
    const formData = await request.formData();

    const title = formData.get('title');
    const category = formData.get('category');
    const location = formData.get('location');
    const year = parseInt(formData.get('year'), 10);
    const service = formData.get('service');
    const description = formData.get('description');
    const client_type = formData.get('client_type');
    let image = formData.get('image');

    // Get existing project
    const existingRes = await pool.query('SELECT * FROM projects WHERE id=$1', [id]);
    if (!existingRes.rows.length) {
      return NextResponse.json(ApiResponse.error('Project not found', 404), { status: 404 });
    }

    let imageUrl = existingRes.rows[0].image;
    if (image && image.size > 0) {
      imageUrl = await uploadToCloudinary(image);
    }

    const query = `
      UPDATE projects
      SET title=$1, category=$2, location=$3, year=$4, service=$5, image=$6,
          description=$7, client_type=$8, updated_at=NOW()
      WHERE id=$9
      RETURNING *
    `;
    const values = [title, category, location, year, service, imageUrl, description, client_type, id];

    const { rows } = await client.query(query, values);
    return NextResponse.json(ApiResponse.success(rows[0], 'Project updated successfully'));
  } catch (error) {
    console.error('PUT /projects/[id] error:', error);
    return NextResponse.json(ApiResponse.error('Failed to update project', 500), { status: 500 });
  } finally {
    client.release();
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const result = await pool.query('DELETE FROM projects WHERE id=$1 RETURNING id', [id]);

    if (!result.rows.length) {
      return NextResponse.json(ApiResponse.error('Project not found', 404), { status: 404 });
    }

    return NextResponse.json(ApiResponse.success(null, 'Project deleted successfully'));
  } catch (error) {
    console.error('DELETE /projects/[id] error:', error);
    return NextResponse.json(ApiResponse.error('Failed to delete project', 500), { status: 500 });
  }
}
