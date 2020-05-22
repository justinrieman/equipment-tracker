import React from 'react';

const JobForm = (props) => {
  return (
    <div className="form-container">
      <div className="form-header">
        <div className="form-close"></div>
        <h1 className="form-title">New Job</h1>
        <div className="form-close" onClick={props.close}>
          <i className="fas fa-times"></i>
        </div>
      </div>

      <div className="form-input-container">
        <label className="form-label" htmlFor="jobname">
          Job Name
        </label>
        <input className="form-input" type="text" name="jobname"></input>
        <label className="form-label" htmlFor="jobnumber">
          Job Number
        </label>
        <input className="form-input" type="text" name="jobnumber"></input>
        <label className="form-label" htmlFor="jobaddress">
          Address
        </label>
        <input className="form-input" type="text" name="jobaddress"></input>
        <button className="form-btn">Add Job</button>
      </div>
    </div>
  );
};

export default JobForm;

//JobName
//JobNumber
//Job Address
