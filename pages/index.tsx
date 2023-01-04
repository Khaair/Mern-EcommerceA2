import { Col, Row } from "antd";
import Layout from "../layouts/index";
import EcommerceHomePage from "./home";

export default function EcomHome() {
  return (
    <>
      <Layout>
        <Row>
          <Col span={24}>
            <EcommerceHomePage />
          </Col>
        </Row>
      </Layout>
    </>
  );
}
