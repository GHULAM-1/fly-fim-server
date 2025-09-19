export declare const capitalizeFirstLetter: (text: string) => string;
export declare const validateLocationName: (name: string, type: "city" | "country") => string | null;
export declare const transformCityCountryData: (data: {
    city?: string;
    country?: string;
}) => {
    city?: string;
    country?: string;
};
export declare const validateSubcategoryName: (name: string) => string | null;
export declare const normalizeSubcategoryName: (name: string) => string;
export declare const normalizeCategoryName: (categoryName: string) => string;
//# sourceMappingURL=text-transform.d.ts.map