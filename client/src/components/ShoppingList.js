import React, { useState } from "react";
import uuid from "uuid/v1";
import { ListGroup, Button, Container } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";

import { getItems, addItem, removeItem } from "../actions/actionCreator";

export default function ShoppingList() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.items);

  const handleAddNewItem = () => {
    const name = prompt("Enter item");
    dispatch(addItem({ id: uuid(), name }));
  };
  const handleRemoveItem = id => {
    dispatch(removeItem(id));
  };
  return (
    <>
      <Container>
        <Button variant="secondary" className="my-2" onClick={handleAddNewItem}>
          Add new item
        </Button>
        <ListGroup>
          <TransitionGroup>
            {items.map(({ id, name }) => (
              <CSSTransition timeout={300} classNames="fade" key={id}>
                <ListGroup.Item>
                  <Button
                    variant="danger"
                    className="mr-3"
                    onClick={() => {
                      handleRemoveItem(id);
                    }}
                  >
                    Remove
                  </Button>
                  {name}
                </ListGroup.Item>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    </>
  );
}
