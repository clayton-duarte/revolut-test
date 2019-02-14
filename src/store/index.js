import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import wallet from "./wallet";
import rates from "./rates";

const appReducer = combineReducers({
	wallet,
	rates
});

export default createStore(appReducer, applyMiddleware(thunk));
