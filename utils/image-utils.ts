import { Request } from 'express';

// Image field configurations for different entities
export const IMAGE_FIELD_CONFIG = {
  city: {
    single: ['image'],
    array: []
  },
  experience: {
    single: [],
    array: ['mainImage', 'images']
  },
  review: {
    single: [],
    array: ['images']
  }
} as const;

// Validate image fields in request body
export const validateImageFields = (entityType: keyof typeof IMAGE_FIELD_CONFIG, body: any): string[] => {
  const config = IMAGE_FIELD_CONFIG[entityType];
  const errors: string[] = [];

  // Check single image fields
  config.single.forEach(fieldName => {
    if (body[fieldName] && typeof body[fieldName] !== 'string') {
      errors.push(`${fieldName} must be a string (storage ID)`);
    }
  });

  // Check array image fields
  config.array.forEach(fieldName => {
    if (body[fieldName]) {
      if (!Array.isArray(body[fieldName])) {
        errors.push(`${fieldName} must be an array`);
      } else if (!body[fieldName].every((id: any) => typeof id === 'string')) {
        errors.push(`All items in ${fieldName} must be strings (storage IDs)`);
      }
    }
  });

  return errors;
};

// Check if request has image files
export const hasImageFiles = (req: Request): boolean => {
  if (!req.files) return false;
  
  const files = Array.isArray(req.files) ? req.files : Object.values(req.files).flat();
  return files.length > 0;
};

// Get image files by field name
export const getImageFilesByField = (req: Request, fieldName: string): Express.Multer.File[] => {
  if (!req.files) return [];
  
  const files = Array.isArray(req.files) ? req.files : Object.values(req.files).flat();
  return files.filter(file => file.fieldname === fieldName);
};

// Clean up uploaded files on error
export const cleanupUploadedFiles = async (storageIds: string[]): Promise<void> => {
  // This would be implemented to delete files from Convex storage
  // For now, we'll just log the cleanup action
};

// Image validation rules
export const IMAGE_VALIDATION = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  maxImagesPerArray: 10
};

// Validate single image file
export const validateImageFile = (file: Express.Multer.File): string | null => {
  if (!file) return 'No file provided';
  
  if (file.size > IMAGE_VALIDATION.maxFileSize) {
    return `File size exceeds ${IMAGE_VALIDATION.maxFileSize / (1024 * 1024)}MB limit`;
  }
  
  if (!IMAGE_VALIDATION.allowedMimeTypes.includes(file.mimetype)) {
    return `File type ${file.mimetype} not allowed. Allowed types: ${IMAGE_VALIDATION.allowedMimeTypes.join(', ')}`;
  }
  
  return null;
};

// Validate multiple image files
export const validateImageFiles = (files: Express.Multer.File[]): string[] => {
  const errors: string[] = [];
  
  if (files.length > IMAGE_VALIDATION.maxImagesPerArray) {
    errors.push(`Maximum ${IMAGE_VALIDATION.maxImagesPerArray} images allowed per field`);
  }
  
  files.forEach((file, index) => {
    const error = validateImageFile(file);
    if (error) {
      errors.push(`File ${index + 1}: ${error}`);
    }
  });
  
  return errors;
};
