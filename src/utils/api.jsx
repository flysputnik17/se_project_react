export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://se-project-express-alpha.vercel.app"
    : "http://localhost:3001";

export default class Api {
  constructor({ headers }) {
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
    const jwt = localStorage.getItem("jwt");
    return fetch(`${this.baseUrl}/items`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then(this.checkResponse);
  }

  addNewItem({ name, imageUrl, weather }) {
    const jwt = localStorage.getItem("jwt");
    return fetch(`${this.baseUrl}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        name,
        imageUrl,
        weather,
      }),
    }).then(this.checkResponse);
  }

  deleteItem(id) {
    const jwt = localStorage.getItem("jwt");
    return fetch(`${this.baseUrl}/items/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then(this.checkResponse);
  }

  addCardLike(cardId) {
    const jwt = localStorage.getItem("jwt");
    return fetch(`${this.baseUrl}/items/${cardId}/likes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then(this.checkResponse);
  }

  removeCardLike(cardId) {
    const jwt = localStorage.getItem("jwt");
    return fetch(`${this.baseUrl}/items/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then(this.checkResponse);
  }
}
