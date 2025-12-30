import formidable from 'formidable';
import { promises as fs } from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export interface UploadedFile {
  filename: string;
  originalFilename: string;
  filepath: string;
}

export async function parseFormData(
  req: Request,
  uploadDir: string = './uploads/images'
): Promise<{ fields: any; files: UploadedFile | null }> {
  // Ensure upload directory exists
  try {
    await fs.access(uploadDir);
  } catch {
    await fs.mkdir(uploadDir, { recursive: true });
  }

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024, // 10MB
    filename: (name, ext, part, form) => {
      const timestamp = Date.now();
      const originalName = part.originalFilename || 'file';
      const sanitizedName = originalName.replace(/\s+/g, '-');
      return `${timestamp}_${sanitizedName}`;
    },
  });

  const formData = await form.parse(req as any);
  
  const fields: any = {};
  const entries = Object.entries(formData[0]);
  for (const [key, value] of entries) {
    fields[key] = Array.isArray(value) ? value[0] : value;
  }

  const file = formData[1].image?.[0] || null;
  let uploadedFile: UploadedFile | null = null;

  if (file) {
    uploadedFile = {
      filename: path.basename(file.filepath),
      originalFilename: file.originalFilename || '',
      filepath: file.filepath,
    };
  }

  return { fields, files: uploadedFile };
}











