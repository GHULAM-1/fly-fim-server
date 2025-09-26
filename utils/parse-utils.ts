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
      console.log(`Parsing object field: ${field}, type: ${typeof parsed[field]}, value:`, parsed[field]);
      if (typeof parsed[field] === 'string') {
        try {
          parsed[field] = JSON.parse(parsed[field]);
          console.log(`Successfully parsed ${field} to object`);
        } catch (error) {
          console.log(`Failed to parse ${field}:`, error);
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
    'infantPrice',
    'totalLimit'
  ];

  const arrayFields = [
    'images',
    'features',
    'operatingHours',
    'datePriceRange',
    'blogSlug'
  ];

  const objectFields = [
    'whereTo',
    'packageType',
    'itinerary'
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

  // Process dynamic itinerary images and integrate them into the itinerary object
  parsed = processDynamicItineraryImages(parsed);

  return parsed;
};

// Process dynamic itinerary images and integrate them into itinerary object
export const processDynamicItineraryImages = (data: any): any => {
  const parsed = { ...data };

  console.log("Processing dynamic itinerary images...");
  console.log("All keys in data:", Object.keys(parsed));

  // Find all dynamic image fields
  const dynamicImageFields = Object.keys(parsed).filter(key =>
    key.startsWith('nearbyImages_') ||
    key.startsWith('highlightImages_') ||
    key.startsWith('highlightsImages_') || // Handle both variants
    key.startsWith('thingsImages_') ||
    key === 'startPointImage' ||
    key === 'endPointImage'
  );

  console.log("Found dynamic image fields:", dynamicImageFields);

  if (dynamicImageFields.length === 0) {
    console.log("No dynamic images to process");
    return parsed;
  }

  if (!parsed.itinerary) {
    console.log("No itinerary found, but processing standalone image fields");
    // Still process startPointImage/endPointImage even if no full itinerary
    if (parsed.startPointImage) {
      console.log("Removing startPointImage field as no itinerary to attach it to");
      delete parsed.startPointImage;
    }
    if (parsed.endPointImage) {
      console.log("Removing endPointImage field as no itinerary to attach it to");
      delete parsed.endPointImage;
    }
    return parsed;
  }

  const itinerary = parsed.itinerary;

  // Map image types to their array names
  const imageTypeMap: { [key: string]: string } = {
    'nearbyImages': 'nearbyThingsToDo',
    'highlightImages': 'highlights',
    'highlightsImages': 'highlights', // Handle both variants
    'thingsImages': 'thingsToDo'
  };

  // Process each dynamic image field
  for (const fieldName of dynamicImageFields) {
    const imageData = parsed[fieldName];
    console.log(`Processing field: ${fieldName}, data:`, imageData);

    // Parse field name: imageType_pointIndex_itemIndex
    const parts = fieldName.split('_');
    if (parts.length !== 3) {
      console.log(`Skipping invalid field format: ${fieldName}`);
      continue;
    }

    const [imageType, pointIndex, itemIndex] = parts;
    const pointIdx = parseInt(pointIndex);
    const itemIdx = parseInt(itemIndex);

    console.log(`Parsed: imageType=${imageType}, pointIndex=${pointIdx}, itemIndex=${itemIdx}`);

    // Ensure itinerary structure exists
    if (!itinerary.points || !itinerary.points[pointIdx]) {
      console.log(`Point ${pointIdx} not found in itinerary. Available points:`, itinerary.points?.length || 0);
      continue;
    }

    const point = itinerary.points[pointIdx];
    console.log(`Point ${pointIdx} structure:`, Object.keys(point));

    const arrayName = imageTypeMap[imageType];
    console.log(`Looking for array: ${arrayName} in point ${pointIdx}`);

    if (!arrayName) {
      console.log(`No array mapping found for imageType: ${imageType}`);
      continue;
    }

    if (!point[arrayName]) {
      console.log(`Array ${arrayName} not found in point ${pointIdx}. Available arrays:`, Object.keys(point).filter(key => Array.isArray(point[key])));
      continue;
    }

    if (!point[arrayName][itemIdx]) {
      console.log(`Item ${itemIdx} not found in ${arrayName}. Array length: ${point[arrayName].length}`);
      continue;
    }

    console.log(`Found target: point[${pointIdx}].${arrayName}[${itemIdx}]`);

    // Add the image to the specific item
    point[arrayName][itemIdx].image = imageData;
    console.log(`Added image to ${arrayName}[${itemIdx}] in point ${pointIdx}`);

    // Remove the dynamic field from the main object
    delete parsed[fieldName];
  }

  // Process startPointImage and endPointImage
  if (parsed.startPointImage && itinerary.startPoint) {
    console.log("Processing startPointImage:", parsed.startPointImage);
    itinerary.startPoint.image = parsed.startPointImage;
    delete parsed.startPointImage;
    console.log("Added startPointImage to itinerary.startPoint");
  }

  if (parsed.endPointImage && itinerary.endPoint) {
    console.log("Processing endPointImage:", parsed.endPointImage);
    itinerary.endPoint.image = parsed.endPointImage;
    delete parsed.endPointImage;
    console.log("Added endPointImage to itinerary.endPoint");
  }

  console.log("Finished processing dynamic itinerary images");
  return parsed;
};
