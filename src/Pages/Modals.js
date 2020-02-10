import React, { useState } from "react";
import { Button, Modal, ModalHeader, NavLink } from "reactstrap";
import LogInPage from "./LogInPage";
import SignUpPage from "./SignUpPage";

const Modals = ({ SignUpUser, LogInUser }) => {
  const [modal, setModal] = useState(false);
  const [Login, setLogin] = useState(true);

  const toggle = () => {
    setModal(!modal);
    setLogin(true);
  };

  const toggleLogin = () => setLogin(!Login);

  return (
    <div>
      <NavLink style={{ cursor: "pointer" }} onClick={toggle}>
        <i className="fas fa-sign-in-alt"></i> <b>Log In</b>
      </NavLink>
      <Modal
        isOpen={modal}
        toggle={toggle}
        modalTransition={{ timeout: 600 }}
        backdropTransition={{ timeout: 1300 }}
      >
        <ModalHeader
          style={{
            paddingLeft: "20px"
          }}
          toggle={toggle}
        >
          {Login ? "Login" : "Sign Up"}
        </ModalHeader>
        {Login ? (
          <LogInPage LogInUser={LogInUser} toggle={toggle} />
        ) : (
          <SignUpPage SignUpUser={SignUpUser} toggle={toggle} />
        )}
        <Button
          style={{
            marginLeft: "20px",
            width: "100px",
            marginBottom: "40px",
            backgroundColor: "white",
            color: "black",
            border: "2px solid #008CBA"
          }}
          onClick={toggleLogin}
        >
          {Login ? "Sign Up" : "Log In"}
        </Button>
      </Modal>
    </div>
  );
};

export default Modals;
