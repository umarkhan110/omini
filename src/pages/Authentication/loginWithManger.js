import React from "react";
import { Card, Form, Input, Button, Row, Col, Checkbox } from "antd";
import ParticleAuth from "../../Common/ParticleAuth";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as Yup from "yup";
import { ShowNotification } from "../../Common/ShowNotification";
const StyleWrapper = styled.div`
  background-color: ${({ theme }) => theme.token.authbgcolor};
`;

const SigninWithManager = () => {
  const navigate = useNavigate();

  //   useEffect(() => {
  //     async function getToken() {
  //       const token = localStorage.getItem("api_key");
  //       if (token) {
  //         return navigate("/dashboard");
  //       }
  //     }
  //     getToken();
  //   }, []);

  const validationSchema = Yup.object({
    manager_username: Yup.string().required("Please Enter Manager Username"),
    manager_password: Yup.string().required("Please Enter Manager Password"),
  });

  const validation = useFormik({
    initialValues: {
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
      const get_user_count_response = await fetch(
        `https://dashboard.postgresbc.info/cgi-bin/pgbc_api/get_user_count?username=${values.manager_username}&password=${values.manager_password}`,
        {
          method: "POST",
          headers: {
            Authorization: "Basic " + localStorage.getItem("api_key"),
            "Content-Type": "application/json",
          },
        }
      );

      const res = await get_user_count_response.text();
      if (!res.includes("error")) {
        localStorage.setItem("username", values.manager_username);
        localStorage.setItem("password", values.manager_password);

        navigate("/dashboard");
      } else {
        ShowNotification("Invalid credential", "error");
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
                    <div style={{ marginTop: "30px", padding: "15px" }}>
                      <Col
                        xs={24}
                        align="center"
                        style={{ marginBottom: "40px" }}
                      >
                        <h1
                          style={{
                            color: "#039CD8",
                            fontWeight: "500",
                            fontSize: "20px",
                          }}
                        >
                          Welcome Back!
                        </h1>
                        <p
                          style={{
                            color: "#000000",
                            fontWeight: "400",
                            fontSize: "14px",
                          }}
                        >
                          Sign in to continue
                        </p>
                      </Col>
                      <Form onSubmit={validation.handleSubmit}>
                        <div>
                          <label
                            style={{
                              color: "#000000",
                              fontWeight: "600",
                              fontSize: "18px",
                              letterSpacing: "0em",
                            }}
                          >
                            Manager Name
                          </label>
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
                          <label
                            style={{
                              color: "#000000",
                              fontWeight: "600",
                              fontSize: "18px",
                              letterSpacing: "0em",
                            }}
                          >
                            Manager Password
                          </label>
                          <Input
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
                        <Col span={12} style={{ margin:"10px 0"}}>
                          <Checkbox>Remember</Checkbox>
                        </Col>
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

export default SigninWithManager;
