import { Button, Col, Row } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import "../style/stylingSon.css";
import "../style/main.css";
export default function Header() {
  // const checkLoggedIn = (e) => {
  //   const currUser = sessionStorage.getItem("currUser");
  //   if (currUser == null) {
  //     window.location.href = "/login"
  //   }
  // };
  return (
    <Row className="Header">
      <div className="row mock"></div>
      {/* <Col className="col-6 left">
                <ul>
                    <li>
                        <NavLink to="/" className={({ isActive })=>(isActive?"Active-nav":"InActive-nav")}>Home Page</NavLink>
                    </li>
                </ul>
            </Col>
            <Col className="col-6 right">
                <ul>
                    <li>
                        <NavLink to="/PersonalProfile" className={({ isActive })=>(isActive?"Active-nav":"InActive-nav")}>Personal Profile</NavLink>
                    </li>
                </ul>
            </Col> */}
      <nav class="navbar navbar-expand-xl fixed-top">
        <div class="container">
          <a class="navbar-brand" href="/">
            <img
              className="w-100"
              src={process.env.PUBLIC_URL + "asset/img/icon/company-logo.svg"}
              alt=""
            />
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="fas fa-bars"></i>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-card-item">
                {/* <a class="nav-link  active" href="index.html">Home</a> */}
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "Active-nav" : "InActive-nav"
                  }
                >
                  Home Page
                </NavLink>
              </li>
              {(() => {
                if (JSON.parse(sessionStorage.getItem("currUser")) != null) {
                  if (
                    JSON.parse(sessionStorage.getItem("currUser")).RoleId == 1
                  ) {
                    return (
                      <li class="nav-card-item">
                        <NavLink
                          to="/UserApplicationTracking"
                          className={({ isActive }) =>
                            isActive ? "Active-nav" : "InActive-nav"
                          }
                        >
                          Applications Tracking
                        </NavLink>
                      </li>
                    );
                  } else if (
                    JSON.parse(sessionStorage.getItem("currUser")).RoleId == 2
                  ) {
                    return (
                      <li class="nav-card-item">
                        <NavLink
                          to="/CompanyJobTracking"
                          className={({ isActive }) =>
                            isActive ? "Active-nav" : "InActive-nav"
                          }
                        >
                          Job Post Tracking
                        </NavLink>
                      </li>
                    );
                  } else if (
                    JSON.parse(sessionStorage.getItem("currUser")).RoleId == 3
                  ) {
                    return (
                      <li class="nav-card-item">
                        <NavLink
                          to="/AdminDashBoard"
                          className={({ isActive }) =>
                            isActive ? "Active-nav" : "InActive-nav"
                          }
                        >
                          Admin DashBoard
                        </NavLink>
                      </li>
                    );
                  }
                }
              })()}
              {(() => {
                if (JSON.parse(sessionStorage.getItem("currUser")) != null) {
                  return (
                    <li class="nav-card-item">
                      <NavLink
                        to="/Inbox"
                        className={({ isActive }) =>
                          isActive ? "Active-nav" : "InActive-nav"
                        }
                      >
                        Inbox
                      </NavLink>
                    </li>
                  );
                }
              })()}
            </ul>
            <ul class="right navbar-nav ms-auto">
              <li class="nav-card-item-right">
                <NavLink
                  to="/PersonalProfile"
                  // onClick={checkLoggedIn}
                  className={({ isActive }) =>
                    isActive ? "Active-nav" : "InActive-nav"
                  }
                >
                  Personal Profile
                </NavLink>
              </li>
              <li class="nav-card-item-right create-account">
                {/* <a class="nav-link" href="#">Create account</a> */}
                <Link to={"/register"} className="nav-link">
                  Create account
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </Row>
  );
}
