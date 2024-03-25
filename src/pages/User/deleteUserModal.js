// DeleteUserModal.jsx
import React from "react";
import { Modal, Form, Button, Input, Row, Col } from "antd";
import { ShowNotification } from "../../Common/ShowNotification";

const DeleteUserModal = ({ visible, onCancel }) => {
  const [form] = Form.useForm();

  const handleDeleteUser = async () => {
    try {
      const values = await form.validateFields();
      console.log("Delete user:", values);
      // Perform the logic to add the user
      const response = await fetch(
        `https://dashboard.postgresbc.info/cgi-bin/pgbc_api/delete_user?username=${values.managerUsername}&password=${values.managerPassword}&user=${values.username}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${localStorage.getItem("api_key")}`
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete user");
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
      console.error("Error delete user:", error);
    }
  };
  

  return (
    <Modal
      // title="Add User"
      visible={visible}
      centered
      onCancel={onCancel}
      width={700}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="add" type="primary" onClick={handleDeleteUser}>
          Delete
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
            Delete User
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
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default DeleteUserModal;
