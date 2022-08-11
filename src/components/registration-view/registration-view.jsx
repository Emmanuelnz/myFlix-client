import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './registration-view.scss';

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
    <form>
      <label> Username:
        <input type='text' value={username} onChange={e => setUsername(e.target.value)} /> 
      </label>
      <label> Password: 
        <input type='password' value={password} onChange={e => setPassword(e.target.value)} /> 
      </label>
      <label> Email: 
        <input type='email' value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label> Birthday: 
        <input type='date' value={birthDay} onChange={e => setBirthday(e.target.value)} /> 
      </label>
      <button className='registerbtn' type='submit' onClick={handleSubmit}>Register</button>
    </form>
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