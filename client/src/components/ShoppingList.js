import React, { useState } from "react";
import uuid from "uuid/v1";
import { ListGroup, Button, Container, Fade } from "react-bootstrap";

function Item({ item: { id, name }, handleRemove }) {
  const [open, setOpen] = useState(true);

  return (
    <>
      <Fade
        in={open}
        onExited={() => {
          setTimeout(() => handleRemove(id), 270);
        }}
      >
        <ListGroup.Item>
          <Button
            variant="danger"
            className="mr-3"
            onClick={() => {
              setOpen(false);
            }}
          >
            Remove
          </Button>
          {name}
        </ListGroup.Item>
      </Fade>
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
          {items.map(item => (
            <Item
              key={item.id}
              item={item}
              handleRemove={handleRemoveItem}
            ></Item>
          ))}
        </ListGroup>
      </Container>
    </>
  );
}
