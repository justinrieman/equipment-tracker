import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

import { connect } from 'react-redux';
import { addJob, getJobs } from '../../redux/actions/jobAction';
import PropTypes from 'prop-types';

const JobForm = (props) => {
  const [user, setUser] = useState('');
  const [jobFormData, setJobFormData] = useState({
    jobName: '',
    jobNumber: '',
    address: '',
  });

  useEffect(() => {
    const token = localStorage.token;
    const decodedToken = jwtDecode(token);
    setUser(decodedToken.userId);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setJobFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const postJob = (e) => {
    e.preventDefault();
    const createdJob = {
      userId: user,
      jobName: jobFormData.jobName,
      jobNumber: jobFormData.jobNumber,
      address: jobFormData.address,
    };

    props.addJob(createdJob);
    props.close();
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <div className="form-close"></div>
        <h1 className="form-title">New Job</h1>
        <div className="form-close" onClick={props.close}>
          <i className="fas fa-times"></i>
        </div>
      </div>

      <form className="form-input-container">
        <label className="form-label" htmlFor="jobName">
          Job Name
        </label>
        <input
          className="form-input"
          type="text"
          name="jobName"
          onChange={handleInputChange}
          value={jobFormData.jobName}
        ></input>
        <label className="form-label" htmlFor="jobNumber">
          Job Number
        </label>
        <input
          className="form-input"
          type="text"
          name="jobNumber"
          onChange={handleInputChange}
          value={jobFormData.jobNumber}
        ></input>
        <label className="form-label" htmlFor="address">
          Address
        </label>
        <input
          className="form-input"
          type="text"
          name="address"
          onChange={handleInputChange}
          value={jobFormData.address}
        ></input>
        <button type="submit" className="form-btn" onClick={postJob}>
          Add Job
        </button>
      </form>
    </div>
  );
};

JobForm.propTypes = {
  getJobs: PropTypes.func.isRequired,
  addJob: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  job: state.job,
});

export default connect(mapStateToProps, { addJob, getJobs })(JobForm);

//JobName
//JobNumber
//Job Address
