import { Product } from "../../api/interfaces";

export interface CartItem {
  product: Product;
  quantity: number;
}
