import { useParams } from "react-router-dom";
import DefaultTemplate from "../Template/DefaultTemplate";
import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import "../style/stylingSon.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function ProceedApplication() {
  const { ApplicationId } = useParams();
  const [Application, setApplication] = useState({});
  const [Applicant, SetApplicant] = useState({});
  const [fieldOfExpertiseList, setFieldOfExpertiseList] = useState([]);
  const [id, setId] = useState(0);
  const [JobId, setJobId] = useState(0);
  const [UserId, setUserId] = useState(0);
  const [ApplyDate, setApplyDate] = useState("");
  useEffect(() => {
    const fetchApplication = async () => {
      const response = await fetch(
        "http://localhost:9999/Application/" + ApplicationId
      );
      const applicationData = await response.json();
      setApplication(applicationData);
      setId(ApplicationId);
      setJobId(applicationData.JobId);
      setUserId(applicationData.UserId);
      setApplyDate(applicationData.ApplyDate);
    };
    fetchApplication();
  }, []);
  useEffect(() => {
    if (Application) {
      const fetchUser = async () => {
        const response = await fetch(
          "http://localhost:9999/user/" + Application.UserId
        );
        const UserData = await response.json();
        SetApplicant(UserData);
      };
      fetchUser();
    }
  }, [Application]);
  useEffect(() => {
    fetch("http://localhost:9999/FieldOfExpertise")
      .then((resp) => resp.json())
      .then((response) => {
        setFieldOfExpertiseList(response);
      });
  }, []);
  const setApplicationSatus = (Status) => {
    // Status.preventDefault();
    let UpdatedApplication = {
      id,
      JobId,
      UserId,
      ApplyDate,
      Status,
    };
    console.log(UpdatedApplication);
    fetch("http://localhost:9999/Application/" + id, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(UpdatedApplication),
    }).then(() => {
      if (Status == 2) {
        toast.success("The Application has been accepted");
      }else if(Status == 1){
        toast.success("The Application has been rejected")
      }
    });
  };
  return (
    <DefaultTemplate>
      <ToastContainer />
      <Row className="ApplicantImgProceed">
        <img id="ProceedApplicantImg" src={Applicant.imgPath} />
      </Row>
      <Row className="Wrapper">
        <Row className="ApplicantInfo">
          <h6>Name: {Applicant.Name}</h6>
          <h6>Email: {Applicant.email}</h6>
          <h6>Address: {Applicant.address}</h6>
          <h6>Introduction: {Applicant.Introduction}</h6>
          <h6>
            OnlineCv: <a href={Applicant.OnlineCv}>:Đ</a>
          </h6>
          <h6>
            FieldOfExpertise:
            {fieldOfExpertiseList.map((e) =>
              Applicant.fieldOfExpertise == e.id ? " " + e.FieldOfExpertise : ""
            )}
          </h6>
          <h6>Year of Experience: {Applicant.Experience}</h6>
          <h6>Applied on: {Application.ApplyDate}</h6>
        </Row>
      </Row>
      <Row className="Action">
        <button onClick={(e) => setApplicationSatus(2)}>Accept</button>
        <button onClick={(e) => setApplicationSatus(1)}>Reject</button>
      </Row>
    </DefaultTemplate>
  );
}
