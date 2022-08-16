import React from 'react';
import axios from 'axios';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { Row, Col, Button, Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state= {
      movies: [],
      selectedMovie: null,
      user: null,
      registered: null,
    };
  }

  componentDidMount() {
    axios.get('https://myflixfr.herokuapp.com/movies')
      .then(response => {
        this.setState ({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setSelectedMovie(movie) {
    this.setState ({
      selectedMovie: movie
    });
  }

  // After successful login by user, this function updates the `user` property in state to that specific user
  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  onRegistration(registered) {
    this.setState({
      registered,
    });
  }

  render() {
    const { movies, selectedMovie, user, registered } = this.state;

    if (!registered) return <RegistrationView onRegistration={registered => this.onRegistration(registered)} />

    // If no user, LoginView is rendered. If user is logged in, the user details are passed as prop to LoginView
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    // Before Movies have been loaded
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">
        <Navbar fixed='top' bg='dark' expand='xxl'>
          <Container fluid>
            <Navbar.Toggle aria-controls='offcanvasNavbar-expand' />
            <Button variant='info' href='#home' >myFlix</Button>
              <Navbar.Offcanvas>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>myFlix</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className='me-auto'>
                    <Nav.Link href='#logout'>Log Out</Nav.Link>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
          </Container>
        </Navbar>
          {selectedMovie
            ? (
              <Row>
                <Col>
                  <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                </Col>
              </Row>
            )
            
            : (
              <Row>
                {movies.map(movie => (
                  <Col lg={2} md={3} sm={4}>
                    <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                  </Col>
                ))}
              </Row>
            )
          }
      </div>
    );
  }
}