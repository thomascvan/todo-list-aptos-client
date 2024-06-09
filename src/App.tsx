import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Button, Spin } from "antd";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import {
  useWallet,
  InputTransactionData,
} from "@aptos-labs/wallet-adapter-react";

// By default, Aptos will interact with the devnet network, to set up a different network, we can use AptosConfig class.
// import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
// const aptosConfig = new AptosConfig({ network: Network.MAINNET });
// const aptos = new Aptos(aptosConfig);

import { Aptos } from "@aptos-labs/ts-sdk";

const aptos = new Aptos();
export const moduleAddress =
  "95741305186a8c4430f50dadc4fe6f1e5ea90f3c7832914cf7cc131b2dd80f39";

function App() {
  const { account, signAndSubmitTransaction } = useWallet();

  const [accountHasList, setAccountHasList] = useState<boolean>(false);

  const [transactionInProgress, setTransactionInProgress] =
    useState<boolean>(false);

  useEffect(() => {
    fetchList();
  }, [account?.address]);

  const fetchList = async () => {
    if (!account) return [];
    // change this to be your module account address
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

  const addNewList = async () => {
    if (!account) return [];
    setTransactionInProgress(true);
    const transaction: InputTransactionData = {
      data: {
        function: `${moduleAddress}::todolist::create_list`,
        functionArguments: [],
      },
    };
    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(transaction);
      // wait for transaction
      await aptos.waitForTransaction({ transactionHash: response.hash });
      setAccountHasList(true);
    } catch (error: any) {
      setAccountHasList(false);
    } finally {
      setTransactionInProgress(false);
    }
  };

  return (
    <>
      ...
      <Spin spinning={transactionInProgress}>
        {!accountHasList && (
          <Row gutter={[0, 32]} style={{ marginTop: "2rem" }}>
            <Col span={8} offset={8}>
              <Button
                onClick={addNewList}
                block
                type="primary"
                style={{ height: "40px", backgroundColor: "#3f67ff" }}
              >
                Add new list
              </Button>
            </Col>
          </Row>
        )}
      </Spin>
    </>
  );
}

export default App;
