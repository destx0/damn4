import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddStudent from "./pages/AddStudent";

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/add" element={<AddStudent />} />
			</Routes>
		</Router>
	);
};

export default App;
