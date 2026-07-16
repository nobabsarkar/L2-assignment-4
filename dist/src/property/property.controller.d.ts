import type { Request, Response } from "express";
export declare const propertyController: {
    createProperty: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getAllProperty: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getSingleProperty: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    updatePropertiesLandlord: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    deletePropertiesLandlord: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    landlordGetRentalRequest: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    landlordUpdateRentalRequestStatus: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
};
//# sourceMappingURL=property.controller.d.ts.map