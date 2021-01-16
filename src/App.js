import React, {useState} from 'react'
import {Switch, Route, Link} from 'react-router-dom'
import CustomerCreatePage from './components/CustomerCreatePage';
import CustomerDetailPage from './components/CustomerDetailPage';
import CustomerListPage from './pages/CustomerListPage';
import LoginPage from './pages/LoginPage';

function App() {


  function getMe(){
    const url = "https://frebi.willandskill.eu/api/v1/me/"
    const token = localStorage.getItem("WEBB20")
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => console.log(data))
  }

  return (
    <div>

      <ul>
        <li>
          <Link to="/customers">Customers</Link>
        </li>
        <li>
          <Link to="/customers/create">Create Customer</Link>
        </li>
      </ul>
      <Switch>
        <Route path="/login">
          <LoginPage/>
        </Route>

        <Route path="/customers/create">
          <CustomerCreatePage/>
        </Route>

        <Route path="/customers/:id" component={CustomerDetailPage}>
        </Route>

        <Route path="/customers">
          <CustomerListPage/>
        </Route>

      </Switch>

      <hr/>
      <button onClick={getMe}>Get Me</button>
    </div>
  );
}

export default App;
