import { Row } from "react-bootstrap";
import DefaultTemplate from "../Template/DefaultTemplate";
import PendingJobPosts from "../Component/PendingJobPosts";

export default function ProceedJobPost() {
  return (
    <DefaultTemplate>
      <Row>
        <PendingJobPosts />
      </Row>
    </DefaultTemplate>
  );
}
