import { EXCHANGE_VALUES } from "../../actions/constants";

const initialState = {
	USD: 100,
	EUR: 100,
	GBP: 100
};

export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case EXCHANGE_VALUES:
			return { ...state, ...payload };
		default:
			return state;
	}
};
