import { Link } from "react-router-dom";
import { useState } from "react";
import "./Login.css";

function Login({ handleLogin }) {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(data);
  };
  return (
    <>
      <div className="login">
        <p className="login__welcome">Please Login.</p>
        <form className="login__form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            name="username"
            type="text"
            value={data.username}
            onChange={handleChange}
          />

          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            value={data.password}
            onChange={handleChange}
          />

          <div className="login__button-container">
            <button type="submit" className="login__link">
              LOGIN
            </button>
          </div>
        </form>
        <div className="login__signin">
          <p>Dont have acount?</p>
          <Link to="/register" className="register__login-link">
            Register here
          </Link>
        </div>
      </div>
    </>
  );
}

export default Login;
