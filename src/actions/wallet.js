import { EXCHANGE_VALUES } from "./constants";

export const exchangeValues = params => (dispatch, getState) => {
	// SETUP
	const { from, to, fromValue, toValue } = params;
	const { wallet } = getState();
	let payload = wallet;
	// MUTATE
	payload[from] -= Number(fromValue);
	payload[to] += Number(toValue);
	//DISPATCH
	dispatch({ type: EXCHANGE_VALUES, payload });
};
