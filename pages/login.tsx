import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { Col, Row, notification } from "antd";

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
                    className="form-control w-50"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ margin: "12px" }}
                    placeholder="Enter username"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="">Enter Password</label>
                  <input
                    className="form-control w-50"
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
                    Login{" "}
                  </button>
                  <Link href="/signup">
                    <button
                      className="btn btn-primary mt-3 mx-2"
                      type="button"
                      onClick={sendDatatoApp}
                    >
                      Sign Up{" "}
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

export default Login;
