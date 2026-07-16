import type { TCategory } from "./category.interface";
export declare const categoryService: {
    createCategoryIntoDB: (payload: TCategory) => Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllCategories: () => Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
};
//# sourceMappingURL=category.service.d.ts.map