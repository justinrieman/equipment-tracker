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

    setJob(jobs.filter((job) => job._id === jobId)[0]);
    setJobEquipment(equipment.filter((item) => item.equipLocationId === jobId));

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
        <h1>Equipment</h1>
        <div className="individual-job-list">
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
              />
            );
          })}
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
