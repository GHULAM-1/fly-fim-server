// City Types
export interface City {
  _id: string;
  _creationTime: number;
  experienceId: string;
  cityName: string;
  countryName: string;
}

// API Request/Response Types
export interface CreateCityRequest {
  experienceId: string;
  cityName: string;
  countryName: string;
}

export interface UpdateCityRequest {
  cityName?: string;
  countryName?: string;
}

export interface CityResponse {
  success: boolean;
  data?: City | City[];
  message: string;
  error?: string;
}

// Query Parameters
export interface CityQueryParams {
  experienceId?: string;
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
