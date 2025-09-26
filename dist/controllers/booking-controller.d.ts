import { Request, Response } from "express";
export declare const createBooking: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAllBookings: (req: Request, res: Response) => Promise<void>;
export declare const getBookingsWithDetails: (req: Request, res: Response) => Promise<void>;
export declare const getBookingsByUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getBookingsByExperience: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateBookingStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteBooking: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=booking-controller.d.ts.map