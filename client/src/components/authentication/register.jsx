import React, { useState } from "react";
import Header from "../header";
import Footer from "../footer";
import Loader from "../loader";
import { Link } from "react-router-dom";

function Register(props) {
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (values.name === "" || values.email === "" || values.password === "") {
      return setMessage("All field must be filled");
    }
    setLoader(true);
    fetch("https://secret-atoll-20638.herokuapp.com/register", {
      method: "post",
      headers: { "content-type": "Application/json" },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoader(false);
        console.log(data);
        if (data.message === "Email alredy exist") {
          return setMessage(data.message);
        }
        if (data.user.isLoggedIn === true) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          props.history.push("/dashboard");
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <Header />
      <div className="registerPage">
        {message ? <h3 className="errorHead">{message}</h3> : null}
        <form className="registerForm" onSubmit={handleOnSubmit}>
          {loader ? <Loader /> : null}
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={values.name}
              onChange={handleOnChange}
              placeholder="Enter Username"
            />
          </div>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={values.email}
              autoComplete="off"
              onChange={handleOnChange}
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="exampleInputPassword1"
              value={values.password}
              onChange={handleOnChange}
              placeholder="Password"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <p className="link_re">
          If you already have a account <br></br>
          <Link to="/login">Login here</Link>
        </p>
      </div>

      <Footer />
    </>
  );
}

export default Register;
