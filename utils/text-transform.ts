export const capitalizeFirstLetter = (text: string): string => {
  if (!text || typeof text !== 'string') return text;
  const processedText = text.trim().replace(/-/g, ' ');
  const words = processedText.split(/\s+/);
  const normalized = words.map(word => {
    if (word.length === 0) return word;
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ');

  return normalized;
};

export const validateLocationName = (name: string, type: 'city' | 'country'): string | null => {
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

export const transformCityCountryData = (data: { city?: string; country?: string }) => {
  const transformed = { ...data };

  if (transformed.city) {
    const cityValidationError = validateLocationName(transformed.city, 'city');
    if (cityValidationError) {
      throw new Error(cityValidationError);
    }
    transformed.city = capitalizeFirstLetter(transformed.city);
  }

  if (transformed.country) {
    const countryValidationError = validateLocationName(transformed.country, 'country');
    if (countryValidationError) {
      throw new Error(countryValidationError);
    }
    transformed.country = capitalizeFirstLetter(transformed.country);
  }

  return transformed;
};

export const validateSubcategoryName = (name: string): string | null => {
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

export const normalizeSubcategoryName = (name: string): string => {
  if (!name || typeof name !== 'string') return name;

  const validationError = validateSubcategoryName(name);
  if (validationError) {
    throw new Error(validationError);
  }

  const trimmed = name.trim();

  // Split by spaces, hyphens, and ampersands while preserving separators
  const parts = trimmed.split(/(\s|-|&)/);

  const normalized = parts.map(part => {
    // Keep separators as-is
    if (part === ' ' || part === '-' || part === '&') return part;

    // Capitalize first letter of words
    if (part.length > 0) {
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    }

    return part;
  }).join('');

  return normalized;
};

export const normalizeCategoryName = (categoryName: string): string => {
  if (!categoryName || typeof categoryName !== 'string') return categoryName;

  const trimmed = categoryName.trim();

  // Handle special cases with & symbol and multiple words
  const words = trimmed.split(' ');
  const normalized = words.map(word => {
    if (word === '&') return '&';
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ');

  return normalized;
};