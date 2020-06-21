import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { GET_JOBS, ADD_JOB, UPDATE_JOB, DELETE_JOB } from '../types';

export const getJobs = () => (dispatch) => {
  const token = localStorage.token;
  const decodedToken = jwtDecode(token);
  axios({
    url: 'http://localhost:5000/jobs',
    method: 'GET',
    headers: {
      userId: decodedToken.userId,
    },
  }).then((res) => {
    dispatch({
      type: GET_JOBS,
      payload: res.data.jobs,
    });
  });
};

export const addJob = (job) => (dispatch) => {
  axios.post('http://localhost:5000/jobs', job).then((res) => {
    dispatch({
      type: ADD_JOB,
      payload: res.data.createdJob,
    });
  });
};

export const updateJob = (jobId, job) => (dispatch) => {
  axios.patch(`http://localhost:5000/jobs/${jobId}`, job).then((res) => {
    console.log(res.data.updatedJob);
    dispatch({
      type: UPDATE_JOB,
      payload: res.data.updatedJob,
    });
  });
};

export const deleteJob = (jobId) => {
  axios
    .delete(`http://localhost:5000/jobs/${jobId}`)
    .then((res) => console.log(res));
  return {
    type: DELETE_JOB,
    payload: jobId,
  };
};
