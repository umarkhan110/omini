import React, { useEffect, useState } from 'react';
import withRouter from '../Common/withRouter';
import { ConfigProvider, Layout } from 'antd';
import HeaderLayout from './Header';
// import FooterLayout from './Footer';
import SidebarLayout from './SidebarLayout';
import { ThemeProvider, styled } from 'styled-components';
import { themecolor, darkthemecolors } from '../../src/config';
import { useTheme }  from '../Common/ThemeContext';

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
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth > 768);

  const handleToggleMode = () => {
    toggleTheme();
  };

  const handleToggleSidebar = () => {
    setIsSidebarVisible(prevState => !prevState);
  };

  useEffect(() => {
    updateWindowDimensions();
    window.addEventListener("resize", updateWindowDimensions);

    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, []);

  const updateWindowDimensions = () => {
    // setWindowWidth(window.innerWidth);
    setIsSidebarVisible(window.innerWidth > 768);
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={theme === 'dark' ? darkthemecolors : themecolor}>
        <ConfigProvider theme={theme === 'dark' ? darkthemecolors : themecolor}>
          {isSidebarVisible && <SidebarLayout theme={theme} handleToggleSidebar={handleToggleSidebar}/>}
          <Layout style={{ minHeight: '100vh' }}>
            <HeaderLayout darkMode={theme} handleToggleMode={handleToggleMode} handleToggleSidebar={handleToggleSidebar} isSidebarVisible={isSidebarVisible} />
            <StyleLayout id='antLayoutContent' style={{ marginLeft: isSidebarVisible ? `${themecolor.components.Menu.verticalSidebarWidth}px` : 0 }}>
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
