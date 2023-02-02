import React, { useState } from "react";
import { NavDropdown } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { logout } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Header = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  // const { userUpdateProfile } = useSelector((state) => state.userUpdateProfile);
  // const [userI, setUserI] = useState(userInfo?userInfo.name:'');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // useEffect(() => {
  //   console.log('abs')
  //   if (!userUpdateProfile && !userInfo) {
  //     setUserI('');
  //   } else if (!userUpdateProfile) {
  //     setUserI(userInfo.name);
  //   } else if (!userUpdateProfile.userInfo) {
  //     setUserI(userInfo.name);
  //   } else {
  //     setUserI(userUpdateProfile.userInfo.name);
  //   }
  // },[setUserI, userInfo,userUpdateProfile])

  const logoutHandler = () => {
    dispatch(logout());
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('cartItems');
    navigate('/');
  };
  
  return(
    <>
    <Navbar bg="dark" expand="lg" variant="dark" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Online Shop</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        </Navbar.Collapse>
        <Nav className="ml-auto">
          <LinkContainer to="/cart">
            <Nav.Link>
              <i className="fa-solid fa-cart-shopping"></i>&nbsp;Cart</Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>
                    Profile
                  </NavDropdown.Item>
                </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
              </NavDropdown>
            ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fa-solid fa-user"></i>&nbsp;Signin</Nav.Link>
                </LinkContainer>
            )}
          </Nav>
      </Container>
    </Navbar>
    </>
  )
}

export default Header;