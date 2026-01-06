// app/api/segments/[slug]/route.js
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

// GET - Fetch single segment with services
export async function GET(request, { params }) {
  try {
    const { slug } = params;

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
      WHERE s.slug = $1
      GROUP BY s.id
    `;

    const result = await pool.query(query, [slug]);

    if (result.rows.length === 0) {
      return NextResponse.json(error('Segment not found', 404), { status: 404 });
    }

    const segment = result.rows[0];
    
    // Format response
    const formattedData = {
      segmentId: segment.id,
      name: segment.name,
      slug: segment.slug,
      overview: segment.overview,
      [segment.service_type === 'glass' ? 'glassServices' : 'installationServices']: segment.services
    };

    return NextResponse.json(success(formattedData, 'Segment fetched successfully'));
  } catch (err) {
    console.error('GET Segment Error:', err);
    return NextResponse.json(error('Failed to fetch segment', 500), { status: 500 });
  }
}