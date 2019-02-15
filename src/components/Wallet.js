import styled from "styled-components/macro";
import React from "react";

import Text from "./Text";
import Row from "./Row";

const Header = styled(Row)`
	border-radius: ${props => props.theme.radius};
	background: ${props => props.theme.bgColor};
	box-shadow: ${props => props.theme.shadow};
	padding: ${props => props.theme.padding};
	margin: ${props => props.theme.margin};
	justify-content: space-between;
`;

const Title = styled(Text)`
	color: ${props => props.theme.primary};
	font-weight: bold;
`;

export default ({ wallet }) => (
	<Header>
		<Title>My Wallet:</Title>
		{Object.keys(wallet).map(symbol => (
			<Text css="text-align: right" key={`wallet-${symbol}`}>
				{wallet[symbol].toFixed(2)} <strong>{symbol}</strong>
			</Text>
		))}
	</Header>
);
