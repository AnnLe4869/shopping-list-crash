import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { logout } from "../../actions/authCreator";

export default function LogoutModal() {
  const dispatch = useDispatch();
  const handleClick = () => dispatch(logout());
  return (
    <>
      <Button onClick={handleClick}>Log out</Button>
    </>
  );
}
