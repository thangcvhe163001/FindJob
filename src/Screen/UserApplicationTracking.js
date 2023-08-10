import { Col, Row } from "react-bootstrap";
import MyApplication from "../Component/MyApplication";
import DefaultTemplate from "../Template/DefaultTemplate";

export default function UserApplicationTracking() {
  return (
    <DefaultTemplate>
      <Row>
        <Col className="CurrentJob" lg={10} style={{ margin: "30px auto" }}>
          <h4>My applications</h4>
          <MyApplication />
        </Col>
      </Row>
    </DefaultTemplate>
  );
}
