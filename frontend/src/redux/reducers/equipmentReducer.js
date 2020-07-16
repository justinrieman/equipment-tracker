import {
  GET_EQUIPMENT,
  ADD_EQUIPMENT,
  UPDATE_EQUIPMENT,
  DELETE_EQUIPMENT,
  MARK_AVAILABLE,
  MARK_UNAVAILABLE,
  MARK_MAINTENANCE,
  UPDATE_ATTACHMENT,
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
    case UPDATE_ATTACHMENT:
      return {
        ...state,
        equipment: state.equipment.map((item) =>
          item._id === action.payload._id
            ? { ...item, attachments: action.payload.attachments }
            : item
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
    case MARK_MAINTENANCE:
      return {
        ...state,
        equipment: state.equipment.map((item) =>
          item._id === action.payload._id
            ? { ...item, needsMaintenance: action.payload.needsMaintenance }
            : item
        ),
      };
    default:
      return state;
  }
}
