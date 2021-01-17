import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom'
import CustomerListItem from "../components/CustomerListItem";
import UserData from "../components/UserData";
import {Button} from "../style/ButtonStyled";

export default function HomePage() {

  const [customerList, setCustomerList] = useState([]);

  useEffect (() => {
    getCustomerList()
  }, [])

  function getCustomerList() {
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
      <h1>Customer List</h1>
      <hr/>
      {customerList.map(item => {
        return <CustomerListItem key={item.id} customerData={item}/>
      })}

      <Button><Link to="/customers/create">Create New Customer</Link></Button>
      <UserData/>
    </div>
  );
}
