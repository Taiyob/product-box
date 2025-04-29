export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Meta {
  barcode: string;
  qrCode: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  tags: string[];
  availabilityStatus: string;
  shippingInformation: string;
  sku: string;
  minimumOrderQuantity: number;
  dimensions: Dimensions;
  meta: Meta;
  returnPolicy: string;
  reviews: Review[];
}

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export type CategoryList = string[];

export interface ProductFormValues {
  title: string;
  brand: string;
  category: string;
  price: number;
  stock?: number;
  discountPercentage?: number;
  availabilityStatus?: string;
  sku?: string;
  minimumOrderQuantity?: number;
  shippingInformation?: string;
  returnPolicy?: string;
  description?: string;
  tags?: string[];
  reviews?: {
    reviewerName: string;
    reviewerEmail: string;
    rating: number;
    comment: string;
  }[];
}
