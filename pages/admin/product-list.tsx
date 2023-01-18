import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { fetchPosts } from ".././../state-management/actions/productshow";

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
import { connect } from "react-redux";

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

const ProductList: React.FC = ({ posts, postsInfo }: any) => {
  const [form] = Form.useForm();

  const [notificationMsg, setNotificationMsg] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [singledata, setSingledata] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [url, setUrl] = useState("");
  const [singleProductId, setSingleProductId] = useState("");

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const openNotification = () => {
    notification.open({
      message: notificationMsg,
    });
  };

  useEffect(() => {
    posts();
  }, [posts]);
  console.log(postsInfo?.postsData, "postsInfo?.postsData list");
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

  const deleteMe = async (id: any) => {
    try {
      let mydata = await axios.delete(
        `http://localhost:8080/api/delete-product/${id}`
      );
      console.log(mydata);

      const filterd = postsInfo?.postsData?.filter((a) => a._id !== id);
      posts();
    } catch (er) {
      console.log(er);
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchSingledata = async (id: any) => {
    setIsModalOpen(true);
    setSingleProductId(id);
    try {
      const responseData = await axios.get(
        `http://localhost:8080/api/show-single-product/${id}`
      );
      console.log(responseData.data, "datahere.data hiii");

      setTitle(responseData.data.title);
      setDescription(responseData.data.description);
      setPrice(responseData.data.price);
      setCategory(responseData.data.category);
      setQuantity(responseData.data.quantity);
      setUrl(responseData.data.url);
    } catch (err) {
      console.log(err, "error");
    }
  };

  const upDate = async () => {
    try {
      let ad = await axios.post(
        `http://localhost:8080/api/update-product/${singleProductId}`,
        {
          title,
          description,
          price,
          category,
          quantity,
          url,
        }
      );
      setIsModalOpen(false);
      posts();
      console.log(ad);
    } catch (er) {
      console.log(er);
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
            <Breadcrumb.Item>Product List</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <div className="feature-all-product-wrapper ">
              <div className="feature-product-area e-com-section-padding-small">
                <div className="container">
                  <div className="row">
                    {postsInfo?.postsData?.map((product: any, index: any) => {
                      const productDetails = {
                        productId: product?._id,
                        price: product?.price,
                        title: product?.title,
                        url: product?.url,
                      };
                      return (
                        <div key={index} className="col-lg-3 mt-3">
                          <div className="dgarma-product-show-card">
                            <div className="dgarma-product-show-img text-center">
                              <img
                                src={product?.url}
                                alt="dgarma-product-show-img"
                              />
                            </div>
                            <div className="dgarma-product-show-card-content">
                              <h3>{product?.title}</h3>
                              <span>{product?.category}</span>
                              <div className="dgarma-product-show-wrapper">
                                <p>
                                  <span>Price:</span>৳ {product?.price}
                                </p>
                                <i
                                  role="button"
                                  onClick={() => fetchSingledata(product?._id)}
                                  className="fas fa-edit text-primary"
                                ></i>

                                <i
                                  onClick={() => deleteMe(product?._id)}
                                  className="fa fa-trash text-danger mx-2"
                                  aria-hidden="true"
                                  role="button"
                                ></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <Modal
              title="Update Product Details"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              width={1000}
            >
              <div className="container">
                <div className="row ">
                  <div className="col-md-12 deshboard-product-update">
                    <label>Title</label>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="title"
                    />
                    <label>Description</label>

                    <input
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="description"
                    />
                    <label>Price</label>

                    <input
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="price"
                    />
                    <label>Category</label>

                    <input
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="category"
                    />
                    <label>Quantity</label>

                    <input
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="quantity"
                    />
                    <label>Image Link</label>

                    <input
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="image link"
                    />
                  </div>

                  <div>
                    <button
                      className="btn btn-info text-light mt-3"
                      type="button"
                      onClick={upDate}
                    >
                      update
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>BD Ecommerce ©2023 ANTD</Footer>
      </Layout>
    </Layout>
  );
};

const mapStateToProps = (state: { posts: any; comments: any; users: any }) => {
  return {
    postsInfo: state?.posts,
    commentInfo: state?.comments,
    userInfo: state?.users,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    posts: () => dispatch(fetchPosts()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
