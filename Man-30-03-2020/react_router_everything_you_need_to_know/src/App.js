import React, {useState} from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  NavLink,
  Link,
  useRouteMatch,
  useParams,
  useHistory
} from "react-router-dom";


// Since routes are regular React components, they
// may be rendered anywhere in the app, including in
// child elements.
//
// This helps when it's time to code-split your app
// into multiple bundles because code-splitting a
// React Router app is the same as code-splitting
// any other React app.

export default App;
function App({bookFacade}) {
  const[isLoggedIn, setIsLoggedIn] = useState(false);
  let history = useHistory();
  
  const setLoginStatus = status => {
    setIsLoggedIn(status);
    history.push("/");
  }


  return (
    <Router>
      <div>
        <Header 
        loginMsg={isLoggedIn ? "Logout" : "Login"}
        isLoggedIn={isLoggedIn}
        />
        <div className="content">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/products">
            <Products bookFacade={bookFacade}/>
          </Route>
          <Route path="/company">
            <Company />
          </Route>
          <Route path="/add-book">
            <AddBook bookFacade={bookFacade}/>
          </Route>
          <Route path="/find-book">
            <FindBook bookFacade={bookFacade}/>
          </Route>
          <Route path="/login-out">
            <Login 
            loginMsg={isLoggedIn ? "Logout" : "Login"}
            isLoggedIn={isLoggedIn}
            setLoginStatus={setLoginStatus}
            />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
        </div>
      </div>
    </Router>
  );
}

function Header({isLoggedIn, loginMsg}) {
  return (
<div>
  <ul className="header">
      <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
      <li><NavLink activeClassName="active" to="/products">Products</NavLink></li>
      <li><NavLink activeClassName="active" to="/company">Company</NavLink></li>
      
  {isLoggedIn && (
    <div>
      <li><NavLink activeClassName="active" to="/add-book">Add Book</NavLink></li>
      <li><NavLink activeClassName="active" to="/find-book">Find A Book</NavLink></li>
    </div>
  )}
      <li><NavLink activeClassName="active" to="/login-out">{loginMsg}</NavLink></li>
  </ul>
</div>

  );
}

function Login({isLoggedIn, loginMsg, setLoginStatus}) {
  const handleBtnClick = () => {
    setLoginStatus(!isLoggedIn);
  };
  return(
    <div>
      <h2>{loginMsg}</h2>
      <p>Press the button to login or out</p>
      <Link to="/"><button onClick={handleBtnClick}>{loginMsg}</button></Link>
    </div>

  )
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
      <p>Home is were the wifi connects automatically</p>
    </div>
  );
}
function Details({bookFacade}) {
  let { id } = useParams();
  const bookSearched = bookFacade.findBook(id);
  return (
    <div style={{border: "1px black solid", padding: "5px", display: "inline-block", minWidth: "380px"}}>
      <p>Title: {bookSearched.title}</p>
      <p>ID: {id}</p>
      <p>Info: {bookSearched.info}</p>
      
    </div>
  );
}
function Products({bookFacade}) {
  let { url, path } = useRouteMatch();
  const listItems = bookFacade.getBooks().map(book =>{ return (
    <li key={book.id}>
           
           {book.title}<b> </b><NavLink to={`${url}/${book.id}`}>details</NavLink>
    </li>
    );});

  return (
    <div>
      <h2>Books</h2>
      <p>Amount of books in store: {bookFacade.getBooks().length}</p>
      <ul>
        {listItems}
      </ul>
    <Switch>
    <Route exact path={path}>
          <h3>Book details for selected book will go here</h3>
    </Route>
      <Route path={`${path}/:id`}>
            <Details bookFacade={bookFacade}/>
      </Route>
    </Switch>
    </div>
  );
}
function Company() {
  return (
    <div>
      <h2>Company</h2>
      <p>This is not ready, go away.</p>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>How did you get here?</h2>
    </div>
  )
}

function FindBook({bookFacade}) {
  const[id, setId] = useState("");
  const[book, setBook] = useState(null);
  
  function handleSubmit(event) {
    event.preventDefault();
    setBook(bookFacade.findBook(id));
  }

  function handleChange(event) {
    let valueInput = event.target.value;
    setId(valueInput);
  };

  function deleteBook(event) {
    event.preventDefault();
    bookFacade.deleteBook(book.id);
    setId("");
  };

  function printBook() {
    return( 
      <div>
        <br />
      { book ? (
      <div style={{border: "1px black solid", padding: "5px", display: "inline-block", minWidth: "380px"}}>
        <p>Title: {book.title}</p>
        <p>ID: {book.id}</p>
        <p>Info: {book.info}</p>
        <button onClick={deleteBook}>Click here to delete</button>
      </div>
      ) : (
        <div>
          Enter ID for book to see
        </div>
      )}
      </div>
     ) 
  }
  
  return (
    <div>
      <br/>
      <form onSubmit={handleSubmit}>
      <input type="number" placeholder="Enter Book ID..." id="id" onChange={handleChange} value={id}/>
      <input type="submit" value="Find Book"/>
      {printBook()}
      </form>
    </div>
  );
}

function AddBook({bookFacade}) {
  const[book, setBook] = useState({id: "", title: "", info: ""});

  function handleSubmit(event) {
    event.preventDefault();
    bookFacade.addBook(book);
    setBook({id: "", title: "", info: ""}); //This is for clearing the book object id.
  }
  
  const handleChange = event => {
    const textInputID = event.target.id;
    const valueInput = event.target.value;
    setBook({...book, [textInputID]: valueInput});
  };
  
  return (
    <div>
      <h2>Add your books here, mothercockers</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Add title" id="title" onChange={handleChange} value={book.title}/> <br/>
        <input type="text" placeholder="Add info" id="info" onChange={handleChange} value={book.info}/> <br/>
        <input type="submit" value="Submit"/>
      </form>
    </div>
  )
}


