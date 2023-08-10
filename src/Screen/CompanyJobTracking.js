import { Col, Row } from "react-bootstrap";
import CompanyJobList from "../Component/CompanyJobList";
import DefaultTemplate from "../Template/DefaultTemplate";
import { Link } from "react-router-dom";

export default function CompanyJobTracking() {
  return (
    <DefaultTemplate>
      <Row>
        <Col className="CurrentJob" lg={10} style={{ margin: "30px auto"}}>
          <h4>Company's Job</h4>
          <Link to={"/AddJobScreen"}>Add Job</Link>
          <CompanyJobList />
        </Col>
      </Row>
    </DefaultTemplate>
  );
}
