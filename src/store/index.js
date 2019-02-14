import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import wallet from "./wallet";
import tax from "./tax";

const appReducer = combineReducers({
	wallet,
	tax
});

export default createStore(appReducer, applyMiddleware(thunk));
