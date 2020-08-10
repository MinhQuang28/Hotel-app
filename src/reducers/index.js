import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import users from "./users";
import search from './search'

export default combineReducers({
	form: formReducer,
	// search,
	users
});

