import React, { useState } from "react";
import { Button, Form, Input } from "antd";
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
    getItem(
      "Product List",
      "2",
      <Link href="/product-list">
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

  getItem("Customer", "3", <DesktopOutlined />),
  getItem("Files", "9", <FileOutlined />),
];

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const ProductAdd: React.FC = () => {
  const [form] = Form.useForm();

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

  const onFinish = async (values: any) => {
    const title = values?.title;
    const description = values?.description;
    const price = values?.price;
    const category = values?.category;
    const quantity = values?.quantity;
    const url = values?.url;

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
        console.log(x?.data?.message);
      }

      console.log(x.status, "success");
    } catch (er) {
      if (er) {
        console.log(er);
      }
    }
    console.log("Received values of form: ", values);
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
                  <div className="col-lg-8">
                    <Form
                      form={form}
                      name="register"
                      onFinish={onFinish}
                      initialValues={{
                        residence: ["zhejiang", "hangzhou", "xihu"],
                        prefix: "86",
                      }}
                      scrollToFirstError
                      {...formItemLayout}
                    >
                      <Form.Item
                        name="title"
                        label="Title"
                        rules={[
                          {
                            required: true,
                            message: "Please input title!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name="description"
                        label="Description"
                        rules={[
                          {
                            required: true,
                            message: "Please input description!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name="price"
                        label="Price"
                        rules={[
                          {
                            required: true,
                            message: "Please input price!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name="category"
                        label="Category"
                        rules={[
                          {
                            required: true,
                            message: "Please input category!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name="quantity"
                        label="Quantity"
                        rules={[
                          {
                            required: true,
                            message: "Please input quantity!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        name="url"
                        label="Image Link"
                        rules={[
                          {
                            required: true,
                            message: "Please input url!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                          Product Add
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                  <div className="col-lg-4"></div>
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
