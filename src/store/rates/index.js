import { GET_RATES } from "../../actions/constants";

const initialState = {
	USD: 1,
	EUR: 1,
	GBP: 1
};
export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case GET_RATES:
			return { ...state, ...payload };
		default:
			return state;
	}
};
