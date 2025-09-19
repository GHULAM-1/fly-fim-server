import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { convexService } from '../services/convex-service';

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
});

// Image field configurations for different entities
const IMAGE_FIELD_CONFIG = {
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
};

// Upload single image to Convex storage
const uploadSingleImage = async (file: Express.Multer.File): Promise<string> => {
  const convex = convexService.getClient();
  
  // Convert buffer to base64 string
  const base64Data = file.buffer.toString('base64');
  
  const result = await convex.action("storage:uploadImage" as any, {
    imageData: base64Data,
    mimeType: file.mimetype
  });

  if (!result.success) {
    throw new Error(result.message || 'Failed to upload image');
  }

  return result.storageId!;
};

// Upload multiple images to Convex storage
const uploadMultipleImages = async (files: Express.Multer.File[]): Promise<string[]> => {
  const convex = convexService.getClient();
  
  const uploadPromises = files.map(file => {
    // Convert buffer to base64 string
    const base64Data = file.buffer.toString('base64');
    
    return convex.action("storage:uploadImage" as any, {
      imageData: base64Data,
      mimeType: file.mimetype
    });
  });

  const results = await Promise.all(uploadPromises);
  
  const failedUploads = results.filter(result => !result.success);
  if (failedUploads.length > 0) {
    throw new Error(`Failed to upload ${failedUploads.length} images`);
  }

  return results.map(result => result.storageId!);
};

// Main image interceptor middleware
export const imageInterceptor = (entityType: 'city' | 'experience' | 'review') => {
  const config = IMAGE_FIELD_CONFIG[entityType];
  
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Check if request has files
      if (!req.files || (Array.isArray(req.files) && req.files.length === 0)) {
        return next();
      }

      const files = Array.isArray(req.files) ? req.files : Object.values(req.files).flat();
      
      if (files.length === 0) {
        return next();
      }

      // Process single image fields
      for (const fieldName of config.single) {
        const fieldFiles = files.filter(file => file.fieldname === fieldName);
        if (fieldFiles.length > 0) {
          if (fieldFiles.length > 1) {
            return res.status(400).json({
              success: false,
              message: `Only one image allowed for field: ${fieldName}`
            });
          }
          
          const storageId = await uploadSingleImage(fieldFiles[0]);
          req.body[fieldName] = storageId;
        }
      }

      // Process array image fields
      for (const fieldName of config.array) {
        const fieldFiles = files.filter(file => file.fieldname === fieldName);
        if (fieldFiles.length > 0) {
          const storageIds = await uploadMultipleImages(fieldFiles);
          req.body[fieldName] = storageIds;
        }
      }

      next();
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to process images',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };
};

// Multer middleware for different entity types
export const getMulterMiddleware = (entityType: 'city' | 'experience' | 'review') => {
  const config = IMAGE_FIELD_CONFIG[entityType];
  const fields: multer.Field[] = [];

  // Add single image fields
  config.single.forEach(fieldName => {
    fields.push({ name: fieldName, maxCount: 1 });
  });

  // Add array image fields
  config.array.forEach(fieldName => {
    fields.push({ name: fieldName, maxCount: 10 }); // Max 10 images per array field
  });

  return upload.fields(fields);
};

// Combined middleware that handles both multer and image processing
export const createImageMiddleware = (entityType: 'city' | 'experience' | 'review') => {
  return [
    getMulterMiddleware(entityType),
    imageInterceptor(entityType)
  ];
};
