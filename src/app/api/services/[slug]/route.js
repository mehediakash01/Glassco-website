import { NextResponse } from 'next/server';
import { pool } from '../../../../lib/db';
import { ApiResponse } from '../../../../lib/utils/apiResponse';
import { uploadToCloudinary } from '../../../../lib/cloudinary';

// GET - Fetch single service by slug
export async function GET(request, { params }) {
  try {
    const { slug } = params;

    const query = `
      SELECT
        s.*,

        COALESCE(
          (
            SELECT json_agg(
              jsonb_build_object(
                'id', sf.id,
                'title', sf.title,
                'description', sf.description,
                'icon', sf.icon
              )
              ORDER BY sf.display_order
            )
            FROM service_features sf
            WHERE sf.service_id = s.id
          ),
          '[]'
        ) AS features,

        COALESCE(
          (
            SELECT json_agg(ss.specification ORDER BY ss.display_order)
            FROM service_specifications ss
            WHERE ss.service_id = s.id
          ),
          '[]'
        ) AS specifications,

        COALESCE(
          (
            SELECT json_agg(sb.benefit ORDER BY sb.display_order)
            FROM service_benefits sb
            WHERE sb.service_id = s.id
          ),
          '[]'
        ) AS benefits,

        COALESCE(
          (
            SELECT json_agg(sa.application ORDER BY sa.display_order)
            FROM service_applications sa
            WHERE sa.service_id = s.id
          ),
          '[]'
        ) AS applications

      FROM services s
      WHERE s.slug = $1
      LIMIT 1
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
    const { slug } = params;
    const formData = await request.formData();

    const check = await client.query(
      'SELECT id FROM services WHERE slug = $1',
      [slug]
    );

    if (check.rows.length === 0) {
      return NextResponse.json(
        ApiResponse.error('Service not found', 404),
        { status: 404 }
      );
    }

    const serviceId = check.rows[0].id;

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

    if (newSlug !== slug) {
      const exists = await client.query(
        'SELECT 1 FROM services WHERE slug = $1 AND id != $2',
        [newSlug, serviceId]
      );
      if (exists.rows.length) {
        return NextResponse.json(
          ApiResponse.error('Slug already exists', 400),
          { status: 400 }
        );
      }
    }

    let imageUrl = formData.get('existingImage');
    if (image && image.size > 0) {
      imageUrl = await uploadToCloudinary(image);
    }

    await client.query('BEGIN');

    const updated = await client.query(
      `
      UPDATE services SET
        slug = $1,
        title = $2,
        tagline = $3,
        category = $4,
        description = $5,
        full_description = $6,
        icon = $7,
        image_url = $8
      WHERE id = $9
      RETURNING *
      `,
      [
        newSlug,
        title,
        tagline,
        category,
        description,
        fullDescription,
        icon,
        imageUrl,
        serviceId,
      ]
    );

    await client.query('DELETE FROM service_features WHERE service_id = $1', [serviceId]);
    await client.query('DELETE FROM service_specifications WHERE service_id = $1', [serviceId]);
    await client.query('DELETE FROM service_benefits WHERE service_id = $1', [serviceId]);
    await client.query('DELETE FROM service_applications WHERE service_id = $1', [serviceId]);

    for (let i = 0; i < features.length; i++) {
      const f = features[i];
      if (f?.title) {
        await client.query(
          `INSERT INTO service_features (service_id, title, description, icon, display_order)
           VALUES ($1, $2, $3, $4, $5)`,
          [serviceId, f.title, f.description, f.icon, i]
        );
      }
    }

    for (let i = 0; i < specifications.length; i++) {
      if (specifications[i]) {
        await client.query(
          `INSERT INTO service_specifications (service_id, specification, display_order)
           VALUES ($1, $2, $3)`,
          [serviceId, specifications[i], i]
        );
      }
    }

    for (let i = 0; i < benefits.length; i++) {
      if (benefits[i]) {
        await client.query(
          `INSERT INTO service_benefits (service_id, benefit, display_order)
           VALUES ($1, $2, $3)`,
          [serviceId, benefits[i], i]
        );
      }
    }

    for (let i = 0; i < applications.length; i++) {
      if (applications[i]) {
        await client.query(
          `INSERT INTO service_applications (service_id, application, display_order)
           VALUES ($1, $2, $3)`,
          [serviceId, applications[i], i]
        );
      }
    }

    await client.query('COMMIT');

    return NextResponse.json(
      ApiResponse.success(updated.rows[0], 'Service updated successfully')
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

// DELETE
export async function DELETE(request, { params }) {
  try {
    const { slug } = params;

    const result = await pool.query(
      'DELETE FROM services WHERE slug = $1 RETURNING id',
      [slug]
    );

    if (!result.rows.length) {
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
