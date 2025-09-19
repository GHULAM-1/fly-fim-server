import { Request, Response } from "express";
export declare const getAllCategories: (req: Request, res: Response) => Promise<void>;
export declare const getCategoryById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getCategoriesByCategoryName: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createCategory: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateCategory: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteCategory: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=category-controller.d.ts.map