import { RentalStatus } from "../../generated/prisma/enums";
export declare const paymentService: {
    initiatePaymentIntoDB: (rentalRequestId: string, tenantId: string) => Promise<any>;
    validatePayment: (propertyId: string, tranId: string, status: string, payload: Record<string, unknown>) => Promise<string>;
    getMyPaymentsFromDB: (tenantId: string) => Promise<({
        rentalRequest: {
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
            status: RentalStatus;
            tenantId: string;
            propertyId: string;
        };
    } & {
        id: string;
        status: import("../../generated/prisma/enums").PaymentStatus;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        transactionId: string;
        amount: number;
        paidAt: Date | null;
        rentalRequestId: string;
    })[]>;
    getSinglePaymentsFromDB: (paymentId: string) => Promise<{
        id: string;
        status: import("../../generated/prisma/enums").PaymentStatus;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        transactionId: string;
        amount: number;
        paidAt: Date | null;
        rentalRequestId: string;
    } | null>;
};
//# sourceMappingURL=payment.service.d.ts.map