import React from 'react';
import PropTypes from 'prop-types';

// React-bootstrap imports
import { Container, Card, Button } from 'react-bootstrap';

export class GenreView extends React.Component {
  render() {
    const { genre, onBackCLick } = this.props;
    
    return (
      <Container>
        <Card bg='dark' text='light'>
          <Card.Header>Genre</Card.Header>
            <Card.Body>
              <Card.Text>{genre.Name}</Card.Text>
              <Card.Text>{genre.Description}</Card.Text>
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