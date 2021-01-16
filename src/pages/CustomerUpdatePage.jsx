import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function CustomerUpdatePage(props) {
  const customerId = props.match.params.id;

  const [formData, setFormData] = useState({});
  const history = useHistory();

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
      .then(() => history.push(`/customers/${customerId}`))
  }

  useEffect(() => {
    getCustomerItem();
  }, []);

  function handleOnchange(e) {
    console.log(e.target.name, e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    const url = `https://frebi.willandskill.eu/api/v1/customers/${customerId}/`;
    const token = localStorage.getItem("WEBB20");
    fetch(url, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  function renderInput(name, label, type) {
    return (
      <>
        <label>{label}</label>
        <input
          type={type || "text"}
          name={name}
          value={formData[name]}
          onChange={handleOnchange}
        />
      </>
    );
  }

  return (
    <div>
      <h1>Update Customer</h1>
      <form onSubmit={handleOnSubmit}>
        {renderInput("name", "Customer Name")}
        {renderInput("email", "Customer Email", "email")}
        {renderInput("organisationNr", "Organisation Number")}
        {renderInput("paymentTerm", "Payment Term", "number")}
        {renderInput("phoneNumber", "Phone Number", "tel")}
        {renderInput("reference", "Reference")}
        {renderInput("vatNr", "Vat Number")}
        {renderInput("website", "Website", "url")}
        <button type="submit">Update Customer</button>
      </form>
    </div>
  );
}
