import React from "react";
import { Modal, Form, Button, Input, Row, Col, Select } from "antd";
import { ShowNotification } from "../../Common/ShowNotification";
const { TextArea } = Input;
const { Option } = Select;

const AddBlockData = ({ visible, onCancel, blockchainList }) => {
  const [form] = Form.useForm();

  const addBlockData = async () => {
    try {
      const values = await form.validateFields();
      console.log("Add Block Data:", values);
      // Perform the logic to add the user
      const response = await fetch(
        `https://dashboard.postgresbc.info/cgi-bin/pgbc_api/add_block_data?username=${values.username}&password=${values.userPassword}&ddl=${values?.bql}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${localStorage.getItem("api_key")}`,
          },
        }
      );
      const responseBody = await response.text();
      console.log(responseBody);
      // if (
      //   responseBody ==
      //   "User Defined Type, has been created, and is now ready for use."
      // ) {
      //   ShowNotification(responseBody, "success");
      //   form.resetFields();
      //   onCancel();
      // } else {
      const errorMessage = responseBody.replace(/^{"error":"ERROR: |"}$/g, "");
      const errorMessage2 = errorMessage.replace('"}', "");
      ShowNotification(errorMessage2, "info");
      // }
    } catch (error) {
      console.error("Error adding block data:", error);
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
        <Button key="add" type="primary" onClick={addBlockData}>
          Add
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
            Add Block Data
          </h3>
        </div>
        <Form form={form} layout="vertical">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Form.Item
                name={`blockchainName`}
                label="BlockChain"
                rules={[
                  { required: true, message: "Please select blockchain" },
                ]}
              >
                <Select
                  placeholder="Select Blockchain"
                  style={{ width: "100%" }}
                >
                  {blockchainList?.map((blockchain) => (
                    <Option value={blockchain}>{blockchain}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true, message: "Please enter username" }]}
              >
                <Input placeholder="Username"/>
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item
                name="userPassword"
                label="User Password"
                rules={[
                  { required: true, message: "Please enter user password" },
                ]}
              >
                <Input.Password placeholder="User Password"/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                name="bql"
                label="Block Query Language"
                rules={[
                  { required: true, message: "Enter Query to add block" },
                ]}
              >
                <TextArea rows={6} placeholder="BQL" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default AddBlockData;
