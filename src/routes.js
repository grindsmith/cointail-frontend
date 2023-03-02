import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";

import Home from "./react/pages/Home";
import Wallets from "./react/pages/Wallets";
import WalletDetails from "./react/pages/WalletDetails";
import ProtectedRoutes from "./react/utils/ProtectedRoutes";

class ReactRoutes extends React.Component {
	render() {
		return (
			<Router>
				<Routes> 
					{/** <Route element={<ProtectedRoutes />}> **/}
					<Route path="/wallets" element={<Wallets />} />
					<Route path="/wallet/:wallet" element={<WalletDetails />}  />
					{/** </Route> **/}
					<Route path="/" element={<Home />} />
				</Routes>
			</Router>
		);
	}
}

export default ReactRoutes;