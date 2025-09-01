// ---- Base types matching your schema ----
export interface OperatingHour {
    startDate: number;
    endDate: number;
    openTime: string;
    closeTime: string;
    lastEntryTime: string;
    title: string;
  }
  
  export interface WhereTo {
    address: string;
    lat: number;
    lng: number;
  }
  
  export interface DatePrice {
    startDate: number;
    endDate: number;
    price: string;
  }
  
  export interface PackagePoint {
    title: string;
    subpoints?: string[];
  }
  
  export interface TimePriceSlot {
    openTime: string;
    closeTime: string;
    price: string;
  }
  
  export interface PackageType {
    name: string;
    price: string;
    points: PackagePoint[];
    timePriceSlots: TimePriceSlot[];
  }
  
  export interface Experience {
    _id: string;
    _creationTime: number;
    type: string;
    title: string;
    price: string;
    sale: string;
    images: string[];  // _storage ids as strings
    mainImage: string; // _storage id
    experienceType: string;
    tagOnCards: string;
    features: string[];
    featureText: string;
    highlights: string;
    inclusions: string;
    exclusions: string;
    cancellationPolicy: string;
    ticketValidity: string;
    exploreMore: string;
    knowBeforeYouGo: string;
    myTickets: string;
    operatingHours: OperatingHour[];
    whereTo: WhereTo;
    datePriceRange: DatePrice[];
    packageType: PackageType;
    adultPrice: string;
    childPrice: string;
    seniorPrice: string;
    totalLimit: string;
  }
  
  // ---- Requests / Responses ----
  export type CreateExperienceRequest = Omit<Experience, "_id" | "_creationTime">;
  export type UpdateExperienceRequest = Partial<CreateExperienceRequest>;
  
  export interface ExperienceResponse {
    success: boolean;
    data?: Experience | Experience[];
    message: string;
    error?: string;
  }
  
  export interface Paginated {
    total?: number;
    limit: number;
    offset: number;
    hasMore: boolean;
    nextOffset?: number;
  }
  
  // Full list response with facet arrays
  export interface ExperienceListWithFacetsResponse {
    success: boolean;
    data: Experience[];
    categories: string[];
    subcategories: string[];
    pagination: Paginated;
    message: string;
    error?: string;
  }
  