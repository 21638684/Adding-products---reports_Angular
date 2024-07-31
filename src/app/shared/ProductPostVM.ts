export interface ProductPostVM {
    name: string;
    price: number;
    description: string;
    brandId: number;
    productTypeId: number;
    image: File | null; // Interface can allow for null if image is optional
  }
  