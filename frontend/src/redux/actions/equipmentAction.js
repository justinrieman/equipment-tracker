import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {
  GET_EQUIPMENT,
  ADD_EQUIPMENT,
  UPDATE_EQUIPMENT,
  DELETE_EQUIPMENT,
  MARK_AVAILABLE,
  MARK_UNAVAILABLE,
} from '../types';

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
    dispatch({
      type: GET_EQUIPMENT,
      payload: res.data.equipment,
    });
  });
};

export const addEquipment = (formData) => (dispatch) => {
  console.log(formData);
  axios.post('http://localhost:5000/equipment', formData).then((res) => {
    console.log(res.data.createdEquipment);
    dispatch({
      type: ADD_EQUIPMENT,
      payload: res.data.createdEquipment,
    });
  });
};

export const updateEquipment = (equipId, equip) => (dispatch) => {
  axios
    .patch(`http://localhost:5000/equipment/${equipId}`, equip)
    .then((res) => {
      dispatch({
        type: UPDATE_EQUIPMENT,
        payload: res.data.updatedEquipment,
      });
    });
};

export const deleteEquipment = (id) => (dispatch) => {
  axios.delete(`http://localhost:5000/equipment/${id}`).then((res) => {
    dispatch({
      type: DELETE_EQUIPMENT,
      payload: id,
    });
  });
};

export const markAvailable = (id) => (dispatch) => {
  axios.patch(`http://localhost:5000/equipment/available/${id}`).then((res) => {
    console.log(res);
    dispatch({
      type: MARK_AVAILABLE,
      payload: id,
    });
  });
};

export const markUnavailable = (id) => (dispatch) => {
  axios
    .patch(`http://localhost:5000/equipment/unavailable/${id}`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: MARK_UNAVAILABLE,
        payload: id,
      });
    });
};
