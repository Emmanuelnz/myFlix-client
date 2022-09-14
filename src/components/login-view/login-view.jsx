import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// Redux
import { connect } from 'react-redux';
import { setUser } from '../../actions/actions';

// React-router imports 
import { Link } from 'react-router-dom';

// React-bootstrap imports 
import { Container, Col, Row, Form, Button, Card } from 'react-bootstrap';

// Custom SCSS 
import '../login-view/login-view.scss';

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
      setPasswordErr('Password must be at least 6 characters long');
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
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
      props.setUser(username);
    })
    .catch(function (error) {
      console.log(error);
    });
   }
  };
  
  return (
    <Container>
      <Row>
        <Col>
          <Card className='loginbdy mt-4'>
            <Card.Body>
              <Card.Title className='login-title'>Sign In</Card.Title>
              <Form>
                <Form.Group>
                  <Form.Label>Username: </Form.Label>
                  <Form.Control 
                    value={username} 
                    type='text' 
                    placeholder='Enter Username' 
                    onChange={e => setUsername(e.target.value)} /> 
                    {usernameErr && <p>{usernameErr}</p>}
                  </Form.Group>

                <Form.Group >
                    <Form.Label>Password: </Form.Label>
                    <Form.Control 
                      value={password} 
                      type='text' 
                      placeholder='Enter Password' 
                      onChange={e => setPassword(e.target.value)} /> 
                      {passwordErr && <p>{passwordErr}</p>}
                </Form.Group>
                
                  <Button  
                    className='mt-2' 
                    variant='primary' 
                    type='submit' 
                    onClick={handleSubmit}>Sign in
                  </Button>
              </Form>
            </Card.Body>
            <Card.Footer>
              <Card.Text>Don't have an account?  
                <Link to='/register'>
                  <Button variant='submit' className='mb-1'>
                 Sign up</Button>
                </Link>
              </Card.Text>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

let mapStateToProps = state => {
  return { user: state.user }
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {setUser}) (LoginView);