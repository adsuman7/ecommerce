import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import {LinkContainer} from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'

function Header() {
  const userLogin = useSelector(state => state.userlogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()

  const logoutHandler = () => {
      dispatch(logout())
  }
  return (
    <div>
      <header>
      <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Proshop</Navbar.Brand>
        </LinkContainer>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          <LinkContainer to="/cart">
            <Nav.Link ><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
          </LinkContainer>
          {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                                </NavDropdown>
                            ) : (
                                    <LinkContainer to='/login'>
                                        <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
                                    </LinkContainer>
                                )}
          
          
          
        
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      </header>
    </div>
  )
}

export default Header
