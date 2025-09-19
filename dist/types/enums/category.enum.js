"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCategoryType = exports.CATEGORY_VALUES = exports.CategoryType = void 0;
var CategoryType;
(function (CategoryType) {
    CategoryType["TICKETS"] = "Tickets";
    CategoryType["TOURS"] = "Tours";
    CategoryType["TRANSPORTATION"] = "Transportation";
    CategoryType["TRAVEL_SERVICES"] = "Travel Services";
    CategoryType["CRUISES"] = "Cruises";
    CategoryType["FOOD_DRINK"] = "Food & Drink";
    CategoryType["ENTERTAINMENT"] = "Entertainment";
    CategoryType["ADVENTURE"] = "Adventure";
    CategoryType["WATER_SPORTS"] = "Water Sports";
    CategoryType["WELLNESS"] = "Wellness";
    CategoryType["SPECIALS"] = "Specials";
})(CategoryType || (exports.CategoryType = CategoryType = {}));
exports.CATEGORY_VALUES = Object.values(CategoryType);
const isCategoryType = (value) => {
    return exports.CATEGORY_VALUES.includes(value);
};
exports.isCategoryType = isCategoryType;
//# sourceMappingURL=category.enum.js.map