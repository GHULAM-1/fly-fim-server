import { Request, Response, NextFunction } from 'express';
export declare const imageInterceptor: (entityType: "city" | "experience" | "review") => (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export declare const getMulterMiddleware: (entityType: "city" | "experience" | "review") => import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
export declare const createImageMiddleware: (entityType: "city" | "experience" | "review") => import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>[];
//# sourceMappingURL=image-interceptor.d.ts.map