import React from 'react';
import PropTypes from 'prop-types';

// React-router imports
import { Link } from 'react-router-dom';

// React-bootstrap imports
import { Card, Button } from "react-bootstrap";

// Custom SCSS
import '../movie-card/movie-card.scss';

export class MovieCard extends React.Component {
  
  render() {
    const { movie } = this.props;

    return (
      <Card className='h-100' bg='dark' text='light'>
        <Link to={`movies/${movie._id}`} >
          <Card.Img  
          variant="top" 
          crossOrigin='anonymous'
          style={{cursor:'pointer'}}
          src={movie.ImagePath} />
        </Link>
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
        </Card.Body>
        <Card.Footer>
          <Link to={`/movies/${movie._id}`}>
            <Button variant='outline-info'>Details</Button>
          </Link>
        </Card.Footer>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
  }).isRequired,
};