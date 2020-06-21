import React, { useEffect } from 'react';
import JobLabel from './JobLabel';
import JobForm from './JobForm';
import CategoryHeader from '../CategoryHeader';

import { connect } from 'react-redux';
import { getJobs } from '../../redux/actions/jobAction';
import { setUser } from '../../redux/actions/userAction';
import { getEquipment } from '../../redux/actions/equipmentAction';
import PropTypes from 'prop-types';

const token = localStorage.getItem('token');

const JobList = (props) => {
  const { jobs } = props.job;
  const { user } = props.user;

  useEffect(() => {
    // this will make a call to the database only if page was reloaded
    if (!user) {
      props.setUser(token);
      props.getJobs();
      props.getEquipment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <CategoryHeader
        title="Jobs"
        backRoute="/"
        icon="fas fa-plus"
        form={<JobForm />}
      />
      <div className="job-list">
        {jobs.map((job) => {
          return (
            <JobLabel
              key={job._id}
              id={job._id}
              jobName={job.jobName}
              jobNumber={job.jobNumber}
            />
          );
        })}
      </div>
    </div>
  );
};

JobList.propTypes = {
  job: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  equipment: PropTypes.object.isRequired,
  getJobs: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  getEquipment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  job: state.job,
  user: state.user,
  equipment: state.equipment,
});

export default connect(mapStateToProps, { setUser, getJobs, getEquipment })(
  JobList
);
