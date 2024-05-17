// Specify the BASE_URL for the API.
import Api from "./api.jsx";

export const baseUrl = "http://localhost:3001";

// The register function accepts the necessary data as arguments,
// and sends a POST request to the given endpoint.
export const register = ({ email, password, username, avatar }) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, username, avatar }),
  }).then(Api.checkResponse);
};

// The authorize function accepts the necessary data as parameters.
export const login = (email, password) => {
  console.log("email", email);
  console.log("password", password);
  // A POST request is sent to /auth/local.
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    // The parameters are wrapped in an object, converted to a JSON
    // string, and sent in the body of the request.
    body: JSON.stringify({ email, password }),
  }).then(Api.checkResponse);
};

export const getUserInfo = (token) => {
  // Send a GET request to /users/me
  return fetch(`${baseUrl}/signin`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Specify an authorization header with an appropriately
      // formatted value.
      Authorization: `Bearer ${token}`,
    },
  }).then(Api.checkResponse);
};
