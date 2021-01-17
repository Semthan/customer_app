import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Button } from "../style/ButtonStyled";

export default function CustomerDetailPage(props) {
  const customerId = props.match.params.id;
  const [customerItem, setCustomerItem] = useState(null);
  const history = useHistory()

  function getCustomerItem() {
    const url = `https://frebi.willandskill.eu/api/v1/customers/${customerId}/`
    const token = localStorage.getItem("WEBB20");
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(data => setCustomerItem(data));
  }

  function deleteCustomer() {
    const url = `https://frebi.willandskill.eu/api/v1/customers/${customerId}/`;
    const token = localStorage.getItem("WEBB20");
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => history.push("/home"))
  }

  useEffect(() => {
    getCustomerItem();
  }, []);

  return (
    <div>
      <h1>Customer Detail Page</h1>
      {customerItem ? (
        <div>
          <h1>{customerItem.name}</h1>
          <p>organisationNr: {customerItem.organisationNr}</p>
          <p>vatNr: {customerItem.vatNr}</p>
          <p>reference: {customerItem.reference}</p>
          <p>paymentTerm: {customerItem.paymentTerm}</p>
          <a href={customerItem.website} target="_blank">
            {customerItem.website}
          </a>
          <br/>
          <a href={`mailto:${customerItem.email}`}>{customerItem.email}</a>
          <p>phoneNumber: {customerItem.phoneNumber}</p>
          <Button><Link onClick={deleteCustomer}>Delete Customer</Link></Button>
          <Button><Link to={`/customers/${customerId}/edit`}>Edit Customer</Link></Button>
          <Button><Link to="/home">Back</Link></Button>
        </div>
        
      ) : (
        <span>Loading data..</span>
      )}
    </div>
  );
}
