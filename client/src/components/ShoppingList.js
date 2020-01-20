import React from "react";
import { ListGroup, Button, Container } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";

import { getItems, removeItem } from "../actions/actionCreator";
import ItemModal from "./ItemModal";

export default function ShoppingList() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.items);

  const handleRemoveItem = id => {
    dispatch(removeItem(id));
  };
  return (
    <>
      <Container>
        <ItemModal></ItemModal>
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
