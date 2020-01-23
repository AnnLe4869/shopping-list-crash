import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Form } from "react-bootstrap";

import { addItem } from "../actions/actionCreator";

export default function ItemModal() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState("");
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const handleToggle = () => setOpen(!open);
  const handleChange = e => {
    setItem(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addItem({ name: item }));
    setOpen(false);
    setItem("");
  };
  return (
    <>
      {isAuthenticated ? (
        <Button variant="secondary" className="my-3" onClick={handleToggle}>
          Add new item
        </Button>
      ) : (
        <h4 className="my-3">Please log in to continue</h4>
      )}

      <Modal show={open} onHide={handleToggle}>
        <Modal.Header closeButton>
          <Modal.Title>Add new item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="item">
              <Form.Label>Item name</Form.Label>
              <Form.Control type="text" value={item} onChange={handleChange} />
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
