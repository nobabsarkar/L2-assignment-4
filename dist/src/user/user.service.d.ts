import type { RegisterUser } from "./user.interface";
import { Role, UserStatus } from "../../generated/prisma/enums";
export declare const userSerivce: {
    registerUserIntoDB: (payload: RegisterUser) => Promise<({
        profile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            profilePhoto: string | null;
            phoneNumber: string | null;
            userId: string;
        } | null;
    } & {
        id: string;
        email: string;
        name: string;
        role: Role;
        status: UserStatus;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    getMyProfileFromDB: (userId: string) => Promise<{
        profile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            profilePhoto: string | null;
            phoneNumber: string | null;
            userId: string;
        } | null;
    } & {
        id: string;
        email: string;
        name: string;
        role: Role;
        status: UserStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllUsersFromDB: () => Promise<({
        profile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            profilePhoto: string | null;
            phoneNumber: string | null;
            userId: string;
        } | null;
    } & {
        id: string;
        email: string;
        name: string;
        role: Role;
        status: UserStatus;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    updateUserStatusIntoDB: (adminId: string, userId: string, status: UserStatus) => Promise<{
        id: string;
        email: string;
        name: string;
        password: string;
        role: Role;
        status: UserStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllPropertiesFromDB: () => Promise<{
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
    }[]>;
    getAllRentalsRequestFromDB: () => Promise<({
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
            role: Role;
            status: UserStatus;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        status: import("../../generated/prisma/enums").RentalStatus;
        tenantId: string;
    })[]>;
};
//# sourceMappingURL=user.service.d.ts.map