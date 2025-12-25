import { NextResponse } from 'next/server';
import { pool } from '@/config/db';
import { ApiResponse } from '@/lib/utils/apiResponse';
import { saveServiceImage } from '@/lib/utils/fileUpload';

// GET - Fetch single service by slug
export async function GET(request, { params }) {
  try {
    const { slug } = await params;

    const query = `
      SELECT 
        s.*,
        COALESCE(
          json_agg(
            DISTINCT jsonb_build_object(
              'id', sf.id,
              'title', sf.title,
              'description', sf.description,
              'icon', sf.icon
            ) ORDER BY sf.display_order
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
      WHERE s.slug = $1
      GROUP BY s.id
    `;

    const result = await pool.query(query, [slug]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        ApiResponse.error('Service not found', 404),
        { status: 404 }
      );
    }

    return NextResponse.json(
      ApiResponse.success(result.rows[0], 'Service fetched successfully')
    );

  } catch (error) {
    console.error('GET Service Error:', error);
    return NextResponse.json(
      ApiResponse.error('Failed to fetch service', 500),
      { status: 500 }
    );
  }
}

// PUT - Update service
export async function PUT(request, { params }) {
  const client = await pool.connect();
  
  try {
    const { slug } = await params;
    const formData = await request.formData();

    // Check if service exists
    const checkResult = await client.query(
      'SELECT id FROM services WHERE slug = $1',
      [slug]
    );

    if (checkResult.rows.length === 0) {
      return NextResponse.json(
        ApiResponse.error('Service not found', 404),
        { status: 404 }
      );
    }

    const serviceId = checkResult.rows[0].id;

    // Extract form data
    const title = formData.get('title');
    const newSlug = formData.get('slug');
    const tagline = formData.get('tagline');
    const category = formData.get('category');
    const description = formData.get('description');
    const fullDescription = formData.get('fullDescription');
    const icon = formData.get('icon');
    const image = formData.get('image');
    
    const features = JSON.parse(formData.get('features') || '[]');
    const specifications = JSON.parse(formData.get('specifications') || '[]');
    const benefits = JSON.parse(formData.get('benefits') || '[]');
    const applications = JSON.parse(formData.get('applications') || '[]');

    // Check for duplicate slug if changed
    if (newSlug !== slug) {
      const slugCheck = await client.query(
        'SELECT id FROM services WHERE slug = $1 AND id != $2',
        [newSlug, serviceId]
      );
      if (slugCheck.rows.length > 0) {
        return NextResponse.json(
          ApiResponse.error('A service with this slug already exists', 400),
          { status: 400 }
        );
      }
    }

    // Handle image upload
    let imageUrl = formData.get('existingImage');
    if (image && image.size > 0) {
      imageUrl = await saveServiceImage(image);
    }

    // Start transaction
    await client.query('BEGIN');

    // Update main service
    const updateResult = await client.query(
      `UPDATE services SET
       slug = $1, title = $2, tagline = $3, category = $4,
       description = $5, full_description = $6, icon = $7, image_url = $8
       WHERE id = $9
       RETURNING *`,
      [newSlug, title, tagline, category, description, fullDescription, icon, imageUrl, serviceId]
    );

    // Delete existing related data
    await client.query('DELETE FROM service_features WHERE service_id = $1', [serviceId]);
    await client.query('DELETE FROM service_specifications WHERE service_id = $1', [serviceId]);
    await client.query('DELETE FROM service_benefits WHERE service_id = $1', [serviceId]);
    await client.query('DELETE FROM service_applications WHERE service_id = $1', [serviceId]);

    // Re-insert features
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

    // Re-insert specifications
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

    // Re-insert benefits
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

    // Re-insert applications
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

    await client.query('COMMIT');

    return NextResponse.json(
      ApiResponse.success(updateResult.rows[0], 'Service updated successfully')
    );

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('PUT Service Error:', error);
    return NextResponse.json(
      ApiResponse.error('Failed to update service', 500),
      { status: 500 }
    );
  } finally {
    client.release();
  }
}

// DELETE - Delete service
export async function DELETE(request, { params }) {
  try {
    const { slug } = await params;

    const result = await pool.query(
      'DELETE FROM services WHERE slug = $1 RETURNING id',
      [slug]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        ApiResponse.error('Service not found', 404),
        { status: 404 }
      );
    }

    return NextResponse.json(
      ApiResponse.success(null, 'Service deleted successfully')
    );

  } catch (error) {
    console.error('DELETE Service Error:', error);
    return NextResponse.json(
      ApiResponse.error('Failed to delete service', 500),
      { status: 500 }
    );
  }
}