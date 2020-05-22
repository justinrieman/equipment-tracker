import React, { useState } from 'react';
import JobLabel from './JobLabel';
import JobForm from './JobForm';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const modalStyle = {
  content: {},
};

const JobList = ({ history }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
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

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <div className="category-header">
        <div
          className="category-back"
          onClick={() => {
            history.push('/');
          }}
        >
          <i className="fas fa-angle-double-left"></i>
        </div>
        <h1 className="category-title">Jobs</h1>
        <div className="category-add" onClick={openModal}>
          <i className="fas fa-plus"></i>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyle}
        className="Modal"
      >
        <JobForm close={closeModal} />
      </Modal>
      <div className="job-list">
        {jobs.map((job) => {
          return <JobLabel jobName={job.jobName} jobNumber={job.jobNumber} />;
        })}
      </div>
    </div>
  );
};

export default JobList;
