import React, { useState } from "react";
import { Card, Col, Row } from "antd";
import usecustomStyles from "../../Common/customStyles";
import addUser from "../../assets/images/add_user.svg";
import modifyUser from "../../assets/images/modify_user.svg";
import suspendUser from "../../assets/images/suspend_user.svg";
import deleteUser from "../../assets/images/delete_user.svg";
import shareAccess from "../../assets/images/share_access.svg";
import AddUserModal from "./addUserModal";
import ModifyUserModal from "./modifyUserModal";
import DeleteUserModal from "./deleteUserModal";
import SuspendUserModal from "./suspendUserModel";
import ShareAccessModal from "./shareAccessModal";

const customStyles = usecustomStyles();

const Users = () => {
  document.title = "Users" + process.env.REACT_APP_PAGE_TITLE;

  const [isAddUserModalVisible, setIsAddUserModalVisible] = useState(false);
  const [isModifyUserModalVisible, setIsModifyUserModalVisible] =
    useState(false);
  const [isSuspendUserModalVisible, setIsSuspendUserModalVisible] = useState(false);
  const [isShareAccessModalVisible, setIsShareAccessModalVisible] = useState(false);
  const [isDeleteUserModalVisible, setIsDeleteUserModalVisible] = useState(false);


  const showAddUserModal = () => {
    setIsAddUserModalVisible(true);
  };

  const hideAddUserModal = () => {
    setIsAddUserModalVisible(false);
  };

  const showModifyUserModal = () => {
    setIsModifyUserModalVisible(true);
  };

  const hideModifyUserModal = () => {
    setIsModifyUserModalVisible(false);
  };

  const showDeleteUserModal = () => {
    setIsDeleteUserModalVisible(true);
  };

  const hideDeleteUserModal = () => {
    setIsDeleteUserModalVisible(false);
  };

  const showSuspendUserModal = () => {
    setIsSuspendUserModalVisible(true);
  };

  const hideSuspendUserModal = () => {
    setIsSuspendUserModalVisible(false);
  };

  const showShareAccessModal = () => {
    setIsShareAccessModalVisible(true);
  };

  const hideShareAccessModal = () => {
    setIsShareAccessModalVisible(false);
  };
  
  return (
    <div>
      <Col gutter={[24, 24]}>
        <Card style={{ margin: 50 }}>
          <h1 style={{ fontWeight: "bold" }}>User Actions</h1>
          <Row gutter={[24, 24]} style={{ marginTop: customStyles.margin }}>
            <Col
              xs={24}
              sm={12}
              lg={8}
              xl={6}
              style={{
                borderWidth: 15,
                borderRadius: 15,
                borderColor: "#f0eefe",
                border: "30px solid #f0eefe",
                marginLeft: 50,
                marginRight: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
              onClick={showAddUserModal}
            >
              <div
                style={{
                  textAlign: "center",
                  padding: "15%",
                }}
              >
                <img src={addUser} width={50} style={{ marginBottom: 20 }} />
                <h1>Add User</h1>
              </div>
            </Col>
            <Col
              xs={24}
              sm={12}
              lg={8}
              xl={6}
              style={{
                borderWidth: 15,
                borderRadius: 15,
                borderColor: "#ebeefd",
                border: "30px solid #ebeefd",
                marginLeft: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
              onClick={showModifyUserModal}
            >
              <div
                style={{
                  textAlign: "center",
                  padding: "15%",
                }}
              >
                <img src={modifyUser} width={50} style={{ marginBottom: 20 }} />
                <h1>Modify User</h1>
              </div>
            </Col>
            <Col
              xs={24}
              sm={12}
              lg={8}
              xl={6}
              style={{
                borderWidth: 15,
                borderRadius: 15,
                borderColor: "#e8faed",
                border: "30px solid #e8faed",
                marginLeft: 50,
                marginRight: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
              onClick={showSuspendUserModal}
            >
              <div
                style={{
                  textAlign: "center",
                  padding: "15%",
                }}
              >
                <img
                  src={suspendUser}
                  width={50}
                  style={{ marginBottom: 20 }}
                />
                <h1>Suspend User</h1>
              </div>
            </Col>
            <Col
              xs={24}
              sm={12}
              lg={8}
              xl={6}
              style={{
                borderWidth: 15,
                borderRadius: 15,
                borderColor: "#fdeeee",
                border: "30px solid #fdeeee",
                marginLeft: 50,
                marginRight: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
              onClick={showDeleteUserModal}
            >
              <div
                style={{
                  textAlign: "center",
                  padding: "15%",
                }}
              >
                <img src={deleteUser} width={50} style={{ marginBottom: 20 }} />
                <h1>Delete User</h1>
              </div>
            </Col>
            <Col
              xs={24}
              sm={12}
              lg={8}
              xl={6}
              style={{
                borderWidth: 15,
                borderRadius: 15,
                borderColor: "#e6f5fb",
                border: "30px solid #e6f5fb",
                marginLeft: 50,
                marginRight: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
              onClick={showShareAccessModal}
            >
              <div
                style={{
                  textAlign: "center",
                  padding: "15%",
                }}
              >
                <img
                  src={shareAccess}
                  width={50}
                  style={{ marginBottom: 20 }}
                />
                <h1>Share Access</h1>
              </div>
            </Col>
          </Row>
        </Card>
      </Col>
      <AddUserModal
        visible={isAddUserModalVisible}
        onCancel={hideAddUserModal}
      />
      <ModifyUserModal
        visible={isModifyUserModalVisible}
        onCancel={hideModifyUserModal}
      />
      <DeleteUserModal
        visible={isDeleteUserModalVisible}
        onCancel={hideDeleteUserModal}
      />
      <SuspendUserModal
        visible={isSuspendUserModalVisible}
        onCancel={hideSuspendUserModal}
      />
      <ShareAccessModal
        visible={isShareAccessModalVisible}
        onCancel={hideShareAccessModal}
      />
    </div>
  );
};

export default Users;
