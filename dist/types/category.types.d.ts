export interface Category {
    _id: string;
    _creationTime: number;
    categoryName: string;
}
export interface CreateCategoryRequest {
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
export interface CategoryQueryParams {
    categoryName?: string;
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