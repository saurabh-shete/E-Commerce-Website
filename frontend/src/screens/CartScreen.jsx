import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row,Col,Form,Button,Card,Image,ListGroup, ListGroupItem } from "react-bootstrap";
import { addtoCart, removeFromCart } from "../actions/cartActions";
import Message from "../components/shared/Message";

const Cartscreen = () => {
  const { id, qty } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    if (id) {
      dispatch(addtoCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkOut = () => {
    navigate('/shipping');
  };

  return (
    <>
      <Link to="/" className="btn btn-light">
        <i className="fas fa-arrow-left">&nbsp;</i>
        GO BACK</Link>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {
            cartItems.length === 0 ? (
              <Message>Your cart is empty!
                
              </Message>
            ) : (<ListGroup variant="flush">
                {
                  cartItems.map((item) => (
                    <ListGroupItem>
                      <Row>
                        <Col md={2}>
                          <Image src={item.image} alt={item.name} fluid rounded></Image>
                        </Col>
                        <Col md={3}>
                          <Link to={`/product/${item.product}`}>{ item.name }</Link>
                        </Col>
                        <Col md={2}>${item.price}</Col>
                        <Col md={3}>
                          <Form.Group>
                            <Form.Select value={item.qty} onChange={(e) => dispatch(addtoCart(item.product,Number(e.target.value)))}>
                              {[...Array(item.countInstock).keys()].map((x) => {
                                return (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                );
                              }
                              )}
                            </Form.Select>
                          </Form.Group>
                          <Button type="button" variant="light" onClick={() => removeFromCartHandler(item.product)}>
                            <i className='fa fa-trash' aria-hidden="true"></i>
                          </Button>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))
                }
            </ListGroup>)
          }
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <h3>Subtotal:- {cartItems.reduce((acc, item) => acc + item.qty, 0)} items</h3>
              </ListGroupItem>
              <ListGroupItem>
                <h5>Total:- ${cartItems.reduce((acc, item) => acc+(item.qty * item.price), 0).toFixed(2)}</h5>
              </ListGroupItem>
              <Button type="button" className='btn btn-block' disabled={cartItems.length===0} onClick={checkOut}>
                Proceed to check out
              </Button>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Cartscreen;