export declare const rentalRequestService: {
    createRentalRequestIntoDB: (tenantId: string, propertyId: string) => Promise<{
        rentalRequest: {
            id: string;
            status: import("../../generated/prisma/enums").RentalStatus;
            tenantId: string;
            propertyId: string;
        };
    }>;
    getAllRentalsRequestFromDB: (tenantId: string) => Promise<({
        property: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string;
            location: string;
            price: number;
            bedrooms: number;
            bathrooms: number;
            amenities: string[];
            images: string[];
            landlordId: string;
            categoryId: string;
        };
    } & {
        id: string;
        status: import("../../generated/prisma/enums").RentalStatus;
        tenantId: string;
    })[]>;
    getSingleRentalsRequestFromDB: (tenantId: string, rentalId: string) => Promise<{
        property: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string;
            location: string;
            price: number;
            bedrooms: number;
            bathrooms: number;
            amenities: string[];
            images: string[];
            landlordId: string;
            categoryId: string;
        };
    } & {
        id: string;
        status: import("../../generated/prisma/enums").RentalStatus;
        tenantId: string;
    }>;
};
//# sourceMappingURL=rentalRequest.service.d.ts.map