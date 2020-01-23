import React, { useEffect } from "react";
import { ListGroup, Button, Container } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";

import { getItems, removeItem } from "../actions/actionCreator";
import ItemModal from "./ItemModal";

export default function ShoppingList() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.items);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(getItems());
  }, []);

  const handleRemoveItem = id => {
    dispatch(removeItem(id));
  };
  return (
    <>
      <Container>
        <ItemModal></ItemModal>
        <ListGroup>
          <TransitionGroup>
            {[...items]
              .sort((a, b) => (a.date < b.date ? 1 : -1))
              .map(({ _id, name }) => (
                <CSSTransition timeout={300} classNames="fade" key={_id}>
                  <ListGroup.Item>
                    {isAuthenticated ? (
                      <Button
                        variant="danger"
                        className="mr-3"
                        onClick={() => {
                          handleRemoveItem(_id);
                        }}
                      >
                        Remove
                      </Button>
                    ) : null}

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
