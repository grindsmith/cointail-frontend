import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";

import Home from "./react/pages/Home";
import Wallet from "./react/pages/Wallet";

class ReactRoutes extends React.Component {
	render() {
		return (
			<Router>
				<Routes> 
					<Route path="/wallet/:wallet" element={<Wallet />}  />
					<Route path="/" element={<Home />} />
					{/** 
					<Route element={<ProtectedRoutes />}> 
						<Route path="/wallets" element={<Wallets />} />
					</Route>
					**/}
				</Routes>
			</Router>
		);
	}
}

export default ReactRoutes;