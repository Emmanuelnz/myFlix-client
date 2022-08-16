import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    props.onLoggedIn(username);
  };
  
  return (
    <Container>
      <Row>
        <Col>
          <Card className='loginbdy'>
            <Card.Body>
              <Card.Title className='login-title'>Sign In</Card.Title>
              <Form>
                <Form.Group controlId='formUsername'>
                  <Form.Label>Username: </Form.Label>
                  <Form.Control type='text' onChange={e => setUsername(e.target.value)} placeholder='Enter Username' />
                  </Form.Group>

                <Form.Group controlId='formPassword'>
                    <Form.Label>Password: </Form.Label>
                    <Form.Control type='password' onChange={e => setPassword(e.target.value)} placeholder='Enter Password' />
                </Form.Group>
                  <Button variant='primary' type='submit' onClick={handleSubmit}>Sign in</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

LoginView.propTypes = {
  user: PropTypes.shape ({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired
};