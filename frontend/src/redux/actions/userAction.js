import jwtDecode from 'jwt-decode';
import { SET_USER } from '../types';

export const setUser = (token) => (dispatch) => {
  const userId = jwtDecode(token).userId;
  dispatch({
    type: SET_USER,
    payload: userId,
  });
};
