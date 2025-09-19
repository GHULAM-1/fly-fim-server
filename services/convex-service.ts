import { ConvexHttpClient } from 'convex/browser';
import { api } from '../convex/_generated/api';

class ConvexService {
  private static instance: ConvexService;
  private convex: ConvexHttpClient | null = null;

  private constructor() {}

  public static getInstance(): ConvexService {
    if (!ConvexService.instance) {
      ConvexService.instance = new ConvexService();
    }
    return ConvexService.instance;
  }

  public setClient(client: ConvexHttpClient): void {
    this.convex = client;
  }

  public getClient(): ConvexHttpClient {
    if (!this.convex) {
      throw new Error('ConvexDB client not initialized. Call setClient() first.');
    }
    return this.convex;
  }

  public async query(functionName: string, args: any = {}): Promise<any> {
    if (!this.convex) {
      throw new Error('ConvexDB client not initialized. Call setClient() first.');
    }

    const [module, func] = functionName.split(':');
    const functionReference = (api as any)[module][func];

    if (!functionReference) {
      throw new Error(`Function ${functionName} not found in API`);
    }

    return await this.convex.query(functionReference, args);
  }

  public async mutation(functionName: string, args: any = {}): Promise<any> {
    if (!this.convex) {
      throw new Error('ConvexDB client not initialized. Call setClient() first.');
    }

    const [module, func] = functionName.split(':');
    const functionReference = (api as any)[module][func];

    if (!functionReference) {
      throw new Error(`Function ${functionName} not found in API`);
    }

    return await this.convex.mutation(functionReference, args);
  }
}

// Export a singleton instance
export const convexService = ConvexService.getInstance();
