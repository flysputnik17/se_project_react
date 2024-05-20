export default class Auth {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
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
    console.log("email is:", email);
    console.log("password is:", password);
    console.log("username is:", username);
    console.log("avatar is:", avatar);

    return fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ email, password, username, avatar }),
    }).then(this.checkResponse);
  }

  login(email, password) {
    console.log("email", email);
    console.log("password", password);
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
    return fetch(`${this.baseUrl}/signin`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Specify an authorization header with an appropriately
        // formatted value.
        Authorization: `Bearer ${token}`,
      },
    }).then(this.checkResponse);
  }
}
