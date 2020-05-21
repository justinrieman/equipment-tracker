import React from 'react';

const JobLabel = ({ jobName, jobNumber }) => {
  return (
    <div className="job-label">
      <div className="job-header">
        <h5 className="job-name">{jobName}</h5>
        <h5 className="job-number">{jobNumber}</h5>
      </div>
    </div>
  );
};

export default JobLabel;
