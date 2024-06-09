import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Button } from "antd";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

// By default, Aptos will interact with the devnet network, to set up a different network, we can use AptosConfig class.
// import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
// const aptosConfig = new AptosConfig({ network: Network.MAINNET });
// const aptos = new Aptos(aptosConfig);

import { Aptos } from "@aptos-labs/ts-sdk";

const aptos = new Aptos();

function App() {
  const { account } = useWallet();

  const [accountHasList, setAccountHasList] = useState<boolean>(false);

  useEffect(() => {
    fetchList();
  }, [account?.address]);

  const fetchList = async () => {
    if (!account) return [];
    // change this to be your module account address
    const moduleAddress =
      "95741305186a8c4430f50dadc4fe6f1e5ea90f3c7832914cf7cc131b2dd80f39";
    try {
      const todoListResource = await aptos.getAccountResource({
        accountAddress: account?.address,
        resourceType: `${moduleAddress}::todolist::TodoList`,
      });
      setAccountHasList(true);
    } catch (e: any) {
      setAccountHasList(false);
    }
  };

  return (
    <>
      <Layout>
        <Row align="middle">
          <Col span={10} offset={2}>
            <h1>Our todolist</h1>
          </Col>
          <Col span={12} style={{ textAlign: "right", paddingRight: "200px" }}>
            <WalletSelector />
          </Col>
        </Row>
      </Layout>
      {!accountHasList && (
        <Row gutter={[0, 32]} style={{ marginTop: "2rem" }}>
          <Col span={8} offset={8}>
            <Button
              block
              type="primary"
              style={{ height: "40px", backgroundColor: "#3f67ff" }}
            >
              Add new list
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
}

export default App;
