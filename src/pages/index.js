import styled from "styled-components/macro";
import { bindActionCreators } from "redux";
import React, { Component } from "react";
import { connect } from "react-redux";

import { getRates } from "../actions/rates";
import Exchanger from "../components/Exchanger";
import Wallet from "../components/Wallet";

const Container = styled.main`
	max-width: 480px;
	margin: 0 auto;
`;

class Home extends Component {
	componentDidMount() {
		this.props.getRates();
	}

	render() {
		const { wallet, rates } = this.props;
		if (!rates.USD) return "Loading...";
		return (
			<Container>
				<Wallet wallet={wallet} />
				<Exchanger />
			</Container>
		);
	}
}

const mapDispatchToProps = dispatch =>
	bindActionCreators({ getRates }, dispatch);

export default connect(
	state => state,
	mapDispatchToProps
)(Home);
