import React, { useState } from "react";
import { useHistory} from "react-router-dom";

export default function CustomerCreatePage() {
  const [formData, setFormData] = useState({});
  const history = useHistory()

  function handleOnchange(e) {
    console.log(e.target.name, e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function renderInput(name, label, type) {
    return (
      <>
        <label>{label}</label>
        <input type={type || "text"} name={name} onChange={handleOnchange} />
      </>
    );
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    const url = "https://frebi.willandskill.eu/api/v1/customers/"
    const token = localStorage.getItem("WEBB20");
    fetch(url, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then( res => res.json())
    .then( data => {
        history.push("/home")
    })
  }

  return (
    <div>
      <h1>Create Customer</h1>
      <form onSubmit={handleOnSubmit}>
        {renderInput("name", "Customer Name")}
        {renderInput("email", "Customer Email", "email")}
        {renderInput("organisationNr", "Organisation Number")}
        {renderInput("paymentTerm", "Payment Term", "number")}
        {renderInput("phoneNumber", "Phone Number", "tel")}
        {renderInput("reference", "Reference")}
        {renderInput("vatNr", "Vat Number")}
        {renderInput("website", "Website", "url")}
        <button type="submit">Create Customer</button>
      </form>
      {JSON.stringify(formData)}
    </div>
  );
}
