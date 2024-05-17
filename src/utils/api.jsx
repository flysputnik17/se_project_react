export default class Api {
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

  //using the GET method to get the items data from the server
  getInitialItem() {
    return fetch(`${this.baseUrl}/items`, {
      method: "GET",
      headers: this.headers,
    }).then(this.checkResponse);
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
    }).then(this.checkResponse);
  }

  deleteItem(id) {
    return fetch(`${this.baseUrl}/items/${id}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this.checkResponse);
  }
}
