import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";

import Etherscan from "./react/etherscan/pages/Etherscan";

import Home from "./react/solana/pages/Home";
import NFTCollection from "./react/solana/pages/NFTCollection";
import Wallet from "./react/solana/pages/Wallet";
import Token from "./react/solana/pages/Token";

class ReactRoutes extends React.Component {
	render() {
		return (
			<Router>
				<Routes>
					<Route path="/etherscan" element={<Etherscan />} />

					<Route path="/solana" element={<Home />} />
					<Route path="/solana/collection/:symbol" element={<NFTCollection />} />
					<Route path="/solana/token/:token" element={<Token />} />
					<Route path="/solana/wallet/:wallet" element={<Wallet />} />
				</Routes>
			</Router>
		);
	}
}

export default ReactRoutes;
