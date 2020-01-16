import React, { useState } from "react";
import uuid from "uuid/v1";
import { ListGroup, Button, Container } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function Item({ item: { id, name }, handleRemove }) {
  const [open, setOpen] = useState(true);

  return (
    <>
      <CSSTransition in={open} timeout={300} classNames="fade">
        <ListGroup.Item>
          <Button
            variant="danger"
            className="mr-3"
            onClick={() => {
              setOpen(false);
              handleRemove(id);
            }}
          >
            Remove
          </Button>
          {name}
        </ListGroup.Item>
      </CSSTransition>
    </>
  );
}

export default function ShoppingList() {
  const [items, setItems] = useState([
    { id: uuid(), name: "Eggs" },
    { id: uuid(), name: "Milk" },
    { id: uuid(), name: "Steak" },
    { id: uuid(), name: "Water" }
  ]);
  const handleAddNewItem = () => {
    const name = prompt("Enter item");
    setItems(prevItems => [...prevItems, { id: uuid(), name }]);
  };
  const handleRemoveItem = id => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
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
