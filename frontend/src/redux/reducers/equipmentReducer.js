import { GET_EQUIPMENT } from '../types';

const initialState = {
  equipment: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_EQUIPMENT:
      return {
        ...state,
        equipment: action.payload,
      };
    //   case ADD_JOB:
    //     return {
    //       ...state,
    //       jobs: [action.payload, ...state.jobs],
    //     };
    //   case DELETE_JOB:
    //     return {
    //       ...state,
    //       jobs: state.jobs.filter((job) => job._id !== action.payload),
    //     };
    default:
      return state;
  }
}
