import React, {useState} from "react";
import {useHistory} from 'react-router-dom'

export default function LoginPage() {

  const [formData, setFormData] = useState({
    email: "webb19@willandskill.se", 
    password: "javascriptoramverk",
  });

  const history = useHistory()
  console.log(history)

  function handleOnchange(e){
    console.log(e.target.name, e.target.value)
    setFormData({...formData, [e.target.name]: e.target.value})
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
        history.push("/home")
      });
  }

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <label>Email</label>
        <input name="email" value={formData.email} onChange={handleOnchange} />
        <label>Password</label>
        <input
          name="password"
          value={formData.password}
          onChange={handleOnchange}
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
