import { Button } from 'antd';
import styled, { css } from 'styled-components';
import { themecolor } from '../config.js';
import SimpleBar from 'simplebar-react';
import Sider from 'antd/es/layout/Sider.js';


const StyledCollapsedButton = styled(Button)`
    height: 30px;
    width: 30px;
    padding: 2px;    
    position: absolute;
    background: ${({ theme }) => theme.components.Menu.itemBg};
    border: 1px solid;
    border-color: ${({ theme }) => theme.token.colorBorder};

     /* RTL Styles */
      ${({ theme }) =>
      theme.direction === 'rtl' &&
      css`
        left: -14px;
        `}
      /* LTR Styles */
      ${({ theme }) =>
      theme.direction !== 'rtl' &&
      css`
        right: -14px;~
      `}
    `;

const StyleSimpleBar = styled(SimpleBar)`
    height: calc(100vh - 80px);
    padding-bottom: 20px;
  `;

const StyleBrandLogo = styled.div`
  background-color:  ${({ theme }) => theme.components.Menu.itemBg};
  display: flex;
  align-items: center;
  height: calc(${themecolor.token.controlHeight}px * 2);
  padding-inline: 14px;
  line-height: 81px;
  justify-content: center;
`;

const StyleSider = styled(Sider)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index:1000;
  border-right: 1px solid ${({ theme }) => theme.components.Menu.menuBorderColor};
  background: ${({ theme }) => theme.components.Menu.itemBg};
`;

// const MobileStyleSider = styled(Sider)`
//   position: absolute;
//   top: 0;
//   bottom: 0;
//   left: 260;
//   z-index:1000;
//   border-right: 1px solid ${({ theme }) => theme.components.Menu.menuBorderColor};
//   background: ${({ theme }) => theme.components.Menu.itemBg};
// `;


export { StyledCollapsedButton, StyleSimpleBar, StyleBrandLogo, StyleSider, };