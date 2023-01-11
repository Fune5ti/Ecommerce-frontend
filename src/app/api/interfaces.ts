export interface PurchaseResponse {
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
  products: Product[];
  total_price: number;
  total_price_wt_discount: number;
  total_value_of_discount: number;
  client: Client;
}

export interface Client {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  cpf: string;
}

export interface Product {
  id: number;
  created_at: Date;
  updated_at: Date;
  name: string;
  description: string;
  keyword: string;
  price: string;
  discount: string;
  material: string;
  department: string;
  suplier: string;
  hasDiscount: boolean;
  suplier_id: string;
  pivot: Pivot;
}

export interface Pivot {
  purchase_id: number;
  product_id: number;
}
export interface PaginationResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}

export interface Product {
  id: number;
  created_at: Date;
  updated_at: Date;
  name: string;
  description: string;
  keyword: string;
  price: string;
  discount: string;
  material: string;
  department: string;
  suplier: string;
  hasDiscount: boolean;
  suplier_id: string;
  images: Image[];
}

export interface Image {
  path: string;
}

export enum Suplier {
  BrazilianProvider = "brazilian_provider",
  EuropeanProvider = "european_provider",
}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}
