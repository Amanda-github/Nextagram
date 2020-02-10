import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from "reactstrap";
import { Link } from "react-router-dom";
import Modals from "./Modals";

const SearchBar = ({
  SignUpUser,
  LogInUser,
  currentUser,
  LogOutUser,
  MyProfilePage
}) => {
  if (currentUser) {
    console.log(currentUser.username);
  }
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar color="faded" light>
        <NavbarBrand href="/">
          <h1>
            <b>
              <i className="fab fa-instagram"></i> <span></span>
              Nextagram
            </b>
          </h1>
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            {currentUser ? (
              <NavItem style={{ marginLeft: "auto", marginRight: "auto" }}>
                <NavbarText>
                  <i class="fas fa-child"></i> <> </>
                  <b>
                    Welcome back <span></span>
                    {currentUser.username}
                  </b>
                </NavbarText>
              </NavItem>
            ) : (
              <b>
                TELL ME WHO ARE YOU <span> </span>
                <i className="fas fa-question"></i>
              </b>
            )}
            <NavItem>
              <NavLink tag={Link} to="/">
                <b>
                  <i className="fas fa-home"></i> <>Home</>
                </b>
              </NavLink>
            </NavItem>
            {currentUser ? (
              <NavItem>
                <NavLink
                  tag={Link}
                  onClick={LogOutUser}
                  style={{ cursor: "pointer" }}
                >
                  <b>
                    <i className="fas fa-sign-out-alt"></i>
                    <>Log Out</>
                  </b>
                </NavLink>
              </NavItem>
            ) : (
              <NavItem>
                <Modals
                  buttonLabel="Login"
                  SignUpUser={SignUpUser}
                  LogInUser={LogInUser}
                />
              </NavItem>
            )}
            <NavItem>
              <NavLink
                tag={Link}
                to="/profile"
                onClick={MyProfilePage}
                style={{ cursor: "pointer" }}
              >
                <b>
                  <i class="fas fa-user"></i>
                  <span></span> My Profile
                </b>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default SearchBar;
