export interface Subcategory {
    _id: string;
    _creationTime: number;
    subcategoryName: string;
}
export interface CreateSubcategoryRequest {
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
export interface SubcategoryQueryParams {
    subcategoryName?: string;
    limit?: number;
    offset?: number;
}
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
//# sourceMappingURL=subcategory.types.d.ts.map