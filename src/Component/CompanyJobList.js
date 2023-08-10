import { useEffect, useState } from "react";
import { Container, Form, FormGroup, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import UnauthorizedAccessErr from "./UnauthorizedAccessErr";

export default function CompanyJobList() {
  const [currUser, setCurrUser] = useState({});
  const [JobPostList, setJobPostList] = useState([]);
  const [filteredJobList, setFilteredJobList] = useState([]);
  const [StatusList, setStatusList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  //   setCurrUser(JSON.parse(sessionStorage.getItem("currUser")));
  useEffect(() => {
    setCurrUser(JSON.parse(sessionStorage.getItem("currUser")));
  }, {});
  useEffect(() => {
    const fetchJobList = async () => {
      const response = await fetch("http://localhost:9999/JobPost");
      const JobListData = await response.json();
      setJobPostList(JobListData);
    };
    fetchJobList();
  }, []);
  useEffect(() => {
    fetch("http://localhost:9999/JobStatus")
      .then((resp) => resp.json())
      .then((response) => {
        setStatusList(response);
      });
  }, []);
  useEffect(() => {
    const filteredList = JobPostList.filter((j) => j.UserId == currUser.id);
    setFilteredJobList(filteredList);
  }, [JobPostList, currUser]);
  const SortByDate = (e, sortby) => {
    const newJobList = [...filteredJobList];
    if (sortby == "post") {
      newJobList.sort((a, b) => (a.PostDate > b.PostDate ? -1 : 1));
    } else {
      newJobList.sort((a, b) => (a.EndDate > b.EndDate ? -1 : 1));
    }
    setFilteredJobList(newJobList);
  };
  const HandleSearch = (e) => {
    setSearchKeyword(e);
  };
  const jobList = filteredJobList.filter((job) =>
    job.JobName.toLowerCase().includes(searchKeyword.toLowerCase())
  );
  if (JSON.parse(sessionStorage.getItem("currUser")) == null) {
    window.location.href = "/login";
  } else {
    if (JSON.parse(sessionStorage.getItem("currUser")).RoleId == 2) {
      return (
        <Container>
          <Row>
            <Form>
              <Form.Group
                className="col-lg-5"
                style={{
                  margin: "0 auto",
                  border: "1px solid #92d35e",
                  borderRadius: "10px",
                }}
              >
                <Form.Control
                  type="text"
                  placeholder="Search Job By Name"
                  onChange={(e) => HandleSearch(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Row>
          <Row>
            <Table className="table-striped">
              <thead>
                <tr>
                  <td>
                    <h6>Job Name</h6>
                  </td>
                  <td className="col-lg-5">
                    <h6>Job Description</h6>
                  </td>
                  <td className="col-lg-1">
                    <h6>Recruitment Goal</h6>
                  </td>
                  <td>
                    <h6>
                      <button
                        style={{
                          border: "none",
                          backgroundColor: "inherit",
                          fontWeight: "bold",
                        }}
                        onClick={(e) => SortByDate(e, "post")}
                      >
                        Post Date
                      </button>
                    </h6>
                  </td>
                  <td>
                    <h6>
                      <button
                        style={{
                          border: "none",
                          backgroundColor: "inherit",
                          fontWeight: "bold",
                        }}
                        onClick={(e) => SortByDate(e, "close")}
                      >
                        Close Date
                      </button>
                    </h6>
                  </td>
                  <td>
                    <h6>Status</h6>
                  </td>
                </tr>
              </thead>
              <tbody>
                {jobList.map((j) => (
                  <tr key={j.id}>
                    <td>
                      <Link className="JobLink" to={"/ApplicationList/" + j.id}>
                        {j.JobName}
                      </Link>
                    </td>
                    <td className="col-lg-5">{j.JobDescription}</td>
                    <td className="col-lg-1">{j.RecuitmentGoal}</td>
                    <td>{j.PostDate}</td>
                    <td>{j.EndDate}</td>
                    {StatusList.map((s) => {
                      if (s.id == j.Status) {
                        switch (s.id) {
                          case 1:
                            return <td className="pendingJob">{s.text}</td>;
                            break;
                          case 2:
                            return <td className="RejectedJob">{s.text}</td>;
                            break;
                          case 3:
                            return <td className="ActiveJob">{s.text}</td>;
                            break;
                          case 4:
                            return <td className="CloseJob">{s.text}</td>;
                            break;
                          default:
                            console.log("err");
                            break;
                        }
                      }
                    })}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
        </Container>
      );
    } else {
      return <UnauthorizedAccessErr />;
    }
  }
}
