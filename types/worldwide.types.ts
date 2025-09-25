import { Category } from "./category.types";
import { Subcategory } from "./subcategory.types";
import { Review } from "./review.types";
import { City } from "./city.types";

export interface ReviewWithExperienceTitle extends Review {
  experienceTitle: string;
  userName: string;
  imageUrls: (string | null)[];
}

export interface SimplifiedExperience {
  _id: string;
  title: string;
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
}

export interface CategoryWithSubcategories extends Category {
  subcategories: Subcategory[];
}

export interface WorldwideData {
  experiences: SimplifiedExperience[];
  categories: CategoryWithSubcategories[];
  reviews: ReviewWithExperienceTitle[];
}

export type SortOptions = "popular" | "lowToHigh" | "highToLow";

export interface WorldwideResponse {
  success: boolean;
  data?: WorldwideData;
  message: string;
  error?: string;
}