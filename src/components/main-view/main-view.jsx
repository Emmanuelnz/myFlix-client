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
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://myflixfr.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  setSelectedMovie(movie) {
    this.setState ({
      selectedMovie: movie
    });
  }

  onRegistration(registered) {
    this.setState({
      registered,
    });
  }

  // After successful login by user, this function updates the `user` property in state to that specific user
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
  
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  render() {
    const { movies, selectedMovie, user, registered } = this.state;

    // if (!registered) return <RegistrationView onRegistration={registered => this.onRegistration(registered)} />

    // If user is logged in, the user details are passed as prop to LoginView. If no user, LoginView is rendered.
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
                  <Nav className='ms-auto'>
                    <Button onClick={() => { this.onLoggedOut() }}>Log Out</Button>
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
              <Row className='gap-3 mx-auto mt-5 pt-5'>
                {movies.map(movie => (
                  <Col lg={2} md={3} sm={5}>
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