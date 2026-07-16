import type { IReview } from "./review.interface";
export declare const reviewService: {
    createReviewIntoDB: (tenantId: string, payload: IReview) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        propertyId: string;
        rating: number;
        comment: string;
    }>;
};
//# sourceMappingURL=review.service.d.ts.map