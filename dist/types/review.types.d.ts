export interface Review {
    _id: string;
    _creationTime: number;
    userId: string;
    experienceId: string;
    stars: number;
    images: string[];
    text: string;
    userName?: string;
    imageUrls?: (string | null)[];
}
export interface CreateReviewRequest {
    userId: string;
    experienceId: string;
    stars: number;
    images: string[];
    text: string;
}
export interface UpdateReviewRequest {
    stars?: number;
    images?: string[];
    text?: string;
}
export interface ReviewResponse {
    success: boolean;
    data?: Review | Review[];
    message: string;
    error?: string;
}
export interface PaginatedReviewResponse {
    success: boolean;
    data: Review[];
    pagination: {
        limit: number;
        offset: number;
        hasMore: boolean;
        nextOffset?: number;
    };
    message: string;
    error?: string;
}
//# sourceMappingURL=review.types.d.ts.map