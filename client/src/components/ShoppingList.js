import React, { useEffect } from "react";
import { ListGroup, Button, Container } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";

import { getItems, removeItem } from "../actions/actionCreator";
import ItemModal from "./ItemModal";

export default function ShoppingList() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.items);

  useEffect(() => {
    dispatch(getItems());
    console.log(Date.now());
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
              .map(
                ({ _id, name }) =>
                  console.log("hello world") || (
                    <CSSTransition timeout={300} classNames="fade" key={_id}>
                      <ListGroup.Item>
                        <Button
                          variant="danger"
                          className="mr-3"
                          onClick={() => {
                            handleRemoveItem(_id);
                          }}
                        >
                          Remove
                        </Button>
                        {name}
                      </ListGroup.Item>
                    </CSSTransition>
                  )
              )}
          </TransitionGroup>
        </ListGroup>
      </Container>
    </>
  );
}
