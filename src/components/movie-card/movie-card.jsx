import React from 'react';
import PropTypes from 'prop-types';

// React-router imports
import { Link } from 'react-router-dom';

// React-bootstrap imports
import { Col, Card, Button } from "react-bootstrap";

// Custom SCSS
import '../movie-card/movie-card.scss';

export class MovieCard extends React.Component {
  
  render() {
    const { movie } = this.props;

    return (
      <Col>
        <Card bg='dark' text='light'>
          <Link to={`movies/${movie._id}`} >
            <Card.Img 
              variant='top' 
              crossOrigin='anonymous'
              src={movie.ImagePath} 
              />
          </Link>
          <Card.Body style={{ height: '5rem'}}>
            <Card.Title className='movie-card'>{movie.Title}</Card.Title>
          </Card.Body>
          <Card.Footer>
            <Link to={`/movies/${movie._id}`}>
              <Button variant='outline-info'>Details</Button>
            </Link>
          </Card.Footer>
        </Card>
      </Col>
      );
    }
  }

MovieCard.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
  }).isRequired,
};