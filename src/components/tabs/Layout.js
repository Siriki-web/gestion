// Layout.js
import React from "react";
import { Outlet } from "react-router-dom";
import Login from "./Login";
import Nav from "./Nav";

const Layout = () => {
  return (
    <div className="layout">
      <Nav />
      <Login /> 
      <Outlet /> 
    </div>
  );
};

export default Layout;
