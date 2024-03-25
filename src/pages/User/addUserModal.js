// AddUserModal.jsx
import React from "react";
import { Modal, Form, Button, Input, Row, Col } from "antd";
import { ShowNotification } from "../../Common/ShowNotification";

const AddUserModal = ({ visible, onCancel }) => {
  const [form] = Form.useForm();

  const handleAddUser = async () => {
    try {
      const values = await form.validateFields();
      console.log("Add user:", values);
      // Perform the logic to add the user
      const response = await fetch(
        `https://dashboard.postgresbc.info/cgi-bin/pgbc_api/add_user?username=${values.managerUsername}&password=${values.managerPassword}&newuser=${values.username}&newuserpassword=${values.userPassword}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${localStorage.getItem("api_key")}`
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add user");
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
      console.error("Error adding user:", error);
    }
  };
  
  return (
    <Modal
      // title="Add User"
      visible={visible}
      centered
      width={700}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="add" type="primary" onClick={handleAddUser}>
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
            Add User
          </h3>
        </div>
        <Form form={form} layout="vertical">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                name="managerUsername"
                label="Manager Username"
                rules={[
                  { required: true, message: "Please enter manager username" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="managerPassword"
                label="Manager Password"
                rules={[
                  { required: true, message: "Please enter manager password" },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true, message: "Please enter username" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="userPassword"
                label="User Password"
                rules={[
                  { required: true, message: "Please enter user password" },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default AddUserModal;
