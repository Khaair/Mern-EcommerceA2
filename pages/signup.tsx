import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { Button, Col, notification, Row } from "antd";
import { useRouter } from "next/router";
import Layout from "../layouts";
function Signup({ signups, signupsInfo }: any) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notificationMsg, setNotificationMsg] = useState<string>("");
  const router = useRouter();
  const openNotification = () => {
    notification.open({
      message: notificationMsg,
    });
  };

  const sendDatatoApp = async () => {
    try {
      let x = await axios.post("http://localhost:8080/api/auth/signup", {
        username,
        email,
        password,
      });

      if (x.status === 200) {
        openNotification();
        setNotificationMsg(x?.data?.message);
        router.push("/login");
      }

      console.log(x.status, "success");
    } catch (er) {
      if (er) {
        openNotification();

        setNotificationMsg("Please provide correct information");
      }
    }
  };

  return (
    <div className="sign-up-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div>
              <h4>Register here</h4>
            </div>
            <form action="">
              <div className="form-group mt-3">
                <label htmlFor="">Enter User Name</label>
                <input
                  className="form-control mt-2"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                />
              </div>
              <div className="form-group">
                <label className="mt-2" htmlFor="">
                  Enter Email
                </label>
                <input
                  className="form-control mt-2"
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  required
                />
              </div>
              <div className="form-group">
                <label className="mt-2" htmlFor="">
                  Enter Password
                </label>
                <input
                  className="form-control mt-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>
              <div className="save-btn-area">
                <button
                  className="btn btn-primary mt-3"
                  type="button"
                  onClick={sendDatatoApp}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
