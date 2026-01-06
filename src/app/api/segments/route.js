// app/api/segments/route.js
import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

const success = (data, message = 'Success') => ({ 
  success: true, 
  message, 
  data 
});

const error = (message, code = 500) => ({ 
  success: false, 
  message, 
  statusCode: code 
});

// GET - Fetch all segments with their services
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeServices = searchParams.get('includeServices') !== 'false';

    if (includeServices) {
      // Fetch segments with their services
      const query = `
        SELECT 
          s.*,
          COALESCE(
            json_agg(
              jsonb_build_object(
                'id', srv.id,
                'name', srv.title,
                'slug', srv.slug,
                'description', srv.description,
                'image', srv.image_url,
                'status', CASE WHEN srv.tagline IS NOT NULL AND srv.tagline != '' THEN srv.tagline ELSE NULL END,
                'serviceId', srv.id,
                'glassServiceId', CASE WHEN srv.service_type = 'glass' THEN srv.id ELSE NULL END,
                'installationServiceId', CASE WHEN srv.service_type = 'installation' THEN srv.id ELSE NULL END,
                'solutions', srv.solutions,
                'types', srv.types,
                'availableGlassTypes', srv.available_glass_types,
                'glassOptions', srv.glass_options,
                'process', srv.process,
                'manufacturingProcess', srv.manufacturing_process,
                'capabilities', srv.capabilities,
                'benefits', srv.benefits,
                'applications', srv.applications,
                'specifications', srv.specifications
              ) ORDER BY srv.id
            ) FILTER (WHERE srv.id IS NOT NULL),
            '[]'
          ) as services
        FROM segments s
        LEFT JOIN services srv ON srv.segment_id = s.id
        GROUP BY s.id
        ORDER BY s.id
      `;

      const result = await pool.query(query);
      
      // Format the response to match frontend expectations
      const formattedData = result.rows.map(segment => ({
        segmentId: segment.id,
        name: segment.name,
        slug: segment.slug,
        overview: segment.overview,
        [segment.service_type === 'glass' ? 'glassServices' : 'installationServices']: segment.services
      }));

      return NextResponse.json(success(formattedData, 'Segments fetched successfully'));
    } else {
      // Just fetch segments without services
      const result = await pool.query('SELECT * FROM segments ORDER BY id');
      return NextResponse.json(success(result.rows, 'Segments fetched successfully'));
    }
  } catch (err) {
    console.error('GET Segments Error:', err);
    return NextResponse.json(error('Failed to fetch segments', 500), { status: 500 });
  }
}

// POST - Create new segment
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, slug, overview, service_type } = body;

    if (!name || !slug || !overview || !service_type) {
      return NextResponse.json(
        error('Missing required fields: name, slug, overview, service_type', 400),
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existing = await pool.query('SELECT id FROM segments WHERE slug = $1', [slug]);
    if (existing.rows.length > 0) {
      return NextResponse.json(error('Segment with this slug already exists', 400), { status: 400 });
    }

    const result = await pool.query(
      `INSERT INTO segments (name, slug, overview, service_type)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, slug, overview, service_type]
    );

    return NextResponse.json(
      success(result.rows[0], 'Segment created successfully'),
      { status: 201 }
    );
  } catch (err) {
    console.error('POST Segment Error:', err);
    return NextResponse.json(error('Failed to create segment', 500), { status: 500 });
  }
}