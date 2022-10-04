import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { loginRoute, verifyTokenRoute } from "../../utils/APIRoutes";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const navigate = useNavigate();

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      console.log(data, 'data')
      if (data.success === false) {
        toast.error(data.message, toastOptions);
      }
      if (data.success === true) {
        localStorage.setItem(
          'accessToken', data.tokens.accessToken
        );

        localStorage.setItem(
          'user', JSON.stringify(data.user)
        );
        navigate("/");
      }
    }
  };

  const handleValidation = () => {
    const { password, username } = values;
    if (username === '') {
      toast.error(
        "Username cant be empty.",
        toastOptions
      );
      return false;
    }
    if (password === '') {
      toast.error(
        "Password cant be empty.",
        toastOptions
      );
      return false;
    }
    return true;
  };
  return (
    <>
      <div className="loginOuterContainer">
        <div className="loginInnerContainer">
          <h1 className="heading">Login</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                placeholder="Username"
                className="loginInput"
                type="text"
                onChange={handleChange}
                name="username"
              />
            </div>
            <div>
              <input
                placeholder="Password"
                className="loginInput"
                type="text"
                onChange={handleChange}
                name="password"
              />
            </div>
            <button className="button mt-20">LOG IN</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
