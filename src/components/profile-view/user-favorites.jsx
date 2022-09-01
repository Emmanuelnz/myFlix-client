import React from "react";
import PropTypes from 'prop-types';

// React-bootstrap imports 
import { Button, Card, Col, } from "react-bootstrap";

// Custom SCSS 
import '../profile-view/profile-view.scss'

export class FavMoviesView extends React.Component {
  render() {
    const { movie, onFavorites } = this.props;

    return (
      <Col>
        <Card className='h-100' bg='dark' text='light'>
          <Link to={`movies/${movie._id}`} >
            <Card.Img
              variant='top'
              crossOrigin='anonymous'
              style={{cursor:'pointer'}}
              src={movie.ImagePath} />
          </Link>
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
          </Card.Body>
          <Card.Footer>
            <Button
              variant="outline-info"
              onClick={() => onFavorites(movie._id, 'remove')}
              >Remove from Favorites +
            </Button>
          </Card.Footer>
        </Card>
      </Col>
    );
  }
}

FavMoviesView.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
  }).isRequired,
};