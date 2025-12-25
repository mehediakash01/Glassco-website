import { NextResponse } from 'next/server';
import { pool } from '@/config/db';
import { ApiResponse } from '@/lib/utils/apiResponse';
import { saveServiceImage } from '@/lib/utils/fileUpload';

// GET - Fetch all services
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 20;
    const offset = (page - 1) * limit;

    let query = `
      SELECT 
        s.*,
        COALESCE(
          json_agg(
            DISTINCT jsonb_build_object(
              'id', sf.id,
              'title', sf.title,
              'description', sf.description,
              'icon', sf.icon
            )
          ) FILTER (WHERE sf.id IS NOT NULL), '[]'
        ) as features,
        COALESCE(
          json_agg(DISTINCT ss.specification ORDER BY ss.display_order) 
          FILTER (WHERE ss.id IS NOT NULL), '[]'
        ) as specifications,
        COALESCE(
          json_agg(DISTINCT sb.benefit ORDER BY sb.display_order) 
          FILTER (WHERE sb.id IS NOT NULL), '[]'
        ) as benefits,
        COALESCE(
          json_agg(DISTINCT sa.application ORDER BY sa.display_order) 
          FILTER (WHERE sa.id IS NOT NULL), '[]'
        ) as applications
      FROM services s
      LEFT JOIN service_features sf ON s.id = sf.service_id
      LEFT JOIN service_specifications ss ON s.id = ss.service_id
      LEFT JOIN service_benefits sb ON s.id = sb.service_id
      LEFT JOIN service_applications sa ON s.id = sa.service_id
      WHERE s.is_active = true
    `;

    const params = [];

    if (category && category !== 'all') {
      params.push(category);
      query += ` AND s.category = $${params.length}`;
    }

    query += ` GROUP BY s.id ORDER BY s.display_order, s.created_at DESC`;
    query += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const result = await pool.query(query, params);

    // Get total count
    const countQuery = category && category !== 'all'
      ? 'SELECT COUNT(*) FROM services WHERE is_active = true AND category = $1'
      : 'SELECT COUNT(*) FROM services WHERE is_active = true';
    const countParams = category && category !== 'all' ? [category] : [];
    const countResult = await pool.query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].count);

    return NextResponse.json(
      ApiResponse.paginated(result.rows, page, limit, total)
    );
  } catch (error) {
    console.error('GET Services Error:', error);
    return NextResponse.json(
      ApiResponse.error('Failed to fetch services', 500),
      { status: 500 }
    );
  }
}

// POST - Create new service
export async function POST(request) {
  const client = await pool.connect();
  
  try {
    const formData = await request.formData();
    
    // Extract form data
    const title = formData.get('title');
    const slug = formData.get('slug');
    const tagline = formData.get('tagline');
    const category = formData.get('category');
    const description = formData.get('description');
    const fullDescription = formData.get('fullDescription');
    const icon = formData.get('icon');
    const image = formData.get('image');
    
    // Parse JSON arrays
    const features = JSON.parse(formData.get('features') || '[]');
    const specifications = JSON.parse(formData.get('specifications') || '[]');
    const benefits = JSON.parse(formData.get('benefits') || '[]');
    const applications = JSON.parse(formData.get('applications') || '[]');

    // Validation
    if (!title || !slug || !description) {
      return NextResponse.json(
        ApiResponse.error('Title, slug, and description are required', 400),
        { status: 400 }
      );
    }

    // Check for duplicate slug
    const slugCheck = await client.query(
      'SELECT id FROM services WHERE slug = $1',
      [slug]
    );
    if (slugCheck.rows.length > 0) {
      return NextResponse.json(
        ApiResponse.error('A service with this slug already exists', 400),
        { status: 400 }
      );
    }

    // Handle image upload
    let imageUrl = null;
    if (image && image.size > 0) {
      imageUrl = await saveServiceImage(image);
    }

    // Start transaction
    await client.query('BEGIN');

    // Insert main service
    const serviceResult = await client.query(
      `INSERT INTO services 
       (slug, title, tagline, category, description, full_description, icon, image_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [slug, title, tagline, category, description, fullDescription, icon, imageUrl]
    );

    const serviceId = serviceResult.rows[0].id;

    // Insert features
    if (features.length > 0) {
      for (let i = 0; i < features.length; i++) {
        const f = features[i];
        if (f.title) {
          await client.query(
            `INSERT INTO service_features (service_id, title, description, icon, display_order)
             VALUES ($1, $2, $3, $4, $5)`,
            [serviceId, f.title, f.description, f.icon, i]
          );
        }
      }
    }

    // Insert specifications
    if (specifications.length > 0) {
      for (let i = 0; i < specifications.length; i++) {
        if (specifications[i]) {
          await client.query(
            `INSERT INTO service_specifications (service_id, specification, display_order)
             VALUES ($1, $2, $3)`,
            [serviceId, specifications[i], i]
          );
        }
      }
    }

    // Insert benefits
    if (benefits.length > 0) {
      for (let i = 0; i < benefits.length; i++) {
        if (benefits[i]) {
          await client.query(
            `INSERT INTO service_benefits (service_id, benefit, display_order)
             VALUES ($1, $2, $3)`,
            [serviceId, benefits[i], i]
          );
        }
      }
    }

    // Insert applications
    if (applications.length > 0) {
      for (let i = 0; i < applications.length; i++) {
        if (applications[i]) {
          await client.query(
            `INSERT INTO service_applications (service_id, application, display_order)
             VALUES ($1, $2, $3)`,
            [serviceId, applications[i], i]
          );
        }
      }
    }

    // Commit transaction
    await client.query('COMMIT');

    return NextResponse.json(
      ApiResponse.success(serviceResult.rows[0], 'Service created successfully', 201),
      { status: 201 }
    );

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('POST Service Error:', error);
    return NextResponse.json(
      ApiResponse.error('Failed to create service', 500),
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
