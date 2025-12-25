import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function saveServiceImage(file) {
  try {
    if (!file) return null;

    // Create upload directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'services');
    await mkdir(uploadDir, { recursive: true });

    // Generate unique filename
    const timestamp = Date.now();
    const extension = file.name.split('.').pop();
    const filename = `service-${timestamp}.${extension}`;
    const filepath = path.join(uploadDir, filename);

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);

    // Return public URL
    return `/uploads/services/${filename}`;
  } catch (error) {
    console.error('File upload error:', error);
    return null;
  }
}