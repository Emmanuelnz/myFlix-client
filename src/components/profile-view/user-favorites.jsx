import React from "react";
import PropTypes from 'prop-types';

// React-router imports
import { Link } from "react-router-dom";

// React-bootstrap imports 
import { Button, Card, Col, } from "react-bootstrap";

// Custom SCSS 
import '../profile-view/profile-view.scss'

export class FavMoviesView extends React.Component {
  render() {
    const { movies, onFavorites, } = this.props;

    return (
      <Col>
        <Card>
          <Card.Img
            variant='top'
            crossOrigin='anonymous'
            style={{cursor:'pointer'}}
            src={movie.ImagePath} />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
          </Card.Body>
          <Card.Footer>
            <Button
              variant="outline-info"
              onClick={() => onFavorites(movie._id, 'remove')}
              >Remove from Fav
            </Button>
          </Card.Footer>
        </Card>
      </Col>
    );
  }
}