import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Form, Alert } from "react-bootstrap";

import { register } from "../../actions/authCreator";
import { clearErrors } from "../../actions/errorCreator";

export default function LoginModal() {
  const [input, setInput] = useState({
    email: "",
    name: "",
    password: ""
  });
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const error = useSelector(state => state.error);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    if (error) {
      if (error.id === "REGISTER_FAIL") {
        setMessage(error.message.message);
      } else {
        setMessage(null);
      }
    }
    if (isAuthenticated) {
      setShow(false);
    }
  }, [error.message.message, error.id]);

  const handleToggle = () => {
    dispatch(clearErrors());
    setShow(!show);
  };
  const handleChange = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(
      register({
        email: input.email,
        password: input.password,
        name: input.name
      })
    );
    setInput({
      email: "",
      password: "",
      name: ""
    });
  };
  return (
    <>
      <Button variant="secondary" className="my-3" onClick={handleToggle}>
        Register
      </Button>

      <Modal show={show} onHide={handleToggle}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
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
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={input.name}
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
