import { productService } from "@/services";

export const getProductById = (id) => {
  return productService.getById(id);
};
