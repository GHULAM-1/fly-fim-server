"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convexService = void 0;
class ConvexService {
    constructor() {
        this.convex = null;
    }
    static getInstance() {
        if (!ConvexService.instance) {
            ConvexService.instance = new ConvexService();
        }
        return ConvexService.instance;
    }
    setClient(client) {
        this.convex = client;
    }
    getClient() {
        if (!this.convex) {
            throw new Error('ConvexDB client not initialized. Call setClient() first.');
        }
        return this.convex;
    }
}
// Export a singleton instance
exports.convexService = ConvexService.getInstance();
//# sourceMappingURL=convex-service.js.map