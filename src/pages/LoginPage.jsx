import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../style/ButtonStyled";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "Sarmad.Al-Bidhawi@yh.nackademin.se",
    password: "javascriptoramverk",
  });

  const history = useHistory();
  console.log(history);

  function handleOnchange(e) {
    console.log(e.target.name, e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    const url = "https://frebi.willandskill.eu/api-token-auth/";
    const payload = {
      email: formData.email,
      password: formData.password,
    };
    fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data.token);
        localStorage.setItem("WEBB20", data.token);
        history.push("/home");
      });
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">Welcome to Semthan AB</h1>

      <div className="row justify-content-center mt-5">


      <form onSubmit={handleOnSubmit}>
        <div class="col-md-12">
          <label for="inputEmail" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            name="email"
            value={formData.email}
            onChange={handleOnchange}
          />
          <label for="inputPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="inputPassword"
            name="password"
            value={formData.password}
            onChange={handleOnchange}
          />
        </div>
        <div class="mt-3">
          <Button type="submit">Log In</Button>
        </div>
      </form>
      </div>
    </div>
  );
}
