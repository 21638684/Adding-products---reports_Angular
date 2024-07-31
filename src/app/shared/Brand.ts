export interface Brand {
    brandId: number;
    name: string;
    description?: string; // Optional since it can be null in the API response
    dateCreated?: Date; // Optional since it can be null in the API response
    dateModified?: Date; // Optional since it can be null in the API response
    isActive: boolean;
    isDeleted: boolean;
  }
  