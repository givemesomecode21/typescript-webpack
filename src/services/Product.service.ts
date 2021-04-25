import { fetchWrapper } from "@/helpers";
import { BaseService } from "./Base.service";

class ProductService extends BaseService {
  constructor() {
    super("products");
  }

  filterProducts(params) {
    return fetchWrapper.post(`${this.baseUrl}/filterProducts`, params);
  }
}
export const productService = new ProductService();
