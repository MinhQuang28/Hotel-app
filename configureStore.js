// @flow
// import { AsyncStorage } from "react-native";
//import devTools from "remote-redux-devtools";
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";
import reducer from "./src/reducers";

export default function configureStore(onCompletion: () => void): any {
  const enhancer = compose(
    applyMiddleware(thunk)
  );


  const store = createStore(reducer, composeWithDevTools(enhancer));
  persistStore(store, onCompletion);

  return store;
}
