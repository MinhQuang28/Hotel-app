/* eslint-disable prettier/prettier */
import type {Action} from '../actions/types';

export type State = {
  searchHotel: ""
};
const initialState = {
  searchHotel: ""

};

export default function(state: State = initialState, action: Action): State {
  if (action.type === 'SEARCH_HOTEL') {
    return {
      ...state,
      searchHotel: action.payload,
    };
  }


  return state;
}
