import React, { useState } from "react";
import withRouter from "../Common/withRouter";
import OmniLogo from "../assets/images/logo.svg";
import OmniLogo2 from "../assets/images/logo2.png";
import DashboardIcon from "../Common/Icons/DashboardIcon.js";
import UsersIcon from "../Common/Icons/UserIcon.js";
import BlockchainIcon from "../Common/Icons/BlockchainIcon.js";
import MlAiIcon from "../Common/Icons/MLIcon.js";
import { Menu, Typography } from "antd";
import { ChevronLeft, ChevronRight, FileOutput } from "lucide-react";
import { themecolor } from "../config.js";
import {
  StyleSimpleBar,
  StyledCollapsedButton,
  StyleBrandLogo,
  StyleSider,
} from "../Common/SidebarStyle";
import { Link, useLocation, useNavigate } from "react-router-dom";
const { Text } = Typography;
const SidebarLayout = () => {
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
      style: { marginBottom: "7%" }, // Add marginBottom style here
    };
  }
  const location = useLocation();
  const navigate = useNavigate()
  const [activatedItem, setActivatedItem] = useState(() => {
    const currentPath = location.pathname.replace("/", "");
    return currentPath || "dashboard";
  });
  // console.log(activatedItem)
  const items = [
    getItem(
      null,
      null,
      null,
      [
        getItem(
          <Link to="/dashboard">Dashboard</Link>,
          "dashboard",
          <DashboardIcon
            color={activatedItem == "dashboard" ? "#ffff" : "#828282"}
          />
        ),
        getItem(
          <Link to="/users">User Actions</Link>,
          "users",
          <UsersIcon color={activatedItem == "users" ? "#ffff" : "#828282"} />
        ),
        getItem(
          <Link to="/blockchain">Manage BlockChain</Link>,
          "blockchain",
          <BlockchainIcon
            color={activatedItem == "blockchain" ? "#ffff" : "#828282"}
          />
        ),
        getItem(
          <Link to="/dashboard">ML/AI</Link>,
          "ml",
          <MlAiIcon color={activatedItem == "ml" ? "#ffff" : "#828282"} />
        ),
      ],
      "group"
    ),
  ];

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    const antHeaderMain = document.getElementById("antHeaderMain");
    if (antHeaderMain) {
      antHeaderMain.style.left = !collapsed ? "100px" : "260px";
    }
    const antLayoutContent = document.getElementById("antLayoutContent");
    if (antLayoutContent) {
      antLayoutContent.style.marginLeft = !collapsed ? "100px" : "260px";
    }
    const antFooterLayout = document.getElementById("antFooterLayout");
    if (antFooterLayout) {
      antFooterLayout.style.marginLeft = !collapsed ? "100px" : "260px";
    }
  };

  const toggleActivation = (key) => {
    setActivatedItem(key);
  };

  const handleUserLogout = ()=>{
    localStorage.removeItem("manager_username");
    localStorage.removeItem("manager_password");
    navigate("/login-team-manger")
  }
  return (
    <React.Fragment>
      <StyleSider
        id="sidebar-layout"
        width={themecolor.components.Menu.verticalSidebarWidth}
        collapsed={collapsed}
        collapsedWidth="100"
        breakpoint="lg"
        style={{ padding: collapsed === false ? 10 : 0 }}
      >
        <StyleBrandLogo className="demo-logo ant-mx-auto">
          <img
            alt="Brand logo"
            src={OmniLogo}
            width={700}
            style={{ lineHeight: "24px" }}
            className="brand-dark-logo ant-mx-auto"
          />
          <img
            alt="Brand sm logo"
            src={OmniLogo2}
            width={100}
            style={{ lineHeight: "24px" }}
            className="brand-sm-logo ant-mx-auto"
          />
          <StyledCollapsedButton
            themecolor={themecolor}
            type="link"
            onClick={toggleCollapsed}
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </StyledCollapsedButton>
        </StyleBrandLogo>
        <div>
          <StyleSimpleBar>
            <Menu
              selectedKeys={[activatedItem]}
              mode="inline"
              theme="light"
              items={items}
              collapsedWidth="100"
              defaultSelectedKeys={["1"]}
              onClick={({ key }) => toggleActivation(key)}
              style={{ marginTop: "10%" }}
              className="custom-menu"
            ></Menu>
            <div>
              <ul
                style={{ padding: "6px", listStyleType: "none" }}
                className="ant-pl-0 ant-mb-0"
              >
                <li
                  style={{
                    backgroundColor: "#fff7f7",
                    padding: "10px",
                    borderRadius: "10px",
                    margin:"10px 1px"
                  }}
                >
                  <button
                    to=""
                    onClick={() => handleUserLogout()}
                    style={{ border: "none", background:"transparent" }}
                  >
                    <Text type="secondary">
                      <FileOutput
                        className="ant-mr-1"
                        size={16}
                        color={"#E45A5A"}
                      />
                    </Text>
                    <Text style={{ color: "#E45A5A" }}>
                      {" "}
                      Team manager logout
                    </Text>
                  </button>
                </li>
                <li
                  style={{
                    backgroundColor: "#fff7f7",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <Link
                    to="/login"
                    onClick={() => localStorage.clear()}
                    style={{ textDecoration: "none" }}
                  >
                    <Text type="secondary">
                      <FileOutput
                        className="ant-mr-1"
                        size={16}
                        color={"#E45A5A"}
                      />
                    </Text>
                    <Text style={{ color: "#E45A5A" }}>
                      {" "}
                      Individual instance logout
                    </Text>
                  </Link>
                </li>
              </ul>
            </div>
          </StyleSimpleBar>
        </div>
      </StyleSider>
    </React.Fragment>
  );
};

export default withRouter(SidebarLayout);
