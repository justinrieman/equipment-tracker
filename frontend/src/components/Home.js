import React from 'react';

const Home = (props) => {
  return (
    <div>
      <div className="categories-header">
        <h1 className="categories-title">Severino Construction</h1>
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
