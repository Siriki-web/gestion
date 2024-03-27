import React, { Component } from "react";
import {  Routes, Route } from "react-router-dom";
import Login from "./components/tabs/Login";
import Error from "./components/tabs/Error";
import ListeEntreprises from "./components/tabs/ListeEntreprises";



export class App extends Component {
  render() {
    return (
      <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/liste-entreprise" element={<ListeEntreprises />} />
            <Route path="*" element={<Error />} />
          </Routes>

      </div>
    );
  }
}
export default App
