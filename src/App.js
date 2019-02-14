import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import React from "react";

import theme from "./theme";
import store from "./store";

import GlobalStyle from "./components/GlobalStyle";
import Home from "./pages";

const App = () => (
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<>
					<Switch>
						<Route path="/" component={Home} />
					</Switch>
					<GlobalStyle />
				</>
			</BrowserRouter>
		</ThemeProvider>
	</Provider>
);

export default App;
