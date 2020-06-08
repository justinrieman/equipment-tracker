import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { GET_EQUIPMENT } from '../types';

export const getEquipment = () => (dispatch) => {
  const token = localStorage.token;
  const decodedToken = jwtDecode(token);
  axios({
    url: 'http://localhost:5000/equipment',
    method: 'GET',
    params: {
      userId: decodedToken.userId,
    },
  }).then((res) => {
    // console.log(res.data);
    dispatch({
      type: GET_EQUIPMENT,
      payload: res.data.equipment,
    });
  });
};
