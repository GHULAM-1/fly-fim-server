export interface ExperienceBasicInfo {
    title: string;
    description: string;
    tagOnCards?: string;
    price: number;
    oldPrice?: number;
    sale?: number;
    images: (string | null)[];
    mainImage: (string | null)[];
}
export interface ExperienceFeatures {
    features: string[];
    featureText: string;
}
export interface ExperienceInformation {
    highlights?: string;
    inclusions?: string;
    exclusions?: string;
    cancellationPolicy?: string;
    ticketValidity?: string;
    operatingHours: Array<{
        startDate: number;
        endDate: number;
        openTime: string;
        closeTime: string;
        lastEntryTime: string;
        title: string;
    }>;
    yourExperience?: string;
    knowBeforeYouGo?: string;
    myTickets?: string;
    whereTo: {
        address: string;
        lat: number;
        lng: number;
    };
    exploreMore?: string;
}
export interface ExperienceCalendar {
    datePriceRange: Array<{
        startDate: number;
        endDate: number;
        price: number;
    }>;
}
export interface ExperiencePackages {
    packageType: {
        name: string;
        price: number;
        points: Array<{
            title: string;
            subpoints?: string[];
        }>;
        timePriceSlots: Array<{
            openTime: string;
            closeTime: string;
            price: number;
        }>;
    };
}
export interface ExperienceTicketPrice {
    adultPrice: number;
    childPrice: number;
    seniorPrice: number;
    totalLimit: number;
}
export interface ExperienceFlags {
    isMainCard?: boolean;
    isTopExperience?: boolean;
    isMustDo?: boolean;
    isPopular?: boolean;
    blogSlug?: string;
}
export interface ExperienceRelationships {
    categoryId: string;
    subcategoryId: string;
    cityId: string;
}
export interface StructuredExperience {
    _id: string;
    basicInfo: ExperienceBasicInfo;
    features: ExperienceFeatures;
    information: ExperienceInformation;
    calendar: ExperienceCalendar;
    packages: ExperiencePackages;
    ticketPrice: ExperienceTicketPrice;
    flags: ExperienceFlags;
    relationships: ExperienceRelationships;
}
export interface Review {
    _id: string;
    _creationTime: number;
    userId: string;
    experienceId: string;
    stars: number;
    images: string[];
    text: string;
}
export interface Subcategory {
    subcategoryName: string;
    experiences: StructuredExperience[];
}
export interface Category {
    categoryName: string;
    subcategories: Subcategory[];
}
export interface ThingsToDoPageData {
    categories: Category[];
    topExperiences: StructuredExperience[];
    mustDoExperiences: StructuredExperience[];
    mainCards: StructuredExperience[];
    reviews?: Review[];
}
export interface ThingsToDoResponse {
    success: boolean;
    data: ThingsToDoPageData;
    message: string;
    error?: string;
}
export interface ThingsToDoQueryParams {
    cityId: string;
}
export interface ThingsToDoErrorResponse {
    success: false;
    message: string;
    error?: string;
}
export interface ExperienceResponse {
    success: boolean;
    data?: StructuredExperience;
    message: string;
    error?: string;
}
export interface ExperienceListResponse {
    success: boolean;
    data?: StructuredExperience[];
    message: string;
    error?: string;
}
export interface PaginatedExperienceResponse {
    success: boolean;
    data: {
        experiences: StructuredExperience[];
        pagination: {
            total: number;
            limit: number;
            offset: number;
            hasMore: boolean;
        };
    };
    message: string;
}
//# sourceMappingURL=things-to-do.types.d.ts.map