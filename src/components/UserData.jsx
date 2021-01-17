import React, { useEffect, useState } from "react";

export default function UserData() {
  const [user, setUser] = useState({});

  useEffect(() => {
    userInfo();
  }, []);

  function userInfo() {
    const url = "https://frebi.willandskill.eu/api/v1/me/";
    const token = localStorage.getItem("WEBB20");
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data));
  }

  return (
    <div>
      <hr />
      <h2>user info</h2>
      <p>
        Name: {user.firstName} {user.lastName}
      </p>
      <p>Email: {user.email}</p>
    </div>
  );
}
