import { Request, Response } from "express";
export declare const getAllFaqs: (req: Request, res: Response) => Promise<void>;
export declare const getFaqById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createFaq: (req: Request, res: Response) => Promise<void>;
export declare const updateFaq: (req: Request, res: Response) => Promise<void>;
export declare const getFaqsByExperience: (req: Request, res: Response) => Promise<void>;
export declare const deleteFaq: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=faq-controller.d.ts.map