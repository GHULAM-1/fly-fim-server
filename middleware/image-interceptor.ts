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
    single: ['startPointImage', 'endPointImage'],
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
    console.log("=== IMAGE INTERCEPTOR DEBUG ===");
    console.log("Entity type:", entityType);
    console.log("Request files:", req.files);
    console.log("Request body keys:", Object.keys(req.body));

    try {
      // Check if request has files
      if (!req.files || (Array.isArray(req.files) && req.files.length === 0)) {
        console.log("No files found, proceeding to next middleware");
        return next();
      }

      const files = Array.isArray(req.files) ? req.files : Object.values(req.files).flat();

      if (files.length === 0) {
        return next();
      }

      console.log("All file field names:", files.map(f => f.fieldname));

      // Process single image fields
      for (const fieldName of config.single) {
        console.log(`Processing single image field: ${fieldName}`);
        const fieldFiles = files.filter(file => file.fieldname === fieldName);
        if (fieldFiles.length > 0) {
          console.log(`Found ${fieldFiles.length} files for ${fieldName}`);
          if (fieldFiles.length > 1) {
            return res.status(400).json({
              success: false,
              message: `Only one image allowed for field: ${fieldName}`
            });
          }

          console.log(`Uploading single image for ${fieldName}...`);
          const storageId = await uploadSingleImage(fieldFiles[0]);
          console.log(`Upload successful, storageId: ${storageId}`);
          req.body[fieldName] = storageId;
        }
      }

      // Process array image fields
      for (const fieldName of config.array) {
        console.log(`Processing array image field: ${fieldName}`);
        const fieldFiles = files.filter(file => file.fieldname === fieldName);
        if (fieldFiles.length > 0) {
          console.log(`Found ${fieldFiles.length} files for ${fieldName}`);
          console.log(`Uploading multiple images for ${fieldName}...`);
          const storageIds = await uploadMultipleImages(fieldFiles);
          console.log(`Upload successful, storageIds: ${storageIds}`);
          req.body[fieldName] = storageIds;
        }
      }

      // Process dynamic itinerary image fields
      const dynamicImageTypes = ['nearbyImages', 'highlightImages', 'highlightsImages', 'thingsImages'];
      const dynamicImageFields: { [key: string]: Express.Multer.File[] } = {};

      // Group dynamic images by type and index
      for (const file of files) {
        for (const imageType of dynamicImageTypes) {
          if (file.fieldname.startsWith(`${imageType}_`)) {
            console.log(`Found dynamic image field: ${file.fieldname}`);
            if (!dynamicImageFields[file.fieldname]) {
              dynamicImageFields[file.fieldname] = [];
            }
            dynamicImageFields[file.fieldname].push(file);
          }
        }
      }

      // Upload dynamic images and structure them properly
      for (const [fieldName, fieldFiles] of Object.entries(dynamicImageFields)) {
        if (fieldFiles.length > 0) {
          console.log(`Processing dynamic field: ${fieldName} with ${fieldFiles.length} files`);

          if (fieldFiles.length === 1) {
            // Single image
            const storageId = await uploadSingleImage(fieldFiles[0]);
            console.log(`Uploaded single dynamic image for ${fieldName}: ${storageId}`);
            req.body[fieldName] = storageId;
          } else {
            // Multiple images
            const storageIds = await uploadMultipleImages(fieldFiles);
            console.log(`Uploaded multiple dynamic images for ${fieldName}: ${storageIds}`);
            req.body[fieldName] = storageIds;
          }
        }
      }

      console.log("Image processing completed, proceeding to next middleware");
      next();
    } catch (error) {
      console.log("=== IMAGE INTERCEPTOR ERROR ===");
      console.log("Error:", error);
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

  if (entityType === 'experience') {
    // For experience, accept any field name to handle dynamic itinerary images
    return upload.any(); // This accepts any field names
  }

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
