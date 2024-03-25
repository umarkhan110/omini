import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthProtected = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    async function getToken() {
      const token = localStorage.getItem("api_key");
      const username = localStorage.getItem("username");
      const password = localStorage.getItem("password");
      if (!token) {
        return navigate("/login");
      } 
      else if(token && !username && !password){
        return navigate("/login-team-manger");
      }
    }
    getToken();
  }, []);

  return <>{props.children}</>;
};

export default AuthProtected;
