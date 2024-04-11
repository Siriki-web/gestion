import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/tabs/Login";
import Error from "./components/tabs/Error";
import ListeEntreprises from "./components/tabs/ListeEntreprise";
import VoirEntreprise from "./components/tabs/VoirEntreprise";
import ModifierEntreprise from "./components/tabs/ModifierEntreprise";
// import Layout from "./components/tabs/Layout";
// import Nav from "./components/tabs/Nav";



export class App extends Component {
	render() {
		return (
			<div>
				<Routes>
					{/* <Route element={<Layout />}> */}
						{/* <Route path="/" element={<Nav />} /> */}
						<Route path="/" element={<Login />} />
						<Route path="/liste-entreprise" element={<ListeEntreprises />} />
						<Route path="/voir-entreprise/:id" element={<VoirEntreprise />}></Route>
						<Route path="/modif-entreprise/:id" element={<ModifierEntreprise />}></Route>
						<Route path="*" element={<Error />} />
					{/* </Route> */}
				</Routes>
			</div>
		);
	}
}
export default App
