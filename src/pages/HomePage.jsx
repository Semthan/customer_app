import React, {useEffect, useState} from "react";
import CustomerListItem from "../components/CustomerListItem";

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
      {customerList.map(item => {
        return <CustomerListItem key={item.id} customerData={item}/>
      })}
    </div>
  );
}
