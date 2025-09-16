// Utility functions for parsing form data

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

// Experience specific parsing
export const parseExperienceData = (data: any): any => {
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
