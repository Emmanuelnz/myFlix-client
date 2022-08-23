import React from 'react';
import axios from 'axios';

// React-router Imports
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

// View imports
import { NavBar } from '../navbar/navbar';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorsView } from '../directors-view/directors-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view'; 

// React-bootstrap imports 
import { Row, Col } from 'react-bootstrap';

export class MainView extends React.Component {

  constructor() {
    super();

    this.state= {
      movies: [],
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
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
      user: null,
    });
    window.open("/", "_self");
  }

  render() {
    const { movies, user } = this.state;

    return (
        <Router>
          <NavBar user={ user } />
          <Row className='main-view gap-3 mx-auto mt-5 pt-5'>
            
            <Route exact path='/' render={() => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>

              if (movies.length === 0) return <div className="main-view" />;

              return movies.map(m => (
                <Col lg={2} md={3} sm={5} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ))
            }} />
            
            <Route path='/register' render={() => {
              if (user) return <Redirect to='/' />
              return <Col>
                <RegistrationView />
              </Col>
            }} />
    
            <Route path={`/users/${user}`} render={({ history, match }) => {
              if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>

              if (movies.length === 0) return <div className='main-view' />;

              return <ProfileView history={history} movies={movies} user={user === match.params.username} />
            }} />

            <Route path={`/users-update/${user}`} render={({ match, history }) => {
              if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
              return <Col>
                <UserUpdate user={user} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path='/movies/:movieId' render={({ match, history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>

              if (movies.length === 0) return <div className="main-view" />;

              return <Col>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path='/directors/:name' render={({ match, history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>

              if (movies.length === 0) return <div className='main-view' /> 

              return <Col>
                <DirectorsView directors={movies.find(m => m.Directors.Name === match.params.name).Directors} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path='/genre/:name' render={({ match, history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>

              if (movies.length === 0) return <div className='main-view' />

              return <Col>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
              </Col>
            }} />

          </Row>
        </Router>
    );
  }
}