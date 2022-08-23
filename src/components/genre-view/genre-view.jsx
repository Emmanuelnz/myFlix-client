import React from 'react';
import PropTypes from 'prop-types';

// React-bootstrap imports
import { Container, Card, Button } from 'react-dom';

export class GenreView extends React.Component {
  render() {
    const { movie, onBackCLick } = this.props;
    
    return (
      <Container>
        <Card bg='dark' text='light'>
          <Card.Header>Genre</Card.Header>
            <Card.Body>
              <Card.Text>{movie.Genre.Name}</Card.Text>
              <Card.Text>{movie.Genre.Description}</Card.Text>
            </Card.Body>
          <Card.Footer>
            <Button onClick={() => {onBackCLick();}} >Back</Button>
          </Card.Footer>
        </Card>
      </Container>
    );
  }
}

GenreView.proptypes = {
  Genre: PropTypes.shape ({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired
};