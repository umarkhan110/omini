import React from "react";
import { Col, Row } from "antd";

//Breadcrumb
// import Breadcrumb from '../../Common/Breadcrumb';
import usecustomStyles from "../../Common/customStyles";
import Widget from "./Widget";
import {Revenue}  from "./Revenue";
import {Revenue2}  from "./Revenue2";
import {Revenue3}  from "./Revenue3";
import {Revenue4}  from "./Revenue4";

const 
/**
 * This code snippet represents a functional component in React called "Dashboard".
 */
customStyles = usecustomStyles();
/**
 * @constant {JSX.Element} Dashboard - Represents the Dashboard functional component.
 */

const Dashboard = () => {
  /**
   * This code snippet sets the title of the document.
   * 
   * @constant {string} document.title - The title of the document.
   */
  document.title = "Dashboard" + process.env.REACT_APP_PAGE_TITLE;

  return (
      <Row>
          <Col xs={24}>
            <h1 style={{ fontWeight: "bold" }}>Dashboard</h1>
              <Row  style={{ marginTop: customStyles.margin }}>
                <Widget />
                <Revenue />
                <Revenue2 />
                <Revenue3 />
                <Revenue4 />
              </Row>
          </Col>
      </Row>
  );
};

export default 
/**
 * @function
 * @typedef {Object} Dashboard
 * @property {Function} Dashboard - The functional component in React called "Dashboard".
 */
Dashboard;
