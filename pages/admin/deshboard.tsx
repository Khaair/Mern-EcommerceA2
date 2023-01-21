import React, { useState } from "react";
import {
  AppstoreOutlined,
  BankOutlined,
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  PlusCircleOutlined,
  PlusSquareOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  TeamOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Card, MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import ProductAdd from "./product-add";
import Link from "next/link";
import SearchBar from "../searchBar";

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
  getItem("Product", "sub1", <ShoppingCartOutlined />, [
    getItem(
      "Add Product",
      "2",
      <Link href="/product-add">
        <PlusCircleOutlined />
      </Link>
    ),

    getItem(
      "Add Category",
      "3",
      <Link href="/category-add">
        <PlusCircleOutlined />
      </Link>
    ),
    getItem(
      "Product List",
      "4",
      <Link href="/product-list">
        <UnorderedListOutlined />
      </Link>
    ),
  ]),

  getItem("Order", "sub2", <ShoppingOutlined />, [
    getItem(
      "Order Manage",
      "1",
      <Link href="/order-manage">
        <PieChartOutlined />
      </Link>
    ),
    getItem("Order Track", "2"),
  ]),

  getItem("User", "sub3", <UserOutlined />, [
    getItem("Tom", "1"),
    getItem("Bill", "2"),
    getItem("Alex", "3"),
  ]),

  getItem("Customer", "8", <DesktopOutlined />),
  getItem("Files", "9", <FileOutlined />),
];

const Deshboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div style={{}} className="deshboard-sidebar-top-heading">
          BD Ecommerce
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <div className="deshboar-top-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 deshboard-header-wrapper">
                <div>
                  <SearchBar />
                </div>
                <div>
                  <BankOutlined className="mx-3" style={{ fontSize: "150%" }} />
                  <Avatar size={30} icon={<UserOutlined />} />
                  <AppstoreOutlined
                    className="mx-3"
                    style={{ fontSize: "150%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>Current Report</Breadcrumb>

          <div
            style={{
              padding: 24,
              minHeight: 500,
              background: colorBgContainer,
            }}
          >
            <div className="row">
              <div className="col-lg-3">
                <Card>
                  <h3>5000</h3>
                  <p>Daily Signups</p>
                </Card>
              </div>
              <div className="col-lg-3">
                <Card>
                  <h3>79,503</h3>
                  <p>Daily Visitors</p>
                </Card>
              </div>
              <div className="col-lg-3">
                <Card>
                  <h3>15,503</h3>
                  <p>Daily Order</p>
                </Card>
              </div>

              <div className="col-lg-3">
                <Card>
                  <h3> $98,503</h3>
                  <p>Daily Revenue</p>
                </Card>
              </div>
            </div>
          </div>
        </Content>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Sales Report</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <div className="row">
              <div className="col-lg-3">
                <Card title="Default size card" extra={<a href="#">More</a>}>
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
              </div>
              <div className="col-lg-3">
                <Card title="Default size card" extra={<a href="#">More</a>}>
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
              </div>
              <div className="col-lg-3">
                <Card title="Default size card" extra={<a href="#">More</a>}>
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
              </div>
              <div className="col-lg-3">
                <Card title="Default size card" extra={<a href="#">More</a>}>
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
              </div>
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>BD Ecommerce ©2023 ANTD</Footer>
      </Layout>
    </Layout>
  );
};

export default Deshboard;
