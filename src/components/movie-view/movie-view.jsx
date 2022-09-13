import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// React-router imports
import { Link } from 'react-router-dom';

// React-bootstrap imports 
import { Container, Row, Col, Card, Button, } from 'react-bootstrap';

// Custom SCSS
import '../movie-view/movie-view.scss';


export class MovieView extends React.Component {

  addFavorite(movie) {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem('user');

    axios.post( `https://myflixfr.herokuapp.com/users/${username}/movies/${movie._id}`, "", 
      {headers: { Authorization: `Bearer ${token}` }}
      )
      .then((response) => {
        console.log(response);
        alert('Successfully added to favorite list!');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

   render() {
    const { movie, onBackClick, } = this.props;
  
    return (
      <Container fluid>
        <Row>
          <Col>
            <Card bg='dark' text='light'>
              <Card.Body>
              <Card.Img
                crossOrigin='anonymous' 
                src={ movie.ImagePath } />
                <Card.Title className='pt-1'>
                    <Row>
                      <Col className='mt-2'>{ movie.Title }</Col>
                      <Col>
                        <Button
                          size='sm'
                          className='fav-btn mt-1'
                          variant='outline-info'
                          onClick={() => this.addFavorite(movie)}
                          >Favorites + 
                        </Button>
                      </Col>
                    </Row>
                  </Card.Title>
                  <Card.Text className='mt-2'>
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
                  variant='outline-info' 
                  onClick={ () => {onBackClick(); }}
                  >« Back 
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