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

  register({ email, password, username, avatar }) {
    return fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ email, password, username, avatar }),
    }).then(this.checkResponse);
  }

  login({ email, password }) {
    // A POST request is sent to /auth/local.
    return fetch(`${this.baseUrl}/signin`, {
      method: "POST",
      headers: this.headers,
      // The parameters are wrapped in an object, converted to a JSON
      // string, and sent in the body of the request.
      body: JSON.stringify({ email, password }),
    }).then(this.checkResponse);
  }

  getUserInfo(token) {
    // Send a GET request to /users/me
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then(this.checkResponse);
  }
}
