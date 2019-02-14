import styled from "styled-components/macro";
import { bindActionCreators } from "redux";
import Input from "react-currency-input";
import React, { Component } from "react";
import { connect } from "react-redux";

import { exchangeValues } from "../actions/wallet";
import Text from "./Text";
import Col from "./Col";

const Submit = styled.button``;

const Label = styled.span``;

class Exchanger extends Component {
	state = {
		from: "GBP",
		to: "GBP",
		rate: 1,
		fromValue: 0,
		toValue: 0
	};

	calcRate = (from, to) => {
		const { rates } = this.props;
		return rates[from] / rates[to];
	};

	handleClickFrom = symbol => {
		this.setState(prevState => ({
			from: symbol,
			rate: this.calcRate(symbol, prevState.to),
			fromValue: 0,
			toValue: 0
		}));
	};

	handleClickTo = symbol => {
		this.setState(prevState => ({
			to: symbol,
			rate: this.calcRate(prevState.from, symbol),
			fromValue: 0,
			toValue: 0
		}));
	};

	handleChangeFrom = e => {
		const { value } = e.target;
		this.setState(prevState => ({
			fromValue: value,
			toValue: (value * prevState.rate).toFixed(2)
		}));
	};

	handleChangeTo = e => {
		const { value } = e.target;
		this.setState(prevState => ({
			fromValue: (value * prevState.rate).toFixed(2),
			toValue: value
		}));
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.exchangeValues(this.state);
		this.setState(prevState => ({
			fromValue: 0,
			toValue: 0
		}));
	};

	render() {
		const { rate, from, to, fromValue, toValue } = this.state;
		const { rates } = this.props;
		const symbols = Object.keys(rates);
		return (
			<Col css="padding: 1rem 1.5rem">
				<Text>
					<strong>Rate:</strong> {rate.toFixed(6)} {from}/{to}
				</Text>
				<br />
				<Text>
					From:{" "}
					<Input value={fromValue} onChangeEvent={this.handleChangeFrom} />
					<br />
					{symbols.map(symbol => (
						<Label
							key={`from-${symbol}`}
							onClick={() => this.handleClickFrom(symbol)}
						>
							{symbol}{" "}
						</Label>
					))}
				</Text>
				<br />
				<Text>
					To: <Input value={toValue} onChangeEvent={this.handleChangeTo} />
					<br />
					{symbols.map(symbol => (
						<Label
							key={`to-${symbol}`}
							onClick={() => this.handleClickTo(symbol)}
						>
							{symbol}{" "}
						</Label>
					))}
				</Text>
				<br />
				<Submit onClick={this.handleSubmit}>Exchange</Submit>
			</Col>
		);
	}
}

const mapDispatchToProps = dispatch =>
	bindActionCreators({ exchangeValues }, dispatch);

export default connect(
	state => state,
	mapDispatchToProps
)(Exchanger);
