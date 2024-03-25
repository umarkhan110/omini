import React from "react";
import { Modal, Form, Button, Input, Row, Col } from "antd";
import { ShowNotification } from "../../Common/ShowNotification";

const CreateUserDefinedTypes = ({ visible, onCancel }) => {
  const [form] = Form.useForm();

  const handleUserDefinedTypes = async () => {
    try {
      const values = await form.validateFields();
      console.log("Create udt:", values);
      const ddl = `CREATE TYPE .${values?.udt} AS (${values?.columnName} ${values?.dataType})`;
      // Perform the logic to add the user
      const response = await fetch(
        `https://dashboard.postgresbc.info/cgi-bin/pgbc_api/create_udt_type?username=${values?.username}&password=${values?.password}&ddl=${ddl}`,
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
      if (
        responseBody ==
        "User Defined Type, has been created, and is now ready for use."
      ) {
        ShowNotification(responseBody, "success");
        form.resetFields();
        onCancel();
      } else {
        const errorMessage = responseBody.replace(
          /^{"error":"ERROR: |"}$/g,
          ""
        );
        const errorMessage2 = errorMessage.replace('"}', '');
        ShowNotification(errorMessage2, "info")
      }
    } catch (error) {
      console.error("Error creating udt:", error);
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
        <Button key="add" type="primary" onClick={handleUserDefinedTypes}>
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
            User Defined Types
          </h3>
        </div>
        <Form form={form} layout="vertical">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                name="username"
                label="User Name"
                rules={[
                  { required: true, message: "Please enter user username" },
                ]}
              >
                <Input placeholder="User Name"/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="password"
                label="User Password"
                rules={[
                  { required: true, message: "Please enter user password" },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                name="udt"
                label="UDT Name"
                rules={[{ required: true, message: "Please enter UDT Name" }]}
              >
                <Input placeholder="UDT Name"/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="columnName"
                label="Column Name"
                rules={[{ required: true, message: "Please enter Column Name" }]}
              >
                <Input placeholder="Column Name"/>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                name="dataType"
                label="Data Type"
                rules={[{ required: true, message: "Please enter Data Type" }]}
              >
                <Input placeholder="Data Type"/>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default CreateUserDefinedTypes;
