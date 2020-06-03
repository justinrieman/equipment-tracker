import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobLabel from './JobLabel';
import JobForm from './JobForm';
import CategoryHeader from '../CategoryHeader';

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  async function fetchData() {
    const result = await axios({
      url: 'http://localhost:5000/jobs',
      method: 'GET',
      headers: {
        user: 'idk',
      },
    });

    setJobs(result.data.jobs);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const viewJob = () => {
    console.log('hello');
  };

  return (
    <div>
      <CategoryHeader
        title="Jobs"
        backRoute="/"
        form={<JobForm fetchData={fetchData} />}
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

export default JobList;
