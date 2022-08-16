import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';

import { MainView } from './components/main-view/main-view';

// Import bundle statement `./index.scss`
import './index.scss';

// Main component
class MyFlixApplication extends React.Component {
  render() {

    return (
      <Container className='index-mv-container'>
        <MainView />
      </Container>
    );
  }
}

// Finds root of the app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);