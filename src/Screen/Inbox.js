import { Button, Col, Container, NavLink, Row } from "react-bootstrap";
import DefaultTemplate from "../Template/DefaultTemplate";
import { Link } from "react-router-dom";
import "../style/stylingSon.css";
import { faMailBulk, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
export default function Inbox() {
  const [tab, setTab] = useState("inboxbutton");
  const [inboxList, setInbox] = useState([]);
  const [sentList, setSentList] = useState([]);
  const [userList, setUserList] = useState([]);
  const displayList = [];
  useEffect(() => {
    fetch("http://localhost:9999/Message")
      .then((response) => response.json())
      .then((data) => {
        setInbox(
          data.filter(
            (i) =>
              i.receiverId == JSON.parse(sessionStorage.getItem("currUser")).id
          )
        );
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:9999/Message")
      .then((response) => response.json())
      .then((data) => {
        setSentList(
          data.filter(
            (i) =>
              i.senderId == JSON.parse(sessionStorage.getItem("currUser")).id
          )
        );
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:9999/user")
      .then((response) => response.json())
      .then((data) => {
        setUserList(data);
      });
  }, []);
  const ChangeButtonVisual = (e) => {
    var button = document.getElementById(e);
    button.classList.add("active");
    setTab(e);
    if (e == "sentButton") {
      var otherButton = document.getElementById("inboxbutton");
      otherButton.classList.remove("active");
    } else {
      var otherButton = document.getElementById("sentButton");
      otherButton.classList.remove("active");
    }
  };
  // useEffect(() => {
  //   if (tab == "inboxbutton") {
  //     console.log("eeeee");
  //     if (userList != null) {
  //       inboxList.map((m) => {
  //         const Sender = userList.find((u) => u.id == m.senderId);
  //         console.log(Sender.id);
  //         const displayMessage = {
  //           id: 0,
  //           senderId: Sender.id,
  //           senderName: Sender.Name,
  //           senderEmail: Sender.email,
  //           receiverId: JSON.parse(sessionStorage.getItem("currUser")).id,
  //           content: m.content,
  //           sentDate: m.sentDate,
  //         };
  //         displayList.push(displayMessage);
  //       });
  //       console.log(displayList.length);
  //     }
  //   }
  // }, []);
  if (userList != null && userList.length > 0) {
    if (tab == "inboxbutton") {
      inboxList.map((m) => {
        const Sender = userList.find((u) => u.id == m.senderId);
        const displayMessage = {
          id: 0,
          senderId: Sender.id,
          senderName: Sender.Name,
          senderEmail: Sender.email,
          receiverId: JSON.parse(sessionStorage.getItem("currUser")).id,
          content: m.content,
          sentDate: m.sentDate,
        };
        displayList.push(displayMessage);
      });
    } else {
      sentList.map((m) => {
        const receiver = userList.find((u) => u.id == m.receiverId);
        const displayMessage = {
          id: 0,
          // senderId: JSON.parse(sessionStorage.getItem("currUser")).id,
          // senderName: JSON.parse(sessionStorage.getItem("currUser")).Name,
          // senderEmail: JSON.parse(sessionStorage.getItem("currUser")).email,
          receiverId: receiver.id,
          receiverName: receiver.Name,
          receiverEmail: receiver.email,
          content: m.content,
          sentDate: m.sentDate,
        };
        displayList.push(displayMessage);
      });
    }
  }
  return (
    <DefaultTemplate>
      <Container fluid style={{ padding: "0px" }}>
        <Row style={{ height: "100%" }}>
          <Col
            lg={2}
            style={{ backgroundColor: "#f4f4eb", height: "100%" }}
            className="InboxSideBar"
          >
            <Row>
              <button
                id="inboxbutton"
                className="active"
                onClick={(e) => ChangeButtonVisual("inboxbutton")}
              >
                <h5>
                  <FontAwesomeIcon icon={faMailBulk} /> Inbox
                </h5>
              </button>
            </Row>
            <Row>
              <button
                id="sentButton"
                onClick={(e) => ChangeButtonVisual("sentButton")}
              >
                <h5>
                  <FontAwesomeIcon icon={faPaperPlane} /> Sent
                </h5>
              </button>
            </Row>
          </Col>
          <Col lg={10}>
            {displayList.map((m) => {
              if (tab == "inboxbutton") {
                return (
                  <Row
                    style={{
                      border: "none",
                      borderBottom: "1px solid #9a9a9a",
                      padding: "10px",
                    }}
                  >
                    <Row>
                      <h6>From: {m.senderName}</h6>
                      <p style={{ fontSize: "80%" }}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {m.senderEmail}
                      </p>
                      <Row
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <p className="col-lg-8">
                          <h6>Content: </h6> {m.content}
                        </p>

                        <p
                          className="col-lg-4"
                          style={{ textAlign: "right", verticalAlign: "top" }}
                        >
                          Sent: {m.sentDate}
                        </p>
                      </Row>
                    </Row>
                  </Row>
                );
              } else {
                return (
                  <Row
                    style={{
                      border: "none",
                      borderBottom: "1px solid #9a9a9a",
                      padding: "10px",
                    }}
                  >
                    <Row>
                      <h6>to: {m.receiverName}</h6>
                      <p style={{ fontSize: "80%" }}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {m.receiverEmail}
                      </p>
                      <Row
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <p className="col-lg-8">
                          <h6>Content: </h6> {m.content}
                        </p>

                        <p
                          className="col-lg-4"
                          style={{ textAlign: "right", verticalAlign: "top" }}
                        >
                          Sent: {m.sentDate}
                        </p>
                      </Row>
                    </Row>
                  </Row>
                );
              }
            })}
          </Col>
        </Row>
      </Container>
    </DefaultTemplate>
  );
}
