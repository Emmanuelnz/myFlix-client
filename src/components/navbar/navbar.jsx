import React from 'react';

// React-bootstrap imports 
import { Navbar, Container, Nav, Button, Offcanvas } from 'react-bootstrap';

// Custom SCSS
import '../navbar/navbar.scss';


export function NavBar({ user }) {
  
  onLogOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  }

  const isAuth = () => {
    if (typeof window === 'undefined') {
      return false;
    }
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    } else {
      return false;
    }
  }

  return (
    <Navbar className='main-nav' sticky='top' bg='dark' expand='xxl' variant='dark'>
      <Container fluid>
        <Button variant='info' href='/' >myFlix</Button>
        <Navbar.Toggle aria-controls='offcanvasNavbar-expand' />
          <Navbar.Offcanvas>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>myFlix</Offcanvas.Title>
            </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className='ms-auto'>
                  {isAuth() && (
                    <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>
                  )}

                  {!isAuth() && (
                    <Nav.Link href='/'>Sign in</Nav.Link>
                  )}

                  {!isAuth && (
                    <Nav.Link href='/register'>Sign up</Nav.Link>
                  )}
                  
                  {isAuth() && (
                    <Button variant='info' onClick={() => {
                      this.onLogOut()
                    }}>Log out</Button>
                  )}
                </Nav>
              </Offcanvas.Body>
          </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );

};