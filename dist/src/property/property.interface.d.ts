export interface IProperty {
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
}
export interface IPostQuery {
    searchTerm?: string;
    price?: number;
}
//# sourceMappingURL=property.interface.d.ts.map