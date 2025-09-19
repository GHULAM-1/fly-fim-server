import { Request, Response } from "express";
export declare const getAllReviews: (req: Request, res: Response) => Promise<void>;
export declare const getReviewById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getReviewsByExperience: (req: Request, res: Response) => Promise<void>;
export declare const getReviewsByUser: (req: Request, res: Response) => Promise<void>;
export declare const createReview: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteReview: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=review-controller.d.ts.map