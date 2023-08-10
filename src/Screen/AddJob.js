import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DefaultTemplate from "../Template/DefaultTemplate";

const AddJobScreen = () => {
    const [id, setId] = useState(1);
    const [email, setEmail] = useState("");
    const [JobName, setJobName] = useState("");
    const [JobDescription, setJobDescription] = useState("");
    const [RecuitmentGoal, setRecuitmentGoal] = useState("");
    const [PostDate, setPostDate] = useState("");
    const [EndDate, setEndDate] = useState("");
    const [Cid, setCid] = useState("");
    const [userRole, setUserRole] = useState("");

    const [status, setStatus] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:9999/user")
            .then((response) => response.json())
            .then((data) => {
                const currentUserRole = data.user[0].RoleId;
                setUserRole(currentUserRole === 2 ? "Company" : "Candidate");

            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    }, []);

    useEffect(() => {
        fetch("http://localhost:9999/Role")
            .then((res) => res.json())
            .then((result) => {
                setUserRole(result);
            });
    }, []);

    useEffect(() => {
        fetch("http://localhost:9999/Category")
            .then((res) => res.json())
            .then((result) => {
                setCid(result);
            });
    }, []);

    useEffect(() => {
        fetch("http://localhost:9999/JobPost")
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

    const handleSubmit = (e) => {
        e.preventDefault();
        let regObj = {
            JobName,
            JobDescription,
            RecuitmentGoal,
            PostDate,
            EndDate,
            UserId: JSON.parse(sessionStorage.getItem("currUser")).id, // Use the userId value
            Cid,
            status,
        };

        if (IsValidate()) {
            fetch("http://localhost:9999/JobPost", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(regObj),
            })
                .then((res) => {
                    toast.success("Add successfully.");
                    navigate("/JobData");
                })
                .catch((err) => {
                    toast.error("Failed: " + err.message);
                });
        }
    };

    const IsValidate = () => {
        let isProceed = true;
        let errorMessage = "Please enter a value in ";
        if (JobName === null || JobName === "") {
            isProceed = false;
            errorMessage += "JobName";
        }
        if (JobDescription === null || JobDescription === "") {
            isProceed = false;
            errorMessage += "JobDescription";
        }
        return isProceed;
    };

    return (
        <DefaultTemplate>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title" style={{ textAlign: "center" }}>
                                    Add Job
                                </h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="jobName">Job Name:</label>
                                        <input
                                            type="text"
                                            id="jobName"
                                            value={JobName}
                                            onChange={(e) => setJobName(e.target.value)}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="jobDescription">Job Description:</label>
                                        <textarea
                                            id="jobDescription"
                                            value={JobDescription}
                                            onChange={(e) => setJobDescription(e.target.value)}
                                            className="form-control"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="recruitmentGoal">Recruitment Goal:</label>
                                        <input
                                            type="text"
                                            id="recruitmentGoal"
                                            value={RecuitmentGoal}
                                            onChange={(e) => setRecuitmentGoal(e.target.value)}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="postDate">Post Date:</label>
                                        <input
                                            type="date"
                                            id="postDate"
                                            value={PostDate}
                                            onChange={(e) => setPostDate(e.target.value)}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="endDate">End Date:</label>
                                        <input
                                            type="date"
                                            id="endDate"
                                            value={EndDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="category">Category:</label>
                                        <select
                                            id="category"
                                            value={Cid}
                                            onChange={(e) => setCid(parseInt(e.target.value))}
                                            className="form-control"
                                        >
                                            <option value="">Category</option>
                                            <option value={1}>Technology</option>
                                            <option value={2}>Finance</option>
                                            <option value={3}>Architecture</option>
                                            <option value={4}>Entertainment</option>
                                            <option value={5}>Social services</option>
                                            <option value={6}>Education</option>
                                        </select>
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Add Job
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultTemplate>
    );
};

export default AddJobScreen;
