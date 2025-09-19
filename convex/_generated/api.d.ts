/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as categoryFunctions from "../categoryFunctions.js";
import type * as cityFunctions from "../cityFunctions.js";
import type * as dateHelpers from "../dateHelpers.js";
import type * as experienceFunctions from "../experienceFunctions.js";
import type * as faqFunctions from "../faqFunctions.js";
import type * as notFoundFunctions from "../notFoundFunctions.js";
import type * as reviewFunctions from "../reviewFunctions.js";
import type * as storage from "../storage.js";
import type * as subcategoryFunctions from "../subcategoryFunctions.js";
import type * as userFunctions from "../userFunctions.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  categoryFunctions: typeof categoryFunctions;
  cityFunctions: typeof cityFunctions;
  dateHelpers: typeof dateHelpers;
  experienceFunctions: typeof experienceFunctions;
  faqFunctions: typeof faqFunctions;
  notFoundFunctions: typeof notFoundFunctions;
  reviewFunctions: typeof reviewFunctions;
  storage: typeof storage;
  subcategoryFunctions: typeof subcategoryFunctions;
  userFunctions: typeof userFunctions;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
