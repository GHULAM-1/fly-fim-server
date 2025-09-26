"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createImageMiddleware = exports.getMulterMiddleware = exports.imageInterceptor = void 0;
const multer_1 = __importDefault(require("multer"));
const convex_service_1 = require("../services/convex-service");
// Configure multer for memory storage
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        }
        else {
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
const uploadSingleImage = async (file) => {
    const convex = convex_service_1.convexService.getClient();
    // Convert buffer to base64 string
    const base64Data = file.buffer.toString('base64');
    const result = await convex.action("storage:uploadImage", {
        imageData: base64Data,
        mimeType: file.mimetype
    });
    if (!result.success) {
        throw new Error(result.message || 'Failed to upload image');
    }
    return result.storageId;
};
// Upload multiple images to Convex storage
const uploadMultipleImages = async (files) => {
    const convex = convex_service_1.convexService.getClient();
    const uploadPromises = files.map(file => {
        // Convert buffer to base64 string
        const base64Data = file.buffer.toString('base64');
        return convex.action("storage:uploadImage", {
            imageData: base64Data,
            mimeType: file.mimetype
        });
    });
    const results = await Promise.all(uploadPromises);
    const failedUploads = results.filter(result => !result.success);
    if (failedUploads.length > 0) {
        throw new Error(`Failed to upload ${failedUploads.length} images`);
    }
    return results.map(result => result.storageId);
};
// Main image interceptor middleware
const imageInterceptor = (entityType) => {
    const config = IMAGE_FIELD_CONFIG[entityType];
    return async (req, res, next) => {
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
            const dynamicImageFields = {};
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
                    }
                    else {
                        // Multiple images
                        const storageIds = await uploadMultipleImages(fieldFiles);
                        console.log(`Uploaded multiple dynamic images for ${fieldName}: ${storageIds}`);
                        req.body[fieldName] = storageIds;
                    }
                }
            }
            console.log("Image processing completed, proceeding to next middleware");
            next();
        }
        catch (error) {
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
exports.imageInterceptor = imageInterceptor;
// Multer middleware for different entity types
const getMulterMiddleware = (entityType) => {
    const config = IMAGE_FIELD_CONFIG[entityType];
    if (entityType === 'experience') {
        // For experience, accept any field name to handle dynamic itinerary images
        return upload.any(); // This accepts any field names
    }
    const fields = [];
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
exports.getMulterMiddleware = getMulterMiddleware;
// Combined middleware that handles both multer and image processing
const createImageMiddleware = (entityType) => {
    return [
        (0, exports.getMulterMiddleware)(entityType),
        (0, exports.imageInterceptor)(entityType)
    ];
};
exports.createImageMiddleware = createImageMiddleware;
//# sourceMappingURL=image-interceptor.js.map