import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import IndividualHeader from '.././IndividualHeader';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Job = (props) => {
  const [job, setJob] = useState({});
  const jobId = props.match.params.id;
  const { jobs } = props.job;

  useEffect(() => {
    setJob(jobs.filter((job) => job._id === jobId)[0]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <IndividualHeader title={job.jobName} backRoute="jobs" />

      <div className="job-body">
        <h1>Equipment</h1>
        <div className="equip-label">
          <div className="equip-img">
            <img
              src="https://cdn.ironpla.net/i/1935/235/1935235_3742_159_0001.jpg"
              alt=""
            ></img>
          </div>

          <div className="equip-text">
            <div className="equip-header">
              <h5 className="equip-brand">Bobcat</h5>
              <h5 className="equip-model">T590</h5>
            </div>
            <div className="equip-location">
              <h5>Location:</h5>
              <h5>Tiffin Pointe</h5>
            </div>
          </div>
        </div>
        <div className="equip-label">
          <div className="equip-img">
            <img
              src="https://images-na.ssl-images-amazon.com/images/I/613METIImuL._AC_SY355_.jpg"
              alt=""
            ></img>
          </div>

          <div className="equip-text">
            <div className="equip-header">
              <h5 className="equip-brand">Air Compressor #117</h5>
              <h5 className="equip-model">&nbsp;</h5>
            </div>
            <div className="equip-location">
              <h5>Location:</h5>
              <h5>Tiffin Pointe</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Job.propTypes = {
  job: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  job: state.job,
});

export default connect(mapStateToProps)(withRouter(Job));
