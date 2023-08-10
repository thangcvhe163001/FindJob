import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table, Modal } from "react-bootstrap";
import UnauthorizedAccessErr from "./UnauthorizedAccessErr";

export default function PendingJobPosts() {
  const [PendingJob, setPendingJob] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [test, setTest] = useState(0);
  const [showModal, setShow] = useState(false);
  const displayList = [];
  const [SelectedJob, setSelectedJob] = useState({});
  const [action, setAction] = useState(false);
  useEffect(() => {
    fetch("http://localhost:9999/JobPost")
      .then((response) => response.json())
      .then((res) => {
        setPendingJob(res.filter((j) => j.Status === 1));
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:9999/user")
      .then((response) => response.json())
      .then((res) => {
        setCompanyList(res.filter((j) => j.RoleId === 2));
      });
  }, []);

  PendingJob.map((pj) => {
    const matchingCompany = companyList.find((c) => c.id === pj.UserId);
    const mergedInfo = {
      id: pj.id,
      jobName: pj.JobName,
      JobDescription: pj.JobDescription,
      RecuitmentGoal: pj.RecuitmentGoal,
      PostDate: pj.PostDate,
      EndDate: pj.EndDate,
      CompanyName: matchingCompany ? matchingCompany.Name : null,
      CompanyId: matchingCompany ? matchingCompany.id : null,
      Cid: pj.Cid,
      Status: pj.Status,
    };
    displayList.push(mergedInfo);
  });
  const HanldeUpdate = () => {
    console.log(SelectedJob);
    const UpdatedJobPost = {
      id: SelectedJob.id,
      JobName: SelectedJob.jobName,
      JobDescription: SelectedJob.JobDescription,
      RecuitmentGoal: SelectedJob.RecuitmentGoal,
      PostDate: SelectedJob.PostDate,
      EndDate: SelectedJob.EndDate,
      UserId: SelectedJob.CompanyId,
      Cid: SelectedJob.Cid,
      Status: action == true ? 3 : 2,
    };
    fetch("http://localhost:9999/JobPost/" + SelectedJob.id, {
      method: "PUT",
      headers: { "Content-Type": "Application/JSON" },
      body: JSON.stringify(UpdatedJobPost),
    }).then(() => {
      setShow(false);
      fetch("http://localhost:9999/JobPost")
        .then((response) => response.json())
        .then((res) => {
          setPendingJob(res.filter((j) => j.Status === 1));
        });
    });
  };

  const confirmUpdate = (job, accepted) => {
    setShow(true);
    setSelectedJob(job);
    setAction(accepted);
  };
  if (JSON.parse(sessionStorage.getItem("currUser")) == null) {
    window.location.href = "/login";
  } else {
    if (JSON.parse(sessionStorage.getItem("currUser")).RoleId == 3) {
      return (
        <Container>
          <Modal show={showModal} centered>
            <Modal.Body>Confirm update</Modal.Body>
            <Modal.Footer>
              <Button variant="success" onClick={(e) => HanldeUpdate()}>
                Yes
              </Button>
              <Button variant="danger" onClick={(e) => setShow(false)}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
          <Table className="pendingJobsTable">
            <thead>
              <tr>
                <td>Job Name</td>
                <td className="col-lg-4">Job Description</td>
                <td className="col-lg-2">Post By</td>
                <td className="col-lg-1">Recruitment Goal</td>
                <td>Post Date</td>
                <td>End Date</td>
                <td className="col-lg-1">Action</td>
              </tr>
            </thead>
            <tbody>
              {displayList.map((pj) => (
                <tr key={pj.id}>
                  <td>{pj.jobName}</td>
                  <td className="col-lg-4">{pj.JobDescription}</td>
                  <td className="col-lg-2">{pj.CompanyName}</td>
                  <td className="col-lg-1">{pj.RecuitmentGoal}</td>
                  <td>{pj.PostDate}</td>
                  <td>{pj.EndDate}</td>
                  <td className="col-lg-1" style={{ padding: "10px" }}>
                    <Row>
                      <Button
                        onClick={(e) => confirmUpdate(pj, false)}
                        className="btn-danger"
                      >
                        Reject
                      </Button>
                      <Button
                        onClick={(e) => confirmUpdate(pj, true)}
                        className="btn-info"
                      >
                        Accept
                      </Button>
                    </Row>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      );
    } else {
      return <UnauthorizedAccessErr />;
    }
  }
}
