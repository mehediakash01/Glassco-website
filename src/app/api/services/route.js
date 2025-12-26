// app/api/services/page.js
import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { ApiResponse } from '@/lib/utils/apiResponse';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const query = `
      SELECT *
      FROM services
      ${category && category !== 'all' ? `WHERE category = $1` : ''}
      ORDER BY id DESC
    `;
    const result = await pool.query(query, category && category !== 'all' ? [category] : []);

    return NextResponse.json(
      ApiResponse.success(result.rows, 'Services fetched successfully')
    );
  } catch (error) {
    console.error('GET /services error:', error);
    return NextResponse.json(
      ApiResponse.error('Failed to fetch services', 500),
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const client = await pool.connect();

  try {
    const formData = await request.formData();

    // ---------- BASIC FIELDS ----------
    const title = formData.get('title');
    const slug = formData.get('slug');
    const tagline = formData.get('tagline');
    const category = formData.get('category');
    const description = formData.get('description');
    const fullDescription = formData.get('fullDescription');
    const icon = formData.get('icon');

    // ---------- JSON FIELDS (SAFE PARSE) ----------
    const features = JSON.parse(formData.get('features') || '[]');
    const specifications = JSON.parse(formData.get('specifications') || '[]');
    const benefits = JSON.parse(formData.get('benefits') || '[]');
    const applications = JSON.parse(formData.get('applications') || '[]');

    // ---------- IMAGE ----------
    const image = formData.get('image');
    let imageUrl = null;

    if (image && image.size > 0) {
      imageUrl = await uploadToCloudinary(image);
    }

    // ---------- SLUG CHECK ----------
    const exists = await client.query(
      'SELECT 1 FROM services WHERE slug = $1',
      [slug]
    );

    if (exists.rows.length) {
      return NextResponse.json(
        ApiResponse.error('Slug already exists', 400),
        { status: 400 }
      );
    }

    await client.query('BEGIN');

    // ---------- INSERT SERVICE ----------
    const serviceRes = await client.query(
      `
      INSERT INTO services
        (title, slug, tagline, category, description, full_description, icon, image_url)
      VALUES
        ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING id
      `,
      [title, slug, tagline, category, description, fullDescription, icon, imageUrl]
    );

    const serviceId = serviceRes.rows[0].id;

    // ---------- FEATURES ----------
    for (let i = 0; i < features.length; i++) {
      const f = features[i];
      if (f?.title) {
        await client.query(
          `
          INSERT INTO service_features
            (service_id, title, description, icon, display_order)
          VALUES ($1,$2,$3,$4,$5)
          `,
          [serviceId, f.title, f.description || null, f.icon || null, i]
        );
      }
    }

    // ---------- SPECIFICATIONS ----------
    for (let i = 0; i < specifications.length; i++) {
      if (specifications[i]) {
        await client.query(
          `
          INSERT INTO service_specifications
            (service_id, specification, display_order)
          VALUES ($1,$2,$3)
          `,
          [serviceId, specifications[i], i]
        );
      }
    }

    // ---------- BENEFITS ----------
    for (let i = 0; i < benefits.length; i++) {
      if (benefits[i]) {
        await client.query(
          `
          INSERT INTO service_benefits
            (service_id, benefit, display_order)
          VALUES ($1,$2,$3)
          `,
          [serviceId, benefits[i], i]
        );
      }
    }

    // ---------- APPLICATIONS ----------
    for (let i = 0; i < applications.length; i++) {
      if (applications[i]) {
        await client.query(
          `
          INSERT INTO service_applications
            (service_id, application, display_order)
          VALUES ($1,$2,$3)
          `,
          [serviceId, applications[i], i]
        );
      }
    }

    await client.query('COMMIT');

    return NextResponse.json(
      ApiResponse.success({ id: serviceId }, 'Service created successfully'),
      { status: 201 }
    );
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('POST /services error:', error);

    return NextResponse.json(
      ApiResponse.error('Failed to create service', 500),
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
