import React from "react";
import { Layout, Row, Col } from "antd";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";

function App() {
  return (
    <>
      <Layout>
        <Row align="middle">
          <Col span={10} offset={2}>
            <h1>Our todolist</h1>
          </Col>
          <Col span={12} style={{ textAlign: "right", paddingRight: "200px" }}>
            <Col
              span={12}
              style={{ textAlign: "right", paddingRight: "200px" }}
            >
              <WalletSelector />
            </Col>{" "}
          </Col>
        </Row>
      </Layout>
    </>
  );
}

export default App;
