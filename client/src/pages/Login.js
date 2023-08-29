import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { sentOtpFunction } from "../services/Apis";
import Spinner from "react-bootstrap/Spinner";
import "../styles/mix.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [spiner, setSpiner] = useState(false);

  const navigate = useNavigate();

  const sendOtp = async (e) => {
    e.preventDefault();

    if (email === "") {
      toast.error("Enter Your Email !");
    } else if (!email.includes("@")) {
      toast.error("Enter Valid Email !");
    } else {
      setSpiner(true);
      const data = {
        email: email,
      };

      const response = await sentOtpFunction(data);

      if (response.status === 200) {
        setSpiner(false);
        navigate("/user/otp", { state: email });
      } else {
        toast.error(response.response.data.error);
      }
    }
  };

  return (
    <section style={{ backgroundColor: "#f8f8f8", padding: "90px" }}>
      <div
        className="form_data"
        style={{ maxWidth: "400px", margin: "0 auto" }}
      >
        <div className="form_heading">
          <h1 style={{ color: "#333", fontSize: "24px", marginBottom: "20px" }}>
            Welcome! Please Enter Email
          </h1>
        </div>
        <form>
          <div className="form_input">
            <label
              htmlFor="email"
              style={{ color: "#555", marginBottom: "5px" }}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id=""
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email Address"
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                width: "100%",
              }}
            />
          </div>
          <button
            className="btn"
            onClick={sendOtp}
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              marginTop: "10px",
              position: "relative",
            }}
          >
            Login
            {spiner ? (
              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Spinner
                  animation="border"
                  variant="light"
                  size="sm"
                  style={{ marginLeft: "5px" }}
                />
              </span>
            ) : (
              ""
            )}
          </button>
          <p style={{ marginTop: "10px", color: "#777", fontSize: "14px" }}>
            <NavLink
              to="/register"
              style={{ color: "#007bff", textDecoration: "none" }}
            >
              Sign up
            </NavLink>
          </p>
        </form>
      </div>
      <ToastContainer style={{ marginTop: "20px" }} />
    </section>
  );
};

export default Login;
