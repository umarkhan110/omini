import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "antd";
import CustomTable from "../../Common/CustomTable";
import CreateBlockChainModal from "./createBlockChainModal";
import CreateUserDefinedTypes from "./createUserDefinedTypes";
import AddBlockData from "./addBlockData";

const Users = () => {
  document.title = "Blockchain Management" + process.env.REACT_APP_PAGE_TITLE;
  const [isCreateBlockChainModalVisible, setIsCreateBlockChainModalVisible] =
    useState(false);
    const [isCreateUDTModalVisible, setIsCreateUDTModalVisible] =
    useState(false);
    const [isAddBQLDataModalVisible, setIsAddBQLDataModalVisible] =
    useState(false);
  const showCreateBlockChainModal = () => {
    setIsCreateBlockChainModalVisible(true);
  };

  const hideCreateBlockChainModal = () => {
    setIsCreateBlockChainModalVisible(false);
  };


const showCreateUDTModal = () => {
  setIsCreateUDTModalVisible(true);
};

const hideCreateUDTModal = () => {
  setIsCreateUDTModalVisible(false);
};

const showAddBQLDataModal = () => {
  setIsAddBQLDataModalVisible(true);
};

const hideAddBQLDataModal = () => {
  setIsAddBQLDataModalVisible(false);
};

  const [blockchainList, setBblockchainList] = useState();

  useEffect(() => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    getBlockchainList(username, password);
  }, []);

  const getBlockchainList = async (username, password) => {
    try {
      await fetch(
        `https://dashboard.postgresbc.info/cgi-bin/pgbc_api/get_block_list?username=${username}&password=${password}`,
        {
          method: "POST",
          headers: {
            Authorization: "Basic " + localStorage.getItem("api_key"),
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data) {
            setBblockchainList(data?.blockchains);
          }
        });
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  
  return (
    <div>
      <Col gutter={[24, 24]} style={{ margin: "40px 10px" }}>
        <Row>
          <Col span={12}>
            <h1 style={{ fontWeight: "bold" }}>Blockchain Management</h1>
          </Col>
          <Col span={12} align="end">
          <Button key="add" type="primary" style={{ marginRight: "8px" }}  onClick={showCreateUDTModal}>
              Add UDT
            </Button>
            <Button key="add" type="primary" style={{ marginRight: "8px" }}  onClick={showAddBQLDataModal}>
              Add Block
            </Button>
            <Button
              key="add"
              type="primary"
              onClick={showCreateBlockChainModal}
            >
              Add New Blockchain
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={17}>
            <Card>
              {blockchainList && (
                <CustomTable blockchainList={blockchainList} />
              )}
            </Card>
          </Col>
          <Col span={7}>
            <Card>
              <h3 style={{ fontWeight: "bold" }}>Schema</h3>
              <p style={{ color: "#16161D" }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </Card>
          </Col>
        </Row>
      </Col>
      <CreateBlockChainModal
        visible={isCreateBlockChainModalVisible}
        onCancel={hideCreateBlockChainModal}
      />
      <CreateUserDefinedTypes
        visible={isCreateUDTModalVisible}
        onCancel={hideCreateUDTModal}
      />
      <AddBlockData
      blockchainList={blockchainList}
        visible={isAddBQLDataModalVisible}
        onCancel={hideAddBQLDataModal}
      />
    </div>
  );
};

export default Users;
