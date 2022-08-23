import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// React-router imports 
import { Link } from 'react-router-dom';

// React-bootstrap imports 
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

// Custom SCSS 
import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  // Declare hook for each input
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');

  // Validate user inputs 
  const validate = () => {
    let isReq = true;
    if(!username) {
      setUsernameErr('Username Required');
        isReq = false;
    }else if(username.length < 4) {
      setUsernameErr('Username must be at least 4 characters long');
        isReq = false;
    }
    if(!password) {
      setPasswordErr('Password Required');
        isReq = false;
    }else if(password.length < 6) {
      setPassword('Password must be at least 6 characters long');
        isReq = false;
    }

    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isReq = validate();

    if (isReq) {
    axios.post('https://myflixfr.herokuapp.com/login', {
      Username: username,
      Password: password,
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
   }
  };
  
  return (
    <Container>
      <Row>
        <Col>
          <Card className='loginbdy'>
            <Card.Body>
              <Card.Title className='login-title'>Sign In</Card.Title>
              <Form>
                <Form.Group>
                  <Form.Label>Username: </Form.Label>
                  <Form.Control type='text' placeholder='Enter Username' value={username} onChange={e => setUsername(e.target.value)} /> 
                    {usernameErr && <p>{usernameErr}</p>}
                  </Form.Group>

                <Form.Group>
                    <Form.Label>Password: </Form.Label>
                    <Form.Control type='password' placeholder='Enter Password' onChange={e => setPassword(e.target.value)} /> 
                      {passwordErr && <p>{passwordErr}</p>}
                </Form.Group>
                
                  <Button  className='mt-2' variant='primary' type='submit' onClick={handleSubmit}>Sign in</Button>
              </Form>
            </Card.Body>
            <Card.Footer>
              <Card.Text>Don't have an account?  <Link to='/register'>
                <Button variant='submit' className='mb-1'>
                 Sign up
                </Button>
              </Link></Card.Text>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};