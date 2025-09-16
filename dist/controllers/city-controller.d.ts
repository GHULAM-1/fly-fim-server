import { Request, Response } from "express";
export declare const getAllCities: (req: Request, res: Response) => Promise<void>;
export declare const getCityById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createCity: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateCity: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getCitiesByCityName: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteCity: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=city-controller.d.ts.map