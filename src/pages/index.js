import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "styled-components/macro";

import { getRates } from "../actions/rates";
import Exchanger from "../components/Exchanger";
import Wallet from "../components/Wallet";

class Home extends Component {
	componentDidMount() {
		this.props.getRates();
	}

	render() {
		const { wallet, rates } = this.props;
		if (!rates.USD) return "Loading...";
		return (
			<>
				<Wallet wallet={wallet} />
				<Exchanger rates={rates} />
			</>
		);
	}
}

const mapDispatchToProps = dispatch =>
	bindActionCreators({ getRates }, dispatch);

export default connect(
	state => state,
	mapDispatchToProps
)(Home);
