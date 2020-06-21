import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// TEST
import { connect } from 'react-redux';
import { getJobs } from '../redux/actions/jobAction';
import { getEquipment } from '../redux/actions/equipmentAction';
import { setUser } from '../redux/actions/userAction';
import PropTypes from 'prop-types';
// TEST

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
        const token = response.data.token;
        localStorage.setItem('token', token);

        props.setUser(token);
        props.getJobs();
        props.getEquipment();

        props.history.push('/');
      })
      .catch((err) => {
        setErrors(err.response.data);
      });
  };

  return (
    <div className="signup-container">
      <img
        className="logo"
        src={require('../images/logo.png')}
        alt="logo"
      ></img>
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

//TEST
Login.propTypes = {
  setUser: PropTypes.func.isRequired,
  getJobs: PropTypes.func.isRequired,
  getEquipment: PropTypes.func.isRequired,
  job: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  job: state.job,
  user: state.user,
  equipment: state.equipment,
});
//TEST

export default connect(mapStateToProps, { setUser, getJobs, getEquipment })(
  Login
);
