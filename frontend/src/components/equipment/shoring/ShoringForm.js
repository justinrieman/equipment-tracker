import React from 'react';

const ShoringForm = (props) => {
  return (
    <div className="form-container">
      <div className="form-header">
        <div className="form-close"></div>
        <h1 className="form-title">New Shoring</h1>
        <div className="form-close" onClick={props.close}>
          <i className="fas fa-times"></i>
        </div>
      </div>

      <div className="form-input-container">
        <label className="form-label" htmlFor="brand">
          Brand
        </label>
        <input className="form-input" type="text" name="brand"></input>
        <label className="form-label" htmlFor="model">
          Model
        </label>
        <input className="form-input" type="text" name="model"></input>

        <button className="form-btn">Add Shoring</button>
      </div>
    </div>
  );
};

export default ShoringForm;
