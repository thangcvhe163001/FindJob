import { Container, Row } from "react-bootstrap";
import DefaultTemplate from "../Template/DefaultTemplate";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faGear,
  faUser,
  faCalendarCheck,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
export default function ApplicationList() {
  const {JobId} = useParams();
  console.log(JobId);
  // const JobId = 3;
  const [JobName, setJobName] = useState("");
  const [ApplicationList, setApplicationList] = useState([]);
  const [UserList, setUser] = useState([]);
  const [FieldOfExpertiseList, setFieldOfExpertiseList] = useState([]);
  const [filter, setFilter] = useState(0);
  const [userEx, setUserEx] = useState([]);
  const [FoundApp, SetFoundApp] = useState([]);
  // const [AppAndUser, setAppAndUser]

  useEffect(() => {
    fetch(" http://localhost:9999/Application/")
      .then((resp) => resp.json())
      .then((response) => {
        if (filter === 0) {
          setApplicationList(response.filter((a) => ((a.JobId == JobId)&&(a.Status == 0))));
        } else {
          userEx.map((eu) => {
            response.map((a) => {
              if (a.UserId == eu.id && a.JobId == JobId) {
                console.log("found, aid: " + a.id + ", userid: " + eu.id);
                SetFoundApp(FoundApp.push(a));
              }
            });

            console.log("--------");
          });
          setApplicationList(FoundApp);
          SetFoundApp([]);
        }
      });
  }, [filter]);
  useEffect(() => {
    fetch("http://localhost:9999/JobPost/" + JobId)
      .then((resp) => resp.json())
      .then((response) => {
        setJobName(response.JobName);
      });
  }, []);
  
  useEffect(() => {
    fetch("http://localhost:9999/FieldOfExpertise")
      .then((resp) => resp.json())
      .then((response) => {
        setFieldOfExpertiseList(response);
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:9999/user")
      .then((resp) => resp.json())
      .then((response) => {
        setUser(response);
      });
  }, []);

  const filterByExpertise = (e) => {
    let ul = UserList;
    setUserEx(ul.filter((u) => u.fieldOfExpertise == e && u.RoleId == 1));
    setFilter(e);
  };

  const sortApplication = (type) => {
    const newAppList = [...ApplicationList];
    if (type === "id") {
      newAppList.sort((a, b) => a.id - b.id);
    } else if (type === "yoe") {
      newAppList.sort((a, b) => a.id - b.id);
    } else if (type === "recent") {
      console.log("recent");
      newAppList.sort((a, b) => (a.ApplyDate > b.ApplyDate ? 1 : -1));
    } else if (type === "latest") {
      console.log("latest");
      newAppList.sort((a, b) => (b.ApplyDate > a.ApplyDate ? 1 : -1));
    }
    setApplicationList(newAppList);
  };

  return (
    <DefaultTemplate>
      <Container>
        <Row>
          <h4>
            Applications for:{" "}
            <p style={{ color: "#63ac28", display: "inline-block" }}>
              {JobName}
            </p>
          </h4>
        </Row>
        <Row>
          <div className="searchBar">
            <form>
              <input placeholder="   Search Application By Email" />
              <button type="submit">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </form>
            <div className="filterByExpertise">
              {FieldOfExpertiseList.map((f) => (
                <span
                  key={f.id}
                  onClick={(e) => filterByExpertise(f.id)}
                  className="field"
                >
                  <a>{f.FieldOfExpertise}</a>
                  <span> | </span>
                </span>
              ))}
              <span onClick={(e) => filterByExpertise(0)} className="field">
                <a>All</a>
              </span>
            </div>
            <div className="sortApplication">
              <h6 style={{ display: "inline-block" }}>
                Sort By:{"\u00A0"}
                {"\u00A0"}
              </h6>
              <select
                name="sortType"
                style={{ width: "110px", marginTop: "10px" }}
                onChange={(e) => sortApplication(e.target.value)}
              >
                <option value={"id"}>Default</option>
                <option value={"yoe"}>Years Of Experience</option>
                <option value={"recent"}>Oldest</option>
                <option value={"latest"}>Most Recent</option>
              </select>
            </div>
          </div>
        </Row>
        <Row>
          {ApplicationList.map((a) =>
            UserList.map((u) => {
              if (a.UserId == u.id) {
                return (
                  <Link className="proceedLink" to={"/ProceedApplication/"+a.id}>
                    <div key={a.id} className="Applications col-lg-7 col-sm-12">
                      <img className="ApplicantImg" src={u.imgPath} />
                      <div className="applicantInfo">
                        <h6>
                          <FontAwesomeIcon icon={faUser} />
                          {"\u00A0"}
                          {u.Name}
                        </h6>
                        {FieldOfExpertiseList.map((e) => {
                          if (e.id == u.fieldOfExpertise) {
                            return (
                              <h6>
                                <FontAwesomeIcon icon={faGear} />
                                {"\u00A0"}
                                {e.FieldOfExpertise}
                              </h6>
                            );
                          }
                        })}
                        <h6>
                          <FontAwesomeIcon icon={faEnvelope} />
                          {"\u00A0"}
                          {u.email}
                        </h6>
                        <h6>
                          <FontAwesomeIcon icon={faCalendarCheck} />
                          {"\u00A0"}
                          {a.ApplyDate}
                        </h6>
                        <h6>{u.Experience} of Experience</h6>
                      </div>
                    </div>
                  </Link>
                );
              }
            })
          )}
        </Row>
      </Container>
    </DefaultTemplate>
  );
}
