"use strict";
// Utility functions for parsing form data
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseExperienceData = exports.parseObjectFields = exports.parseBooleanFields = exports.parseArrayFields = exports.parseNumericFields = void 0;
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
// Experience specific parsing
const parseExperienceData = (data) => {
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