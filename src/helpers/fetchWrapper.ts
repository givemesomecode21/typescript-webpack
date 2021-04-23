import { User } from '@/models';
import { API_URL } from '@/constants';
import { userService } from '@/services';

class FetchWrapper {

  get(url: string) {

    const requestOptions: any = {
      method: 'GET',
      headers: this.authHeader(url)
    };
    return fetch(url, requestOptions).then(this.handleResponse);
  }

  post(url: string, body) {
    const requestOptions: any = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...this.authHeader(url) },
      credentials: 'include',
      body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(this.handleResponse);
  }

  put(url: string, body) {

    const requestOptions: any = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...this.authHeader(url) },
      body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(this.handleResponse);
  }

  // prefixed with underscored because delete is a reserved word in javascript
  delete(url: string) {

    const requestOptions: any = {
      method: 'DELETE',
      headers: this.authHeader(url)
    };
    return fetch(url, requestOptions).then(this.handleResponse);
  }

  upload(url: string, formData = {}) {
    const requestOptions: any = {
      method: 'POST',
      headers: this.authHeader(url),
      body: formData,
    };
    return fetch(url, requestOptions).then(this.handleResponse);

  }

  // helper functions

  authHeader(url: string) {
    // return auth header with jwt if user is logged in and request is to the api url
    const user: User = userService.userValue;
    const isLoggedIn = user && user.jwtToken;
    const isApiUrl = url.startsWith(API_URL);
    if (isLoggedIn && isApiUrl) {
      return { Authorization: `Bearer ${user.jwtToken}` };
    } else {
      return {};
    }
  }

  handleResponse(response) {
    return response.text().then(text => {
      const data = text && JSON.parse(text);

      if (!response.ok) {
        if ([401, 403].includes(response.status) && userService.userValue) {
          // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
          userService.logout();
        }

        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }

      return data;
    });
  }
}

export const fetchWrapper = new FetchWrapper();