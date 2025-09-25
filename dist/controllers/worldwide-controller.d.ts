import { Request, Response } from "express";
export declare const getWorldwideData: (req: Request, res: Response) => Promise<void>;
export declare const getCategoryPageData: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getFilteredCategoryPageData: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getWorldwideSubcategoryPageData: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getWorldwideSubcategoryPageDataFiltered: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=worldwide-controller.d.ts.map