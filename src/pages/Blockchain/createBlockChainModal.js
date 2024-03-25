// AddUserModal.jsx
import React, { useState } from "react";
import { Modal, Form, Button, Input, Row, Col, Select } from "antd";
import { ShowNotification } from "../../Common/ShowNotification";
const { Option } = Select;
const CreateBlockChainModal = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const [columns, setColumns] = useState([{ columnName: "", encryptedValue: "" }]);

  const handleAddColumn = () => {
    setColumns([...columns, { columnName: "", encryptedValue: "" }]);
  };

  const formatQuery = (obj) => {
    const { blockchainName, ...columns } = obj;
  
    const columnNames = [];
    const encryptedValues = [];
  
    for (const key in columns) {
      if (key.startsWith("columnName")) {
        columnNames.push(columns[key]);
      } else if (key.startsWith("encryptedValue")) {
        encryptedValues.push(columns[key]);
      }
    }
  
    const block = `CREATE BLOCK .${blockchainName}(`;
    const columnPairs = columnNames.map((columnName, index) => {
      return `${columnName} ${encryptedValues[index]}`;
    }).join(", ");
    const query = `${block}${columnPairs});`;
  
    return query;
  };

  const handleCreateBlockChain = async () => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    try {
      const values = await form.validateFields();
      console.log("Create blockchain:", values);
      const ddl = formatQuery(values)
      // Perform the logic to add the user
      const response = await fetch(
        `https://dashboard.postgresbc.info/cgi-bin/pgbc_api/create_block_schema?username=${username}&password=${password}&ddl=${ddl}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${localStorage.getItem("api_key")}`
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create blockchain");
      }
      const responseBody = await response.text();
      console.log(responseBody);
      const errorMessage = responseBody.replace(
        /^{"error":"ERROR: |"}$/g,
        ""
      );
      const errorMessage2 = errorMessage.replace('"}', '');
      ShowNotification(errorMessage2, "info")
      form.resetFields();
      onCancel();
    } catch (error) {
      console.error("Error creating blockchain:", error);
    }
  };
  return (
    <Modal
      visible={visible}
      centered
      onCancel={onCancel}
      width={700}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="add" type="primary" onClick={handleCreateBlockChain}>
          Create
        </Button>,
      ]}
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
            Create Blockchain
          </h3>
        </div>
        <Form form={form} layout="vertical">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                name="blockchainName"
                label="Create Blockchain"
                rules={[
                  { required: true, message: "Please enter blockchain name" },
                ]}
              >
                <Input placeholder="Bitcoin"/>
              </Form.Item>
            </Col>
          </Row>
          {columns.map((column, index) => (
          <Row gutter={[16, 16]} key={index}>
            <Col span={12}>
              <Form.Item
                   name={`columnName${index}`}
                label="Column Name"
                rules={[{ required: true, message: "Please enter column name" }]}
              >
                <Input placeholder="Column Name"/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={`encryptedValue${index}`}
                label="Encrypt"
                rules={[
                  { required: true, message: "Please select encryption option" },
                ]}
              >
                <Select placeholder="Data Type" style={{ width: '100%' }}>
                  <Option value="VARCHAR(64)">VARCHAR 64</Option>
                  <Option value="VARCHAR(128)">VARCHAR 128</Option>
                  <Option value="VARCHAR(256)">VARCHAR 256</Option>
                  <Option value="TEXT">TEXT</Option>
                  <Option value="NUMERIC">NUMERIC</Option>
                  <Option value="BLOCKUUID">BLOCK UUID</Option>
                  <Option value="BOOL">BOOL</Option>
                  <Option value="DATETIME">DATETIME</Option>
                  <Option value="DATETIME-DEFAULT">DATETIME - Default value</Option>
                  <Option value="DATETIME">DATETIME</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>))}
          <Row>
          <Col span={24} align="end">
            <Button key="add" type="primary" onClick={handleAddColumn}>
              Add
            </Button>
          </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default CreateBlockChainModal;
