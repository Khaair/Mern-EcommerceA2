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
      "1",
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
      "2",
      <Link href="/product-list">
        <UnorderedListOutlined />
      </Link>
    ),
  ]),

  getItem("Order", "sub3", <ShoppingOutlined />, [
    getItem(
      "Order Manage",
      "6",
      <Link href="/order-manage">
        <PieChartOutlined />
      </Link>
    ),
    getItem("Order Track", "8"),
  ]),

  getItem("User", "sub2", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),

  getItem("Customer", "4", <DesktopOutlined />),
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
        <div className="deshboard-topbar-area">
          <div className="row">
            <div className="col-lg-12">
              <div className="deshboard-header-wrapper">
                <div>
                  <b>Deshboard</b>
                </div>
                <div>
                  <BankOutlined style={{ fontSize: "150%" }} />
                  <Avatar size={30} className="mx-2" icon={<UserOutlined />} />
                  <AppstoreOutlined style={{ fontSize: "150%" }} />
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
