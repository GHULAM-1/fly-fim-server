"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeCategoryName = exports.normalizeSubcategoryName = exports.validateSubcategoryName = exports.transformCityCountryData = exports.validateLocationName = exports.capitalizeFirstLetter = void 0;
const capitalizeFirstLetter = (text) => {
    if (!text || typeof text !== 'string')
        return text;
    const processedText = text.trim().replace(/-/g, ' ');
    const words = processedText.split(/\s+/);
    const normalized = words.map(word => {
        if (word.length === 0)
            return word;
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
    return normalized;
};
exports.capitalizeFirstLetter = capitalizeFirstLetter;
const validateLocationName = (name, type) => {
    if (!name || typeof name !== 'string') {
        return `${type} name is required`;
    }
    // Check if name contains only letters, spaces, and hyphens
    const validPattern = /^[a-zA-Z\s-]+$/;
    if (!validPattern.test(name.trim())) {
        return `${type} name can only contain letters, spaces, and hyphens`;
    }
    // Check for consecutive spaces or hyphens
    if (name.includes('  ') || name.includes('--')) {
        return `${type} name cannot have consecutive spaces or hyphens`;
    }
    // Check if starts or ends with space or hyphen
    const trimmed = name.trim();
    if (trimmed.startsWith('-') || trimmed.endsWith('-')) {
        return `${type} name cannot start or end with a hyphen`;
    }
    return null; // Valid
};
exports.validateLocationName = validateLocationName;
const transformCityCountryData = (data) => {
    const transformed = { ...data };
    if (transformed.city) {
        const cityValidationError = (0, exports.validateLocationName)(transformed.city, 'city');
        if (cityValidationError) {
            throw new Error(cityValidationError);
        }
        transformed.city = (0, exports.capitalizeFirstLetter)(transformed.city);
    }
    if (transformed.country) {
        const countryValidationError = (0, exports.validateLocationName)(transformed.country, 'country');
        if (countryValidationError) {
            throw new Error(countryValidationError);
        }
        transformed.country = (0, exports.capitalizeFirstLetter)(transformed.country);
    }
    return transformed;
};
exports.transformCityCountryData = transformCityCountryData;
const validateSubcategoryName = (name) => {
    if (!name || typeof name !== 'string') {
        return 'subcategory name is required';
    }
    // Check if name contains only letters, spaces, hyphens, and ampersands
    const validPattern = /^[a-zA-Z\s\-&]+$/;
    if (!validPattern.test(name.trim())) {
        return 'subcategory name can only contain letters, spaces, hyphens, and ampersands';
    }
    // Check for consecutive spaces, hyphens, or ampersands
    if (name.includes('  ') || name.includes('--') || name.includes('&&')) {
        return 'subcategory name cannot have consecutive spaces, hyphens, or ampersands';
    }
    // Check if starts or ends with special characters
    const trimmed = name.trim();
    if (trimmed.startsWith('-') || trimmed.endsWith('-') ||
        trimmed.startsWith('&') || trimmed.endsWith('&')) {
        return 'subcategory name cannot start or end with special characters';
    }
    return null; // Valid
};
exports.validateSubcategoryName = validateSubcategoryName;
const normalizeSubcategoryName = (name) => {
    if (!name || typeof name !== 'string')
        return name;
    const validationError = (0, exports.validateSubcategoryName)(name);
    if (validationError) {
        throw new Error(validationError);
    }
    const trimmed = name.trim();
    // Split by spaces, hyphens, and ampersands while preserving separators
    const parts = trimmed.split(/(\s|-|&)/);
    const normalized = parts.map(part => {
        // Keep separators as-is
        if (part === ' ' || part === '-' || part === '&')
            return part;
        // Capitalize first letter of words
        if (part.length > 0) {
            return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
        }
        return part;
    }).join('');
    return normalized;
};
exports.normalizeSubcategoryName = normalizeSubcategoryName;
const normalizeCategoryName = (categoryName) => {
    if (!categoryName || typeof categoryName !== 'string')
        return categoryName;
    const trimmed = categoryName.trim();
    // Handle special cases with & symbol and multiple words
    const words = trimmed.split(' ');
    const normalized = words.map(word => {
        if (word === '&')
            return '&';
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
    return normalized;
};
exports.normalizeCategoryName = normalizeCategoryName;
//# sourceMappingURL=text-transform.js.map