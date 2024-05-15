export default class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json(); //returning the JSON objet in case the res is ok
    }
    console.error(res.status);
    return Promise.reject(`Error:${res.status}`); //returning Error status
  }

  getUserInfo = (token) => {
    // Send a GET request to /users/me
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Specify an authorization header with an appropriately
        // formatted value.
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  };

  //using the GET method to get the items data from the server
  getInitialItem() {
    return fetch(`${this.baseUrl}/items`, {
      method: "GET",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  addNewItem({ name, imageUrl, weather }) {
    return fetch(`${this.baseUrl}/items`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name,
        imageUrl,
        weather,
      }),
    }).then(this._checkResponse);
  }

  deleteItem(id) {
    return fetch(`${this.baseUrl}/items/${id}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._checkResponse);
  }
}
