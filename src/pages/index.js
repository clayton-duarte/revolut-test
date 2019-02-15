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
	startPooling = () => {
		const poolTask = setInterval(this.props.getRates, 10000);
		this.setState({ poolTask }, this.props.getRates);
	};

	componentDidMount() {
		this.startPooling();
	}

	componentWillUnmount() {
		clearInterval(this.state.poolTask);
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
