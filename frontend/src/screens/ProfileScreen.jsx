import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/shared/Message';
import Loader from '../components/shared/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { myListOrders } from "../actions/orderActions";

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.userDetails);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { success } = useSelector((state) => state.userUpdateProfile);

  const {orders, loading: loadingOrders  , error: errorOrders} = useSelector((state)=>state.orderMyList)

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails());
        dispatch(myListOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [navigate, userInfo, user, dispatch]);

  const submitHandler = (e) => {
    dispatch(updateUserProfile({id:user._id,name,email,password}))
    e.preventDefault();
  };

  return (
    <>
        <Row>
        <Col md={4}>
          <h1>Update Information</h1>
          {error && <Message variant="danger">{error}</Message>}
          {success && <Message variant="success">Profile Updated</Message>}
          {loading && <Loader />}
          {message && <Message variant="danger">{message}</Message>}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control type='text' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type='password' placeholder='Enter Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <br />
            <Button type='submit' varient='primary'>Update</Button>
          </Form>
          <br />
        </Col>
        <Col md={8}>
          <h1>My Order</h1>
          {orders ? (loadingOrders ?
            <Loader /> :
            errorOrders ?
            <Message variant="danger">{errorOrders}</Message> :
              (<Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <td>ID</td>
                    <td>DATE</td>
                    <td>TOTAL</td>
                    <td>PAID</td>
                    <td>DELIVERED</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {
                    orders.map(order => (
                      <tr key={ order._id }>
                        <td>{ order._id }</td>
                        <td>{ order.createdAt.substring(0,10) }</td>
                        <td>{ order.totalPrice }</td>
                        <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                          <i className='fas fs-times' style={{color:'red'}}></i>
                        ) }</td>
                        <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                          <i className='fas fa-times' style={{color:'red'}}></i>
                        )}</td>
                        <td>
                          <LinkContainer to={`/order/${order._id}`}>
                            <Button variant='light'>Details</Button>
                          </LinkContainer>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
            </Table>)):(<></>)}
        </Col>
        </Row>
    </>
  )
}

export default ProfileScreen;