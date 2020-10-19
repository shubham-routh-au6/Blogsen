import React from "react";
import { useHistory } from "react-router-dom";

// import Header from "../Header";
// import Header1 from "../Header1";

import { Button } from "semantic-ui-react";

function Logout() {
  const history = useHistory();

  const logout = () => {
    fetch("https://secret-atoll-20638.herokuapp.com/logout", {
      method: "post",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((result) => {
        localStorage.clear();
        history.push("/login");
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  return (
    <>
      <Button className="logout_btn" onClick={logout} variant="contained">
        LogOut
      </Button>
    </>
  );
}

export default Logout;
