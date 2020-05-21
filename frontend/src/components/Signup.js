import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  const emailHandler = (e) => {
    const emailValue = e.target.value;
    console.log(emailValue);

    setEnteredEmail(emailValue);
  };

  const passwordHandler = (e) => {
    const passwordValue = e.target.value;
    console.log(passwordValue);
    setEnteredPassword(passwordValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(enteredEmail, enteredPassword);

    axios
      .post('http://localhost:5000/users/signup', {
        email: enteredEmail,
        password: enteredPassword,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log('Theres an error: ' + error);
      });
  };

  return (
    <div>
      <h1>Signup</h1>
      <label htmlFor="email">Email:</label>
      <input
        type="text"
        name="email"
        onChange={emailHandler}
        value={enteredEmail}
      ></input>
      <label htmlFor="password">Password:</label>
      <input
        type="text"
        name="password"
        onChange={passwordHandler}
        value={enteredPassword}
      ></input>
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default Signup;
