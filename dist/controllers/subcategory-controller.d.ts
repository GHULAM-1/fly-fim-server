import { Request, Response } from "express";
export declare const getAllSubcategories: (req: Request, res: Response) => Promise<void>;
export declare const getSubcategoryById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createSubcategory: (req: Request, res: Response) => Promise<void>;
export declare const updateSubcategory: (req: Request, res: Response) => Promise<void>;
export declare const deleteSubcategory: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=subcategory-controller.d.ts.map