import React, {useEffect, useState} from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import "./style2.css"

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function BasicExample() {
  return (
    <Router>
      <div>
        
          <Header/>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <div className="content">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/clock">
            <IMadeDis />
          </Route>
        </Switch>

      </div>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.

function Home() {
  return (
    <div>
      <h2>Home</h2>
      <h4>Home is where wifi connects automatically</h4>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

function Header() {
  return (
    <ul className="header">
          <li>
          <NavLink exact activeClassName="selected" to="/">Home</NavLink>
          </li>
          <li>
          <NavLink exact activeClassName="selected" to="/about">About</NavLink>
          </li>
          <li>
          <NavLink exact activeClassName="selected" to="/dashboard">Dashboard</NavLink>
          </li>
          <li>
          <NavLink exact activeClassName="selected" to="/clock">I Made Dis</NavLink>
          </li>
        </ul>
  )
}

function IMadeDis() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
      const interval = setInterval(() => {
          setTime(new Date().toLocaleTimeString());
      }, 1000);
      return () => clearInterval(interval);
  }, []);

  return <h1>Time is: {time}</h1>;

}