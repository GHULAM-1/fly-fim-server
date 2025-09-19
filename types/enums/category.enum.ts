export enum CategoryType {
  TICKETS = "Tickets",
  TOURS = "Tours",
  TRANSPORTATION = "Transportation",
  TRAVEL_SERVICES = "Travel Services",
  CRUISES = "Cruises",
  FOOD_DRINK = "Food & Drink",
  ENTERTAINMENT = "Entertainment",
  ADVENTURE = "Adventure",
  WATER_SPORTS = "Water Sports",
  WELLNESS = "Wellness",
  SPECIALS = "Specials"
}

export const CATEGORY_VALUES = Object.values(CategoryType);

export const isCategoryType = (value: string): value is CategoryType => {
  return CATEGORY_VALUES.includes(value as CategoryType);
};