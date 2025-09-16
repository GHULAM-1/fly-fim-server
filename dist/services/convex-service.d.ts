import { ConvexHttpClient } from 'convex/browser';
declare class ConvexService {
    private static instance;
    private convex;
    private constructor();
    static getInstance(): ConvexService;
    setClient(client: ConvexHttpClient): void;
    getClient(): ConvexHttpClient;
}
export declare const convexService: ConvexService;
export {};
//# sourceMappingURL=convex-service.d.ts.map