import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DefaultTemplate from "../Template/DefaultTemplate";
import "../style/JobDetails.css";
import { Button } from "react-bootstrap";

const JobDetails = ({ jobs }) => {
  const { jobId } = useParams();
  const [users, setUsers] = useState([]);
  const [applied, setApplied] = useState(false);
  const [applicationList, setApplicationList] = useState([]);
  const navigate = useNavigate();
  const currentUser = JSON.parse(sessionStorage.getItem("currUser"));
  const selectedJob = jobs.find((job) => job.id === Number(jobId));
  useEffect(() => {
    fetch("http://localhost:9999/Application")
      .then((res) => res.json())
      .then((result) => {
        setApplicationList(result);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:9999/user?RoleId=2")
      .then((res) => res.json())
      .then((result) => {
        setUsers(result);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    const checkApplied = async () => {
      if (currentUser != null && selectedJob != null) {
        applicationList.map((a) => {
          if (a.JobId == selectedJob.id && a.UserId == currentUser.id) {
            setApplied(true);
          }
        });
      }
    };
    checkApplied();
  }, [applicationList, currentUser, selectedJob]);

  if (!selectedJob) {
    return <div>Job not found.</div>;
  }

  const handleApply = () => {
    const d = new Date();
    if (currentUser == null) {
      // Người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
      navigate("/login");
    } else {
      // Người dùng đã đăng nhập, thực hiện logic ứng tuyển tại đây
      // ...
      const newApplication = {
        id: 0,
        JobId: selectedJob.id,
        UserId: currentUser.id,
        ApplyDate:
          d.getFullYear() +
          "-" +
          (d.getMonth() + 1 >= 10
            ? d.getMonth() + 1
            : "0" + (d.getMonth() + 1)) +
          "-" +
          d.getDate(),
        Status: 0,
      };
      fetch("http://localhost:9999/Application", {
        method: "POST",
        headers: { "Content-Type": "Application/JSON" },
        body: JSON.stringify(newApplication),
      }).then(() => {
        alert("add success");
        setApplied(true);
      });
      // Lưu dữ liệu hoặc thực hiện các tác vụ khác
      // ...
    }
  };
  const company = users.find((user) => user.id === selectedJob.UserId);

  return (
    <DefaultTemplate>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <div className="job-details-image">
              <img src={company?.imgPath} alt="User" className="user-image" />
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="job-details-description">
              <h2>{selectedJob.JobName}</h2>
              <p>{selectedJob.JobDescription}</p>
              <p>Recruitment Goal: {selectedJob.RecuitmentGoal}</p>
              <p>Posted on: {selectedJob.PostDate}</p>
              <p>End Date: {selectedJob.EndDate}</p>
              {(() => {
                if (currentUser == null) {
                  return applied ? (
                    <Button className="btn-secondary" disabled={true}>
                      Applied
                    </Button>
                  ) : (
                    <Button onClick={handleApply} className="btn-success">
                      Apply
                    </Button>
                  );
                } else if (currentUser.RoleId == 1) {
                  return applied ? (
                    <Button className="btn-secondary" disabled={true}>
                      Applied
                    </Button>
                  ) : (
                    <Button onClick={handleApply} className="btn-success">
                      Apply
                    </Button>
                  );
                }
              })()}
            </div>
          </div>
        </div>
      </div>
    </DefaultTemplate>
  );
};

export default JobDetails;
