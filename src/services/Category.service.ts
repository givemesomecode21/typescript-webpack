import { BaseService } from './Base.service';

class CategoryService extends BaseService {

  constructor(){
    super('category')
  }
}
export const categoryService = new CategoryService();
