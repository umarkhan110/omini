import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Input, Row } from "antd";
import { Header } from "antd/es/layout/layout";
import BrandLogo from "../assets/images/logo-light.png";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { themecolor } from "../config.js";
import { Search } from "lucide-react";
import profileImages from "../assets/images/user.svg";
// import usecustomStyles from "../Common/customStyles";
import { MenuUnfoldOutlined } from "@ant-design/icons";

// const customStyles = usecustomStyles();
// const { Text } = Typography;

const StyleHeader = styled(Header)`
  padding-inline: 24px;
  position: fixed;
  left: ${({ theme }) =>
    theme.direction === "rtl"
      ? "0"
      : `${themecolor.components.Menu.verticalSidebarWidth}px`};
  right: ${({ theme }) =>
    theme.direction === "rtl"
      ? `${themecolor.components.Menu.verticalSidebarWidth}px`
      : "0"};
  top: 0;
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.token.colorBorder};
  z-index: 999;
  background: ${({ theme }) => theme.token.colorBgContainer};

  @media screen and (max-width: 768px) {
    /* Apply the responsive style without considering RTL or LTR */
    left: 0;
    right: 0;
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

const StyleHeaderSearchBar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// const StyleFlagDropdown = styled.div`
//   min-width: 145px;

//   ul {
//     li {
//       padding: 5px 0;
//       a {
//         transition: all 0.5s ease;
//         &:hover {
//           color: ${customStyles.colorPrimary};
//         }
//       }
//     }
//   }
// `;

// const profileContentPopover = (
//   <StyleFlagDropdown>
//     <ul
//       style={{ padding: "6px", listStyleType: "none" }}
//       className="ant-pl-0 ant-mb-0"
//     >
//       <li>
//         <Text type="secondary" style={{ fontSize: "13px" }}>
//           Welcome to Omni Index!
//         </Text>
//       </li>
//       <li>
//         <Link to="/login" onClick={() => localStorage.clear()}>
//           <Text type="secondary">
//             <FileOutput className="ant-mr-1" size={16} />
//           </Text>
//           <Text> Logout</Text>
//         </Link>
//       </li>
//     </ul>
//   </StyleFlagDropdown>
// );

const HeaderLayout = () => {
  const [isClick, setIsClick] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    setIsClick(false);
    updateWindowDimensions(); // Initialize windowWidth state
    window.addEventListener("resize", updateWindowDimensions);

    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, []);

  const updateWindowDimensions = () => {
    setWindowWidth(window.innerWidth);
  };

  const handleToggleButton = () => {
    setIsClick((prevIsClick) => !prevIsClick); // Use the previous stateSD
    const sidebarLayout = document.getElementById("sidebar-layout");
    sidebarLayout.style.display = isClick ? "none" : "block";
  };

  // Set the visibility of the sidebar based on the isClick state
  useEffect(() => {
    const sidebarLayout = document.getElementById("sidebar-layout");
    if (sidebarLayout) {
      if (windowWidth < 768) {
        sidebarLayout.style.display = "none";
      } else {
        sidebarLayout.style.display = "block";
      }
    }
  }, [windowWidth]);

  return (
    <React.Fragment>
      <StyleHeader id="antHeaderMain">
        <Row align="middle" gutter={[16, 24]}>
          {windowWidth < 768 && (
            <Col span={4} lg={1}>
              <img
                src={BrandLogo}
                height={24}
                style={{ display: "none" }}
                alt=""
              />
              <Button type="primary" onClick={handleToggleButton}>
                <MenuUnfoldOutlined />
              </Button>
            </Col>
          )}
          <Col span={5} lg={5}>
            <StyleHeaderSearchBar>
              <Search size={15} />
              <Input placeholder="Search" bordered={false} />
            </StyleHeaderSearchBar>
          </Col>
          <Col span={6} lg={8} className="ant-ml-auto">
            <HeaderContainer className="ant-topbar-head list-unstyled">
              <li>
                {/* <Popover
                  placement="bottomRight"
                  content={profileContentPopover}
                  // trigger={["click"]}
                > */}
                  <Badge dot offset={[-3, 5]}>
                    <Link>
                      <img
                        src={profileImages}
                        alt=""
                        height={36}
                        style={{ borderRadius: "50%" }}
                      ></img>
                    </Link>
                  </Badge>
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
