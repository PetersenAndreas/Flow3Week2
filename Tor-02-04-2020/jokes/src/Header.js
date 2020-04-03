import React from "react";
import { NavLink } from "react-router-dom";


export function Header({isLoggedIn, loginMsg}) {
  return (<div>
    <ul className="header">
      <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
      {isLoggedIn &&(
      <>    
      <li><NavLink activeClassName="active" to="/jokes">Jokes</NavLink></li>
      <li><NavLink activeClassName="active" to="/scrape">Scrape</NavLink></li>
      </>
      )}
      
      <li><NavLink activeClassName="active" to="/login-out">{loginMsg}</NavLink></li>
      
    </ul>
  </div>);

}
