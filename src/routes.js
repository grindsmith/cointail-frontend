import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";

import Home from "./react/pages/Home";
import Wallet from "./react/pages/Wallet";
import Group from "./react/pages/Group";

class ReactRoutes extends React.Component {
	render() {
		return (
			<Router>
				<Routes> 
					<Route path="/wallet/:wallet/group/:groupId" element={<Group />}  />
					<Route path="/wallet/:wallet" element={<Wallet />} />
					<Route path="/" element={<Home />} />
				</Routes>
			</Router>
		);
	}
}

export default ReactRoutes;