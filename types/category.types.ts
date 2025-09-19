import { CategoryType } from "./enums/category.enum";

// Category Types
export interface Category {
  _id: string;
  _creationTime: number;
  categoryName: CategoryType;
}

// API Request/Response Types
export interface CreateCategoryRequest {
  categoryName: CategoryType;
}

export interface UpdateCategoryRequest {
  categoryName?: CategoryType;
}

export interface CategoryResponse {
  success: boolean;
  data?: Category | Category[];
  message: string;
  error?: string;
}

// Query Parameters
export interface CategoryQueryParams {
  categoryName?: CategoryType;
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
