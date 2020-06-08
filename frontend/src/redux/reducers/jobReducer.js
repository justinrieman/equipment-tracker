import { GET_JOBS, ADD_JOB, DELETE_JOB } from '../types';

const initialState = {
  jobs: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_JOBS:
      return {
        ...state,
        jobs: action.payload,
      };
    case ADD_JOB:
      return {
        ...state,
        jobs: [action.payload, ...state.jobs],
      };
    case DELETE_JOB:
      return {
        ...state,
        jobs: state.jobs.filter((job) => job._id !== action.payload),
      };
    default:
      return state;
  }
}
