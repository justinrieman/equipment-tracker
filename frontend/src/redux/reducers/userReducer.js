import { SET_USER } from '../types';

const initialState = {
  userId: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        user: action.payload,
      };
    default:
      return state;
  }
}
