import React, { useState } from 'react';
import withRouter from '../Common/withRouter';
import { ConfigProvider, Layout } from 'antd';
import HeaderLayout from './Header';
// import FooterLayout from './Footer';
import SidebarLayout from './SidebarLayout';
import { ThemeProvider, styled } from 'styled-components';
import { themecolor, darkthemecolors } from '../../src/config';
import { useTheme }  from '../Common/ThemeContext';
import MobileSidebar from './MobileSidebar';

const { Content } = Layout;

// margin-left: ${themecolor.components.Menu.verticalSidebarWidth}px;
const StyleLayout = styled(Layout)`
  position: relative;
  padding: calc(${themecolor.token.controlHeight}px * 2) 24px 0;

  .ant-breadcrumb {
    ol {
      justify-content: end;
    }
  }
`;

const LayoutComponents = ({ children }) => {

  const { theme, toggleTheme } = useTheme();
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const handleToggleMode = () => {
    toggleTheme();
  };

  const handleToggleSidebar = () => {
    setIsSidebarVisible(prevState => !prevState);
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={theme === 'dark' ? darkthemecolors : themecolor}>
        <ConfigProvider theme={theme === 'dark' ? darkthemecolors : themecolor}>
          {window.innerWidth > 768 && <SidebarLayout theme={theme} />}
          {window.innerWidth <= 767 && isSidebarVisible && <MobileSidebar theme={theme} handleToggleSidebar={handleToggleSidebar}/>}

          <Layout style={{ minHeight: '100vh', display: window.innerWidth <= 767 && isSidebarVisible ? "none" : "block", }}>
            <HeaderLayout darkMode={theme} handleToggleMode={handleToggleMode} handleToggleSidebar={handleToggleSidebar} />
            <StyleLayout id='antLayoutContent' style={{ marginLeft: window.innerWidth > 768 ? `${themecolor.components.Menu.verticalSidebarWidth}px` : 0 }}>
              <Content>
                {children}
              </Content>
            </StyleLayout>
          </Layout>
        </ConfigProvider>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default withRouter(LayoutComponents);
