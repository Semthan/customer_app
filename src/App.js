import React, {useState} from 'react'
import {Switch, Route} from 'react-router-dom'
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
      <Switch>
        <Route path="/login">
          <LoginPage/>
        </Route>

        <Route path="/customer-list">
          <CustomerListPage/>
        </Route>

        <Route path="/customers/:id" component={CustomerDetailPage}>
        </Route>
      </Switch>

      <hr/>
      <button onClick={getMe}>Get Me</button>
    </div>
  );
}

export default App;
