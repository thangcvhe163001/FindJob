import { useEffect, useState } from "react";
import DefaultTemplate from "../Template/DefaultTemplate";
import "../style/stylingSon.css";
import { Button, Col, Form, Image, Row, Table } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CompanyJobList from "../Component/CompanyJobList";
import MyApplication from "../Component/MyApplication";
export default function PersonalProfile() {
  const [currUser, setCurrUser] = useState({});
  const [currUserId, setCurrUserId] = useState(0);
  const [role, setRole] = useState(0);
  const [email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhonenumber] = useState("");
  const [Introduction, setIntroduction] = useState("");
  const [OnlineCv, setOnlineCv] = useState("");
  const [RoleId, setRoleId] = useState(1);
  const [password, setPassword] = useState("");
  const [imgPath, setImgPath] = useState("");
  const [fieldOfExpertise, setFieldOfExpertise] = useState(1);
  const [Experience, setExperience] = useState(0);
  const [BanStatus, setBanStatus] = useState(0);

  // console.log("aaa"+currUser.id);
  // useEffect(() => {

  // }, []);

  useEffect(() => {
    // setCurrUserId(3); // Update the currUserId value using the setter function
    setCurrUser(JSON.parse(sessionStorage.getItem("currUser")));
    if (JSON.parse(sessionStorage.getItem("currUser")) == null) {
      window.location.href = "/login";
    } else {
      fetch(
        "http://localhost:9999/user/" +
          JSON.parse(sessionStorage.getItem("currUser")).id
      )
        .then((res) => res.json())
        .then((result) => {
          setCurrUser(result);
          setEmail(result.email);
          setName(result.Name);
          setAddress(result.address);
          // console.log(result.Info.address);
          setPhonenumber(result.phone);
          setIntroduction(result.Introduction);
          setOnlineCv(result.OnlineCv);
          setRoleId(result.RoleId);

          setPassword(result.password);
          setImgPath(result.imgPath);
          setFieldOfExpertise(result.fieldOfExpertise);
          setExperience(result.Experience);
          setBanStatus(result.BanStatus);
        });
    }
  }, currUser); // Include currUserId as a dependency in the useEffect dependency array
  useEffect(() => {
    // setCurrUserId(3); // Update the currUserId value using the setter function

    fetch(`http://localhost:9999/Role/${RoleId}`)
      .then((res) => res.json())
      .then((result) => {
        setRole(result);
      });
  }, [currUser]);

  const edit = () => {
    var input = document.getElementsByClassName("UserInfoInput");
    if (input.length == 0) {
      input = document.getElementsByClassName("UserInfoInputEdit");
    }
    var inputArray = [...input];
    console.log(input.length);

    inputArray.forEach((element) => {
      element.readOnly = element.readOnly == true ? false : true;
      console.log(element.readOnly);
      element.classList =
        element.classList == "UserInfoInput"
          ? "UserInfoInputEdit"
          : "UserInfoInput";
    });
    var editbtn = document.getElementById("edit");
    editbtn.style.display =
      editbtn.style.display == "none" ? "inline-block" : "none";
    var savebtn = document.getElementById("save");
    savebtn.style.display =
      savebtn.style.display == "none" ? "inline-block" : "none";
  };
  const ValidateInput = () => {
    let isproceed = true;
    let errormessage = "Please fill in the blank input";
    if (
      Name.length < 1 ||
      Name === "" ||
      email.length < 1 ||
      email === "" ||
      address.length < 1 ||
      address === "" ||
      phone.length < 1 ||
      phone === "" ||
      Introduction.length < 1 ||
      Introduction === "" ||
      OnlineCv.length < 1 ||
      OnlineCv === ""
    ) {
      isproceed = false;
    }
    if (!isproceed) {
      toast.warning(errormessage);
    } else {
      // if (!/^\+\d{1,3}\s\(\d{3}\)\s\d{3}-\d{4}$/.test(phone)) {
      //   toast.warning("invalid phone number!");
      //   isproceed = false;
      // }
      if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
        isproceed = false;
        toast.error("invalid email!");
      }
    }
    return isproceed;
  };
  const saveChanges = (e) => {
    e.preventDefault();
    let updatedInFo = {
      email,
      password,
      imgPath,
      phone,
      address,
      Introduction,
      fieldOfExpertise,
      RoleId,
      BanStatus,
      Name,
      OnlineCv,
      Experience,
    };
    if (ValidateInput()) {
      fetch("http://localhost:9999/user/" + currUser.id, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(updatedInFo),
      })
        .then((res) => {
          //alert("Update success!");
          toast.success("Update success!");
          var input = document.getElementsByClassName("UserInfoInput");
          if (input.length == 0) {
            input = document.getElementsByClassName("UserInfoInputEdit");
          }
          var inputArray = [...input];
          console.log(input.length);

          inputArray.forEach((element) => {
            element.readOnly = element.readOnly == true ? false : true;
            console.log(element.readOnly);
            element.classList =
              element.classList == "UserInfoInput"
                ? "UserInfoInputEdit"
                : "UserInfoInput";
          });
          var editbtn = document.getElementById("edit");
          editbtn.style.display =
            editbtn.style.display == "none" ? "inline-block" : "none";
          var savebtn = document.getElementById("save");
          savebtn.style.display =
            savebtn.style.display == "none" ? "inline-block" : "none";
        })
        .catch((err) => {
          toast.error("Failed: " + err.message);
        });
    }
  };
  const HandleLogOut = (e) => {
    sessionStorage.removeItem("currUser");
    window.location.href = "/";
  };
  if (JSON.parse(sessionStorage.getItem("currUser")) == null) {
    window.location.href = "/login";
  } else {
    return (
      <DefaultTemplate>
        <ToastContainer />
        <Row className="col-12 personalInfo">
          <Col className="Avatar col-lg-4 col-sm-12">
            {(() => {
              if (currUser.imgPath != null && currUser.img != "") {
                return <Image src={currUser.imgPath} />;
              } else {
                return (
                  <Image
                    src={process.env.PUBLIC_URL + "asset/img/tempAvatar.jpg"}
                  />
                );
              }
            })()}
            <div className="Quote">
              <p>"Lorem ipsum dolor sit amet, consectetur adipiscing el"</p>
            </div>
            <div className="EditProfileButton">
              <button id="edit" onClick={() => edit()}>
                Edit Profile
              </button>

              <button
                onClick={(e) => saveChanges(e)}
                id="save"
                style={{ display: "none" }}
              >
                Save Changes
              </button>
            </div>
          </Col>
          <Col className="UserInfo col-lg-8 col-sm-12">
            <div className="col-lg-10 UserInfoWrapper">
              <Form>
                <div className="InputField">
                  <h3>UserName:&nbsp;&nbsp;&nbsp;&nbsp;</h3>
                  <input
                    className="UserInfoInput"
                    type="text"
                    value={Name}
                    style={{ marginLeft: "61px" }}
                    onChange={(e) => setName(e.target.value)}
                    readOnly
                  />
                </div>
                <div className="InputField">
                  <h3>Email:&nbsp;&nbsp;&nbsp;&nbsp;</h3>
                  <input
                    className="UserInfoInput"
                    type="text"
                    value={email}
                    style={{ marginLeft: "120px" }}
                    onChange={(e) => setEmail(e.target.value)}
                    readOnly
                  />
                </div>

                <div>
                  <div className="InputField">
                    <h3>Address:&nbsp;&nbsp;&nbsp;&nbsp;</h3>
                    <input
                      className="UserInfoInput"
                      type="text"
                      value={address}
                      style={{ marginLeft: "91px" }}
                      onChange={(e) => setAddress(e.target.value)}
                      readOnly
                    />
                  </div>
                  <div className="InputField">
                    <h3>Phone Number:&nbsp;&nbsp;&nbsp;&nbsp;</h3>
                    <input
                      className="UserInfoInput"
                      type="text"
                      value={phone}
                      style={{ marginLeft: "-2px" }}
                      onChange={(e) => setPhonenumber(e.target.value)}
                      readOnly
                    />
                  </div>
                  <div className="InputField Introduction">
                    <h3>Introduction:&nbsp;&nbsp;&nbsp;&nbsp;</h3>
                    <textarea
                      className="UserInfoInput"
                      style={{ fontSize: "100%" }}
                      value={Introduction}
                      onChange={(e) => setIntroduction(e.target.value)}
                      readOnly
                    />
                  </div>
                </div>

                <div className="InputField">
                  <h3>Online Cv:&nbsp;&nbsp;&nbsp;&nbsp;</h3>
                  <input
                    className="UserInfoInput"
                    type="text"
                    value={OnlineCv}
                    style={{ marginLeft: "70px", color: "#1098dc" }}
                    onChange={(e) => setOnlineCv(e.target.value)}
                    readOnly
                  />
                </div>

                {(() => {
                  if (Experience != -1) {
                    return (
                      <div className="InputField">
                        <h3>Experience: </h3>
                        <input
                          className="UserInfoInput"
                          type="number"
                          value={Experience}
                          style={{ marginLeft: "85px" }}
                          onChange={(e) => setExperience(e.target.value)}
                          min={0}
                          readOnly
                        />
                      </div>
                    );
                  }
                })()}

                <div className="InputField">
                  <h3>Role:&nbsp;&nbsp;&nbsp;&nbsp;</h3>
                  <p>{role.RoleText}</p>
                </div>
                <div className="EditProfileButton" style={{ display: "none" }}>
                  <button>Save</button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
        
        <Row style={{ marginBottom: "50px" }}>
          <Button
            style={{ margin: "0 auto" }}
            className="col-lg-2 btn btn-danger"
            onClick={(e) => HandleLogOut(e)}
          >
            Log out
          </Button>
        </Row>
      </DefaultTemplate>
    );
  }
}
