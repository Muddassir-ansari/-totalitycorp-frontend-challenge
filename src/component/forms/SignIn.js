import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SignIn = () => {
  const [alertBox, setAlertBox] = useState("none");
  const [alertMsg, setAlertMsg] = useState("");
  const navigate = useNavigate();
  const mobileRef = useRef();
  const passwordRef = useRef();
  // function to handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    let details = JSON.parse(sessionStorage.getItem("user"));
    if (details == null) {
      setAlertBox("block");
      setAlertMsg("Your account doesn't exist,please create an account");
    } else {
      for (let i = 0; i < details.length; i++) {
        // Validation Checked
        if (details[i].mobile !== mobileRef.current.value) {
          setAlertBox("block");
          setAlertMsg("Incorrect Mobile Number");
        } else if (details[i].password !== passwordRef.current.value) {
          setAlertBox("block");
          setAlertMsg("Incorrect Password");
        } else {
          sessionStorage.setItem("CurrentUser",details[i].name)
          navigate("/ProductPage");
          alert("Logged in successfully");
        }
      }
    }
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        paddingTop: "5rem",
        background: "#efe4ee",
      }}
    >
      <div
        className="card m-auto p-3 mt-1 shadow"
        style={{ width: "50%", background: "#ededed" }}
      >
        <h3 className="mb-4 text-center">
          {" "}
          <i className="fas fa-sign-in-alt"></i>&nbsp;Login to your account{" "}
        </h3>
        <form className="row g-3">
          <div className="form-floating mb-3 col-md-6">
            <input
              autoFocus
              type="text"
              className="form-control"
              ref={mobileRef}
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">
              <i class="fa fa-mobile"></i>
              &nbsp;Mobile
            </label>
          </div>
          <div className="form-floating mb-3 col-md-6">
            <input
              type="password"
              className="form-control"
              ref={passwordRef}
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">
              <i class="fa fa-key"></i>&nbsp;Password
            </label>
          </div>
          {/* Alert Box Open */}
          <div
            className="alert alert-warning alert-dismissible fade show"
            role="alert"
            style={{ display: alertBox }}
          >
            <strong>Ooopss !!!</strong>&nbsp;{alertMsg}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
          {/* Alert Box Close */}
          <div className="d-grid gap-2">
            <button
              className="btn btn-success btn-lg text-white"
              type="button"
              onClick={handleLogin}
              style={{ background: "#5c355b" }}
            >
              Log In
            </button>
          </div>
          <div className="">
            <p>
              New user ? <Link to="/">Click here to Create an account.</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
