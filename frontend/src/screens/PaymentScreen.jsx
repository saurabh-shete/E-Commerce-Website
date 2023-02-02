import React, {useState} from "react";
import { Form, Button, Col } from 'react-bootstrap';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutStep from '../components/shared/CheckoutStep'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state) => state.cart);
  
  if (!shippingAddress) {
    navigate('/shipping')
  }
  const submitHandler = (e) => {
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder')
  }

  return (
    <>
      <CheckoutStep step1 step2 step3/>
      <h1> Payment Method </h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>
            Select Payment Method
          </Form.Label>
          <Col>
            <Form.Check type="radio" label="Paypal or Credit Card" id="paypal" name="paymentMethod" value="paypal" checked onChange={e=>setPaymentMethod(e.target.value)}>
            </Form.Check>
          </Col>
        </Form.Group>
        <br/>
        <Button type="submit" variant="primary">Continue</Button>
      </Form>
    </>
  )
}

export default PaymentScreen;