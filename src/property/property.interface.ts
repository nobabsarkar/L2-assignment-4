export interface IProperty {
  title: string;
  description: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  images: string[];

  categoryId: string;
  landlordId: string;
}

export interface IPostQuery {
  searchTerm?: string;
  price?: number;
}
