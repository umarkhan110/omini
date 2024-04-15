import React, { useEffect, useState } from "react";
import { Button, Col, Input, Row } from "antd";
import { Header } from "antd/es/layout/layout";
import BrandLogo from "../assets/images/logo-light.png";
import { styled } from "styled-components";
import { Search } from "lucide-react";
import { MenuUnfoldOutlined } from "@ant-design/icons";

const StyleHeader = styled(Header)`
  padding-inline: 24px;
  position: fixed;
  right: 0;
  top: 0;
  border-bottom: 1px solid;
  z-index: 999;
  background: ${({ theme }) => theme.token.colorBgContainer};

  @media screen and (max-width: 768px) {
    left: 0;
  }
`;

// const HeaderContainer = styled.ul`
//   font-size: 15px;
//   padding-inline: 0;
//   display: flex;
//   gap: 10px;
//   margin: 0;
//   justify-content: end;

//   .ant-avatar {
//     background-color: transparent;
//     transition: all 0.5s ease;
//     &:hover {
//       background-color: ${({ theme }) => theme.token.colorBorder};
//     }
//   }
// `;

const HeaderLayout = ({ handleToggleSidebar }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    updateWindowDimensions();
    window.addEventListener("resize", updateWindowDimensions);

    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, []);

  const updateWindowDimensions = () => {
    setWindowWidth(window.innerWidth);
  };

  return (
    <React.Fragment>
      <StyleHeader id="antHeaderMain" style={{ left:  window.innerWidth > 768 ? "260px" : "0", border: "none"}}>
        <Row align="middle" gutter={[16, 24]}>
          {windowWidth <= 768 && (
            <Col xs={4}>
              <img
                src={BrandLogo}
                height={24}
                style={{ display: "none" }}
                alt=""
              />
              <Button type="primary" onClick={handleToggleSidebar}>
                <MenuUnfoldOutlined />
              </Button>
            </Col>
          )}
          <Col xs={18} sm={18} md={12} lg={7}>
            <Input
              prefix={<Search size={15} color={"#545454"} />}
              placeholder="Search"
              style={{ borderRadius: "50px" }}
            />
          </Col>
        </Row>
      </StyleHeader>
    </React.Fragment>
  );
};

export default HeaderLayout;
