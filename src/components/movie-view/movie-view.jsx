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
              <Card.Body>
              <Card.Img variant='top' crossOrigin='anonymous' src={ movie.ImagePath } />
                <Card.Title className='mview-title pt-2'> { movie.Title } </Card.Title>
                  <Card.Text>
                    <span className='mview-text'>Description: </span> 
                    { movie.Description } 
                  </Card.Text>

                  <Card.Text>
                    <Link to={`/directors/${movie.Directors.Name}`}>
                      <Button 
                        variant='outline-info'
                        size='sm'
                        >Director Details 
                      </Button>
                    </Link> - { movie.Directors.Name } 
                  </Card.Text>

                  <Card.Text>
                    <Link to={`/genre/${movie.Genre.Name}`}>
                      <Button  
                        variant='outline-info'
                        size='sm'
                        >Genre Details 
                      </Button>
                    </Link> - { movie.Genre.Name } 
                  </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button 
                  variant='info' 
                  onClick={ () => {onBackClick(); }}
                  >« Back 
                </Button>
                
                <Button
                    className="mx-2"
                    variant="outline-info"
                  >Favorites + 
                </Button>
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
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};