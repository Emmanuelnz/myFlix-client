import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from "react-bootstrap";


export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <Card bg='dark' text='light'>
        <Card.Img variant="top" crossOrigin='anonymous' src={movie.ImagePath} />
        <Card.Body>
          <Card.Title className='mcard-title'>{movie.Title}</Card.Title>
          <Button variant='info' onClick={() => onMovieClick(movie)} >Details</Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,

    Directors: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Born: PropTypes.string.isRequired,
    }),
    
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};