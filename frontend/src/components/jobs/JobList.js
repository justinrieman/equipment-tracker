import React from 'react';
import JobLabel from './JobLabel';
import JobForm from './JobForm';
import CategoryHeader from '../CategoryHeader';

const JobList = () => {
  const jobs = [
    {
      jobName: 'Tiffin Pointe',
      jobNumber: '#2009',
    },
    {
      jobName: 'Ashtabula Chemicals',
      jobNumber: '#2478',
    },
    {
      jobName: 'Shop',
      jobNumber: '#0000',
    },
    {
      jobName: 'Ashtabula Chemicals',
      jobNumber: '#2478',
    },
    {
      jobName: 'Shop',
      jobNumber: '#0000',
    },
    {
      jobName: 'Ashtabula Chemicals',
      jobNumber: '#2478',
    },
    {
      jobName: 'Shop',
      jobNumber: '#0000',
    },
  ];

  return (
    <div>
      <CategoryHeader title="Jobs" backRoute="/" form={<JobForm />} />
      <div className="job-list">
        {jobs.map((job) => {
          return <JobLabel jobName={job.jobName} jobNumber={job.jobNumber} />;
        })}
      </div>
    </div>
  );
};

export default JobList;
