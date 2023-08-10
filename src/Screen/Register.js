import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [RoleId, setRoleId] = useState(0);

  const [Name, setName] = useState("");
  const [BanStatus, setBanStatus] = useState("");
  const [imgPath, setImgPath] = useState("");
  const [OnlineCv, setOnlineCv] = useState("");
  const [Introduction, setIntroduction] = useState("");
  const [Experience, setExperience] = useState("");
  const [FieldOfExpertise, setFieldOfExpertise] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:9999/user")
      .then((response) => response.json())
      .then((data) => {
        const sortedUsers = data.sort((a, b) => a.id - b.id);
        const maxId = sortedUsers.length > 0 ? sortedUsers[sortedUsers.length - 1].id : 0;
        const nextId = maxId + 1;
        setId(nextId);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:9999/FieldOfExpertise")
      .then((res) => res.json())
      .then((result) => {
        setFieldOfExpertise(result);
      });
  }, []);

  const IsValidate = () => {
    let isProceed = true;
    let errorMessage = "Please enter a value in ";
    if (Name === null || Name === "") {
      isProceed = false;
      errorMessage += "Full Name";
    }
    if (password === null || password === "") {
      isProceed = false;
      errorMessage += "Password";
    }
    if (email === null || email === "" || email.length <= 8 || email.length >= 30) {
      isProceed = false;
      errorMessage += "Email";
    }

    if (!isProceed) {
      toast.warning(errorMessage);
    } else {
      if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
        // Valid email
      } else {
        isProceed = false;
        toast.warning("Please enter a valid email");
      }
    }
    return isProceed;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let regObj = {
        email,
        password,
        imgPath,
        phone,
        address,
        Introduction,
        FieldOfExpertise,
        RoleId,
        BanStatus: 0,
        Name,
        OnlineCv :"",
        Experience:0,
    };
    if (IsValidate()) {
      fetch("http://localhost:9999/user", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(regObj),
      })
        .then((res) => {
          toast.success("Registered successfully.");
          navigate("/login");
        })
        .catch((err) => {
          toast.error("Failed: " + err.message);
        });
    }
  };

  return (
    <div>
      <div className="offset-lg-3 col-lg-6">
        <form className="container" onSubmit={handleSubmit}>
          <div className="card">
            <div className="card-header">
              <h1>User Registration</h1>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Email <span className="errmsg">*</span></label>
                    <input value={email} onChange={e => setEmail(e.target.value)} className="form-control"></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Password <span className="errmsg">*</span></label>
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control"></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Full Name <span className="errmsg">*</span></label>
                    <input value={Name} onChange={e => setName(e.target.value)} className="form-control"></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Phone <span className="errmsg"></span></label>
                    <input value={phone} onChange={e => setPhone(e.target.value)} className="form-control"></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Role <span className="errmsg">*</span></label>
                    <select value={RoleId} onChange={e => setRoleId(parseInt(e.target.value))} className="form-control">
                      <option value="">Choose Role</option>
                      <option value={1}>Candidate</option>
                      <option value={2}>Company</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Field of Expertise <span className="errmsg">*</span></label>
                    <select value={FieldOfExpertise} onChange={e => setFieldOfExpertise(parseInt(e.target.value))} className="form-control">
                      <option value="">Choose Field of Expertise</option>
                      <option value={1}>Software Engineering</option>
                      <option value={2}>Digital Art Design</option>
                      <option value={3}>Artificial Intelligence</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Address</label>
                    <textarea value={address} onChange={e => setAddress(e.target.value)} className="form-control"></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">Register</button>
              <Link to={'/login'} className="btn btn-danger">Close</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
