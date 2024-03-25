/**
 * This code snippet represents a functional component in React called "App".
 * 
 * It renders a div element containing a ToastContainer component and a CustomThemeProvider component.
 * The CustomThemeProvider wraps the RoutesComponents component, which is imported from "./Routes/index".
 * The ToastContainer component is used for displaying toast notifications.
 * 
 * @returns {JSX.Element} The rendered React component.
 */
import React from "react";
import "antd/dist/reset.css";
import "./assets/scss/App.scss";
import "react-toastify/dist/ReactToastify.css";
//import Route
import RoutesComponents from "./Routes/index";
import { ThemeProvider as CustomThemeProvider } from "./Common/ThemeContext";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <CustomThemeProvider>
        <RoutesComponents />
      </CustomThemeProvider>
    </div>
  );
};

export default 
/**
 * @function
 * @typedef {Object} App
 * @property {Function} App - The functional component in React called "App".
 * @property {JSX.Element} App - The rendered React component.
 * 
 */
App;
