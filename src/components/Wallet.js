import "styled-components/macro";
import React from "react";

import Text from "./Text";
import Row from "./Row";

export default ({ wallet }) => (
	<Row css="justify-content: space-between; padding: 1rem 1.5rem">
		<Text>
			<strong>My Wallet:</strong>
		</Text>
		{Object.keys(wallet).map(symbol => (
			<Text key={`wallet-${symbol}`}>
				{wallet[symbol].toFixed(2)} <strong>{symbol}</strong>
			</Text>
		))}
	</Row>
);
