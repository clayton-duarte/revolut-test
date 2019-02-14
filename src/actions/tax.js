import Axios from "axios";

import { GET_RATES } from "./constants";

// ACTIONS
export const getTaxes = () => dispatch => {
	// SETUP
	const url = "https://openexchangerates.org/api/latest.json";
	const apiToken = "8f67ccb6ee844a19bea9889fe7fec4f4";
	const options = {
		headers: {
			Authorization: `Token ${apiToken}`
		},
		params: {
			base: "USD",
			symbols: "EUR,GBP"
		}
	};
	// REQUEST
	Axios.get(url, options)
		.then(({ data }) => {
			const payload = {
				USD: 1,
				EUR: data.rates.EUR,
				GBP: data.rates.GBP,
				loaded: true
			};
			dispatch({ type: GET_RATES, payload });
			console.log(payload);
		})
		.catch(err => console.log(err));
};
