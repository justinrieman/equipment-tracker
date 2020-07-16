import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import CategoryHeader from '../CategoryHeader';
import EquipmentLabel from '../equipment/EquipmentLabel';
import JobEditForm from './JobEditForm';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Job = (props) => {
  const [job, setJob] = useState({});
  const [jobEquipment, setJobEquipment] = useState([]);

  const jobId = props.match.params.id;
  const { jobs } = props.job;
  const { equipment } = props.equipment;

  useEffect(() => {
    // If user refreshes page
    if (jobs.length === 0) {
      props.history.push('/jobs');
    }

    let job = jobs.filter((job) => job._id === jobId)[0];

    setJob(job);
    setJobEquipment(equipment.filter((item) => item.equipLocationId === jobId));

    // This is for when a user deletes the equipment and hits the back button
    // so in CategoryHeader the props.history.goBack() doesn't return to this page
    if (!job) {
      props.history.push('/');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobs]);

  return (
    <div>
      <CategoryHeader
        title={job.jobName}
        backRoute="/jobs"
        icon="fas fa-pen-square"
        form={<JobEditForm jobId={jobId} />}
      />

      <div className="job-body">
        <h1 className="job-page-title">Job Info</h1>
        <div className="job-info-section">
          <div className="equip-page-table job-table">
            <div className="table-section">
              <h2 className="table-label">Job Name</h2>
              <h2 className="table-value">{job.jobName}</h2>
            </div>
            <div className="table-section">
              <h2 className="table-label">Job Number</h2>
              <h2 className="table-value">{job.jobNumber}</h2>
            </div>
            <div className="table-section">
              <h2 className="table-label">Address</h2>
              <h2 className="table-value">{job.address}</h2>
            </div>
          </div>
        </div>
        <h1 className="job-page-title">Equipment</h1>
        <div className="equip-list">
          {jobEquipment.map((item) => {
            return (
              <EquipmentLabel
                key={item._id}
                id={item._id}
                brand={item.equipBrand}
                model={item.equipModel}
                jobLocation={item.equipLocation}
                img={'http://localhost:5000/' + item.equipImage}
                available={item.available}
                needsMaintenance={item.needsMaintenance}
              />
            );
          })}
          <div className="equip-filler"></div>
        </div>
      </div>
    </div>
  );
};

Job.propTypes = {
  job: PropTypes.object.isRequired,
  equipment: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  job: state.job,
  equipment: state.equipment,
});

export default connect(mapStateToProps)(withRouter(Job));
