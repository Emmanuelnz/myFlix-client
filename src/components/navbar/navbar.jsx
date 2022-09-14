import React from 'react';

// React-bootstrap imports 
import { Navbar, Container, Nav, Button, Offcanvas, Col, } from 'react-bootstrap';

// Searchbar/movie filter
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

// Custom SCSS
import '../navbar/navbar.scss';



export function NavBar({ user }) {
  
 const onLogOut = () => {
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
    <Navbar 
      className='main-nav' 
      sticky='top' 
      bg='dark' 
      expand='md' 
      variant='dark'>
      <Container fluid>
        <Button variant='info' href='/' >myFlix</Button>
        <Col className='mx-1'>
          <VisibilityFilterInput expand='lg' />
        </Col>
        <Navbar.Toggle aria-controls='offcanvasNavbar-expand' />
          <Navbar.Offcanvas className='sidenav'>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
              <Button 
                variant='dark' 
                href='/' 
                >myFlix
              </Button>
              </Offcanvas.Title>
            </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav>
                  {isAuth() && (
                    <Button 
                      variant='dark'
                      href={`/users/${user}`}
                      >{user}
                    </Button>
                  )}

                  {!isAuth() && (
                    <Nav.Link href='/'>Sign in</Nav.Link>
                  )}

                  {!isAuth && (
                    <Nav.Link href='/register'>Sign up</Nav.Link>
                  )}
                  <Col className='mt-2'></Col>
                  {isAuth() && (
                    <Button
                      variant='dark' 
                      onClick={() => {onLogOut()}}
                      >Log out
                    </Button>
                  )}
                </Nav>
              </Offcanvas.Body>
          </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );

};