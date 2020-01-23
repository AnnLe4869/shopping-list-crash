import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Form, Alert } from "react-bootstrap";

import { login } from "../../actions/authCreator";

export default function LoginModal() {
  const [input, setInput] = useState({
    email: "",
    password: ""
  });
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState(null);

  const error = useSelector(state => state.error);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      if (error.id === "LOGIN_FAIL") {
        setMessage(error.message.message);
      } else {
        setMessage(null);
      }
    }
    if (isAuthenticated) {
      setShow(false);
    }
  }, [error.id, error.message.message]);

  const handleToggle = () => setShow(!show);
  const handleChange = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login({ email: input.email, password: input.password }));

    setInput({
      email: "",
      password: ""
    });
  };
  return (
    <>
      <Button variant="secondary" className="my-3" onClick={handleToggle}>
        Login
      </Button>

      <Modal show={show} onHide={handleToggle}>
        <Modal.Header closeButton>
          <Modal.Title>Log in</Modal.Title>
        </Modal.Header>
        {message ? <Alert variant="danger">{message}.</Alert> : null}
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={input.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                name="password"
                value={input.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" block={true} type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
