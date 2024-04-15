import React, { useState } from "react";
import styled from "styled-components";
import EyeIcon from "../assets/images/eye.svg";
import { Modal, Row, Col } from "antd";
import { Space, Table } from "antd";

const ViewButton = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
const BlockChainTable = ({ blockchainList }) => {
  //   const [currentPage, setCurrentPage] = useState(1);
  const [blockchainName, setBlockchainName] = useState();
  const [isViewBlockChainModalVisible, setIsViewBlockChainModalVisible] =
    useState(false);
  const showViewBlockChainModal = (block) => {
    setBlockchainName(block);
    setIsViewBlockChainModalVisible(true);
  };

  const hideViewBlockChainModal = () => {
    setBlockchainName();
    setIsViewBlockChainModalVisible(false);
  };

  const [blockchain, setBlockChain] = useState();
  const getBlockchainDetail = async (block) => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    try {
      await fetch(
        `https://dashboard.postgresbc.info/cgi-bin/pgbc_api/get_block_schematic?username=${username}&password=${password}&blockchain=${block}`,
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
            setBlockChain(data?.schema);
            showViewBlockChainModal(block);
          }
        });
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  const columns = [
    {
      title: "No.",
      dataIndex: "no",
    },
    {
      title: "Blockchain Name",
      dataIndex: "name",
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space size="middle">
          <ViewButton
            src={EyeIcon}
            onClick={() => getBlockchainDetail(record.name)}
          />
        </Space>
      ),
    },
  ];
  const data = blockchainList?.map((block, index) => {
    return {
      no: index + 1,
      name: block,
      //   Action: (
      //     <ViewButton
      //       src={EyeIcon}
      //       onClick={() => getBlockchainDetail(block)}
      //     />
      //   ),
    };
  });

  return (
    <>
      <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
        <Table columns={columns} dataSource={data} />
      </div>
      {isViewBlockChainModalVisible && (
        <ViewBlockChainModal
          visible={isViewBlockChainModalVisible}
          onCancel={hideViewBlockChainModal}
          blockchain={blockchain}
          blockchainName={blockchainName}
        />
      )}
    </>
  );
};

export default BlockChainTable;

const ViewBlockChainModal = ({
  visible,
  onCancel,
  blockchain,
  blockchainName,
}) => {
  return (
    <Modal
      visible={visible}
      centered
      onCancel={onCancel}
      width={700}
      footer={null}
    >
      <div style={{ margin: "5px 40px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0",
          }}
        >
          <h3 style={{ fontWeight: "700", color: "#039CD8", fontSize: "34px" }}>
            View Blockchain
          </h3>
        </div>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <h3 style={{ fontWeight: "bold", fontSize: "16px" }}>
              Blockchain Name
            </h3>
            <p style={{ color: "#666666", fontSize: "16px" }}>
              {blockchainName}
            </p>
          </Col>
        </Row>
        {blockchain?.map((type, index) => (
          <Row gutter={[16, 16]} key={index}>
            <Col span={12}>
              <h3 style={{ fontWeight: "bold", fontSize: "16px" }}>
                Column Name
              </h3>
              <p style={{ color: "#666666", fontSize: "16px" }}>
                {type?.key_name}
              </p>
            </Col>
            <Col span={12}>
              <h3 style={{ fontWeight: "bold", fontSize: "16px" }}>
                Data Type
              </h3>
              <p style={{ color: "#666666", fontSize: "16px" }}>
                {type?.key_type}
              </p>
            </Col>
          </Row>
        ))}
      </div>
    </Modal>
  );
};
