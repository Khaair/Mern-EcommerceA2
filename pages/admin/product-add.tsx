import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select, Spin } from "antd";
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
import { MenuProps, notification } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
// import { Option } from "antd/es/mentions";

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
  const [data, setData] = useState([]);

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

  const fetchdata = async () => {
    try {
      const datahere = await axios.get(
        "http://localhost:8080/api/product-category-show"
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
                        label="Category"
                        name="immediateParentId"
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: "Please input price!",
                          },
                        ]}
                      >
                        {data && (
                          <Select placeholder="category">
                            {data?.map((item: any) => (
                              <Select.Option
                                value={item?.category}
                                key={item?._id}
                              >
                                {`${item?.category}`}
                              </Select.Option>
                            ))}
                          </Select>
                        )}
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
