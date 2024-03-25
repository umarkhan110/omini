import React, { useEffect } from "react";
import { Card, Form, Input, Button, Row, Col } from "antd";
import ParticleAuth from "../../Common/ParticleAuth";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as Yup from "yup";
import {ShowNotification} from "../../Common/ShowNotification"
const StyleWrapper = styled.div`
  background-color: ${({ theme }) => theme.token.authbgcolor};
`;

const Signin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    async function getToken() {
      const token = localStorage.getItem("api_key");
      if (token) {
        return navigate("/dashboard");
      }
    }
    getToken();
  }, []);

  const validationSchema = Yup.object({
    instance_username: Yup.string().required("Please Enter Instance Username"),
    instance_password: Yup.string().required("Please Enter Instance Password"),
    node_address: Yup.string().required("Please Enter Node Address"),
    manager_username: Yup.string().required("Please Enter Manager Username"),
    manager_password: Yup.string().required("Please Enter Manager Password"),
  });

  const validation = useFormik({
    initialValues: {
      instance_username: "",
      instance_password: "",
      node_address: "",
      node_port: 5434,
      manager_username: "",
      manager_password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await onSubmit(values);
    },
  });

  const onSubmit = async (values) => {
    try {
      const response = await fetch(
        `https://dashboard.postgresbc.info/cgi-bin/pgbc_api/get_api_key?instance=${values.instance_username}&password=${values.instance_password}&server=${values.node_address}&port=${values.node_port}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      const data = await response.json();
      if (data) {
        try {
          const get_user_count_response = await fetch(
            `https://dashboard.postgresbc.info/cgi-bin/pgbc_api/get_user_count?username=${values.manager_username}&password=${values.manager_password}`,
            {
              method: "POST",
              headers: {
                Authorization: "Basic " + data.api_key,
                "Content-Type": "application/json",
              },
            }
          );
  
          const res = await get_user_count_response.text();
          if (!res.includes("error")) {
            localStorage.setItem("api_key", data.api_key);
            localStorage.setItem("username", values.manager_username);
            localStorage.setItem("password", values.manager_password);
            localStorage.setItem("instance", values.instance_username);
  
            navigate("/dashboard");
          }else{
            ShowNotification("Invalid credential", "error")
          }
        } catch (error) {
          console.error("Error during login:", error);
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  

  return (
    <React.Fragment>
      <StyleWrapper className="auth-page-wrapper">
        <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
          <Col xs={24} lg={14}>
            <Card>
              <Row gutter={[16, 24]}>
                <ParticleAuth />
                <Col xs={24} lg={12}>
                  <div style={{ border: "0px" }}>
                    <div style={{ marginTop: "30px", padding: "40px" }}>
                      <Form onSubmit={validation.handleSubmit}>
                        <div>
                          <h3>Instance</h3>
                        </div>
                        <div>
                          <Input
                            name="instance_username"
                            style={{
                              margin: "10px 0px",
                              boxShadow: "none",
                              outline: "none",
                            }}
                            type="text"
                            value={validation.values.instance_username}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            placeholder="Instance Username"
                          />
                          {validation.touched.instance_username &&
                            validation.errors.instance_username && (
                              <p style={{ color: "#ff4d4f" }}>
                                {validation.errors.instance_username}
                              </p>
                            )}
                        </div>
                        <div>
                          <Input.Password
                            name="instance_password"
                            style={{
                              margin: "10px 0px",
                              boxShadow: "none",
                              outline: "none",
                            }}
                            type="password"
                            value={validation.values.instance_password}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            placeholder="Instance Password"
                          />
                          {validation.touched.instance_password &&
                            validation.errors.instance_password && (
                              <p style={{ color: "#ff4d4f" }}>
                                {validation.errors.instance_password}
                              </p>
                            )}
                        </div>
                        <div>
                          <Input
                            name="node_address"
                            style={{
                              margin: "10px 0px",
                              boxShadow: "none",
                              outline: "none",
                            }}
                            type="text"
                            value={validation.values.node_address}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            placeholder="Node Address"
                          />
                          {validation.touched.node_address &&
                            validation.errors.node_address && (
                              <p style={{ color: "#ff4d4f" }}>
                                {validation.errors.node_address}
                              </p>
                            )}
                        </div>
                        <div>
                          <Input
                            name="node_port"
                            style={{
                              margin: "10px 0px",
                              boxShadow: "none",
                              outline: "none",
                            }}
                            type="text"
                            value={validation.values.node_port}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            placeholder="Node port (defaults 5434)"
                          />
                          {validation.touched.node_port &&
                            validation.errors.node_port && (
                              <p style={{ color: "#ff4d4f" }}>
                                {validation.errors.node_port}
                              </p>
                            )}
                        </div>
                        <div>
                          <h3>Team Manager</h3>
                        </div>
                        <div>
                          <Input
                            name="manager_username"
                            style={{
                              margin: "10px 0px",
                              boxShadow: "none",
                              outline: "none",
                            }}
                            type="text"
                            value={validation.values.manager_username}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            placeholder="Manager Username"
                          />
                          {validation.touched.manager_username &&
                            validation.errors.manager_username && (
                              <p style={{ color: "#ff4d4f" }}>
                                {validation.errors.manager_username}
                              </p>
                            )}
                        </div>
                        <div>
                          <Input.Password
                            name="manager_password"
                            style={{
                              margin: "10px 0px",
                              boxShadow: "none",
                              outline: "none",
                            }}
                            type="password"
                            value={validation.values.manager_password}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            placeholder="Manager Password"
                          />
                          {validation.touched.manager_password &&
                            validation.errors.manager_password && (
                              <p style={{ color: "#ff4d4f" }}>
                                {validation.errors.manager_password}
                              </p>
                            )}
                        </div>
                        <div>
                          <Button
                            htmlType="submit"
                            type="primary"
                            onClick={(e) => {
                              e.preventDefault();
                              validation.handleSubmit();
                              return false;
                            }}
                            style={{ width: "100%" }}
                          >
                            Sign In
                          </Button>
                        </div>
                      </Form>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </StyleWrapper>
    </React.Fragment>
  );
};

export default Signin;
