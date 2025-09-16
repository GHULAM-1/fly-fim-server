"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateImageFiles = exports.validateImageFile = exports.IMAGE_VALIDATION = exports.cleanupUploadedFiles = exports.getImageFilesByField = exports.hasImageFiles = exports.validateImageFields = exports.IMAGE_FIELD_CONFIG = void 0;
// Image field configurations for different entities
exports.IMAGE_FIELD_CONFIG = {
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
// Validate image fields in request body
const validateImageFields = (entityType, body) => {
    const config = exports.IMAGE_FIELD_CONFIG[entityType];
    const errors = [];
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
            }
            else if (!body[fieldName].every((id) => typeof id === 'string')) {
                errors.push(`All items in ${fieldName} must be strings (storage IDs)`);
            }
        }
    });
    return errors;
};
exports.validateImageFields = validateImageFields;
// Check if request has image files
const hasImageFiles = (req) => {
    if (!req.files)
        return false;
    const files = Array.isArray(req.files) ? req.files : Object.values(req.files).flat();
    return files.length > 0;
};
exports.hasImageFiles = hasImageFiles;
// Get image files by field name
const getImageFilesByField = (req, fieldName) => {
    if (!req.files)
        return [];
    const files = Array.isArray(req.files) ? req.files : Object.values(req.files).flat();
    return files.filter(file => file.fieldname === fieldName);
};
exports.getImageFilesByField = getImageFilesByField;
// Clean up uploaded files on error
const cleanupUploadedFiles = async (storageIds) => {
    // This would be implemented to delete files from Convex storage
    // For now, we'll just log the cleanup action
};
exports.cleanupUploadedFiles = cleanupUploadedFiles;
// Image validation rules
exports.IMAGE_VALIDATION = {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    maxImagesPerArray: 10
};
// Validate single image file
const validateImageFile = (file) => {
    if (!file)
        return 'No file provided';
    if (file.size > exports.IMAGE_VALIDATION.maxFileSize) {
        return `File size exceeds ${exports.IMAGE_VALIDATION.maxFileSize / (1024 * 1024)}MB limit`;
    }
    if (!exports.IMAGE_VALIDATION.allowedMimeTypes.includes(file.mimetype)) {
        return `File type ${file.mimetype} not allowed. Allowed types: ${exports.IMAGE_VALIDATION.allowedMimeTypes.join(', ')}`;
    }
    return null;
};
exports.validateImageFile = validateImageFile;
// Validate multiple image files
const validateImageFiles = (files) => {
    const errors = [];
    if (files.length > exports.IMAGE_VALIDATION.maxImagesPerArray) {
        errors.push(`Maximum ${exports.IMAGE_VALIDATION.maxImagesPerArray} images allowed per field`);
    }
    files.forEach((file, index) => {
        const error = (0, exports.validateImageFile)(file);
        if (error) {
            errors.push(`File ${index + 1}: ${error}`);
        }
    });
    return errors;
};
exports.validateImageFiles = validateImageFiles;
//# sourceMappingURL=image-utils.js.map