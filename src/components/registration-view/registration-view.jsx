import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row, } from "react-bootstrap";


import './registration-view.scss';
import CardHeader from 'react-bootstrap/esm/CardHeader';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthDay, setBirthday ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthDay);
    props.onRegistration(username);
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card className='registerbdy'>
              <Card.Body>
                <Card.Title className='register-title'>New myFlix User</Card.Title>
                <Form>
                  <Form.Group controlId='formUsername'>
                    <Form.Label>Username: </Form.Label>
                    <Form.Control type='text' onChange={e => setUsername(e.target.value)} Placeholder="Enter username (username must be at least 5 characters) " />
                  </Form.Group>

                  <Form.Group controlId='formPassword'>
                    <Form.Label>Password: </Form.Label>
                    <Form.Control type='password' onChange={e => setPassword(e.target.value)} Placeholder='Enter password' />
                  </Form.Group>

                  <Form.Group controlId='formEmail'>
                    <Form.Label>Email: </Form.Label>
                    <Form.Control type='email' onChange={e => setPassword(e.target.value)} Placeholder='Enter Email address'/>
                  </Form.Group>

                  <Form.Group controlId='formBirthday'>
                    <Form.Label>Birthday: </Form.Label>
                    <Form.Control type='date' onChange={e => setPassword(e.target.value)} />
                  </Form.Group>

                  <Button variant='primary' type='submit' onClick={handleSubmit}>Register</Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape ({
    username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
  }), onRegistration: PropTypes.func.isRequired
};