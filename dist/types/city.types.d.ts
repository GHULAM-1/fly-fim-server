export interface City {
    _id: string;
    _creationTime: number;
    image?: string;
    imageUrl?: string | null;
    cityName: string;
    countryName: string;
}
export interface CityWithImageUrl {
    _id: string;
    _creationTime: number;
    image?: string;
    imageUrl: string | null;
    cityName: string;
    countryName: string;
}
export interface CreateCityRequest {
    image?: string;
    cityName: string;
    countryName: string;
}
export interface UpdateCityRequest {
    image?: string;
    cityName?: string;
    countryName?: string;
}
export interface CityResponse {
    success: boolean;
    data?: City | City[] | CityWithImageUrl | CityWithImageUrl[];
    message: string;
    error?: string;
}
export interface CityQueryParams {
    image?: string;
    cityName?: string;
    countryName?: string;
    limit?: number;
    offset?: number;
}
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
//# sourceMappingURL=city.types.d.ts.map