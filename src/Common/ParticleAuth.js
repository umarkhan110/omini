import React from "react";
import loginUserImage from "../assets/images/effect-pattern/Group.svg";
import usecustomStyles from "./customStyles";
import { Col } from "antd";

const customStyles = usecustomStyles();

const ParticleAuth = () => {
  return (
    <React.Fragment>
      <Col
        xs={24}
        lg={10}
        style={{
          //   backgroundColor: customStyles.colorPrimary,
          color: customStyles.colorBgContainer,
          borderRadius: "6px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            height: "100%",
            alignItems: "center",
            placeContent: "center",
          }}
        >
          <div style={{ marginBottom: "30px" }}>
            <img src={loginUserImage} alt="" height="300" />
          </div>

          <div>
            <h3
              style={{ fontSize: "22px", fontWeight: "bold", color: "#039CD8" }}
            >
              PostgresBC
            </h3>
          </div>
        </div>
      </Col>
    </React.Fragment>
  );
};

export default ParticleAuth;
