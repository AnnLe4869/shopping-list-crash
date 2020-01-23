import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import Login from "./auth/LoginModal";
import Register from "./auth/RegisterModal";
import Logout from "./auth/LogoutModal";
import { useSelector } from "react-redux";

export default function AppNavBar() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">Shopping List</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {isAuthenticated ? (
              <>
                <Nav.Item>
                  <Navbar.Text className="mr-3">
                    {user ? `Welcome ${user.name}` : ""}
                  </Navbar.Text>
                </Nav.Item>
                <Nav.Item>
                  <Logout></Logout>
                </Nav.Item>
              </>
            ) : (
              <>
                <Nav.Item className="mr-3">
                  <Login></Login>
                </Nav.Item>
                <Nav.Item>
                  <Register></Register>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
