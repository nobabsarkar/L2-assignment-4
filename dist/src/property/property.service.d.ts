import type { RentalStatus } from "../../generated/prisma/enums";
import type { IProperty } from "./property.interface";
export declare const propertySerivce: {
    createPropertyIntoDB: (payload: IProperty, landlordId: string) => Promise<{
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
    }>;
    getAllPropertyFromDB: (query: any) => Promise<({
        landlord: {
            id: string;
            email: string;
            name: string;
            role: import("../../generated/prisma/enums").Role;
            status: import("../../generated/prisma/enums").UserStatus;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
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
    })[]>;
    getSinglePropertyFromDB: (propertyId: string) => Promise<{
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
    }>;
    updatePropertiesLandlordIntoDB: (propertyId: string, landlordId: string, payload: Partial<IProperty>) => Promise<{
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
    }>;
    deletePropertiesLandlordFromDB: (propertyId: string, landlordId: string) => Promise<{
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
    }>;
    landloadGetRentalRequestFromDB: (landlordId: string) => Promise<({
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
        tenant: {
            id: string;
            email: string;
            name: string;
            password: string;
            role: import("../../generated/prisma/enums").Role;
            status: import("../../generated/prisma/enums").UserStatus;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        status: RentalStatus;
    })[]>;
    landlordUpdateRentalRequestStatusIntoDB: (requestId: string, landlordId: string, status: RentalStatus) => Promise<{
        id: string;
        status: RentalStatus;
        tenantId: string;
        propertyId: string;
    }>;
};
//# sourceMappingURL=property.service.d.ts.map