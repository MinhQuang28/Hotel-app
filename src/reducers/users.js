/* eslint-disable prettier/prettier */
import type {Action} from '../actions/types';
import {SET_USER} from '../actions/user';

export type State = {
  loggedIn: false,
  updateHotelList: 0,
};
const initialState = {
  loggedIn: false,
  updateHotelList: 0
};

export default function(state: State = initialState, action: Action): State {
  if (action.type === 'LOGGED_IN') {
    return {
      ...state,
      loggedIn: action.payload,
    };
  }

  if (action.type === 'UPDATE_HOTEL_LIST') {
    return {
      ...state,
      updateHotelList: action.payload,
    };
  }

  return state;
}
