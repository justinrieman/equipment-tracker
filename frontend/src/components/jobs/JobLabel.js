import React from 'react';
import { withRouter } from 'react-router-dom';

const JobLabel = (props) => {
  return (
    <div
      className="job-label"
      onClick={() => props.history.push(`/jobs/${props.id}`)}
    >
      <div className="job-header">
        <h5 className="job-name">{props.jobName}</h5>
        <h5 className="job-number">{props.jobNumber}</h5>
      </div>
    </div>
  );
};

export default withRouter(JobLabel);
