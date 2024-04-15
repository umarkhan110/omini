// ModifyUserModal.jsx
import React, { useState } from "react";
import { Modal, Form, Button, Input, Row, Col, Checkbox } from "antd";
import { ShowNotification } from "../../Common/ShowNotification";

const ModifyUserModal = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const [isManager, setIsManager] = useState(false);
  const handleModifyUser = async () => {
    try {
      const values = await form.validateFields();
      console.log("Modify user:", values, isManager);
      // Perform the logic to add the user
      const response = await fetch(
        `https://dashboard.postgresbc.info/cgi-bin/pgbc_api/modify_user?username=${values.managerUsername}&password=${values.managerPassword}&user=${values.username}&userpassword=${values.userOldPassword}&newpassword=${values.userNewPassword}&tomanager=${isManager}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${localStorage.getItem("api_key")}`
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to modify user");
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
      console.error("Error modifying user:", error);
    }
  };

  const handleCheckboxChange = (e) => {
    setIsManager(e.target.checked);
  };

  return (
    <Modal
      // title="Modify User"
      visible={visible}
      centered
      onCancel={onCancel}
      width={700}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="modify" type="primary" onClick={handleModifyUser}>
          Modify
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
          Modify User
          </h3>
        </div>
      <Form form={form} layout="vertical">
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
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
          <Col xs={24} lg={12}>
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
          <Col xs={24} lg={12}>
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true, message: "Please enter username" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item
              name="userOldPassword"
              label="User Old Password"
              rules={[
                { required: false, message: "Please enter user old password" },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Form.Item
              name="userNewPassword"
              label="User New Password"
              rules={[
                { required: false, message: "Please enter user new password" },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
          <Form.Item
                name="isManager"
                label="Is-Manager"
                rules={[{ required: false }]}
              >
                <Checkbox onChange={handleCheckboxChange}>Is-Manager</Checkbox>
              </Form.Item>
          </Col>
        </Row>
      </Form>
      </div>
    </Modal>
  );
};

export default ModifyUserModal;
