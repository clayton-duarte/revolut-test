import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "styled-components/macro";

import { getTaxes } from "../actions/tax";
import Text from "../components/Text";

class Home extends Component {
	componentDidMount() {
		this.props.getTaxes();
	}

	render() {
		const { wallet, rates } = this.props;
		if (!rates.loaded) return "Loading...";
		return (
			<>
				<Text css="font-weight: bold">Pockets</Text>
				<Text>GBP: {wallet.GBP.toFixed(2)}</Text>
				<Text>EUR: {wallet.EUR.toFixed(2)}</Text>
				<Text>USD: {wallet.USD.toFixed(2)}</Text>
			</>
		);
	}
}

const mapDispatchToProps = dispatch =>
	bindActionCreators({ getTaxes }, dispatch);

export default connect(
	state => state,
	mapDispatchToProps
)(Home);
