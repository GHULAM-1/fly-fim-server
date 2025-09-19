import { ConvexHttpClient } from 'convex/browser';

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

    return await this.convex.query(functionName as any, args);
  }

  public async mutation(functionName: string, args: any = {}): Promise<any> {
    if (!this.convex) {
      throw new Error('ConvexDB client not initialized. Call setClient() first.');
    }

    return await this.convex.mutation(functionName as any, args);
  }
}

// Export a singleton instance
export const convexService = ConvexService.getInstance();