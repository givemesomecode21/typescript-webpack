import { fetchWrapper } from '../helpers';
import { API_URL } from '../constants';

export class BaseService {
  baseUrl!: string;

  constructor(
    public url: string
  ) {
    this.baseUrl = `${API_URL}/${url}`;
  }

  getAll() {
    return fetchWrapper.get(this.baseUrl);
  }

  search(params) {
    return fetchWrapper.post(`${this.baseUrl}/search`, params);
  }

  getById(id) {
    return fetchWrapper.get(`${this.baseUrl}/${id}`);
  }

  create(params) {
    return fetchWrapper.post(this.baseUrl, params);
  }

  update(id, params) {
    return fetchWrapper.put(`${this.baseUrl}/${id}`, params);
  }

  delete(id) {
    return fetchWrapper.delete(`${this.baseUrl}/${id}`);
  }
}
