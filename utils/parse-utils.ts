// Utility functions for parsing form data
import { validateDateFormat } from "../convex/dateHelpers";

export const parseNumericFields = (data: any, numericFields: string[]): any => {
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

export const parseArrayFields = (data: any, arrayFields: string[]): any => {
  const parsed = { ...data };
  
  for (const field of arrayFields) {
    if (parsed[field] !== undefined && parsed[field] !== null) {
      if (typeof parsed[field] === 'string') {
        try {
          parsed[field] = JSON.parse(parsed[field]);
        } catch {
          // If it's not valid JSON, treat as single item array
          parsed[field] = [parsed[field]];
        }
      }
    }
  }
  
  return parsed;
};

export const parseBooleanFields = (data: any, booleanFields: string[]): any => {
  const parsed = { ...data };
  
  for (const field of booleanFields) {
    if (parsed[field] !== undefined && parsed[field] !== null) {
      if (typeof parsed[field] === 'string') {
        const lowerValue = parsed[field].toLowerCase();
        if (lowerValue === 'true') {
          parsed[field] = true;
        } else if (lowerValue === 'false') {
          parsed[field] = false;
        }
      }
    }
  }
  
  return parsed;
};

export const parseObjectFields = (data: any, objectFields: string[]): any => {
  const parsed = { ...data };
  
  for (const field of objectFields) {
    if (parsed[field] !== undefined && parsed[field] !== null) {
      if (typeof parsed[field] === 'string') {
        try {
          parsed[field] = JSON.parse(parsed[field]);
        } catch {
          // If it's not valid JSON, leave as string
        }
      }
    }
  }
  
  return parsed;
};

export const validateDateFields = (data: any, dateFields: string[]): string[] => {
  const errors: string[] = [];

  const checkDateInObject = (obj: any, path: string = '') => {
    if (!obj || typeof obj !== 'object') return;

    for (const key in obj) {
      const currentPath = path ? `${path}.${key}` : key;
      const value = obj[key];

      if (dateFields.includes(key) && value !== undefined && value !== null) {
        if (typeof value === 'string') {
          if (!validateDateFormat(value)) {
            errors.push(`${currentPath}: must be in MM-DD-YYYY format`);
          }
        } else {
          errors.push(`${currentPath}: must be a string in MM-DD-YYYY format`);
        }
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          checkDateInObject(item, `${currentPath}[${index}]`);
        });
      } else if (typeof value === 'object' && value !== null) {
        checkDateInObject(value, currentPath);
      }
    }
  };

  checkDateInObject(data);
  return errors;
};

// Experience specific parsing
export const parseExperienceData = (data: any): any => {
  // First validate date fields
  const dateFields = ['startDate', 'endDate'];
  const dateErrors = validateDateFields(data, dateFields);

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

  let parsed = parseNumericFields(data, numericFields);
  parsed = parseArrayFields(parsed, arrayFields);
  parsed = parseObjectFields(parsed, objectFields);
  parsed = parseBooleanFields(parsed, booleanFields);

  return parsed;
};
