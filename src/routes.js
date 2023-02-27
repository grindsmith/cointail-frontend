import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";

import Home from "./react/pages/Home";
import WalletTokens from "./react/pages/Wallet";

class ReactRoutes extends React.Component {
	render() {
		return (
			<Router>
				<Routes> 
					<Route path="/" element={<Home />} />
					<Route path="/wallet/:wallet/tokens" element={<WalletTokens />} />

					{/** 
					<Route path="/solana" element={<Solana />} />
					<Route path="/solana/collection/:symbol" element={<NFTCollection />} />
					<Route path="/solana/token/:token" element={<Token />} />
					<Route path="/solana/wallet/:wallet" element={<Wallet />} />
					*/}
				</Routes>
			</Router>
		);
	}
}

export default ReactRoutes;
