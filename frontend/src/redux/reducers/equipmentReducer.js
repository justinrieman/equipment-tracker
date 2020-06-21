import {
  GET_EQUIPMENT,
  ADD_EQUIPMENT,
  UPDATE_EQUIPMENT,
  DELETE_EQUIPMENT,
  MARK_AVAILABLE,
  MARK_UNAVAILABLE,
} from '../types';

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
    case ADD_EQUIPMENT:
      return {
        ...state,
        equipment: [action.payload, ...state.equipment],
      };
    case UPDATE_EQUIPMENT:
      return {
        ...state,
        equipment: state.equipment.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };
    case DELETE_EQUIPMENT:
      return {
        ...state,
        equipment: state.equipment.filter(
          (item) => item._id !== action.payload
        ),
      };
    case MARK_AVAILABLE:
      return {
        ...state,
        equipment: state.equipment.map((item) =>
          item._id === action.payload ? { ...item, available: true } : item
        ),
      };
    case MARK_UNAVAILABLE:
      return {
        ...state,
        equipment: state.equipment.map((item) =>
          item._id === action.payload ? { ...item, available: false } : item
        ),
      };
    default:
      return state;
  }
}
