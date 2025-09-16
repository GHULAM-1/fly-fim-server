// City Types
export interface City {
  _id: string;
  _creationTime: number;
  image?: string;
  imageUrl?: string | null;
  cityName: string;
  countryName: string;
}

// City with Image URL (returned from API)
export interface CityWithImageUrl {
  _id: string;
  _creationTime: number;
  image?: string;
  imageUrl: string | null;
  cityName: string;
  countryName: string;
}

// API Request/Response Types
export interface CreateCityRequest {
  image?: string; // This will be the storage ID from image upload (handled by interceptor)
  cityName: string;
  countryName: string;
}

export interface UpdateCityRequest {
  image?: string;
  cityName?: string;
  countryName?: string;
}

export interface CityResponse {
  success: boolean;
  data?: City | City[] | CityWithImageUrl | CityWithImageUrl[];
  message: string;
  error?: string;
}

// Query Parameters
export interface CityQueryParams {
  image?: string;
  cityName?: string;
  countryName?: string;
  limit?: number;
  offset?: number;
}

// Pagination Types
export interface PaginatedCityResponse {
  success: boolean;
  data: City[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
  message: string;
}
