import React, { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import CustomerCreatePage from "./pages/CustomerCreatePage";
import CustomerDetailPage from "./pages/CustomerDetailPage";
import CustomerUpdatePage from "./pages/CustomerUpdatePage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

import { dataContext } from "./Context/DataContext";

function App() {
  const [userData, setUserData] = useState(null);
  const [customerList, setCustomerList] = useState(null);


  function fetchCustomerData() {
    const url = "https://frebi.willandskill.eu/api/v1/customers/";
    const token = localStorage.getItem("WEBB20");
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCustomerList(data.results));
  }

  return (
    <div>
        <dataContext.Provider value={{customerList, setCustomerList, fetchCustomerData}}>
          <Switch>
            <Route path="/home">
              <HomePage />
            </Route>

            <Route path="/customers/create">
              <CustomerCreatePage />
            </Route>

            <Route
              path="/customers/:id/edit"
              component={CustomerUpdatePage}
            ></Route>

            <Route path="/customers/:id" component={CustomerDetailPage}></Route>

            <Route path="/">
              <LoginPage />
            </Route>
          </Switch>
        </dataContext.Provider>
    </div>
  );
}

export default App;
