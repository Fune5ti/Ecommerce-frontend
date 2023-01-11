import { Product } from "../app/api/Product";

export function computePriceWithDiscount(product: Product) {
  if (product.hasDiscount) {
    return parseFloat(product.price) - computeProductDiscount(product);
  }
  return parseFloat(product.price);
}

export function computeProductDiscount(product: Product) {
  return parseFloat(product.price) * parseFloat(product.discount);
}
