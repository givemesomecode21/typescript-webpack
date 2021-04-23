import { BaseService } from './Base.service';

class ProductService extends BaseService {

  constructor() {
    super('products');
  }
}
export const productService = new ProductService();
