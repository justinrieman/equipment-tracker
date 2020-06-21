import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';

let token;

const Home = (props) => {
  if (localStorage.getItem('token')) {
    token = jwtDecode(localStorage.getItem('token'));
  }

  const [isOpen, setIsOpen] = useState(false);

  const signOut = () => {
    localStorage.removeItem('token');
    props.history.push('/login');
  };

  return (
    <div>
      <div
        style={
          isOpen === false
            ? { transform: 'translateX(-100%)' }
            : { transform: 'translateX(0)' }
        }
        className="sign-out"
      >
        <button onClick={signOut}>Sign Out</button>
      </div>
      <div className="category-header">
        <div className="category-back"></div>
        <h1 className="category-title">{token && token.company}</h1>
        <div className="category-add" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <i className="fas fa-times"></i>
          ) : (
            <i className="fas fa-sign-out-alt"></i>
          )}
        </div>
      </div>
      <div className="categories">
        <div
          className="category-box"
          onClick={() => {
            props.history.push('/equipment');
          }}
        >
          <i className="fas fa-snowplow"></i>
          &nbsp; EQUIPMENT
        </div>
        <div
          className="category-box"
          onClick={() => {
            props.history.push('/jobs');
          }}
        >
          <i className="fas fa-globe-americas"></i>
          &nbsp; JOBS
        </div>
      </div>
    </div>
  );
};

export default Home;
