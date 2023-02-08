import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";

import Home from "./react/pages/Home";
import NFTCollection from "./react/pages/NFTCollection";
import Wallet from "./react/pages/Wallet";
import Token from "./react/pages/Token";

class ReactRoutes extends React.Component {
	render() {
		return (
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/collection/:symbol" element={<NFTCollection />} />
					<Route path="/token/:token" element={<Token />} />
					<Route path="/wallet/:wallet" element={<Wallet />} />
				</Routes>
			</Router>
		);
	}
}

export default ReactRoutes;
