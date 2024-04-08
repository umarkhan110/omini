import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "antd";
import BlockChainTable from "../../Common/Table";
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
          <Col  xs={24} xl={12}>
            <h1 style={{ fontWeight: "bold" }}>Blockchain Management</h1>
          </Col>
          <Col align="end" xs={24} sm={24} xl={12}>
          <Button key="add" type="primary" style={{ marginRight: "8px", borderRadius:"8px"  }}  onClick={showCreateUDTModal}>
              Add UDT
            </Button>
            <Button key="add" style={{ marginRight: "8px", background:"transparent", color:"#039CD8", border:"1px solid #039CD8", borderRadius:"8px"  }}  onClick={showAddBQLDataModal}>
              Add Block
            </Button>
            <Button
              key="add"
              type="primary"
              onClick={showCreateBlockChainModal}
              style={{borderRadius:"8px" }}
            >
              Add New Blockchain
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs={24} lg={17}>
            <Card>
              {blockchainList && (
                <BlockChainTable blockchainList={blockchainList} />
              )}
            </Card>
          </Col>
          <Col xs={24} lg={7}>
            <Card>
              <h3 style={{ fontWeight: "bold" }}>OmniIndex PostgresBC</h3>
              <p style={{ color: "#16161D" }}>
                Select a blockchain. To view the schema, click on the actions eyeball!
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
