import React from "react";
import "../styles/PageNotFound.css";
import Header from "./layouts/Header";
import { NavLink } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div>
      <Header />
      <main className="pagenotFoundMain">
        <h1>Oops!</h1>
        <h2>
          Page Not Found -
          <span style={{ color: "#14ac5f", fontWeight: "900" }}>404</span>
        </h2>
        <h3>The page you are looking for might have been removed </h3>
        <h3>had it's name changed or is temporarily unavailable</h3>
        <NavLink to="/">Go to Home</NavLink>
      </main>
    </div>
  );
}
