import React from 'react';
import PropTypes from 'prop-types';

// React-router imports
import { Link } from 'react-router-dom';

// React-bootstrap imports 
import { Card, Container, Col, Row, Button } from 'react-bootstrap';

// Custom SCSS
import '../movie-view/movie-view.scss';


export class MovieView extends React.Component {

   render() {
    const { movie, onBackClick } = this.props;
  
    return (
      <Container fluid>
        <Row>
          <Col>
            <Card bg='dark' text='light'>
              <Card.Img variant='top' crossOrigin='anonymous' src={ movie.ImagePath } />
              <Card.Body>
                <Card.Title className='mview-title'> { movie.Title } </Card.Title>
                <Card.Text>
                  <span className='mview-text'>Description: </span> { movie.Description } </Card.Text>
                <Card.Text><span className='mview-text'>Directors: </span>{ movie.Directors.Name } </Card.Text>
                <Card.Text><span className='mview-text'>Genre: </span>{ movie.Genre.Name } </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button variant='info' onClick={ () => {onBackClick(); }}>Back</Button>

                <Link to={`/directors/${movie.Directors.Name}`}>
                  <Button className='mx-2' variant='info'>Director/s Details</Button>
                </Link>

                <Link to={`/genre/${movie.Genre.Name}`}>
                  <Button className='me-1' variant='info'>Genre Details</Button>
                </Link>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    )

   }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,

    Directors: PropTypes.shape ({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Born: PropTypes.string.isRequired, 
    }),

    Genre: PropTypes.shape ({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};