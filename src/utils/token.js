const TOKEN_KEY = "jwt";

// setToken accepts the token as an argument, and adds it to
// with localStorage the key TOKEN_KEY.
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);

// getToken retrieves and returns the value associated with
// TOKEN_KEY from localStorage.
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

//removeToken remove the token form the localStorage
//so when this function will be called on the logout the token will be removed
//and the next time the user viset the site the user will need to make a login
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};