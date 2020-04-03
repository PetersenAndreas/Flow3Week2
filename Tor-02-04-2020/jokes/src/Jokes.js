import React, { useState } from "react";

export function Jokes() {
  const [norris, setNorris] = useState(<br/>);
  const [dad, setDad] = useState(<br/>);
  function getJokes() {
    let options = {
      'method': 'GET',
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };
    fetch("http://localhost:8080/securitystarter/api/jokes", options)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setDad(data.joke1);
        setNorris(data.joke2);
      });
  }
  return (<div>
    <h1>Jokes</h1>
    <button onClick={getJokes}>Get them spicy jokes here!</button>
    <h2>Chuck Norris joke: </h2>
    <p>{norris}</p>
    <h2>Dad joke:</h2>
    <p>{dad}</p>
  </div>);
}
