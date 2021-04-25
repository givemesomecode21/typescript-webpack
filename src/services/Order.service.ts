import { fetchWrapper } from "./../helpers/fetchWrapper";
import { BaseService } from "./Base.service";

class OrderService extends BaseService {
  constructor() {
    super("orders");
  }

  changeStatus(param) {
    return fetchWrapper.post(`${this.baseUrl}/changeStatus`, param);
  }
  getTotalCountNewOrder() {
    return fetchWrapper.get(`${this.baseUrl}/getTotalCountNewOrder`);
  }
}
export const orderService = new OrderService();
