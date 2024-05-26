export default class Auth {
  constructor({ headers }) {
    this.baseUrl = "http://localhost:3001";
    this.headers = headers;
  }

  checkResponse(res) {
    if (res.ok) {
      return res.json(); //returning the JSON objet in case the res is ok
    }
    console.error(res.status);
    return Promise.reject(`Error:${res.status}`); //returning Error status
  }

  register({ email, password, name, avatar }) {
    return fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ email, password, name, avatar }),
    }).then(this.checkResponse);
  }

  login({ email, password }) {
    return fetch(`${this.baseUrl}/signin`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ email, password }),
    }).then(this.checkResponse);
  }

  edit({ name, avatar }, token) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, avatar }),
    }).then(this.checkResponse);
  }

  getUserInfo(jwt) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
    }).then(this.checkResponse);
  }
}
