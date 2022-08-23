import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// React-bootstrap imports 
import { Form, Button, Card, Container, Col, Row, } from "react-bootstrap";

// SCSS import 
import './registration-view.scss';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  const [ values,  setValues ] = useState({
    usernameErr: '',
    passwordErr: '',
    emailErr: '',
  });

  // Validate user inputs
  const validate = () => {
    let isReq = true;
    if(!username) {
      setUsernameErr('Username Required');
        isReq = false;
    }else if(username.length < 4) {
      setUsernameErr('Username must be 4 characters long');
        isReq = false;
    }
    if(!password) {
      setPasswordErr('Password Required');
        isReq = false;
    }else if(password.length < 6) {
      setPassword('Password must be 6 characters long');
        isReq = false;
    }
    if(!email) {
      setEmailErr('Email is required');
        isReq = false;
    }else if(email.indexOf('@') === -1) {
      setValues({...values, emailErr: 'Invalid Email'});
        isReq = false;
    }
    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const isReq = validate();

    if(isReq) {
      axios.post('https://myflixfr.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
      .then (response => {
        const data = response.data;
        console.log(data);
        alert('Registration successful, Welcome! Please login! ');
          // Second argument opens page in current tab "_self"
          window.open('/', '_self'); 
      })
      .catch(response => {
        console.error(response);
        alert('unable to register');
      });
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card className='registerbdy'>
            <Card.Body>
              <Card.Title className='register-title'>New myFlix User</Card.Title>
              <Form>
                <Form.Group controlId='formUsername'>
                  <Form.Label>Username: </Form.Label>
                  <Form.Control type='text' onChange={e => setUsername(e.target.value)} placeholder="Enter username (username must be at least 5 characters) " /> 
                    {values.usernameErr &&  <p>{values.usernameErr}</p>}
                </Form.Group>

                <Form.Group controlId='formPassword'>
                  <Form.Label>Password: </Form.Label>
                  <Form.Control type='password' onChange={e => setPassword(e.target.value)} placeholder='Enter password' />
                    {values.passwordErr && <p>{values.passwordErr}</p>}
                </Form.Group>

                <Form.Group controlId='formEmail'>
                  <Form.Label>Email: </Form.Label>
                  <Form.Control type='email' onChange={e => setEmail(e.target.value)} placeholder='Enter Email address'/>
                    {values.emailErr && <p>{values.emailErr}</p>}
                </Form.Group>

                <Form.Group controlId='formBirthday'>
                  <Form.Label>Birthday: </Form.Label>
                  <Form.Control type='date' onChange={e => setBirthday(e.target.value)} />
                </Form.Group>

                <Button className='mt-2' variant='primary' type='submit' onClick={handleSubmit}>Register</Button> 
              </Form>
            </Card.Body>
            <Card.Footer>
              <Button href='/' className='mt-2 ms-1' variant='primary' type='submit' >Sign in</Button>
            </Card.Footer> 
          </Card>
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
  }), 
};