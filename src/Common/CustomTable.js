import React, { useState } from "react";
import styled from "styled-components";
import EyeIcon from "../assets/images/eye.svg";
import { Modal, Row, Col } from "antd";

const TableContainer = styled.div`
  margin: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background: #f2fafd;
  padding: 8px;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    // background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  border-bottom: 1px solid #ddd;
  padding: 8px;
  color: #16161d;
  font-size: 15px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 20px;
`;

const PageButton = styled.button`
  margin: 0 5px;
  width: 23px;
  height: 23px;
  padding: 3px 10px;
  background: none;
  border: 1px solid #ccc;
  border-color: ${(props) => (props.active ? "#007bff" : "#fff")};
  color: ${(props) => (props.active ? "#007bff" : "black")};
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PageNextButton = styled.button`
  margin: 0 5px;
  width: 23px;
  height: 23px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: 1px solid #ccc;
  cursor: pointer;
  border-radius: 50%;
  color: black;
  font-size: 30px;
  &:hover {
    background-color: #007bff;
    color: white;
    border: none;
  }
`;

const ViewButton = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
const CustomTable = ({ blockchainList }) => {
  const [currentPage, setCurrentPage] = useState(1);
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
            showViewBlockChainModal(block)
          }
        });
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const data = blockchainList?.map((block, index) => {
    return {
      "No.": index + 1,
      "Blockchain Name": block,
      Action: (
        <ViewButton
          src={EyeIcon}
          onClick={() => getBlockchainDetail(block)}
        />
      ),
    };
  });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(data?.length / itemsPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const renderTableData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex).map((item, index) => (
      <TableRow key={index}>
        {Object.values(item).map((value, index) => (
          <TableCell key={index}>{value}</TableCell>
        ))}
      </TableRow>
    ));
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <PageButton
          key={i}
          active={i === currentPage}
          onClick={() => handleClick(i)}
        >
          {i}
        </PageButton>
      );
    }
    return pages;
  };

  return (
    <>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              {Object.keys(data[0]).map((key, index) => (
                <TableHeader key={index}>{key}</TableHeader>
              ))}
            </tr>
          </thead>
          <tbody>{renderTableData()}</tbody>
        </Table>
        <Pagination>
          <PageNextButton onClick={handlePrevious} disabled={currentPage === 1}>
            &#129168;
          </PageNextButton>
          {renderPagination()}
          <PageNextButton
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            &#129170;
          </PageNextButton>
        </Pagination>
      </TableContainer>
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

export default CustomTable;

const ViewBlockChainModal = ({ visible, onCancel, blockchain, blockchainName }) => {


  return (
    <Modal visible={visible} centered onCancel={onCancel} width={700} footer={null}>
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
          <h3 style={{ fontWeight: "bold", fontSize: "16px" }}>Blockchain Name</h3>
              <p style={{ color: "#666666", fontSize: "16px" }}>{blockchainName}</p>
          </Col>
        </Row>
        {blockchain?.map((type, index) => (
        <Row gutter={[16, 16]} key={index}>
        <Col span={12}>
        <h3 style={{ fontWeight: "bold", fontSize: "16px"  }}>Column Name</h3>
            <p style={{ color: "#666666", fontSize: "16px" }}>{type?.key_name}</p>
        </Col>
        <Col span={12}>
        <h3 style={{ fontWeight: "bold", fontSize: "16px" }}>Data Type</h3>
            <p style={{ color: "#666666", fontSize: "16px" }}>{type?.key_type}</p>
        </Col>
      </Row>
        ))}

      </div>
    </Modal>
  );
};
