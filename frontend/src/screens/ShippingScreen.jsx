import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/shared/FormContainer';
import {saveShippingAddress} from '../actions/cartActions';

const ShippingAddress = () => {
  const {shippingAddress} = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch
    dispatch(saveShippingAddress(address, city, postalCode, country));
    navigate('/payment');
  }

  return (
    <FormContainer>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>
            Address
          </Form.Label>
          <Form.Control type='address' placeholder='Enter Address' value={address} onChange={e=>setAddress(e.target.value)} required>
          </Form.Control>
        </Form.Group>
        <br/>
        <Form.Group controlId='city'>
          <Form.Label>
            City
          </Form.Label>
          <Form.Control type='text' placeholder='Enter City' value={city} onChange={e => setCity(e.target.value)} required>
          </Form.Control>
        </Form.Group>
        <br/>
        <Form.Group controlId='postalCode'>
          <Form.Label>
            PostalCode
          </Form.Label>
          <Form.Control type='text' placeholder='Enter Postalcode' value={postalCode} onChange={e => setPostalCode(e.target.value)} required>
          </Form.Control>
        </Form.Group>
        <br/>
        <Form.Group controlId='country'>
          <Form.Label>
            Country
          </Form.Label>
          <Form.Control type='text' placeholder='Enter Country' value={country} onChange={e => setCountry(e.target.value)} required>
          </Form.Control>
        </Form.Group>
        <br/>
        <Button type='submit' variant='primary'>continue</Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingAddress;