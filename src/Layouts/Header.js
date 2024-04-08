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

const HeaderContainer = styled.ul`
  font-size: 15px;
  padding-inline: 0;
  display: flex;
  gap: 10px;
  margin: 0;
  justify-content: end;

  .ant-avatar {
    background-color: transparent;
    transition: all 0.5s ease;
    &:hover {
      background-color: ${({ theme }) => theme.token.colorBorder};
    }
  }
`;

const HeaderLayout = ({ handleToggleSidebar, isSidebarVisible }) => {
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
      <StyleHeader id="antHeaderMain" style={{ left: ` ${isSidebarVisible ? "260px" : "0"}`}}>
        <Row align="middle" gutter={[16, 24]}>
          {windowWidth < 768 && (
            <Col span={4} lg={1}>
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
          <Col span={5} lg={7}>
            <Input
              prefix={<Search size={15} color={"#545454"} />}
              placeholder="Search"
              style={{ borderRadius: "50px" }}
            />
          </Col>
          <Col span={6} lg={8} className="ant-ml-auto">
            <HeaderContainer className="ant-topbar-head list-unstyled">
              <li>
                {/* <Popover
                  placement="bottomRight"
                  content={profileContentPopover}
                  // trigger={["click"]}
                > */}
                {/* <Badge dot offset={[-3, 5]}>
                    <Link>
                      <img
                        src={profileImages}
                        alt=""
                        height={36}
                        style={{ borderRadius: "50%" }}
                      ></img>
                    </Link>
                  </Badge> */}
                {/* </Popover> */}
              </li>
            </HeaderContainer>
          </Col>
        </Row>
      </StyleHeader>
    </React.Fragment>
  );
};

export default HeaderLayout;
