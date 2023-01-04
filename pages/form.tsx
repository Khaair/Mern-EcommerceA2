import { Button, Col, Form, Input, Row } from "antd";
import React from "react";
import Nav from "./nav";

export default function form() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form] = Form.useForm();
  return (
    <div>
      <div className="form-area">
        <div className="container">
          <Row className="mt-5">
            <Col span={24}>
              <Form form={form}>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "name is required",
                    },
                  ]}
                >
                  <Input placeholder="Enter Name" className="ant-input w-50" />
                </Form.Item>
                <Form.Item
                  label="Address"
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "address is required",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter Email Address"
                    className="ant-input w-50"
                  />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "email is required",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter Email Address"
                    className="ant-input w-50"
                  />
                </Form.Item>
                <Button> CLick</Button>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
