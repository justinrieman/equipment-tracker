import React, { useState } from 'react';

const Login = () => {
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

  return (
    <div>
      <h1>Login</h1>
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
      <button type="submit">Submit</button>
    </div>
  );
};

export default Login;
