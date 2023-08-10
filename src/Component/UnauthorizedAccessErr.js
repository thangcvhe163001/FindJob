import { Image, Row } from "react-bootstrap";

export default function UnauthorizedAccessErr() {
  return (
    <Row>
      <Image style={{width: "450px", height: "400px", margin: "0 auto"}} src={process.env.PUBLIC_URL + "asset/img/tempAvatar.jpg"} />
      <h5 style={{textAlign: "center"}}><strong style={{color: "red"}}>401</strong>: Unauthorized Access</h5>
    </Row>
  );
}
