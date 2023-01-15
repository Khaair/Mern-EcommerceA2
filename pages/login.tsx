import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { Col, Row, notification } from "antd";
import Layout from "../layouts";
import Signup from "./signup";

function Login() {
  const [username, setUsername] = useState("");
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
      let res = await axios.post("http://localhost:8080/api/auth/signin", {
        username,
        password,
      });

      if (res?.status === 200) {
        localStorage.setItem("userId", JSON.stringify(res?.data?.id));
        localStorage.setItem("userName", JSON.stringify(res?.data?.username));
        localStorage.setItem(
          "accessToken",
          JSON.stringify(res?.data?.accessToken)
        );

        router.push("/");
      }
      console.log(res, "success result");
    } catch (er) {
      openNotification();
      setNotificationMsg(er?.response?.data?.message);
      console.log(er?.response?.data?.message);
    }
  };

  return (
    <Layout>
      <Row>
        <Col span={24}>
          <div className="login-area mt-5">
            <div className="container">
              <div className="card">
                <div className="row">
                  <div className="col-lg-6">
                    <div>
                      <h4>Login here</h4>
                    </div>
                    <form action="">
                      <div className="form-group mt-3">
                        <label htmlFor="">Enter User Name</label>
                        <input
                          className="form-control"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="Enter username"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="">Enter Password</label>
                        <input
                          className="form-control"
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
                          Login{" "}
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-lg-6">
                    <Signup />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Layout>
  );
}

export default Login;
