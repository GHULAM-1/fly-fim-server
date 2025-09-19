"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseExperienceData = exports.validateDateFields = exports.parseObjectFields = exports.parseBooleanFields = exports.parseArrayFields = exports.parseNumericFields = void 0;
// Utility functions for parsing form data
const dateHelpers_1 = require("../convex/dateHelpers");
const parseNumericFields = (data, numericFields) => {
    const parsed = { ...data };
    for (const field of numericFields) {
        if (parsed[field] !== undefined && parsed[field] !== null) {
            const parsedValue = parseFloat(parsed[field]);
            if (!isNaN(parsedValue)) {
                parsed[field] = parsedValue;
            }
        }
    }
    return parsed;
};
exports.parseNumericFields = parseNumericFields;
const parseArrayFields = (data, arrayFields) => {
    const parsed = { ...data };
    for (const field of arrayFields) {
        if (parsed[field] !== undefined && parsed[field] !== null) {
            if (typeof parsed[field] === 'string') {
                try {
                    parsed[field] = JSON.parse(parsed[field]);
                }
                catch {
                    // If it's not valid JSON, treat as single item array
                    parsed[field] = [parsed[field]];
                }
            }
        }
    }
    return parsed;
};
exports.parseArrayFields = parseArrayFields;
const parseBooleanFields = (data, booleanFields) => {
    const parsed = { ...data };
    for (const field of booleanFields) {
        if (parsed[field] !== undefined && parsed[field] !== null) {
            if (typeof parsed[field] === 'string') {
                const lowerValue = parsed[field].toLowerCase();
                if (lowerValue === 'true') {
                    parsed[field] = true;
                }
                else if (lowerValue === 'false') {
                    parsed[field] = false;
                }
            }
        }
    }
    return parsed;
};
exports.parseBooleanFields = parseBooleanFields;
const parseObjectFields = (data, objectFields) => {
    const parsed = { ...data };
    for (const field of objectFields) {
        if (parsed[field] !== undefined && parsed[field] !== null) {
            if (typeof parsed[field] === 'string') {
                try {
                    parsed[field] = JSON.parse(parsed[field]);
                }
                catch {
                    // If it's not valid JSON, leave as string
                }
            }
        }
    }
    return parsed;
};
exports.parseObjectFields = parseObjectFields;
const validateDateFields = (data, dateFields) => {
    const errors = [];
    const checkDateInObject = (obj, path = '') => {
        if (!obj || typeof obj !== 'object')
            return;
        for (const key in obj) {
            const currentPath = path ? `${path}.${key}` : key;
            const value = obj[key];
            if (dateFields.includes(key) && value !== undefined && value !== null) {
                if (typeof value === 'string') {
                    if (!(0, dateHelpers_1.validateDateFormat)(value)) {
                        errors.push(`${currentPath}: must be in MM-DD-YYYY format`);
                    }
                }
                else {
                    errors.push(`${currentPath}: must be a string in MM-DD-YYYY format`);
                }
            }
            else if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    checkDateInObject(item, `${currentPath}[${index}]`);
                });
            }
            else if (typeof value === 'object' && value !== null) {
                checkDateInObject(value, currentPath);
            }
        }
    };
    checkDateInObject(data);
    return errors;
};
exports.validateDateFields = validateDateFields;
// Experience specific parsing
const parseExperienceData = (data) => {
    // First validate date fields
    const dateFields = ['startDate', 'endDate'];
    const dateErrors = (0, exports.validateDateFields)(data, dateFields);
    if (dateErrors.length > 0) {
        throw new Error(`Date validation failed: ${dateErrors.join(', ')}`);
    }
    const numericFields = [
        'price',
        'oldPrice',
        'sale',
        'adultPrice',
        'childPrice',
        'seniorPrice',
        'totalLimit'
    ];
    const arrayFields = [
        'images',
        'features',
        'operatingHours',
        'datePriceRange'
    ];
    const objectFields = [
        'whereTo',
        'packageType'
    ];
    const booleanFields = [
        'isMainCard',
        'isTopExperience',
        'isMustDo',
        'isPopular'
    ];
    let parsed = (0, exports.parseNumericFields)(data, numericFields);
    parsed = (0, exports.parseArrayFields)(parsed, arrayFields);
    parsed = (0, exports.parseObjectFields)(parsed, objectFields);
    parsed = (0, exports.parseBooleanFields)(parsed, booleanFields);
    return parsed;
};
exports.parseExperienceData = parseExperienceData;
//# sourceMappingURL=parse-utils.js.map