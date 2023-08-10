import { useEffect, useState } from "react";
import { Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../style/stylingSon.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faHome } from "@fortawesome/free-solid-svg-icons";
export default function RecruiterList() {
  const [recruiterList, setRecruiterList] = useState([]);
  const [ApplicationList, setApplicationList] = useState([]);
  const [MostAppliedJob, setMostAppliedJob] = useState([]);
  useEffect(() => {
    fetch("http://localhost:9999/user")
      .then((res) => res.json())
      .then((result) => {
        setRecruiterList(result.filter((r) => r.RoleId == 2));
      });
  }, []);
  return (
    <Row className="RecruiterList">
      <Row className="RecruiterListHeader">
        <h3>Nhà tuyển dụng Nổi bật</h3>
        <Link to="#">Xem tất cả</Link>
      </Row>
      <Row className="col-11 recruiterContent">
        {recruiterList.map((r) => (
          <div className="recruiterContentLeft col-3">
            <img src={r.imgPath} className="img-fluid img-responsive col-12" />
          </div>
        ))}
      </Row>
    </Row>
  );
}
