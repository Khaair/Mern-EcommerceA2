import React, { useEffect, useState } from "react";
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
import { Button, MenuProps, Modal } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import ProductAdd from "./product-add";
import Link from "next/link";
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
const OrderManage: React.FC = () => {
  const [data, setData] = useState([]);
  const [singledata, setSingledata] = useState([]);

  console.log(singledata, "hii order singledata");
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchSingledata = async (id: any) => {
    setIsModalOpen(true);

    try {
      const datahere = await axios.get(
        `http://localhost:8080/api/show-single-billing-address/${id}`
      );
      setSingledata(datahere.data);
    } catch (err) {
      console.log(err, "error");
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchdata = async () => {
    try {
      const datahere = await axios.get(
        "http://localhost:8080/api/billing-address-show"
      );
      setData(datahere.data);
    } catch (err) {
      console.log(err, "error");
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);
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
            <Breadcrumb.Item>Order Manage</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <div className="order-manage-area">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <Modal
                      title="Basic Modal"
                      open={isModalOpen}
                      onOk={handleOk}
                      onCancel={handleCancel}
                      width={1000}
                    >
                      <h3 className="mb-2">Customer Details</h3>
                      <table id="customers">
                        <thead>
                          <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Fullname</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Email</th>
                            <th scope="col">City</th>
                            <th scope="col">Postcode</th>
                            <th scope="col">Address</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>{singledata?.fullname}</td>
                            <td>{singledata?.phone}</td>
                            <td>{singledata?.email}</td>
                            <td>{singledata?.city}</td>
                            <td>{singledata?.postcode}</td>
                            <td>{singledata?.address}</td>
                          </tr>
                        </tbody>
                      </table>

                      <h3 className="mt-5 mb-2">Order Details</h3>
                      <table id="customers">
                        <thead>
                          <tr>
                            <th scope="col">Product ID</th>
                            <th scope="col">Title</th>
                            <th scope="col">Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {singledata?.cart?.map((order: any, index: any) => {
                            return (
                              <tr key={index}>
                                <td scope="row">{order?.productId}</td>
                                <td>{order?.title}</td>
                                <td>{order?.price}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                        <tr>
                          <td>Total</td>
                          <td>=</td>

                          <td>{singledata?.total}</td>
                        </tr>
                      </table>
                    </Modal>
                    <table id="customers">
                      <thead>
                        <tr>
                          <th scope="col">Order Number</th>
                          <th scope="col">Customer</th>
                          <th scope="col">Phone Number</th>
                          <th scope="col">Email</th>
                          <th scope="col">Items</th>
                          <th scope="col">Total Price</th>

                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.map((order: any, index: any) => {
                          return (
                            <tr key={index}>
                              <td scope="row">{order?.ordernumber}</td>
                              <td>{order?.fullname}</td>
                              <td>{order?.phone}</td>
                              <td>{order?.email}</td>
                              <td>{order?.cart.length}</td>
                              <td>{order?.total}</td>

                              <td>
                                <button
                                  onClick={() => fetchSingledata(order?._id)}
                                  className="btn btn-info mx-2"
                                >
                                  Details
                                </button>
                                <button className="btn btn-success">
                                  Confirm
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
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

export default OrderManage;
