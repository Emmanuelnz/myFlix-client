import React from 'react';
import PropTypes from 'prop-types';

// React-bootstrap imports
import { Container, Card, Button } from 'react-bootstrap';

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;
    
    return (
      <Container>
        <Card bg='dark' text='light'>
          <Card.Header>Genre</Card.Header>
            <Card.Body>
              <Card.Text><span>Type: </span>{genre.Name}</Card.Text>
              <Card.Text><span>Description: </span>{genre.Description}</Card.Text>
            </Card.Body>
          <Card.Footer>
            <Button 
              variant='outline-info'
              onClick={() => {onBackClick();}} 
              >« Back
            </Button>
          </Card.Footer>
        </Card>
      </Container>
    );
  }
}