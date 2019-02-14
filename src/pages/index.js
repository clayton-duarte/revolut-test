import { connect } from "react-redux";
import React from "react";

import Text from "../components/Text";

const Home = props => <Text>Hello {props.wallet.name}</Text>;

export default connect(state => state)(Home);
