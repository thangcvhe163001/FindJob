import { Row } from "react-bootstrap";
import DefaultTemplate from "../Template/DefaultTemplate";
import PendingJobPosts from "../Component/PendingJobPosts";
export default function AdminDashBoard() {
  return (
    <DefaultTemplate>
      <Row>
        JobPost Statistics
      </Row>
      <Row>
        <h5 style={{ textAlign: "center" }}> - Pending Job Posts - </h5>
      </Row>
      <Row>
        <PendingJobPosts />
      </Row>
    </DefaultTemplate>
  );
}
