import React, { useEffect } from "react";
import { ListGroup, Button, Container } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";

import { getItems, removeItem } from "../actions/actionCreator";
import ItemModal from "./ItemModal";
import Login from "./auth/LoginModal";
import Register from "./auth/RegisterModal";
import Logout from "./auth/LogoutModal";

export default function ShoppingList() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.items);

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
        <Register></Register>
        <Login></Login>
        <Logout></Logout>
        <ListGroup>
          <TransitionGroup>
            {[...items]
              .sort((a, b) => (a.date < b.date ? 1 : -1))
              .map(({ _id, name }) => (
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
              ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    </>
  );
}
