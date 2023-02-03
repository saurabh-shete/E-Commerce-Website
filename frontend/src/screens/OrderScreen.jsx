import React, { useState, useEffect } from "react";
import { Col, Row, ListGroup, Image, Card } from 'react-bootstrap';
import { getOrderDetails, payOrder } from '../actions/orderActions';
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/shared/Message"; 
import Loader from "../components/shared/Loader"; 
import { styles } from "../styles/style";
import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_PAY_RESET } from "../constants/orderConstants";
import axios from "axios";


const OrderScreen = () => {
  const { _id } = useParams();
  const orderId = _id;
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false);
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;
  const { order, loading, error } = useSelector((state) => state.orderDetails);
  const { userInfo } = useSelector((state) => state.userLogin);

  if (!loading) {
    //calculate price
    const addDecimal = (num) => {
      return (Math.round(num * 100 / 100).toFixed(2));
    }

    order.itemsPrice = addDecimal(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0));
  }
  useEffect(() => {
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get(`${process.env.REACT_APP_PROXY_URL}api/config/paypal`);
      const script = document.createElement('script'); 
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      }
      document.body.appendChild(script);
    }
    if (!order || successPay) {
      dispatch(getOrderDetails(orderId));
      dispatch({ type: ORDER_PAY_RESET });
    } else if ( !order.isPaid ) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, order, successPay]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  }
  
  return loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : 
    <>
      <h2>Order {order._id}</h2>
      <Row>
        <Col md={8}>
          <Card>
          <ListGroup.Item variant="flush">
            <h2>Shipping</h2>
            <p>
              <strong style={styles.strong}>Name : </strong>
              {userInfo.name}
            </p>
            <p>
              <strong style={styles.strong}>Email : </strong>
              {userInfo.email}
            </p>
              <p>
                <strong style={styles.strong}>Address : </strong>
                {order.shippingAddress.address}&nbsp;
                {order.shippingAddress.city}&nbsp;
                {order.shippingAddress.postalCode}&nbsp;
                {order.shippingAddress.country}&nbsp;
              </p>
            {
              order.isDelivered ? <Message variant="success">Delivered on {order.deliveredAt}</Message>
              :<Message variant="danger">Not Delivered</Message>
            }
          </ListGroup.Item>
          </Card>
          <Card>
            <ListGroup.Item variant="flush">
            <h2>Payment Method</h2>
            <p>
            <strong style={styles.strong}>Method: </strong>
            <strong style={styles.strong}>{ order.paymentMethod }</strong>
            </p>
            {
              order.isPaid ? <Message variant="success">Paid on {order.paidAt}</Message>
              :<Message variant="danger">Not Paid</Message>
            }
            </ListGroup.Item>
          </Card>
          <Card>
          <ListGroup.Item>
            <h2>Order Items</h2>
            {
              order.orderItems.length === 0 ?
              (<Message variant='primary'>Your Cart is Empty</Message>) :
              (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} X ${item.price} = ${item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>)}
            </ListGroup.Item>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
            </ListGroup>
          </Card>
          {!order.isPaid && (<ListGroup.Item>
            {loadingPay && <Loader />}
            {!sdkReady ? (<Loader />) : <PayPalButton amount={order.totalPrice} onSuccess={ successPaymentHandler } />}
          </ListGroup.Item>) }
        </Col>
      </Row>
    </>
}

export default OrderScreen;