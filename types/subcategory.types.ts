// Subcategory Types
export interface Subcategory {
  _id: string;
  _creationTime: number;
  experienceId: string;
  subcategoryName: string;
}

// API Request/Response Types
export interface CreateSubcategoryRequest {
  experienceId: string;
  subcategoryName: string;
}

export interface UpdateSubcategoryRequest {
  subcategoryName?: string;
}

export interface SubcategoryResponse {
  success: boolean;
  data?: Subcategory | Subcategory[];
  message: string;
  error?: string;
}

// Query Parameters
export interface SubcategoryQueryParams {
  experienceId?: string;
  subcategoryName?: string;
  limit?: number;
  offset?: number;
}

// Pagination Types
export interface PaginatedSubcategoryResponse {
  success: boolean;
  data: Subcategory[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
  message: string;
}
