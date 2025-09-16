import { Request, Response } from "express";
export declare const getAllExperiences: (_req: Request, res: Response) => Promise<void>;
export declare const getExperienceById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createExperience: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateExperience: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteExperience: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=experience-controller.d.ts.map