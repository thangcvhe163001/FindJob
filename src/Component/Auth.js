import React, { useEffect, useRef, useState } from "react";
import { Await, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Login() {
  const [currUser, setCurrUser] = useState({});
  const [UserList, setUserList] = useState([]);
  const email = useRef(null);
  const password = useRef(null);
  useEffect(() => {
    // setCurrUserId(3); // Update the currUserId value using the setter function
    fetch(`http://localhost:9999/user`)
      .then((res) => res.json())
      .then((result) => {
        setUserList(result);
      });
  }, []);
  const HandleLogin = (e) => {
    e.preventDefault();
    let found = false;
    UserList.map((u) => {
      if (
        u.email === email.current.value &&
        u.password === password.current.value
      ) {
        found = true;
        sessionStorage.setItem("currUser", JSON.stringify(u));
        console.log(JSON.parse(sessionStorage.getItem("currUser")).Name);
      }
    });
    if (found == true) {
      toast.success("Login Succcessfully!");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } else {
      toast.error("Incorrect username and password");
    }
  };
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <ToastContainer />
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Not registered yet?{" "}
            <span className="link-primary">
              <Link to={"/register"} className="nav-link">
                Create account
              </Link>
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              ref={email}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              ref={password}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => HandleLogin(e)}
            >
              Submit
            </button>
          </div>
          {/* <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p> */}
        </div>
      </form>
    </div>
  );
}
