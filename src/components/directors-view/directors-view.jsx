import React from 'react';
import PropTypes from 'prop-types';

// React-bootstrap imports
import { Container, Card, Button } from 'react-bootstrap';

// Custom SCSS 
import '../directors-view/directors-view.scss';

export class DirectorsView extends React.Component {

  render() {
    const { directors, onBackClick } = this.props;

    return (
      <Container>
        <Card bg='dark' text='light'>
          <Card.Header className='title'>Directors</Card.Header>
            <Card.Body>
              <Card.Text><span>Name:</span> {directors.Name}</Card.Text>
              <Card.Text><span>Bio:</span> {directors.Bio}</Card.Text>
              <Card.Text><span>Born:</span> {directors.Born}</Card.Text>
            </Card.Body>
          <Card.Footer>
            <Button className='mb-2' variant='outline-info' onClick={() => {onBackClick();}}>« Back</Button>
          </Card.Footer>
        </Card>
      </Container>
    );
  }

}

DirectorsView.propTypes = {
  directors: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Born: PropTypes.string.isRequired
  }).isRequired
};