import { BaseService } from "./Base.service";

class PaymentMethodService extends BaseService {
  constructor() {
    super('paymentMethod')
  }
}

export const paymentMethodService = new PaymentMethodService();
