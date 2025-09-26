export declare const createBooking: import("convex/server").RegisteredMutation<"public", {
    status?: string;
    additionalAdults?: {
        fullName: string;
        phoneNumber: string;
    }[];
    children?: {
        fullName: string;
    }[];
    experienceId: import("convex/values").GenericId<"experience">;
    userId: import("convex/values").GenericId<"users">;
    bookingDate: string;
    experienceDate: string;
    adultCount: number;
    childCount: number;
    infantCount: number;
    totalAmount: number;
    primaryGuest: {
        email: string;
        fullName: string;
        confirmEmail: string;
        phoneNumber: string;
    };
}, Promise<import("convex/values").GenericId<"bookings">>>;
export declare const getAllBookings: import("convex/server").RegisteredQuery<"public", {}, Promise<{
    _id: import("convex/values").GenericId<"bookings">;
    _creationTime: number;
    additionalAdults?: {
        fullName: string;
        phoneNumber: string;
    }[];
    children?: {
        fullName: string;
    }[];
    experienceId: import("convex/values").GenericId<"experience">;
    userId: import("convex/values").GenericId<"users">;
    bookingDate: string;
    experienceDate: string;
    adultCount: number;
    childCount: number;
    infantCount: number;
    totalAmount: number;
    status: string;
    primaryGuest: {
        email: string;
        fullName: string;
        confirmEmail: string;
        phoneNumber: string;
    };
    createdAt: string;
}[]>>;
export declare const getBookingsByUser: import("convex/server").RegisteredQuery<"public", {
    userId: import("convex/values").GenericId<"users">;
}, Promise<{
    _id: import("convex/values").GenericId<"bookings">;
    _creationTime: number;
    additionalAdults?: {
        fullName: string;
        phoneNumber: string;
    }[];
    children?: {
        fullName: string;
    }[];
    experienceId: import("convex/values").GenericId<"experience">;
    userId: import("convex/values").GenericId<"users">;
    bookingDate: string;
    experienceDate: string;
    adultCount: number;
    childCount: number;
    infantCount: number;
    totalAmount: number;
    status: string;
    primaryGuest: {
        email: string;
        fullName: string;
        confirmEmail: string;
        phoneNumber: string;
    };
    createdAt: string;
}[]>>;
export declare const getBookingsByExperience: import("convex/server").RegisteredQuery<"public", {
    experienceId: import("convex/values").GenericId<"experience">;
}, Promise<{
    _id: import("convex/values").GenericId<"bookings">;
    _creationTime: number;
    additionalAdults?: {
        fullName: string;
        phoneNumber: string;
    }[];
    children?: {
        fullName: string;
    }[];
    experienceId: import("convex/values").GenericId<"experience">;
    userId: import("convex/values").GenericId<"users">;
    bookingDate: string;
    experienceDate: string;
    adultCount: number;
    childCount: number;
    infantCount: number;
    totalAmount: number;
    status: string;
    primaryGuest: {
        email: string;
        fullName: string;
        confirmEmail: string;
        phoneNumber: string;
    };
    createdAt: string;
}[]>>;
export declare const getBookingsByStatus: import("convex/server").RegisteredQuery<"public", {
    status: string;
}, Promise<{
    _id: import("convex/values").GenericId<"bookings">;
    _creationTime: number;
    additionalAdults?: {
        fullName: string;
        phoneNumber: string;
    }[];
    children?: {
        fullName: string;
    }[];
    experienceId: import("convex/values").GenericId<"experience">;
    userId: import("convex/values").GenericId<"users">;
    bookingDate: string;
    experienceDate: string;
    adultCount: number;
    childCount: number;
    infantCount: number;
    totalAmount: number;
    status: string;
    primaryGuest: {
        email: string;
        fullName: string;
        confirmEmail: string;
        phoneNumber: string;
    };
    createdAt: string;
}[]>>;
export declare const getBookingById: import("convex/server").RegisteredQuery<"public", {
    bookingId: import("convex/values").GenericId<"bookings">;
}, Promise<{
    _id: import("convex/values").GenericId<"bookings">;
    _creationTime: number;
    additionalAdults?: {
        fullName: string;
        phoneNumber: string;
    }[];
    children?: {
        fullName: string;
    }[];
    experienceId: import("convex/values").GenericId<"experience">;
    userId: import("convex/values").GenericId<"users">;
    bookingDate: string;
    experienceDate: string;
    adultCount: number;
    childCount: number;
    infantCount: number;
    totalAmount: number;
    status: string;
    primaryGuest: {
        email: string;
        fullName: string;
        confirmEmail: string;
        phoneNumber: string;
    };
    createdAt: string;
}>>;
export declare const updateBookingStatus: import("convex/server").RegisteredMutation<"public", {
    status: string;
    bookingId: import("convex/values").GenericId<"bookings">;
}, Promise<{
    success: boolean;
}>>;
export declare const deleteBooking: import("convex/server").RegisteredMutation<"public", {
    bookingId: import("convex/values").GenericId<"bookings">;
}, Promise<{
    success: boolean;
}>>;
export declare const getBookingsWithDetails: import("convex/server").RegisteredQuery<"public", {}, Promise<{
    user: {
        id: import("convex/values").GenericId<"users">;
        name: string;
        email: string;
    };
    experience: {
        id: import("convex/values").GenericId<"experience">;
        title: string;
        price: number;
    };
    _id: import("convex/values").GenericId<"bookings">;
    _creationTime: number;
    additionalAdults?: {
        fullName: string;
        phoneNumber: string;
    }[];
    children?: {
        fullName: string;
    }[];
    experienceId: import("convex/values").GenericId<"experience">;
    userId: import("convex/values").GenericId<"users">;
    bookingDate: string;
    experienceDate: string;
    adultCount: number;
    childCount: number;
    infantCount: number;
    totalAmount: number;
    status: string;
    primaryGuest: {
        email: string;
        fullName: string;
        confirmEmail: string;
        phoneNumber: string;
    };
    createdAt: string;
}[]>>;
//# sourceMappingURL=bookingFunctions.d.ts.map