import { Request } from 'express';
export declare const IMAGE_FIELD_CONFIG: {
    readonly city: {
        readonly single: readonly ["image"];
        readonly array: readonly [];
    };
    readonly experience: {
        readonly single: readonly [];
        readonly array: readonly ["mainImage", "images"];
    };
    readonly review: {
        readonly single: readonly [];
        readonly array: readonly ["images"];
    };
};
export declare const validateImageFields: (entityType: keyof typeof IMAGE_FIELD_CONFIG, body: any) => string[];
export declare const hasImageFiles: (req: Request) => boolean;
export declare const getImageFilesByField: (req: Request, fieldName: string) => Express.Multer.File[];
export declare const cleanupUploadedFiles: (storageIds: string[]) => Promise<void>;
export declare const IMAGE_VALIDATION: {
    maxFileSize: number;
    allowedMimeTypes: string[];
    maxImagesPerArray: number;
};
export declare const validateImageFile: (file: Express.Multer.File) => string | null;
export declare const validateImageFiles: (files: Express.Multer.File[]) => string[];
//# sourceMappingURL=image-utils.d.ts.map