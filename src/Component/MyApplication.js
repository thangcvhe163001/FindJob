import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function MyApplication() {
  const [ApplicationList, setApplicationList] = useState([]);
  const [currUser, setCurrUser] = useState({});
  const [JobList, setJobList] = useState([]);
  const [CompanyList, setCompanyList] = useState([]);
  const [ApplicationStatusList, setApplicationStatusList] = useState([]);
  const displayList = [];
  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem("currUser")) == null) {
      window.location.href = "/login";
    } else {
      setCurrUser(JSON.parse(sessionStorage.getItem("currUser")));
    }
  }, []);
  useEffect(() => {
    fetch("http://localhost:9999/Application/")
      .then((res) => res.json())
      .then((res) => {
        setApplicationList(res.filter((a) => a.UserId == currUser.id));
      });
  }, [currUser]);
  useEffect(() => {
    fetch("http://localhost:9999/JobPost/")
      .then((res) => res.json())
      .then((res) => {
        setJobList(res);
      });
    fetch("http://localhost:9999/user/")
      .then((res) => res.json())
      .then((res) => {
        setCompanyList(res.filter((u) => u.RoleId == 2));
      });
    fetch("http://localhost:9999/AppStatus/")
      .then((res) => res.json())
      .then((res) => {
        setApplicationStatusList(res);
      });
  }, []);
  ApplicationList.map((a) => {
    const matchingJObs = JobList.find((j) => j.id == a.JobId);
    //name lol
    const appandJobCombined = {
      id: a.id,
      jobId: matchingJObs ? matchingJObs.id : null,
      jobname: matchingJObs ? matchingJObs.JobName : null,
      Company: matchingJObs ? matchingJObs.UserId : null,
      ApplyDate: a.ApplyDate,
      CloseDate: matchingJObs ? matchingJObs.EndDate : null,
      Status: a.Status,
    };
    displayList.push(appandJobCombined);
  });
  return (
    <Table>
      <thead>
        <tr>
          <td className="col-lg-3">Job name</td>
          <td className="col-lg-4">Company</td>
          <td className="col-lg-2">Apply Date</td>
          <td className="col-lg-2">Close Date</td>
          <td className="col-lg-1">Status</td>
        </tr>
      </thead>
      <tbody>
        {displayList.map((a) => (
          <tr key={a.id}>
            <td className="col-lg-3"><Link to={"/JobDetails/"+a.jobId} style={{textDecoration:"none"}}>{a.jobname}</Link></td>
            <td className="col-lg-4">
              {CompanyList.map((c) => (c.id == a.Company ? c.Name : ""))}
            </td>
            <td className="col-lg-2">{a.ApplyDate}</td>
            <td className="col-lg-2">{a.CloseDate}</td>

            {ApplicationStatusList.map((ap) => {
              if (ap.id == a.Status) {
                switch(ap.id){
                    case 0: return <td className="col-lg-1 pendingJob">{ap.StatusText}</td>
                            break;
                    case 1: return <td className="col-lg-1 RejectedJob">{ap.StatusText}</td>
                            break;
                    case 2: return <td className="col-lg-1 ActiveJob">{ap.StatusText}</td>
                            break;
                }
              }
            })}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
