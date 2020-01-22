import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, Form } from "react-bootstrap";

import { register } from "../../actions/authCreator";

export default function LoginModal() {
  const [input, setInput] = useState({
    email: "",
    name: "",
    password: ""
  });
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleToggle = () => setShow(!show);
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
    setShow(false);
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
            <Form.Group controlId="email">
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
