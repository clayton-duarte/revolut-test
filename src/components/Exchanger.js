import styled from "styled-components/macro";
import { bindActionCreators } from "redux";
import CurrencyInput from "react-currency-input";
import React, { Component } from "react";
import { connect } from "react-redux";

import { exchangeValues } from "../actions/wallet";
import Text from "./Text";
import Row from "./Row";
import Col from "./Col";

const Submit = styled.button`
	border-radius: ${props => props.theme.radius};
	background: ${props => props.theme.primary};
	box-shadow: ${props => props.theme.shadow};
	padding: ${props => props.theme.padding};
	color: ${props => props.theme.bgColor};
	margin: ${props => props.theme.margin};
	transition: 0.3s ease;
	font-weight: bold;
	display: block;
	/* width: 100%; */
	border: 0;
	&:disabled {
		filter: grayscale(100%);
		pointer-events: none;
	}
`;

const Aligner = styled(Row)`
	justify-content: space-between;
	align-items: center;
`;

const Wrapper = styled(Col)`
	border-radius: ${props => props.theme.radius};
	background: ${props => props.theme.bgColor};
	box-shadow: ${props => props.theme.shadow};
	padding: ${props => props.theme.padding};
	margin: ${props => props.theme.margin};
`;

const Title = styled(Text)`
	color: ${props => props.theme.primary};
	font-weight: bold;
`;

const Input = styled(CurrencyInput)`
	border: 0.125rem solid ${props => props.theme.secondary};
	border-radius: ${props => props.theme.radius};
	font-size: ${props => props.theme.fontSize};
	padding: ${props => props.theme.padding};
	color: ${props => props.theme.primary};
	transition: 0.3s ease;
	margin: 0.5rem 0;
	&:focus {
		border: 0.125rem solid ${props => props.theme.primary};
		outline: transparent;
	}
`;

Input.defaultProps = {
	thousandSeparator: ""
};

const Pocket = styled.span`
	color: ${({ warn, theme }) => (warn ? theme.warn : theme.primary)};
	font-family: ${props => props.theme.fontFamily};
	transition: 0.3s ease;
	font-size: 0.85rem;
	font-weight: bold;
`;

const Label = styled.span`
	background: ${({ theme, selected }) =>
		selected ? theme.secondary : theme.bgColor};
	color: ${({ theme, selected }) =>
		selected ? theme.bgColor : theme.secondary};
	border: 0.125rem solid ${props => props.theme.secondary};
	font-family: ${props => props.theme.fontFamily};
	border-radius: ${props => props.theme.radius};
	padding: 0.25rem 0.5rem;
	transition: 0.3s ease;
	font-size: 0.75rem;
	font-weight: bold;
	margin: 0.25rem 0;
`;

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
		return rates[to] / rates[from];
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
		const { wallet } = this.props;
		const { from } = this.state;
		const { value } = e.target;
		this.setState(prevState => ({
			toValue: (value * prevState.rate).toFixed(2),
			error: value > wallet[from],
			fromValue: value
		}));
	};

	handleChangeTo = e => {
		const { wallet } = this.props;
		const { from } = this.state;
		const { value } = e.target;
		this.setState(prevState => ({
			fromValue: (value * prevState.rate).toFixed(2),
			error: value * prevState.rate > wallet[from],
			toValue: value
		}));
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.exchangeValues(this.state);
		this.setState({
			fromValue: 0,
			toValue: 0
		});
	};

	render() {
		const { fromValue, error, toValue, from, rate, to } = this.state;
		const { rates, wallet } = this.props;
		const symbols = Object.keys(rates);
		return (
			<>
				<Wrapper>
					{/* SHOW RATE */}
					<Aligner css="justify-content: space-between">
						<Title>Rate:</Title>
						<Text>
							{rate.toFixed(5)}{" "}
							<strong>
								{from}/{to}
							</strong>
						</Text>
					</Aligner>
					<br />
					{/* FIRST CURRENCY */}
					<Aligner>
						<Title>From:</Title>
						{symbols.map(symbol => (
							<Label
								selected={from === symbol}
								key={`from-${symbol}`}
								onClick={() => this.handleClickFrom(symbol)}
							>
								{symbol}
							</Label>
						))}
					</Aligner>
					<Input value={fromValue} onChangeEvent={this.handleChangeFrom} />
					<Pocket warn={error}>
						You have {wallet[from].toFixed(2)} {from} available
					</Pocket>
					<br />
					{/* SECOND CURRENCY */}
					<Aligner>
						<Title>To:</Title>
						{symbols.map(symbol => (
							<Label
								selected={to === symbol}
								key={`to-${symbol}`}
								onClick={() => this.handleClickTo(symbol)}
							>
								{symbol}
							</Label>
						))}
					</Aligner>
					<Input value={toValue} onChangeEvent={this.handleChangeTo} />
				</Wrapper>
				<Submit disabled={error} onClick={this.handleSubmit}>
					Exchange
				</Submit>
			</>
		);
	}
}

const mapDispatchToProps = dispatch =>
	bindActionCreators({ exchangeValues }, dispatch);

export default connect(
	state => state,
	mapDispatchToProps
)(Exchanger);
