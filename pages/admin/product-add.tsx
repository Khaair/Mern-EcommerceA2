import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { MenuProps, notification } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    "Deshboard",
    "1",
    <Link href="/admin">
      {" "}
      <PieChartOutlined />
    </Link>
  ),
  getItem("Product", "sub1", <UserOutlined />, [
    getItem(
      "Product Add",
      "1",
      <Link href="/product-add">
        <PieChartOutlined />
      </Link>
    ),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),

  getItem("User", "sub2", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Order", "sub3", <TeamOutlined />, [
    getItem(
      "Order Manage",
      "6",
      <Link href="/order-manage">
        <PieChartOutlined />
      </Link>
    ),
    getItem("Order Track", "8"),
  ]),

  getItem("Customer", "2", <DesktopOutlined />),
  getItem("Files", "9", <FileOutlined />),
];

const ProductAdd: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<any>();
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [url, setUrl] = useState("");

  const [notificationMsg, setNotificationMsg] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const openNotification = () => {
    notification.open({
      message: notificationMsg,
    });
  };

  const sendDatatoApp = async () => {
    try {
      let x = await axios.post("http://localhost:8080/api/product-add", {
        title,
        description,
        price,
        category,
        quantity,
        url,
      });

      if (x.status === 200) {
        openNotification();
        setNotificationMsg(x?.data?.message);
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
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Product Add</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <div className="product-add-section-area">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6">
                    <div>
                      <form action="">
                        <div className="form-group">
                          <label htmlFor="">Product Title</label>
                          <input
                            className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={{ marginTop: "12px" }}
                            placeholder="Enter username"
                            required
                          />
                        </div>
                        <div className="form-group add-product-margin">
                          <label htmlFor="">Description</label>
                          <input
                            className="form-control"
                            value={description}
                            style={{ marginTop: "12px" }}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter email"
                            required
                          />
                        </div>
                        <div className="form-group add-product-margin">
                          <label htmlFor="">Price</label>
                          <input
                            className="form-control"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            style={{ marginTop: "12px" }}
                            placeholder="Enter password"
                            required
                          />
                        </div>
                        <div className="form-group add-product-margin">
                          <label htmlFor="">Category</label>
                          <input
                            className="form-control"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            style={{ marginTop: "12px" }}
                            placeholder="Enter password"
                            required
                          />
                        </div>
                        <div className="form-group add-product-margin">
                          <label htmlFor="">Quantity</label>
                          <input
                            className="form-control"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            style={{ marginTop: "12px" }}
                            placeholder="Enter password"
                            required
                          />
                        </div>
                        <div className="form-group add-product-margin">
                          <label htmlFor="">Image link</label>
                          <input
                            className="form-control"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            style={{ marginTop: "12px" }}
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
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6"></div>
                </div>
              </div>
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>BD Ecommerce ©2023 ANTD</Footer>
      </Layout>
    </Layout>
  );
};

export default ProductAdd;
