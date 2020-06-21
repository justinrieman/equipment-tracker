import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { updateJob, deleteJob } from '../../redux/actions/jobAction';
import PropTypes from 'prop-types';

const JobEditForm = (props) => {
  const { user } = props.user;
  const { jobs } = props.job;

  const [jobFormData, setJobFormData] = useState({
    jobName: '',
    jobNumber: '',
    address: '',
  });

  useEffect(() => {
    let selectedJob = jobs.filter((job) => job._id === props.jobId)[0];
    setJobFormData({
      jobName: selectedJob.jobName,
      jobNumber: selectedJob.jobNumber,
      address: selectedJob.address,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const updatedJob = {
      userId: user,
      jobName: jobFormData.jobName,
      jobNumber: jobFormData.jobNumber,
      address: jobFormData.address,
    };

    props.updateJob(props.jobId, updatedJob);
    props.close();
  };

  const handleDelete = () => {
    props.deleteJob(props.jobId);
    props.history.push('/jobs');
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <div className="form-close"></div>
        <h1 className="form-title">Edit Job</h1>
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
          disabled
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
        <div className="form-btn-group">
          <button
            type="submit"
            className="form-btn form-btn-delete"
            onClick={() =>
              window.confirm('Are you sure you want to delete?')
                ? handleDelete()
                : null
            }
          >
            Delete Job
          </button>
          <button type="submit" className="form-btn" onClick={postJob}>
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

JobEditForm.propTypes = {
  updateJob: PropTypes.func.isRequired,
  deleteJob: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  job: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  job: state.job,
});

export default connect(mapStateToProps, { updateJob, deleteJob })(
  withRouter(JobEditForm)
);
