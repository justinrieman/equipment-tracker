import React from 'react';
import { withRouter } from 'react-router-dom';

const IndividualHeader = (props) => {
  return (
    <div className="category-header">
      <div
        className="category-back"
        onClick={() => {
          props.history.push(`/${props.backRoute}`);
        }}
      >
        <i className="fas fa-angle-double-left"></i>
      </div>
      <h1 className="category-title">{props.title}</h1>
      <div className="category-add"></div>
    </div>
  );
};

export default withRouter(IndividualHeader);
