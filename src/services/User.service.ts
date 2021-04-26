import { User } from 'models';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_URL } from '@/constants';
import { fetchWrapper } from '@/helpers';

export class UserService {

  private baseUrl: string;

  private userSubject: BehaviorSubject<any>;

  private refreshTokenTimeout: any;

  public get userValue(): User { return this.userSubject.value }
  public get user() { return this.userSubject.asObservable() }

  constructor() {
    this.baseUrl = `${API_URL}/accounts`;
    this.userSubject = new BehaviorSubject(null);
  }

  login(email, password) {
    return fetchWrapper.post(`${this.baseUrl}/authenticate`, { email, password })
      .then(user => {
        this.userSubject.next(user);
        this.startRefreshTokenTimer();
        return user;
      });
  }

  logout() {
    fetchWrapper.post(`${this.baseUrl}/revoke-token`, {});
    this.stopRefreshTokenTimer();
    this.userSubject.next(null);

  }

  refreshToken() {
    return fetchWrapper.post(`${this.baseUrl}/refresh-token`, {})
      .then(user => {
        // publish user to subscribers and start timer to refresh token
        this.userSubject.next(user);
        this.startRefreshTokenTimer();
        return user;
      });
  }

  register(params) {
    return fetchWrapper.post(`${this.baseUrl}/register`, params);
  }

  verifyEmail(token) {
    return fetchWrapper.post(`${this.baseUrl}/verify-email`, { token });
  }

  forgotPassword(email) {
    return fetchWrapper.post(`${this.baseUrl}/forgot-password`, { email });
  }

  validateResetToken(token) {
    return fetchWrapper.post(`${this.baseUrl}/validate-reset-token`, { token });
  }

  resetPassword({ token, password, confirmPassword }) {
    return fetchWrapper.post(`${this.baseUrl}/reset-password`, { token, password, confirmPassword });
  }

  getAll() {
    return fetchWrapper.get(this.baseUrl);
  }

  getById(id) {
    return fetchWrapper.get(`${this.baseUrl}/${id}`);
  }

  search(params) {
    return fetchWrapper.post(`${this.baseUrl}/search`, params);
  }

  create(params) {
    return fetchWrapper.post(this.baseUrl, params);
  }

  update(id, params) {
    return fetchWrapper.put(`${this.baseUrl}/${id}`, params)
      .then(user => {
        // update stored user if the logged in user updated their own record
        if (user.id === this.userSubject.value.id) {
          // publish updated user to subscribers
          user = { ...this.userSubject.value, ...user };
          this.userSubject.next(user);
        }
        return user;
      });
  }

  // prefixed with underscore because 'delete' is a reserved word in javascript
  delete(id) {
    return fetchWrapper.delete(`${this.baseUrl}/${id}`)
      .then(x => {
        // auto logout if the logged in user deleted their own record
        if (id === this.userSubject.value.id) {
          this.logout();
        }
        return x;
      });
  }

  // helper functions

  startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(this.userSubject.value.jwtToken.split('.')[1]));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
  }

  stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}

export const userService = new UserService();
