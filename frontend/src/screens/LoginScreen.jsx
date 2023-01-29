import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/shared/Message';
import Loader from '../components/shared/Loader';
import {login} from '../actions/userActions'
import FromContainer from '../components/shared/FromContainer';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirect = '/';
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, userInfo } = useSelector((state) => state.userLogin);
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  },[navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    dispatch(login(email, password));
    e.preventDefault();    
  };

  return (
    <>
      <FromContainer>
        <h1>SIGN IN</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
          </Form.Group>
          <br/>
          <Button type='submit' varient='primary'>SIGN IN</Button>
        </Form>
        <br/>
        <Row>
          <Col>
            New Customer?&nbsp;
            <Link to={'/register'}>Register</Link>
          </Col>
        </Row>
      </FromContainer>
    </>
  )
}

export default LoginScreen;