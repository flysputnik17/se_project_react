const JWT_SECRET = "jwt";

// setToken accepts the token as an argument, and adds it to
// with localStorage the key JWT_SECRET.
export const setToken = (token) => localStorage.setItem(JWT_SECRET, token);

// getToken retrieves and returns the value associated with
// JWT_SECRET from localStorage.
export const getToken = () => {
  return localStorage.getItem(JWT_SECRET);
};

//removeToken remove the token form the localStorage
//so when this function will be called on the logout the token will be removed
//and the next time the user viset the site the user will need to make a login
export const removeToken = () => {
  localStorage.removeItem(JWT_SECRET);
};
