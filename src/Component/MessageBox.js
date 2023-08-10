import "../style/stylingSon.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faCommentDots,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { Form, FormControl, FormText, Row } from "react-bootstrap";
import React, { useEffect, useRef, useState } from "react";
export default function MessageBox() {
  const [EmailList, setEmailList] = useState([]);
  const sendToEmail = React.useRef(null);
  const content = React.useRef(null);
  const [valid, setValid] = useState(false);
  const [receiver, setReceiver] = useState({});
  useEffect(() => {
    fetch("http://localhost:9999/user")
      .then((res) => res.json())
      .then((result) => {
        setEmailList(result);
      });
  }, []);
  useEffect(() => {
    EmailList.map((e) => {
      console.log(e.email);
    });
  }, [EmailList]);

  const ShowMessageBox = () => {
    let MessageBox = document.getElementById("MessageBox");
    console.log(MessageBox.style.display);
    MessageBox.style.display =
      MessageBox.style.display == "none" ? "block" : "none";
  };
  const ValidateEmail = (e) => {
    e.preventDefault();
    let found = false;
    let err = document.getElementById("sendtoEmailErr");
    EmailList.map((e) => {
      if (e.email === sendToEmail.current.value) {
        found = true;
        setValid(true);
        fetch("http://localhost:9999/user")
          .then((res) => res.json())
          .then((result) => {
            setReceiver(
              result.find((u) => u.email === sendToEmail.current.value)
            );
          });
      }
    });
    if (found == true) {
      err.style.visibility = "hidden";
    } else {
      err.style.visibility = "visible";
      setValid(false);
    }
    if (sendToEmail.current.value === "") {
      err.style.visibility = "hidden";
    }
    console.log(receiver.id);
  };
  const hideErr = (e) => {
    e.preventDefault();
    let contentErr = document.getElementById("contentErr");
    if (
      content.current.value !== "" &&
      contentErr.style.visibility === "visible"
    ) {
      contentErr.style.visibility = "hidden";
    }
  };
  const HandleMessageSubmit = (e) => {
    e.preventDefault();
    let contentErr = document.getElementById("contentErr");
    let sendButton = document.getElementById("send");
    if (content.current.value === "") {
      contentErr.style.visibility = "visible";
    }
    if (valid === true && content.current.value !== "") {
      var d = new Date();
      const message = {
        id: 0,
        senderId: JSON.parse(sessionStorage.getItem("currUser")).id,
        receiverId: receiver.id,
        content: content.current.value,
        sentDate:
          d.getFullYear() +
          "-" +
          (d.getMonth() + 1 >= 10
            ? d.getMonth() + 1
            : "0" + (d.getMonth() + 1)) +
          "-" +
          d.getDate(),
      };
      fetch("http://localhost:9999/Message", {
        method: "POST",
        headers: { "Content-Type": "Application/JSON" },
        body: JSON.stringify(message),
      }).then(() => {
        alert("sent successfully");
      });
    }
  };
  //   useEffect(() => {
  //     const message = {
  //       id: 0,
  //       senderId: JSON.parse(sessionStorage.getItem("currUser")).id,
  //       receiverId: receiver.id,
  //       content: content.current.value,
  //     };
  //     fetch("http://localhost:9999/Message", {
  //       method: "POST",
  //       headers: { "Content-Type": "Application/JSON" },
  //       body: JSON.stringify(message),
  //     }).then(() => {
  //       alert("sent successfully");
  //     });
  //   }, [receiver]);
  return (
    <div className="MessageBoxWrapper">
      <div id="MessageBox" className="MessageBox" style={{ display: "none" }}>
        <Form>
          <Row>
            <Form.Group className="sendTo col-10">
              <FormText>Send to: </FormText>
              <Form.Control
                type="email"
                placeholder="email@example.com"
                onChange={(e) => ValidateEmail(e)}
                ref={sendToEmail}
              />
              <Form.Text
                id="sendtoEmailErr"
                style={{ color: "red", visibility: "hidden" }}
              >
                Invalid email
              </Form.Text>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="sendTo col-10">
              <FormText>Content: </FormText>
              <Form.Control
                as="textarea"
                rows={5}
                style={{ resize: "none" }}
                onChange={(e) => hideErr(e)}
                ref={content}
              />
              <button
                id="send"
                style={{
                  color: "#92d35e",
                  position: "relative",
                  top: "-30px",
                  left: "210px",
                  border: "none",
                  backgroundColor: "inherit",
                }}
                onClick={(e) => HandleMessageSubmit(e)}
              >
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  style={{
                    color: "#92d35e",
                  }}
                />
              </button>
              <Form.Text
                id="contentErr"
                style={{ color: "red", visibility: "hidden" }}
              >
                Empty content
              </Form.Text>
            </Form.Group>
          </Row>
        </Form>
      </div>
      <FontAwesomeIcon
        icon={faCommentDots}
        size="3x"
        style={{ color: "#92d35e" }}
        onClick={(e) => ShowMessageBox()}
      />
    </div>
  );
}
