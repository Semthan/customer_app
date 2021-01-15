import React, { useEffect, useState } from "react";

export default function CustomerDetailPage(props) {
  const customerId = props.match.params.id;
  const [customerItem, setCustomerItem] = useState(null);

  function getCustomerItem() {
    const url = `https://frebi.willandskill.eu/api/v1/customers/${customerId}/`;
    const token = localStorage.getItem("WEBB20");
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCustomerItem(data));
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
          <p>{customerItem.organisationNr}</p>
          <p>{customerItem.vatNr}</p>
          <p>{customerItem.reference}</p>
          <p>{customerItem.paymentTerm}</p>
          <a href={customerItem.website} target="_blank">{customerItem.website}</a>
          <a href={`mailto:${customerItem.email}`}>{customerItem.email}</a>
          <p>{customerItem.phoneNumber}</p>
        </div>
      ) : (
        <span>Loading data..</span>
      )}
    </div>
  );
}
