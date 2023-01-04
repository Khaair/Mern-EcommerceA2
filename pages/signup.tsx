import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { Button, Col, notification, Row } from "antd";
import { useRouter } from "next/router";
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
    <div className="login-area mt-5 ">
      <Row>
        <Col span={4}></Col>
        <Col span={16}>
          <div className="container">
            <div className="card">
              <form action="">
                <div className="form-group mt-3">
                  <label htmlFor="">Enter User Name</label>
                  <input
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ margin: "12px" }}
                    placeholder="Enter username"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Enter Email</label>
                  <input
                    className="form-control"
                    value={email}
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ margin: "12px" }}
                    placeholder="Enter email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Enter Password</label>
                  <input
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ margin: "12px" }}
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
                  <Link href="/login">
                    <button className="btn btn-primary mt-3 mx-2" type="button">
                      Login
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </Col>
        <Col span={4}></Col>
      </Row>
    </div>
  );
}

export default Signup;
