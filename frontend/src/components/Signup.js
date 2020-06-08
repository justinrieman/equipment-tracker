import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [signupData, setSignupData] = useState({
    company: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    const { name, value } = e.target;

    setSignupData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:5000/users/signup', {
        company: signupData.company,
        email: signupData.email,
        password: signupData.password,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        setErrors(err.response.data);
        console.log(err.response.data);
      });
  };

  return (
    <div className="signup-container">
      <img
        className="logo"
        src={require('../images/logo.png')}
        alt="logo"
      ></img>
      <h1>Sign up</h1>
      <form className="signup-form">
        <label className="signup-label" htmlFor="company">
          Company
          {errors.company && (
            <span className="error-text">{errors.company}</span>
          )}
        </label>
        <input
          type="text"
          name="company"
          className="signup-input"
          onChange={handleInput}
        ></input>
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
        <button className="signup-btn" type="submit" onClick={handleSubmit}>
          Sign up
        </button>
        <div className="signup-message">
          <p>Already registered?</p>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
