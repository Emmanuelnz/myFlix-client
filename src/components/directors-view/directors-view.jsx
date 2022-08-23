import React from 'react';
import PropTypes from 'prop-types';

// React-bootstrap imports
import { Container, Card, Button } from 'react-bootstrap';

export class DirectorsView extends React.Component {

  render () {
    const { movie, onBackClick } = this.props;

    return (
      <Container>
        <Card bg='dark' text='light'>
          <Card.Body>
            <Card.Header>Directors</Card.Header>
              <Card.Text>{movie.Directors.Name}</Card.Text>
              <Card.Text>{movie.Directors.Bio}</Card.Text>
              <Card.Text>{movie.Directors.Born}</Card.Text>
            <Card.Footer>
              <Button onClick={() => {onBackClick();}}></Button>
            </Card.Footer>
          </Card.Body>
        </Card>
      </Container>
    );
  }

}

DirectorsView.propTypes = {
  Directors: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Born: PropTypes.string.isRequired
  }).isRequired
};