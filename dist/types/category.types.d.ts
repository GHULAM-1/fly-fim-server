import { CategoryType } from "./enums/category.enum";
export interface Category {
    _id: string;
    _creationTime: number;
    categoryName: CategoryType;
}
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
export interface CategoryQueryParams {
    categoryName?: CategoryType;
    limit?: number;
    offset?: number;
}
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
//# sourceMappingURL=category.types.d.ts.map