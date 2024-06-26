import React from "react";
import { Card, Button, Row, Col } from "antd";
import { HomeFilled } from "@ant-design/icons";
import usecustomStyles from "../../Common/customStyles";
import styled from "styled-components";

//import images
import logoLightFull from "../../assets/images/logo-light.png";
import authEffect2 from "../../assets/images/effect-pattern/auth-effect-2.png";
import authEffect from "../../assets/images/effect-pattern/auth-effect.png";

const StyleWrapper = styled.div`
  background-color: ${({ theme }) => theme.token.authbgcolor};
`;

const customStyles = usecustomStyles();

const FourzerofourAlt = () => {
  // page title
  document.title = "404 Alt Error" + process.env.REACT_APP_PAGE_TITLE;

  return (
    <React.Fragment>
      <StyleWrapper className="auth-page-wrapper">
        <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
          <Col xs={24} lg={14}>
            <Card>
              <Row gutter={[16, 24]}>
                <Col xs={24} xl={10}>
                  <Card
                    style={{
                      backgroundColor: customStyles.colorPrimary,
                      color: customStyles.colorBgContainer,
                      height: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "space-between",
                        padding: "20px",
                      }}
                    >
                      <div style={{ marginBottom: "30px" }}>
                        <img src={logoLightFull} alt="" height="26" />
                        <img
                          src={authEffect2}
                          alt=""
                          style={{
                            position: "absolute",
                            zIndex: "1",
                            top: "0%",
                            right: 0,
                            transform: "rotate(-45deg)",
                          }}
                        />
                        <img
                          src={authEffect}
                          alt=""
                          style={{
                            top: "-15px",
                            left: "-20px",
                            position: "absolute",
                            zIndex: "1",
                          }}
                        />
                        <img
                          src={authEffect}
                          alt=""
                          style={{
                            position: "absolute",
                            zIndex: "1",
                            bottom: "-15px",
                            right: "-20px",
                          }}
                        />
                      </div>

                      <div>
                        <h3 style={{ fontSize: "22px", fontWeight: "bold" }}>
                          Start your journey with us.
                        </h3>
                        <p>
                          It brings together your tasks, projects, timelines,
                          files, and more
                        </p>
                      </div>
                      <div>
                        <p style={{ marginBottom: "0px" }}>
                          &copy; {new Date().getFullYear()}OmniIndex
                        </p>
                      </div>
                    </div>
                  </Card>
                </Col>
                <Col xs={24} xl={14}>
                  <Card style={{ border: "0px" }}>
                    <div className="text-center">
                      <h1 style={{ fontSize: "35px", marginBottom: "0px" }}>
                        404
                      </h1>
                    </div>
                    <div className="text-center">
                      <div style={{ position: "relative" }}>
                        <h4
                          style={{
                            fontSize: "18px",
                            textTransform: "uppercase",
                          }}
                        >
                          Opps, page not found
                        </h4>
                        <p style={{ fontSize: "15px", marginBottom: "30px" }}>
                          It will be as simple as Occidental in fact, it will
                          Occidental to an English person
                        </p>
                        <div>
                          <Button href="/dashboard" type="primary">
                            <HomeFilled />
                            Back to home
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </StyleWrapper>
    </React.Fragment>
  );
};

export default FourzerofourAlt;
