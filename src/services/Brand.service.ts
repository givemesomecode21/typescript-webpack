import { BaseService } from './Base.service';

export class BrandService extends BaseService {
  constructor() {
    super('brand');
  }
}

export const brandService = new BrandService();