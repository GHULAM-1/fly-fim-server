// Category Types
export interface Category {
  _id: string;
  _creationTime: number;
  experienceId: string;
  categoryName: string;
}

// API Request/Response Types
export interface CreateCategoryRequest {
  experienceId: string;
  categoryName: string;
}

export interface UpdateCategoryRequest {
  categoryName?: string;
}

export interface CategoryResponse {
  success: boolean;
  data?: Category | Category[];
  message: string;
  error?: string;
}

// Query Parameters
export interface CategoryQueryParams {
  experienceId?: string;
  categoryName?: string;
  limit?: number;
  offset?: number;
}

// Pagination Types
export interface PaginatedCategoryResponse {
  success: boolean;
  data: Category[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
  message: string;
}
