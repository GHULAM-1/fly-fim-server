import { City } from "./city.types";
export interface SearchExperience {
    _id: string;
    title: string;
    description: string;
    cityName: string;
    cityId: string;
    categoryName: string;
    categoryId: string;
    subcategoryId: string;
    subcategoryName: string;
    price: number;
    oldPrice?: number;
    tagOnCards?: string;
    images: string[];
    imageUrls: (string | null)[];
    mainImageUrl: string | null;
}
export interface CityWithImage extends City {
    imageUrl: string | null;
}
export interface SearchData {
    cities: CityWithImage[];
    experiences: SearchExperience[];
    searchQuery: string;
    totalResults: {
        cities: number;
        experiences: number;
    };
}
export interface SearchResponse {
    success: boolean;
    data?: SearchData;
    message: string;
    error?: string;
}
//# sourceMappingURL=search.types.d.ts.map