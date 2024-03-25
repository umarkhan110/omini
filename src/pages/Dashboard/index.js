import React from "react";
import { Col, Row } from "antd";

//Breadcrumb
// import Breadcrumb from '../../Common/Breadcrumb';
import usecustomStyles from "../../Common/customStyles";
import Widget from "./Widget";
import Revenue from "./Revenue";

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
    <>
      <div>
        <Col gutter={[24, 24]} style={{ margin: "40px 10px" }}>
          <Col xs={24} xxl={24}>
            <h1 style={{ fontWeight: "bold" }}>Dashboard</h1>
            <div>
              <Row gutter={[14, 14]} style={{ marginTop: customStyles.margin }}>
                <Widget />
                <Revenue />
              </Row>
            </div>
          </Col>
        </Col>
      </div>
    </>
  );
};

export default 
/**
 * @function
 * @typedef {Object} Dashboard
 * @property {Function} Dashboard - The functional component in React called "Dashboard".
 */
Dashboard;
