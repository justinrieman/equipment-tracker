import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = (props) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    const { name, value } = e.target;

    setLoginData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:5000/users/login', {
        email: loginData.email,
        password: loginData.password,
      })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        props.history.push('/');
      })
      .catch((err) => {
        setErrors(err.response.data);
        console.log(err.response.data);
      });
  };

  return (
    <div className="signup-container">
      <img className="logo" src={require('../images/logo.png')}></img>
      <h1>Log in</h1>
      <form className="signup-form">
        <label className="signup-label" htmlFor="email">
          Email
          {errors.email && <span className="error-text">{errors.email}</span>}
        </label>
        <input
          type="text"
          name="email"
          className="signup-input"
          onChange={handleInput}
        ></input>
        <label className="signup-label" htmlFor="password">
          Password
          {errors.password && (
            <span className="error-text">{errors.password}</span>
          )}
        </label>
        <input
          type="password"
          name="password"
          className="signup-input"
          onChange={handleInput}
        ></input>
        {errors.message && <p className="error-text">{errors.message}</p>}
        <button className="signup-btn" type="submit" onClick={handleSubmit}>
          Log in
        </button>
        <div className="signup-message">
          <p>Not registered?</p>
          <Link to="/signup">Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
