"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convexService = void 0;
const api_1 = require("../convex/_generated/api");
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
    async query(functionName, args = {}) {
        if (!this.convex) {
            throw new Error('ConvexDB client not initialized. Call setClient() first.');
        }
        const [module, func] = functionName.split(':');
        const functionReference = api_1.api[module][func];
        if (!functionReference) {
            throw new Error(`Function ${functionName} not found in API`);
        }
        return await this.convex.query(functionReference, args);
    }
    async mutation(functionName, args = {}) {
        if (!this.convex) {
            throw new Error('ConvexDB client not initialized. Call setClient() first.');
        }
        const [module, func] = functionName.split(':');
        const functionReference = api_1.api[module][func];
        if (!functionReference) {
            throw new Error(`Function ${functionName} not found in API`);
        }
        return await this.convex.mutation(functionReference, args);
    }
}
// Export a singleton instance
exports.convexService = ConvexService.getInstance();
//# sourceMappingURL=convex-service.js.map